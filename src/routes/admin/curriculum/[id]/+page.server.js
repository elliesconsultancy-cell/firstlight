import { error, fail, redirect } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import { slugify } from '$lib/slug.js';

async function getWeek(id) {
	const week = await db.prepare('SELECT * FROM weeks WHERE id = ?').get(id);
	if (!week) throw error(404, 'Week not found');
	return week;
}

export async function load({ params }) {
	const week = await getWeek(params.id);
	const items = await db
		.prepare(
			`SELECT i.id, i.slug, i.kind, i.title, i.minutes, i.position,
				(SELECT COUNT(*) FROM submissions s WHERE s.item_id = i.id) AS submissions
			 FROM items i WHERE i.week_id = ? ORDER BY i.position, i.id`
		)
		.all(week.id);
	return { week, items };
}

async function renumber(weekId) {
	const rows = await db.prepare('SELECT id FROM items WHERE week_id = ? ORDER BY position, id').all(weekId);
	const upd = db.prepare('UPDATE items SET position = ? WHERE id = ?');
	await db.batch(rows.map((r, i) => upd.bind(i, r.id)));
	return rows;
}

export const actions = {
	save: async ({ params, request }) => {
		const week = await getWeek(params.id);
		const f = await request.formData();
		const title = String(f.get('title') || '').trim();
		const slug = slugify(String(f.get('slug') || title));
		if (!title) return fail(400, { error: 'Title is required.' });
		if (await db.prepare('SELECT 1 FROM weeks WHERE slug = ? AND id != ?').get(slug, week.id)) {
			return fail(400, { error: 'Another week already uses that URL name.' });
		}
		await db.prepare(
			'UPDATE weeks SET title = ?, slug = ?, summary = ?, intro_md = ?, instructor_notes = ?, published = ? WHERE id = ?'
		).run(
			title,
			slug,
			String(f.get('summary') || '').trim(),
			String(f.get('intro_md') || ''),
			String(f.get('instructor_notes') || ''),
			f.get('published') ? 1 : 0,
			week.id
		);
		return { saved: true };
	},
	addItem: async ({ params, request }) => {
		const week = await getWeek(params.id);
		const f = await request.formData();
		const title = String(f.get('title') || '').trim();
		const kind = f.get('kind') === 'assignment' ? 'assignment' : 'lesson';
		if (!title) return fail(400, { itemError: 'Give it a title.' });
		let slug = slugify(title);
		while (await db.prepare('SELECT 1 FROM items WHERE week_id = ? AND slug = ?').get(week.id, slug)) slug += '-2';
		const { p } = await db.prepare('SELECT COALESCE(MAX(position), -1) + 1 AS p FROM items WHERE week_id = ?').get(week.id);
		const body =
			kind === 'lesson'
				? '## Introduction\n\nWrite your lesson here using Markdown.\n\n```html\n<p>Code blocks get a “Try it” button.</p>\n```\n'
				: "## What you'll build\n\nDescribe the task.\n\n## Requirements\n\n- [ ] First requirement\n- [ ] Second requirement\n\n## How to submit\n\nShare a link, upload files or write your answer below.\n";
		const { lastInsertRowid } = await db
			.prepare('INSERT INTO items (week_id, slug, position, kind, title, body_md) VALUES (?, ?, ?, ?, ?, ?)')
			.run(week.id, slug, p, kind, title, body);
		throw redirect(303, `/admin/curriculum/item/${lastInsertRowid}`);
	},
	moveItem: async ({ params, request }) => {
		const week = await getWeek(params.id);
		const f = await request.formData();
		const rows = await renumber(week.id);
		const id = Number(f.get('id'));
		const i = rows.findIndex((r) => r.id === id);
		const j = i + (f.get('dir') === 'up' ? -1 : 1);
		if (i < 0 || j < 0 || j >= rows.length) return;
		const upd = db.prepare('UPDATE items SET position = ? WHERE id = ?');
		await db.batch([upd.bind(j, rows[i].id), upd.bind(i, rows[j].id)]);
	},
	deleteWeek: async ({ params }) => {
		const week = await getWeek(params.id);
		const { n } = await db
			.prepare('SELECT COUNT(*) AS n FROM submissions s JOIN items i ON i.id = s.item_id WHERE i.week_id = ?')
			.get(week.id);
		if (n > 0) return fail(400, { error: `This week has ${n} student submissions, so it can’t be deleted. Unpublish it instead.` });
		await db.prepare('DELETE FROM weeks WHERE id = ?').run(week.id);
		throw redirect(303, '/admin/curriculum');
	}
};
