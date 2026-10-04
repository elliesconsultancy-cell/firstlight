import { error, fail, redirect } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import { slugify } from '$lib/slug.js';

function getItem(id) {
	const item = db
		.prepare('SELECT i.*, w.title AS week_title, w.slug AS week_slug, w.position AS week_pos FROM items i JOIN weeks w ON w.id = i.week_id WHERE i.id = ?')
		.get(id);
	if (!item) throw error(404, 'Not found');
	return item;
}

export function load({ params }) {
	const item = getItem(params.id);
	const weeks = db.prepare('SELECT id, title, position FROM weeks ORDER BY position').all();
	return { item, weeks };
}

export const actions = {
	save: async ({ params, request }) => {
		const item = getItem(params.id);
		const f = await request.formData();
		const title = String(f.get('title') || '').trim();
		if (!title) return fail(400, { error: 'Title is required.' });
		const slug = slugify(String(f.get('slug') || title));
		const weekId = Number(f.get('week_id')) || item.week_id;
		if (db.prepare('SELECT 1 FROM items WHERE week_id = ? AND slug = ? AND id != ?').get(weekId, slug, item.id)) {
			return fail(400, { error: 'Another item in that week already uses this URL name.' });
		}
		const kind = f.get('kind') === 'assignment' ? 'assignment' : 'lesson';
		const sub = ['any', 'link', 'file', 'text'].includes(String(f.get('submission_type'))) ? String(f.get('submission_type')) : 'any';
		db.prepare(
			`UPDATE items SET title = ?, slug = ?, week_id = ?, kind = ?, minutes = ?, submission_type = ?, body_md = ?, updated_at = datetime('now') WHERE id = ?`
		).run(title, slug, weekId, kind, Math.max(1, Number(f.get('minutes')) || 20), sub, String(f.get('body_md') || ''), item.id);
		return { saved: true };
	},
	delete: async ({ params }) => {
		const item = getItem(params.id);
		const { n } = db.prepare('SELECT COUNT(*) AS n FROM submissions WHERE item_id = ?').get(item.id);
		if (n > 0) return fail(400, { error: `${n} students have submitted work for this, so it can’t be deleted.` });
		db.prepare('DELETE FROM items WHERE id = ?').run(item.id);
		throw redirect(303, `/admin/curriculum/${item.week_id}`);
	}
};
