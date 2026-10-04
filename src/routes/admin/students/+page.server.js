import crypto from 'node:crypto';
import { fail } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import { hashPassword } from '$lib/server/auth.js';

export function load({ url }) {
	const status = url.searchParams.get('status') || 'all';
	const total = db
		.prepare('SELECT COUNT(*) AS n FROM items i JOIN weeks w ON w.id = i.week_id WHERE w.published = 1')
		.get().n;
	const users = db
		.prepare(
			`SELECT u.id, u.name, u.email, u.role, u.status, u.created_at, u.last_seen_at,
				(SELECT COUNT(*) FROM progress p JOIN items i ON i.id = p.item_id JOIN weeks w ON w.id = i.week_id WHERE p.user_id = u.id AND w.published = 1) AS lessons_done,
				(SELECT COUNT(DISTINCT s.item_id) FROM submissions s JOIN items i ON i.id = s.item_id JOIN weeks w ON w.id = i.week_id
					WHERE s.user_id = u.id AND w.published = 1 AND s.status = 'approved'
					AND s.id = (SELECT MAX(id) FROM submissions WHERE user_id = s.user_id AND item_id = s.item_id)) AS approved,
				(SELECT COUNT(*) FROM submissions s WHERE s.user_id = u.id AND s.status = 'submitted'
					AND s.id = (SELECT MAX(id) FROM submissions WHERE user_id = s.user_id AND item_id = s.item_id)) AS waiting
			 FROM users u
			 ${status === 'all' ? '' : 'WHERE u.status = ?'}
			 ORDER BY u.role = 'admin' DESC, u.status = 'pending' DESC, u.name`
		)
		.all(...(status === 'all' ? [] : [status]))
		.map((u) => ({ ...u, percent: total ? Math.round(((u.lessons_done + u.approved) / total) * 100) : 0 }));
	return { users, status };
}

export const actions = {
	setStatus: async ({ request, locals }) => {
		const form = await request.formData();
		const id = Number(form.get('id'));
		const status = String(form.get('status'));
		if (!['active', 'pending', 'suspended'].includes(status)) return fail(400);
		if (id === locals.user.id) return fail(400, { error: 'You can’t change your own status.' });
		db.prepare('UPDATE users SET status = ? WHERE id = ?').run(status, id);
		if (status === 'suspended') db.prepare('DELETE FROM sessions WHERE user_id = ?').run(id);
		return { ok: true };
	},
	setRole: async ({ request, locals }) => {
		const form = await request.formData();
		const id = Number(form.get('id'));
		const role = String(form.get('role'));
		if (!['admin', 'student'].includes(role)) return fail(400);
		if (id === locals.user.id) return fail(400, { error: 'You can’t change your own role.' });
		db.prepare("UPDATE users SET role = ?, status = 'active' WHERE id = ?").run(role, id);
		return { ok: true };
	},
	resetPassword: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get('id'));
		const user = db.prepare('SELECT name FROM users WHERE id = ?').get(id);
		if (!user) return fail(404);
		const words = ['sun', 'river', 'maple', 'cloud', 'tiger', 'ocean', 'pixel', 'cedar', 'lemon', 'spark'];
		const temp = `${words[crypto.randomInt(words.length)]}-${words[crypto.randomInt(words.length)]}-${crypto.randomInt(100, 999)}`;
		db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hashPassword(temp), id);
		db.prepare('DELETE FROM sessions WHERE user_id = ?').run(id);
		return { tempPassword: temp, tempFor: user.name, tempId: id };
	}
};
