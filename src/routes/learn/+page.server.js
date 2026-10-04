import db, { getSettings } from '$lib/server/db.js';
import { weeksWithProgress } from '$lib/server/queries.js';

export function load({ locals }) {
	const user = locals.user;
	const weeks = weeksWithProgress(user.id, false);
	const total = weeks.reduce((n, w) => n + w.total, 0);
	const done = weeks.reduce((n, w) => n + w.done, 0);

	let next = null;
	for (const w of weeks) {
		const item = w.items.find((i) => !i.done && !(i.kind === 'assignment' && i.status === 'submitted'));
		if (item) {
			next = { week: w, item };
			break;
		}
	}

	const feedback = db
		.prepare(
			`SELECT s.id, s.status, s.feedback, s.reviewed_at, i.title, i.slug AS item_slug, w.slug AS week_slug
			 FROM submissions s JOIN items i ON i.id = s.item_id JOIN weeks w ON w.id = i.week_id
			 WHERE s.user_id = ? AND s.status != 'submitted'
			 ORDER BY s.reviewed_at DESC LIMIT 4`
		)
		.all(user.id);

	const awaiting = db
		.prepare(
			`SELECT COUNT(*) AS n FROM submissions s WHERE s.user_id = ? AND s.status = 'submitted'
			 AND s.id = (SELECT MAX(id) FROM submissions WHERE user_id = s.user_id AND item_id = s.item_id)`
		)
		.get(user.id).n;

	const totalWeeks = db.prepare('SELECT COUNT(*) AS n FROM weeks').get().n;

	return {
		weeks: weeks.map(({ items, ...w }) => w),
		total,
		done,
		percent: total ? Math.round((done / total) * 100) : 0,
		next: next && {
			weekSlug: next.week.slug,
			weekNumber: next.week.number,
			weekTitle: next.week.title,
			item: next.item
		},
		feedback,
		awaiting,
		lockedWeeks: totalWeeks - weeks.length,
		welcome: getSettings().welcome_message
	};
}
