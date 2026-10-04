import { fail, redirect } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import { createSession, verifyPassword } from '$lib/server/auth.js';

export function load({ locals }) {
	if (locals.user) throw redirect(303, locals.user.role === 'admin' ? '/admin' : '/learn');
}

export const actions = {
	default: async ({ request, cookies, url }) => {
		const form = await request.formData();
		const email = String(form.get('email') || '').trim();
		const password = String(form.get('password') || '');
		const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
		if (!user || !verifyPassword(password, user.password_hash)) {
			return fail(400, { email, error: 'That email and password don’t match. Please try again.' });
		}
		if (user.status === 'suspended') {
			return fail(403, { email, error: 'This account has been paused. Please contact your instructor.' });
		}
		createSession(cookies, user.id, url.protocol === 'https:');
		const next = url.searchParams.get('next');
		const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : null;
		throw redirect(303, safeNext || (user.role === 'admin' ? '/admin' : '/learn'));
	}
};
