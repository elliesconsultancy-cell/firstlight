import { error, fail, redirect } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import { renderMarkdown, renderPlain } from '$lib/server/markdown.js';
import { filesFor } from '$lib/server/queries.js';
import { splitInstructor } from '$lib/instructor.js';

export async function load({ params }) {
	const sub = await db
		.prepare(
			`SELECT s.*, u.name, u.email, i.title, i.body_md, i.slug AS item_slug, w.slug AS week_slug, w.position AS week, w.title AS week_title
			 FROM submissions s JOIN users u ON u.id = s.user_id JOIN items i ON i.id = s.item_id JOIN weeks w ON w.id = i.week_id
			 WHERE s.id = ?`
		)
		.get(params.id);
	if (!sub) throw error(404, 'Submission not found');

	const versions = await db
		.prepare(
			`SELECT s.*, r.name AS reviewer_name FROM submissions s LEFT JOIN users r ON r.id = s.reviewer_id
			 WHERE s.user_id = ? AND s.item_id = ? ORDER BY s.id DESC`
		)
		.all(sub.user_id, sub.item_id);
	const files = await filesFor(versions.map((v) => v.id));

	return {
		sub: { ...sub, body_md: undefined, instructionsHtml: renderMarkdown(splitInstructor(sub.body_md).student) },
		versions: versions.map((v) => ({
			...v,
			answerHtml: renderPlain(v.answer),
			files: files.filter((f) => f.submission_id === v.id)
		})),
		isLatest: versions[0]?.id === sub.id
	};
}

export const actions = {
	review: async ({ params, request, locals }) => {
		const form = await request.formData();
		const decision = String(form.get('decision'));
		const feedback = String(form.get('feedback') || '').trim().slice(0, 10000);
		if (!['approved', 'changes_requested'].includes(decision)) return fail(400, { error: 'Pick a decision.' });
		if (decision === 'changes_requested' && !feedback) {
			return fail(400, { error: 'Please explain what needs changing so the student knows what to do.', feedback });
		}
		await db.prepare(
			`UPDATE submissions SET status = ?, feedback = ?, reviewer_id = ?, reviewed_at = datetime('now') WHERE id = ?`
		).run(decision, feedback, locals.user.id, params.id);

		if (form.get('next')) {
			const next = await db
				.prepare(
					`SELECT s.id FROM submissions s WHERE s.status = 'submitted'
					 AND s.id = (SELECT MAX(id) FROM submissions WHERE user_id = s.user_id AND item_id = s.item_id)
					 ORDER BY s.created_at LIMIT 1`
				)
				.get();
			throw redirect(303, next ? `/admin/reviews/${next.id}` : '/admin/reviews?done=1');
		}
		return { saved: decision };
	}
};
