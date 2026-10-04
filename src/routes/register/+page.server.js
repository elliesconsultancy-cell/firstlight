import { fail, redirect } from '@sveltejs/kit';
import db, { getSettings } from '$lib/server/db.js';
import { createSession, hashPassword, isValidEmail } from '$lib/server/auth.js';

export function load({ locals }) {
	if (locals.user) throw redirect(303, '/learn');
	const settings = getSettings();
	const hasAdmin = !!db.prepare("SELECT 1 FROM users WHERE role = 'admin'").get();
	return { needsCode: hasAdmin && !!settings.invite_code, firstUser: !hasAdmin };
}

export const actions = {
	default: async ({ request, cookies, url }) => {
		const form = await request.formData();
		const name = String(form.get('name') || '').trim();
		const email = String(form.get('email') || '').trim().toLowerCase();
		const password = String(form.get('password') || '');
		const code = String(form.get('code') || '').trim();
		const values = { name, email, code };

		if (name.length < 2) return fail(400, { ...values, error: 'Please tell us your name.' });
		if (!isValidEmail(email)) return fail(400, { ...values, error: 'Please enter a valid email address.' });
		if (password.length < 8) return fail(400, { ...values, error: 'Your password needs at least 8 characters.' });
		if (db.prepare('SELECT 1 FROM users WHERE email = ?').get(email)) {
			return fail(400, { ...values, error: 'An account with this email already exists. Try logging in.' });
		}

		const settings = getSettings();
		const hasAdmin = !!db.prepare("SELECT 1 FROM users WHERE role = 'admin'").get();
		if (hasAdmin && settings.invite_code && code.toLowerCase() !== settings.invite_code.toLowerCase()) {
			return fail(400, { ...values, error: 'That invite code isn’t right. Check with your instructor.' });
		}

		const role = hasAdmin ? 'student' : 'admin';
		const status = !hasAdmin || settings.require_approval !== '1' ? 'active' : 'pending';
		const { lastInsertRowid } = db
			.prepare('INSERT INTO users (name, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?)')
			.run(name, email, hashPassword(password), role, status);

		createSession(cookies, Number(lastInsertRowid), url.protocol === 'https:');
		throw redirect(303, role === 'admin' ? '/admin?welcome=1' : status === 'pending' ? '/pending' : '/learn');
	}
};
