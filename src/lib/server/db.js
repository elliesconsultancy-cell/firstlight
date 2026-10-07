import { building } from '$app/environment';
import path from 'node:path';
import { loadCourses } from './content.js';

// The course content is bundled into the server build so it works on hosts
// (like Vercel) that have no persistent disk to read it from.
const contentFiles = import.meta.glob('../../../content/courses/**/*.md', {
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

if (!url && !building) {
	throw new Error(
		'No database configured. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in your Vercel project environment variables.'
	);
}

// Hosted databases use the pure-JavaScript client (no native binary needed on Vercel).
// A local SQLite file needs the full client. While `vite build` analyses the code there is
// no database to talk to, so an in-memory stand-in is used.
const remote = /^(libsql|https?|wss?):/.test(url);
const { createClient } = remote ? await import('@libsql/client/web') : await import('@libsql/client');
const client = createClient({ url: url || ':memory:', authToken: process.env.TURSO_AUTH_TOKEN });

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
function makeDb(gate) {
	return {
		prepare(sql) {
			const exec = async (args) => {
				await gate();
				return client.execute({ sql, args: normalize(args) });
			};
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
			await gate();
			return client.batch(statements, 'write');
		},
		async exec(sql) {
			await gate();
			return client.executeMultiple(sql);
		}
	};
}

/** Used only while the database is being set up (it must not wait for itself). */
const setupDb = makeDb(async () => {});

/** The database the rest of the app uses. The first use triggers setup, and later uses wait for it. */
const db = makeDb(ready);

/** Runs setup once per server instance. If it fails, the next request tries again. */
async function ready() {
	if (building) return;
	globalThis.__firstlightReady ??= init().catch((err) => {
		globalThis.__firstlightReady = undefined;
		throw err;
	});
	return globalThis.__firstlightReady;
}

export default db;

/** Runs once per server start: create tables, add new columns, seed the curriculum. */
async function init() {
	await client.execute('PRAGMA foreign_keys = ON').catch(() => {});
	await setupDb.exec(`
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
	CREATE TABLE IF NOT EXISTS courses (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		slug TEXT NOT NULL UNIQUE,
		position INTEGER NOT NULL DEFAULT 0,
		title TEXT NOT NULL,
		summary TEXT NOT NULL DEFAULT '',
		level TEXT NOT NULL DEFAULT ''
	);
	CREATE TABLE IF NOT EXISTS weeks (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
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
	const cols = await setupDb.prepare("SELECT name FROM pragma_table_info('files')").all();
	if (!cols.some((c) => c.name === 'data')) {
		await addColumn('ALTER TABLE files ADD COLUMN data BLOB');
	}

	// Databases made before there were several courses: weeks need a course_id.
	const weekCols = await setupDb.prepare("SELECT name FROM pragma_table_info('weeks')").all();
	if (!weekCols.some((c) => c.name === 'course_id')) {
		await addColumn('ALTER TABLE weeks ADD COLUMN course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE');
	}
	await client.execute('CREATE INDEX IF NOT EXISTS idx_weeks_course ON weeks(course_id)');
	await adoptOldWeeks();

	const defaults = {
		course_name: 'Firstlight',
		tagline: 'Learn to build for the web — from your very first tag to your first app.',
		invite_code: '',
		require_approval: '1',
		welcome_message:
			'Welcome! Read the lessons for the week, tick them off as you go, and submit your assignment when you are ready. I will review it and leave feedback.'
	};
	await setupDb.batch(
		Object.entries(defaults).map(([k, v]) =>
			setupDb.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)').bind(k, v)
		)
	);

	// Add any course that is in the content folder but not in the database yet.
	// (Existing courses are never touched here; use Admin > Curriculum > Sync for that.)
	try {
		const result = await syncWith(setupDb, { publishFirst: 2, onlyMissing: true });
		if (result.items > 0) {
			console.log(`[firstlight] Imported ${result.courses} course(s): ${result.weeks} weeks and ${result.items} lessons/assignments.`);
		}
	} catch (err) {
		// Two cold starts can race to seed; the loser just sees duplicate rows and can be ignored.
		console.warn('[firstlight] Seeding skipped:', err.message);
	}
}

/** Add a column, ignoring the error if another server instance added it a moment ago. */
async function addColumn(sql) {
	try {
		await client.execute(sql);
	} catch (err) {
		if (!/duplicate column/i.test(String(err?.message))) throw err;
	}
}

/** Weeks created before courses existed belong to the Web development course. */
async function adoptOldWeeks() {
	const { n } = await setupDb.prepare('SELECT COUNT(*) AS n FROM weeks WHERE course_id IS NULL').get();
	if (n === 0) return;
	const known = loadCourses(contentFiles).find((c) => c.slug === 'web-development');
	const courseId = await upsertCourse(
		setupDb,
		known ?? { slug: 'web-development', title: 'Web development', summary: '', level: '', order: 1 }
	);
	await setupDb.prepare('UPDATE weeks SET course_id = ? WHERE course_id IS NULL').run(courseId);
}

async function upsertCourse(d, c) {
	await d
		.prepare(
			`INSERT INTO courses (slug, position, title, summary, level) VALUES (?, ?, ?, ?, ?)
			 ON CONFLICT (slug) DO UPDATE SET position = excluded.position, title = excluded.title,
				summary = excluded.summary, level = excluded.level`
		)
		.run(c.slug, c.order, c.title, c.summary, c.level);
	return (await d.prepare('SELECT id FROM courses WHERE slug = ?').get(c.slug)).id;
}

/**
 * Import/refresh the curriculum from the markdown files. Weeks and items are matched by slug.
 * onlyMissing: skip courses that already exist (used when the server starts).
 */
async function syncWith(d, { publishFirst = 0, onlyMissing = false } = {}) {
	const courses = loadCourses(contentFiles);
	let courseCount = 0;
	let weeks = 0;
	let items = 0;
	for (const c of courses) {
		if (onlyMissing && (await d.prepare('SELECT 1 FROM courses WHERE slug = ?').get(c.slug))) continue;
		const courseId = await upsertCourse(d, c);
		courseCount++;
		for (const w of c.weeks) {
			// New weeks start published only for the first few; existing weeks keep their published setting.
			await d
				.prepare(
					`INSERT INTO weeks (course_id, slug, position, title, summary, intro_md, instructor_notes, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
					 ON CONFLICT (slug) DO UPDATE SET course_id = excluded.course_id, position = excluded.position,
						title = excluded.title, summary = excluded.summary, intro_md = excluded.intro_md,
						instructor_notes = CASE WHEN excluded.instructor_notes <> '' THEN excluded.instructor_notes ELSE weeks.instructor_notes END`
				)
				.run(courseId, w.slug, w.position, w.title, w.summary, w.intro_md, w.instructor_md ?? '', w.position < publishFirst ? 1 : 0);
			const weekId = (await d.prepare('SELECT id FROM weeks WHERE slug = ?').get(w.slug)).id;
			weeks++;

			const upsert = d.prepare(`
				INSERT INTO items (week_id, slug, position, kind, title, minutes, submission_type, body_md)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?)
				ON CONFLICT (week_id, slug) DO UPDATE SET
					position = excluded.position, kind = excluded.kind, title = excluded.title,
					minutes = excluded.minutes, submission_type = excluded.submission_type,
					body_md = excluded.body_md, updated_at = datetime('now')
			`);
			await d.batch(
				w.items.map((i) =>
					upsert.bind(weekId, i.slug, i.position, i.kind, i.title, i.minutes, i.submission_type, i.body_md)
				)
			);
			items += w.items.length;
		}
	}
	return { courses: courseCount, weeks, items };
}

export function syncContent(options) {
	return syncWith(db, options);
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
