import db from '$lib/server/db.js';

export function load({ url }) {
	const status = url.searchParams.get('status') || 'submitted';
	const latestOnly = `s.id = (SELECT MAX(id) FROM submissions WHERE user_id = s.user_id AND item_id = s.item_id)`;
	const where = status === 'all' ? latestOnly : `s.status = ? AND ${latestOnly}`;
	const args = status === 'all' ? [] : [status];
	const rows = db
		.prepare(
			`SELECT s.id, s.status, s.version, s.created_at, s.reviewed_at, s.link,
				u.name, u.id AS user_id, i.title, w.position AS week,
				(SELECT COUNT(*) FROM files f WHERE f.submission_id = s.id) AS files
			 FROM submissions s JOIN users u ON u.id = s.user_id JOIN items i ON i.id = s.item_id JOIN weeks w ON w.id = i.week_id
			 WHERE ${where}
			 ORDER BY ${status === 'submitted' ? 's.created_at ASC' : 'COALESCE(s.reviewed_at, s.created_at) DESC'}
			 LIMIT 200`
		)
		.all(...args);
	return { rows, status };
}
