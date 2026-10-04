import { error } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import { weeksWithProgress } from '$lib/server/queries.js';

export async function load({ params }) {
	const student = await db
		.prepare('SELECT id, name, email, role, status, bio, created_at, last_seen_at FROM users WHERE id = ?')
		.get(params.id);
	if (!student) throw error(404, 'Student not found');
	const weeks = await weeksWithProgress(student.id, true);
	const submissions = await db
		.prepare(
			`SELECT s.id, s.item_id, s.version, s.status, s.created_at FROM submissions s WHERE s.user_id = ? ORDER BY s.id DESC`
		)
		.all(student.id);
	const latestByItem = {};
	for (const s of submissions) if (!latestByItem[s.item_id]) latestByItem[s.item_id] = s;
	return { student, weeks, latestByItem, submissionCount: submissions.length };
}
