import { fail, redirect } from '@sveltejs/kit';
import db, { syncContent } from '$lib/server/db.js';
import { slugify } from '$lib/slug.js';

export function load() {
	const weeks = db
		.prepare(
			`SELECT w.*, 
				(SELECT COUNT(*) FROM items i WHERE i.week_id = w.id AND i.kind = 'lesson') AS lessons,
				(SELECT COUNT(*) FROM items i WHERE i.week_id = w.id AND i.kind = 'assignment') AS assignments
			 FROM weeks w ORDER BY w.position, w.id`
		)
		.all();
	return { weeks };
}

function renumber() {
	const rows = db.prepare('SELECT id FROM weeks ORDER BY position, id').all();
	const upd = db.prepare('UPDATE weeks SET position = ? WHERE id = ?');
	db.transaction(() => rows.forEach((r, i) => upd.run(i, r.id)))();
}

export const actions = {
	publish: async ({ request }) => {
		const f = await request.formData();
		db.prepare('UPDATE weeks SET published = ? WHERE id = ?').run(f.get('published') === '1' ? 1 : 0, Number(f.get('id')));
	},
	move: async ({ request }) => {
		const f = await request.formData();
		renumber();
		const id = Number(f.get('id'));
		const dir = f.get('dir') === 'up' ? -1 : 1;
		const rows = db.prepare('SELECT id, position FROM weeks ORDER BY position').all();
		const i = rows.findIndex((r) => r.id === id);
		const j = i + dir;
		if (i < 0 || j < 0 || j >= rows.length) return;
		const upd = db.prepare('UPDATE weeks SET position = ? WHERE id = ?');
		db.transaction(() => {
			upd.run(rows[j].position, rows[i].id);
			upd.run(rows[i].position, rows[j].id);
		})();
	},
	add: async ({ request }) => {
		const f = await request.formData();
		const title = String(f.get('title') || '').trim();
		if (!title) return fail(400, { addError: 'Give the week a title.' });
		let slug = slugify(title);
		while (db.prepare('SELECT 1 FROM weeks WHERE slug = ?').get(slug)) slug += '-2';
		const { p } = db.prepare('SELECT COALESCE(MAX(position), -1) + 1 AS p FROM weeks').get();
		const { lastInsertRowid } = db
			.prepare('INSERT INTO weeks (slug, position, title) VALUES (?, ?, ?)')
			.run(slug, p, title);
		throw redirect(303, `/admin/curriculum/${lastInsertRowid}`);
	},
	sync: async () => {
		const r = syncContent(db);
		renumber();
		return { synced: r };
	}
};
