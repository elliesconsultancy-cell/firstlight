import { error } from '@sveltejs/kit';
import db from '$lib/server/db.js';

/** Sprint review: for one week, who has done which lesson and assignment. */
export async function load({ params }) {
	const week = await db
		.prepare(
			`SELECT w.id, w.title, w.slug, w.position, c.title AS course_title
			 FROM weeks w JOIN courses c ON c.id = w.course_id WHERE w.id = ?`
		)
		.get(params.id);
	if (!week) throw error(404, 'Week not found');

	const items = await db
		.prepare('SELECT id, slug, kind, title FROM items WHERE week_id = ? ORDER BY position, id')
		.all(week.id);
	const students = await db
		.prepare("SELECT id, name FROM users WHERE role = 'student' AND status = 'active' ORDER BY name")
		.all();
	const read = await db
		.prepare('SELECT p.user_id, p.item_id FROM progress p JOIN items i ON i.id = p.item_id WHERE i.week_id = ?')
		.all(week.id);
	const latest = await db
		.prepare(
			`SELECT s.user_id, s.item_id, s.status FROM submissions s JOIN items i ON i.id = s.item_id
			 WHERE i.week_id = ? AND s.id = (SELECT MAX(id) FROM submissions WHERE user_id = s.user_id AND item_id = s.item_id)`
		)
		.all(week.id);

	const readSet = new Set(read.map((r) => `${r.user_id}:${r.item_id}`));
	const statusOf = new Map(latest.map((r) => [`${r.user_id}:${r.item_id}`, r.status]));

	const rows = students.map((s) => {
		const cells = items.map((i) => {
			const key = `${s.id}:${i.id}`;
			if (i.kind === 'lesson') return readSet.has(key) ? 'done' : 'todo';
			const st = statusOf.get(key);
			return st === 'approved' ? 'done' : st === 'submitted' ? 'review' : st === 'changes_requested' ? 'changes' : 'todo';
		});
		const done = cells.filter((c) => c === 'done').length;
		return { ...s, cells, done, percent: items.length ? Math.round((done / items.length) * 100) : 0 };
	});
	const totals = items.map((_, idx) => rows.filter((r) => r.cells[idx] === 'done').length);

	return { week, items, rows, totals };
}
