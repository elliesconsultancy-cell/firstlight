import { fail } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import { hashPassword, verifyPassword } from '$lib/server/auth.js';

export const actions = {
	profile: async ({ request, locals }) => {
		const form = await request.formData();
		const name = String(form.get('name') || '').trim();
		const bio = String(form.get('bio') || '').trim().slice(0, 1000);
		if (name.length < 2) return fail(400, { profileError: 'Please enter your name.' });
		db.prepare('UPDATE users SET name = ?, bio = ? WHERE id = ?').run(name, bio, locals.user.id);
		return { profileSaved: true };
	},
	password: async ({ request, locals }) => {
		const form = await request.formData();
		const current = String(form.get('current') || '');
		const next = String(form.get('next') || '');
		const row = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(locals.user.id);
		if (!verifyPassword(current, row.password_hash)) return fail(400, { passwordError: 'Your current password is not right.' });
		if (next.length < 8) return fail(400, { passwordError: 'New password needs at least 8 characters.' });
		db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hashPassword(next), locals.user.id);
		return { passwordSaved: true };
	}
};
