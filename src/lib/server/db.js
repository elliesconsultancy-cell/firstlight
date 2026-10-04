import { createClient } from '@libsql/client';
import path from 'node:path';
import { loadCurriculum } from './content.js';

// The course content is bundled into the server build so it works on hosts
// (like Vercel) that have no persistent disk to read it from.
const contentFiles = import.meta.glob('../../../content/weeks/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

// Where the database lives:
//  - Hosted (Vercel etc.): set TURSO_DATABASE_URL (+ TURSO_AUTH_TOKEN).
//  - Local / Docker with a disk: a SQLite file in DATA_DIR (default ./data).
export const DATA_DIR = path.resolve(process.env.DATA_DIR || 'data');
const url =
	process.env.TURSO_DATABASE_URL ||
	(process.env.VERCEL ? '' : 'file:' + path.join(DATA_DIR, 'firstlight.db'));

if (!url) {
	throw new Error(
		'No database configured. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in your Vercel project environment variables.'
	);
}

const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

/** Plain object from a result-set row. */
function toObject(rs, row) {
	const o = {};
	rs.columns.forEach((c, i) => (o[c] = row[i]));
	return o;
}

/** Accept either positional args (...values) or one object of named params. */
function normalize(args) {
	if (
		args.length === 1 &&
		args[0] &&
		typeof args[0] === 'object' &&
		!Array.isArray(args[0]) &&
		!ArrayBuffer.isView(args[0]) &&
		!(args[0] instanceof ArrayBuffer)
	) {
		return args[0];
	}
	return args;
}

/**
 * A small async wrapper that keeps the prepare().get/all/run shape the app already uses.
 * Everything returns a Promise, so callers must `await`.
 */
const db = {
	prepare(sql) {
		const exec = (args) => client.execute({ sql, args: normalize(args) });
		return {
			async get(...args) {
				const rs = await exec(args);
				return rs.rows.length ? toObject(rs, rs.rows[0]) : undefined;
			},
			async all(...args) {
				const rs = await exec(args);
				return rs.rows.map((r) => toObject(rs, r));
			},
			async run(...args) {
				const rs = await exec(args);
				return {
					changes: rs.rowsAffected,
					lastInsertRowid: rs.lastInsertRowid == null ? undefined : Number(rs.lastInsertRowid)
				};
			},
			/** Statement descriptor for db.batch(). */
			bind(...args) {
				return { sql, args: normalize(args) };
			}
		};
	},
	/** Run several statements together in one transaction. */
	async batch(statements) {
		if (!statements.length) return [];
		return client.batch(statements, 'write');
	},
	exec(sql) {
		return client.executeMultiple(sql);
	}
};

export default db;

/** Runs once per server start: create tables, add new columns, seed the curriculum. */
async function init() {
	await client.execute('PRAGMA foreign_keys = ON').catch(() => {});
	await db.exec(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE COLLATE NOCASE,
		password_hash TEXT NOT NULL,
		role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student','admin')),
		status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','active','suspended')),
		bio TEXT NOT NULL DEFAULT '',
		created_at TEXT NOT NULL DEFAULT (datetime('now')),
		last_seen_at TEXT
	);
	CREATE TABLE IF NOT EXISTS sessions (
		id TEXT PRIMARY KEY,
		user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		expires_at INTEGER NOT NULL
	);
	CREATE TABLE IF NOT EXISTS weeks (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		slug TEXT NOT NULL UNIQUE,
		position INTEGER NOT NULL DEFAULT 0,
		title TEXT NOT NULL,
		summary TEXT NOT NULL DEFAULT '',
		intro_md TEXT NOT NULL DEFAULT '',
		instructor_notes TEXT NOT NULL DEFAULT '',
		published INTEGER NOT NULL DEFAULT 0,
		created_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS items (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		week_id INTEGER NOT NULL REFERENCES weeks(id) ON DELETE CASCADE,
		slug TEXT NOT NULL,
		position INTEGER NOT NULL DEFAULT 0,
		kind TEXT NOT NULL CHECK (kind IN ('lesson','assignment')),
		title TEXT NOT NULL,
		minutes INTEGER NOT NULL DEFAULT 20,
		submission_type TEXT NOT NULL DEFAULT 'any',
		body_md TEXT NOT NULL DEFAULT '',
		updated_at TEXT NOT NULL DEFAULT (datetime('now')),
		UNIQUE (week_id, slug)
	);
	CREATE TABLE IF NOT EXISTS progress (
		user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
		completed_at TEXT NOT NULL DEFAULT (datetime('now')),
		PRIMARY KEY (user_id, item_id)
	);
	CREATE TABLE IF NOT EXISTS submissions (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
		version INTEGER NOT NULL DEFAULT 1,
		answer TEXT NOT NULL DEFAULT '',
		link TEXT NOT NULL DEFAULT '',
		status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted','approved','changes_requested')),
		feedback TEXT NOT NULL DEFAULT '',
		reviewer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
		reviewed_at TEXT,
		created_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE INDEX IF NOT EXISTS idx_submissions_user_item ON submissions(user_id, item_id);
	CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
	CREATE TABLE IF NOT EXISTS files (
		id TEXT PRIMARY KEY,
		submission_id INTEGER NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
		original_name TEXT NOT NULL,
		stored_name TEXT NOT NULL,
		mime TEXT NOT NULL,
		size INTEGER NOT NULL,
		data BLOB,
		created_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS settings (
		key TEXT PRIMARY KEY,
		value TEXT NOT NULL
	);
	`);

	// Older databases created before uploads moved into the database need this column.
	const cols = await db.prepare("SELECT name FROM pragma_table_info('files')").all();
	if (!cols.some((c) => c.name === 'data')) {
		await client.execute('ALTER TABLE files ADD COLUMN data BLOB');
	}

	const defaults = {
		course_name: 'Firstlight',
		tagline: 'Learn to build for the web — from your very first tag to your first app.',
		invite_code: '',
		require_approval: '1',
		welcome_message:
			'Welcome! Read the lessons for the week, tick them off as you go, and submit your assignment when you are ready. I will review it and leave feedback.'
	};
	await db.batch(
		Object.entries(defaults).map(([k, v]) =>
			db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)').bind(k, v)
		)
	);

	const { n } = await db.prepare('SELECT COUNT(*) AS n FROM weeks').get();
	if (n === 0) {
		try {
			const result = await syncContent({ publishFirst: 2 });
			console.log(`[firstlight] Imported ${result.weeks} weeks and ${result.items} lessons/assignments.`);
		} catch (err) {
			// Two cold starts can race to seed; the loser just sees duplicate rows and can be ignored.
			console.warn('[firstlight] Seeding skipped:', err.message);
		}
	}
}

// Share one init across hot reloads and concurrent requests.
globalThis.__firstlightReady ??= init();
await globalThis.__firstlightReady;

/** Import/refresh curriculum from markdown. Existing weeks and items are updated by slug. */
export async function syncContent({ publishFirst = 0 } = {}) {
	const curriculum = loadCurriculum(contentFiles);
	let weeks = 0;
	let items = 0;
	for (const w of curriculum) {
		const existing = await db.prepare('SELECT id FROM weeks WHERE slug = ?').get(w.slug);
		let weekId;
		if (existing) {
			await db
				.prepare('UPDATE weeks SET position = ?, title = ?, summary = ?, intro_md = ? WHERE id = ?')
				.run(w.position, w.title, w.summary, w.intro_md, existing.id);
			weekId = existing.id;
		} else {
			const r = await db
				.prepare('INSERT INTO weeks (slug, position, title, summary, intro_md, published) VALUES (?, ?, ?, ?, ?, ?)')
				.run(w.slug, w.position, w.title, w.summary, w.intro_md, w.position < publishFirst ? 1 : 0);
			weekId = r.lastInsertRowid;
		}
		weeks++;

		const upsert = db.prepare(`
			INSERT INTO items (week_id, slug, position, kind, title, minutes, submission_type, body_md)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)
			ON CONFLICT (week_id, slug) DO UPDATE SET
				position = excluded.position, kind = excluded.kind, title = excluded.title,
				minutes = excluded.minutes, submission_type = excluded.submission_type,
				body_md = excluded.body_md, updated_at = datetime('now')
		`);
		await db.batch(
			w.items.map((i) =>
				upsert.bind(weekId, i.slug, i.position, i.kind, i.title, i.minutes, i.submission_type, i.body_md)
			)
		);
		items += w.items.length;
	}
	return { weeks, items };
}

export async function getSettings() {
	const rows = await db.prepare('SELECT key, value FROM settings').all();
	return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function setSetting(key, value) {
	await db
		.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
		.run(key, String(value));
}
