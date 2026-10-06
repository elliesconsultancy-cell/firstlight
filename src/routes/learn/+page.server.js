import db, { getSettings } from '$lib/server/db.js';
import { getCourses, weeksWithProgress } from '$lib/server/queries.js';

export async function load({ locals }) {
	const user = locals.user;
	const [weeks, allCourses, weekTotals] = await Promise.all([
		weeksWithProgress(user.id, false),
		getCourses(),
		db.prepare('SELECT course_id, COUNT(*) AS n FROM weeks GROUP BY course_id').all()
	]);
	const weeksInCourse = Object.fromEntries(weekTotals.map((r) => [r.course_id, r.n]));

	// One block per course, with its own progress.
	const courses = allCourses.map((c) => {
		const own = weeks.filter((w) => w.course_id === c.id);
		const total = own.reduce((n, w) => n + w.total, 0);
		const done = own.reduce((n, w) => n + w.done, 0);
		return {
			...c,
			weeks: own.map(({ items, ...w }) => w),
			items: own.flatMap((w) => w.items.map((i) => ({ ...i, week: w }))),
			total,
			done,
			percent: total ? Math.round((done / total) * 100) : 0,
			lockedWeeks: (weeksInCourse[c.id] ?? 0) - own.length
		};
	});

	const total = courses.reduce((n, c) => n + c.total, 0);
	const done = courses.reduce((n, c) => n + c.done, 0);

	// "Up next": carry on with a course you have started, otherwise the first one with work to do.
	const nextIn = (c) => c.items.find((i) => !i.done && !(i.kind === 'assignment' && i.status === 'submitted'));
	const candidates = courses.filter((c) => nextIn(c));
	const started = candidates.find((c) => c.done > 0);
	const pick = started ?? candidates[0];
	const nextItem = pick && nextIn(pick);

	const feedback = await db
		.prepare(
			`SELECT s.id, s.status, s.feedback, s.reviewed_at, i.title, i.slug AS item_slug, w.slug AS week_slug
			 FROM submissions s JOIN items i ON i.id = s.item_id JOIN weeks w ON w.id = i.week_id
			 WHERE s.user_id = ? AND s.status != 'submitted'
			 ORDER BY s.reviewed_at DESC LIMIT 4`
		)
		.all(user.id);

	const awaiting = (
		await db
			.prepare(
				`SELECT COUNT(*) AS n FROM submissions s WHERE s.user_id = ? AND s.status = 'submitted'
				 AND s.id = (SELECT MAX(id) FROM submissions WHERE user_id = s.user_id AND item_id = s.item_id)`
			)
			.get(user.id)
	).n;

	return {
		courses: courses.map(({ items, ...c }) => c),
		total,
		done,
		percent: total ? Math.round((done / total) * 100) : 0,
		next: nextItem && {
			courseTitle: pick.title,
			weekSlug: nextItem.week.slug,
			weekNumber: nextItem.week.number,
			weekTitle: nextItem.week.title,
			item: nextItem
		},
		feedback,
		awaiting,
		welcome: (await getSettings()).welcome_message
	};
}
