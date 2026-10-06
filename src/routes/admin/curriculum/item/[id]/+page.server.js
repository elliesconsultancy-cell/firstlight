import { error, fail, redirect } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import { slugify } from '$lib/slug.js';

async function getItem(id) {
	const item = await db
		.prepare('SELECT i.*, w.title AS week_title, w.slug AS week_slug, w.position AS week_pos FROM items i JOIN weeks w ON w.id = i.week_id WHERE i.id = ?')
		.get(id);
	if (!item) throw error(404, 'Not found');
	return item;
}

export async function load({ params }) {
	const item = await getItem(params.id);
	const weeks = await db
		.prepare(
			'SELECT w.id, w.title, w.position, c.title AS course_title FROM weeks w JOIN courses c ON c.id = w.course_id ORDER BY c.position, c.id, w.position'
		)
		.all();
	return { item, weeks };
}

export const actions = {
	save: async ({ params, request }) => {
		const item = await getItem(params.id);
		const f = await request.formData();
		const title = String(f.get('title') || '').trim();
		if (!title) return fail(400, { error: 'Title is required.' });
		const slug = slugify(String(f.get('slug') || title));
		const weekId = Number(f.get('week_id')) || item.week_id;
		if (await db.prepare('SELECT 1 FROM items WHERE week_id = ? AND slug = ? AND id != ?').get(weekId, slug, item.id)) {
			return fail(400, { error: 'Another item in that week already uses this URL name.' });
		}
		const kind = f.get('kind') === 'assignment' ? 'assignment' : 'lesson';
		const sub = ['any', 'link', 'file', 'text'].includes(String(f.get('submission_type'))) ? String(f.get('submission_type')) : 'any';
		await db.prepare(
			`UPDATE items SET title = ?, slug = ?, week_id = ?, kind = ?, minutes = ?, submission_type = ?, body_md = ?, updated_at = datetime('now') WHERE id = ?`
		).run(title, slug, weekId, kind, Math.max(1, Number(f.get('minutes')) || 20), sub, String(f.get('body_md') || ''), item.id);
		return { saved: true };
	},
	delete: async ({ params }) => {
		const item = await getItem(params.id);
		const { n } = await db.prepare('SELECT COUNT(*) AS n FROM submissions WHERE item_id = ?').get(item.id);
		if (n > 0) return fail(400, { error: `${n} students have submitted work for this, so it can’t be deleted.` });
		await db.prepare('DELETE FROM items WHERE id = ?').run(item.id);
		throw redirect(303, `/admin/curriculum/${item.week_id}`);
	}
};
