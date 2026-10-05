import { error, fail } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import { renderMarkdown, renderPlain } from '$lib/server/markdown.js';
import { filesFor } from '$lib/server/queries.js';
import { saveFiles, validateFiles } from '$lib/server/uploads.js';

// The source credit at the bottom of adapted lessons (and links to that source) is shown to instructors only.
function forViewer(markdown, user) {
	if (user?.role === 'admin') return markdown;
	return markdown
		.split('\n')
		.filter((line) => !/code ?your ?future/i.test(line))
		.join('\n')
		.replace(/\n{3,}/g, '\n\n')
		.replace(/\n+---\s*$/, '\n');
}

async function getItem(weekId, slug) {
	const item = await db.prepare('SELECT * FROM items WHERE week_id = ? AND slug = ?').get(weekId, slug);
	if (!item) throw error(404, 'We couldn’t find that page.');
	return item;
}

export async function load({ params, parent, locals }) {
	const { week, items } = await parent();
	const item = await getItem(week.id, params.item);
	const idx = items.findIndex((i) => i.id === item.id);

	let submissions = [];
	if (item.kind === 'assignment') {
		submissions = await db
			.prepare(
				`SELECT s.*, r.name AS reviewer_name FROM submissions s
				 LEFT JOIN users r ON r.id = s.reviewer_id
				 WHERE s.user_id = ? AND s.item_id = ? ORDER BY s.id DESC`
			)
			.all(locals.user.id, item.id);
		const files = await filesFor(submissions.map((s) => s.id));
		submissions = submissions.map((s) => ({
			...s,
			answerHtml: renderPlain(s.answer),
			files: files.filter((f) => f.submission_id === s.id)
		}));
	}

	const progress = await db
		.prepare('SELECT completed_at FROM progress WHERE user_id = ? AND item_id = ?')
		.get(locals.user.id, item.id);

	return {
		item: {
			id: item.id,
			slug: item.slug,
			kind: item.kind,
			title: item.title,
			minutes: item.minutes,
			submission_type: item.submission_type,
			html: renderMarkdown(forViewer(item.body_md, locals.user))
		},
		completed: !!progress,
		submissions,
		prev: items[idx - 1] ?? null,
		next: items[idx + 1] ?? null,
		position: idx + 1
	};
}

export const actions = {
	complete: async ({ params, locals, request }) => {
		const week = await db.prepare('SELECT id FROM weeks WHERE slug = ?').get(params.week);
		if (!week) throw error(404);
		const item = await getItem(week.id, params.item);
		if (item.kind !== 'lesson') throw error(400, 'Only lessons can be marked as read');
		const form = await request.formData();
		if (form.get('undo')) {
			await db.prepare('DELETE FROM progress WHERE user_id = ? AND item_id = ?').run(locals.user.id, item.id);
		} else {
			await db.prepare('INSERT OR IGNORE INTO progress (user_id, item_id) VALUES (?, ?)').run(locals.user.id, item.id);
		}
		return { completed: !form.get('undo') };
	},

	submit: async ({ params, locals, request }) => {
		const week = await db.prepare('SELECT id, published FROM weeks WHERE slug = ?').get(params.week);
		if (!week) throw error(404);
		const item = await getItem(week.id, params.item);
		if (item.kind !== 'assignment') throw error(400, 'Not an assignment');

		const form = await request.formData();
		const answer = String(form.get('answer') || '').trim().slice(0, 20000);
		let link = String(form.get('link') || '').trim().slice(0, 500);
		const files = form.getAll('files').filter((f) => typeof f === 'object' && f.size > 0);
		const values = { answer, link };

		if (link && !/^https?:\/\//i.test(link)) link = 'https://' + link;
		if (link) {
			try {
				new URL(link);
			} catch {
				return fail(400, { ...values, error: 'That link doesn’t look right. Copy it from your browser’s address bar.' });
			}
		}

		const type = item.submission_type;
		if (type === 'link' && !link) return fail(400, { ...values, error: 'Please add a link to your work.' });
		if (type === 'file' && !files.length) return fail(400, { ...values, error: 'Please upload at least one file.' });
		if (type === 'text' && !answer) return fail(400, { ...values, error: 'Please write your answer.' });
		if (!answer && !link && !files.length) {
			return fail(400, { ...values, error: 'Add a written answer, a link or a file before submitting.' });
		}
		const fileError = validateFiles(files);
		if (fileError) return fail(400, { ...values, error: fileError });

		const { v } = await db
			.prepare('SELECT COALESCE(MAX(version), 0) AS v FROM submissions WHERE user_id = ? AND item_id = ?')
			.get(locals.user.id, item.id);
		const { lastInsertRowid } = await db
			.prepare('INSERT INTO submissions (user_id, item_id, version, answer, link) VALUES (?, ?, ?, ?, ?)')
			.run(locals.user.id, item.id, v + 1, answer, link);
		await saveFiles(Number(lastInsertRowid), files);
		return { submitted: true };
	}
};
