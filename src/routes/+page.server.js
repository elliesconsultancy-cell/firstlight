import { redirect } from '@sveltejs/kit';
import db from '$lib/server/db.js';

export function load({ locals }) {
	if (locals.user) throw redirect(303, locals.user.role === 'admin' ? '/admin' : '/learn');
	const weeks = db
		.prepare(
			`SELECT w.title, w.summary, w.position,
				(SELECT COUNT(*) FROM items i WHERE i.week_id = w.id AND i.kind = 'lesson') AS lessons
			 FROM weeks w ORDER BY w.position`
		)
		.all();
	const hasAdmin = !!db.prepare("SELECT 1 FROM users WHERE role = 'admin'").get();
	return { weeks, hasAdmin };
}
