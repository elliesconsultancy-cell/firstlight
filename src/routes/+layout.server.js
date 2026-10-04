import { getSettings } from '$lib/server/db.js';
import db from '$lib/server/db.js';

export async function load({ locals }) {
	const settings = await getSettings();
	let pendingReviews = 0;
	if (locals.user?.role === 'admin') {
		const [a, b] = await Promise.all([
			db.prepare("SELECT COUNT(*) AS n FROM submissions WHERE status = 'submitted'").get(),
			db.prepare("SELECT COUNT(*) AS n FROM users WHERE status = 'pending'").get()
		]);
		pendingReviews = a.n + b.n;
	}
	return {
		user: locals.user,
		course: { name: settings.course_name, tagline: settings.tagline },
		pendingReviews
	};
}
