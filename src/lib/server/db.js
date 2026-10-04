import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { loadCurriculum } from './content.js';

export const DATA_DIR = path.resolve(process.env.DATA_DIR || 'data');
export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
export const CONTENT_DIR = path.resolve(process.env.CONTENT_DIR || 'content');

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

/** @type {import('better-sqlite3').Database} */
let db = globalThis.__firstlightDb;

if (!db) {
	db = new Database(path.join(DATA_DIR, 'firstlight.db'));
	db.pragma('journal_mode = WAL');
	db.pragma('foreign_keys = ON');
	migrate(db);
	seedIfEmpty(db);
	globalThis.__firstlightDb = db;
}

export default db;

function migrate(db) {
	db.exec(`
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
		created_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS settings (
		key TEXT PRIMARY KEY,
		value TEXT NOT NULL
	);
	`);

	const defaults = {
		course_name: 'Firstlight',
		tagline: 'Learn to build for the web — from your very first tag to your first app.',
		invite_code: '',
		require_approval: '1',
		welcome_message:
			'Welcome! Read the lessons for the week, tick them off as you go, and submit your assignment when you are ready. I will review it and leave feedback.'
	};
	const insert = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
	for (const [k, v] of Object.entries(defaults)) insert.run(k, v);
}

/** Import/refresh curriculum from markdown. Existing weeks and items are updated by slug. */
export function syncContent(db, { publishFirst = 0 } = {}) {
	const curriculum = loadCurriculum(CONTENT_DIR);
	const findWeek = db.prepare('SELECT id FROM weeks WHERE slug = ?');
	const insertWeek = db.prepare(
		'INSERT INTO weeks (slug, position, title, summary, intro_md, published) VALUES (?, ?, ?, ?, ?, ?)'
	);
	const updateWeek = db.prepare(
		'UPDATE weeks SET position = ?, title = ?, summary = ?, intro_md = ? WHERE id = ?'
	);
	const upsertItem = db.prepare(`
		INSERT INTO items (week_id, slug, position, kind, title, minutes, submission_type, body_md)
		VALUES (@week_id, @slug, @position, @kind, @title, @minutes, @submission_type, @body_md)
		ON CONFLICT (week_id, slug) DO UPDATE SET
			position = excluded.position, kind = excluded.kind, title = excluded.title,
			minutes = excluded.minutes, submission_type = excluded.submission_type,
			body_md = excluded.body_md, updated_at = datetime('now')
	`);

	let weeks = 0;
	let items = 0;
	db.transaction(() => {
		for (const w of curriculum) {
			const existing = findWeek.get(w.slug);
			let weekId;
			if (existing) {
				updateWeek.run(w.position, w.title, w.summary, w.intro_md, existing.id);
				weekId = existing.id;
			} else {
				weekId = insertWeek.run(
					w.slug,
					w.position,
					w.title,
					w.summary,
					w.intro_md,
					w.position < publishFirst ? 1 : 0
				).lastInsertRowid;
			}
			weeks++;
			for (const item of w.items) {
				upsertItem.run({ ...item, week_id: weekId });
				items++;
			}
		}
	})();
	return { weeks, items };
}

function seedIfEmpty(db) {
	const { n } = db.prepare('SELECT COUNT(*) AS n FROM weeks').get();
	if (n === 0) {
		const result = syncContent(db, { publishFirst: 2 });
		console.log(`[firstlight] Imported ${result.weeks} weeks and ${result.items} lessons/assignments.`);
	}
}

export function getSettings() {
	const rows = db.prepare('SELECT key, value FROM settings').all();
	return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export function setSetting(key, value) {
	db.prepare(
		'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
	).run(key, String(value));
}
