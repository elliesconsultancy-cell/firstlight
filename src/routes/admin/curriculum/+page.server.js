import { fail, redirect } from '@sveltejs/kit';
import db, { syncContent } from '$lib/server/db.js';
import { slugify } from '$lib/slug.js';

export async function load() {
	const weeks = await db
		.prepare(
			`SELECT w.*,
				(SELECT COUNT(*) FROM items i WHERE i.week_id = w.id AND i.kind = 'lesson') AS lessons,
				(SELECT COUNT(*) FROM items i WHERE i.week_id = w.id AND i.kind = 'assignment') AS assignments
			 FROM weeks w JOIN courses c ON c.id = w.course_id ORDER BY c.position, c.id, w.position, w.id`
		)
		.all();
	const courses = await db.prepare('SELECT id, title FROM courses ORDER BY position, id').all();
	return { courses: courses.map((c) => ({ ...c, weeks: weeks.filter((w) => w.course_id === c.id) })) };
}

async function renumber(courseId) {
	const rows = await db.prepare('SELECT id FROM weeks WHERE course_id = ? ORDER BY position, id').all(courseId);
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
		const id = Number(f.get('id'));
		const own = await db.prepare('SELECT course_id FROM weeks WHERE id = ?').get(id);
		if (!own) return;
		await renumber(own.course_id);
		const dir = f.get('dir') === 'up' ? -1 : 1;
		const rows = await db.prepare('SELECT id, position FROM weeks WHERE course_id = ? ORDER BY position').all(own.course_id);
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
		const courseId = Number(f.get('course_id'));
		const course = await db.prepare('SELECT id FROM courses WHERE id = ?').get(courseId);
		if (!course) return fail(400, { addError: 'Pick a course for the new week.' });
		const { p } = await db
			.prepare('SELECT COALESCE(MAX(position), -1) + 1 AS p FROM weeks WHERE course_id = ?')
			.get(course.id);
		const { lastInsertRowid } = await db
			.prepare('INSERT INTO weeks (course_id, slug, position, title) VALUES (?, ?, ?, ?)')
			.run(course.id, slug, p, title);
		throw redirect(303, `/admin/curriculum/${lastInsertRowid}`);
	},
	sync: async () => {
		const r = await syncContent();
		for (const c of await db.prepare('SELECT id FROM courses').all()) await renumber(c.id);
		return { synced: r };
	}
};
