import { redirect } from '@sveltejs/kit';
import db from '$lib/server/db.js';

export async function load({ locals }) {
	if (locals.user) throw redirect(303, locals.user.role === 'admin' ? '/admin' : '/learn');
	const weeks = await db
		.prepare(
			`SELECT w.title, w.summary, w.position, w.course_id,
				(SELECT COUNT(*) FROM items i WHERE i.week_id = w.id AND i.kind = 'lesson') AS lessons
			 FROM weeks w JOIN courses c ON c.id = w.course_id ORDER BY c.position, c.id, w.position`
		)
		.all();
	const courses = (await db.prepare('SELECT id, title, summary, level FROM courses ORDER BY position, id').all()).map((c) => ({
		...c,
		weeks: weeks.filter((w) => w.course_id === c.id)
	}));
	const hasAdmin = !!(await db.prepare("SELECT 1 FROM users WHERE role = 'admin'").get());
	return { courses, hasAdmin };
}
