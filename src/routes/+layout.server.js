import { getSettings } from '$lib/server/db.js';
import db from '$lib/server/db.js';

export function load({ locals }) {
	const settings = getSettings();
	let pendingReviews = 0;
	if (locals.user?.role === 'admin') {
		pendingReviews = db.prepare("SELECT COUNT(*) AS n FROM submissions WHERE status = 'submitted'").get().n;
		pendingReviews += db.prepare("SELECT COUNT(*) AS n FROM users WHERE status = 'pending'").get().n;
	}
	return {
		user: locals.user,
		course: { name: settings.course_name, tagline: settings.tagline },
		pendingReviews
	};
}
