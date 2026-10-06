import db from './db.js';

/** Weeks visible to this user with per-user progress numbers. */
/** All courses in display order. */
export async function getCourses() {
	return db.prepare('SELECT id, slug, position, title, summary, level FROM courses ORDER BY position, id').all();
}

export async function weeksWithProgress(userId, includeDrafts = false) {
	const weeks = await db
		.prepare(
			`SELECT w.id, w.slug, w.position, w.title, w.summary, w.published, w.course_id,
				c.title AS course_title, c.slug AS course_slug
			 FROM weeks w JOIN courses c ON c.id = w.course_id
			 ${includeDrafts ? '' : 'WHERE w.published = 1'}
			 ORDER BY c.position, c.id, w.position, w.id`
		)
		.all();
	const items = await itemsWithStatus(userId);
	return weeks.map((w) => {
		const own = items.filter((i) => i.week_id === w.id);
		const lessons = own.filter((i) => i.kind === 'lesson');
		const assignments = own.filter((i) => i.kind === 'assignment');
		const done = own.filter((i) => i.done).length;
		return {
			...w,
			number: w.position,
			lessons: lessons.length,
			lessonsDone: lessons.filter((i) => i.done).length,
			assignments: assignments.length,
			assignmentsApproved: assignments.filter((i) => i.status === 'approved').length,
			total: own.length,
			done,
			percent: own.length ? Math.round((done / own.length) * 100) : 0,
			items: own
		};
	});
}

/** Every item with whether this user has finished it (lesson read / assignment approved). */
export async function itemsWithStatus(userId) {
	return (await db
		.prepare(
			`SELECT i.id, i.week_id, i.slug, i.kind, i.title, i.minutes, i.position,
				p.completed_at,
				(SELECT s.status FROM submissions s WHERE s.user_id = @u AND s.item_id = i.id ORDER BY s.id DESC LIMIT 1) AS status
			 FROM items i
			 LEFT JOIN progress p ON p.item_id = i.id AND p.user_id = @u
			 ORDER BY i.position, i.id`
		)
		.all({ u: userId }))
		.map((i) => ({
			...i,
			done: i.kind === 'lesson' ? !!i.completed_at : i.status === 'approved'
		}));
}

export async function getWeekBySlug(slug, includeDrafts) {
	const week = await db.prepare('SELECT * FROM weeks WHERE slug = ?').get(slug);
	if (!week || (!week.published && !includeDrafts)) return null;
	return week;
}

export async function latestSubmission(userId, itemId) {
	return db
		.prepare('SELECT * FROM submissions WHERE user_id = ? AND item_id = ? ORDER BY id DESC LIMIT 1')
		.get(userId, itemId);
}

export async function filesFor(submissionIds) {
	if (!submissionIds.length) return [];
	return db
		.prepare(
			`SELECT id, submission_id, original_name, mime, size FROM files WHERE submission_id IN (${submissionIds
				.map(() => '?')
				.join(',')}) ORDER BY created_at`
		)
		.all(...submissionIds);
}
