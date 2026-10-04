import crypto from 'node:crypto';
import db from './db.js';

export const SESSION_COOKIE = 'fl_session';
const SESSION_DAYS = 30;

export function hashPassword(password) {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.scryptSync(password, salt, 64).toString('hex');
	return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password, stored) {
	const [, salt, hash] = String(stored).split('$');
	if (!salt || !hash) return false;
	const candidate = crypto.scryptSync(password, salt, 64);
	const expected = Buffer.from(hash, 'hex');
	return expected.length === candidate.length && crypto.timingSafeEqual(candidate, expected);
}

export async function createSession(cookies, userId, secure) {
	const id = crypto.randomBytes(32).toString('hex');
	const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
	await db.prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)').run(id, userId, expires);
	cookies.set(SESSION_COOKIE, id, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure,
		maxAge: SESSION_DAYS * 24 * 60 * 60
	});
}

export async function getSessionUser(sessionId) {
	if (!sessionId) return null;
	const row = await db
		.prepare(
			`SELECT u.id, u.name, u.email, u.role, u.status, u.bio, u.created_at, u.last_seen_at, s.expires_at
			 FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.id = ?`
		)
		.get(sessionId);
	if (!row) return null;
	if (row.expires_at < Date.now()) {
		await db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
		return null;
	}
	// Only write "last seen" every few minutes, to save a database round trip on every page.
	const seen = row.last_seen_at ? Date.parse(row.last_seen_at.replace(' ', 'T') + 'Z') : 0;
	if (!seen || Date.now() - seen > 5 * 60 * 1000) {
		await db.prepare("UPDATE users SET last_seen_at = datetime('now') WHERE id = ?").run(row.id);
	}
	const { expires_at, last_seen_at, ...user } = row;
	return user;
}

export async function destroySession(cookies) {
	const id = cookies.get(SESSION_COOKIE);
	if (id) await db.prepare('DELETE FROM sessions WHERE id = ?').run(id);
	cookies.delete(SESSION_COOKIE, { path: '/' });
}

export function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
