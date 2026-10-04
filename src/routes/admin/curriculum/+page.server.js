import { fail, redirect } from '@sveltejs/kit';
import db, { syncContent } from '$lib/server/db.js';
import { slugify } from '$lib/slug.js';

export async function load() {
	const weeks = await db
		.prepare(
			`SELECT w.*, 
				(SELECT COUNT(*) FROM items i WHERE i.week_id = w.id AND i.kind = 'lesson') AS lessons,
				(SELECT COUNT(*) FROM items i WHERE i.week_id = w.id AND i.kind = 'assignment') AS assignments
			 FROM weeks w ORDER BY w.position, w.id`
		)
		.all();
	return { weeks };
}

async function renumber() {
	const rows = await db.prepare('SELECT id FROM weeks ORDER BY position, id').all();
	const upd = db.prepare('UPDATE weeks SET position = ? WHERE id = ?');
	await db.batch(rows.map((r, i) => upd.bind(i, r.id)));
}

export const actions = {
	publish: async ({ request }) => {
		const f = await request.formData();
		await db.prepare('UPDATE weeks SET published = ? WHERE id = ?').run(f.get('published') === '1' ? 1 : 0, Number(f.get('id')));
	},
	move: async ({ request }) => {
		const f = await request.formData();
		await renumber();
		const id = Number(f.get('id'));
		const dir = f.get('dir') === 'up' ? -1 : 1;
		const rows = await db.prepare('SELECT id, position FROM weeks ORDER BY position').all();
		const i = rows.findIndex((r) => r.id === id);
		const j = i + dir;
		if (i < 0 || j < 0 || j >= rows.length) return;
		const upd = db.prepare('UPDATE weeks SET position = ? WHERE id = ?');
		await db.batch([upd.bind(rows[j].position, rows[i].id), upd.bind(rows[i].position, rows[j].id)]);
	},
	add: async ({ request }) => {
		const f = await request.formData();
		const title = String(f.get('title') || '').trim();
		if (!title) return fail(400, { addError: 'Give the week a title.' });
		let slug = slugify(title);
		while (await db.prepare('SELECT 1 FROM weeks WHERE slug = ?').get(slug)) slug += '-2';
		const { p } = await db.prepare('SELECT COALESCE(MAX(position), -1) + 1 AS p FROM weeks').get();
		const { lastInsertRowid } = await db
			.prepare('INSERT INTO weeks (slug, position, title) VALUES (?, ?, ?)')
			.run(slug, p, title);
		throw redirect(303, `/admin/curriculum/${lastInsertRowid}`);
	},
	sync: async () => {
		const r = await syncContent();
		await renumber();
		return { synced: r };
	}
};
