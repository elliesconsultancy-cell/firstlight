import { error } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import { getWeekBySlug, itemsWithStatus } from '$lib/server/queries.js';

export async function load({ params, locals }) {
	const isAdmin = locals.user.role === 'admin';
	const week = await getWeekBySlug(params.week, isAdmin);
	if (!week) throw error(404, 'This week isn’t available yet.');
	const items = (await itemsWithStatus(locals.user.id)).filter((i) => i.week_id === week.id);
	const weekCount = (await db.prepare('SELECT COUNT(*) AS n FROM weeks WHERE course_id = ?').get(week.course_id)).n;
	const course = await db.prepare('SELECT title FROM courses WHERE id = ?').get(week.course_id);
	const neighbours = await db
		.prepare(
			`SELECT slug, title, position FROM weeks WHERE course_id = ? ${isAdmin ? '' : 'AND published = 1'} ORDER BY position, id`
		)
		.all(week.course_id);
	const idx = neighbours.findIndex((w) => w.slug === week.slug);
	return {
		week: {
			id: week.id,
			slug: week.slug,
			title: week.title,
			summary: week.summary,
			number: week.position,
			courseTitle: course?.title ?? '',
			published: !!week.published
		},
		items,
		weekCount,
		prevWeek: neighbours[idx - 1] ?? null,
		nextWeek: neighbours[idx + 1] ?? null
	};
}
