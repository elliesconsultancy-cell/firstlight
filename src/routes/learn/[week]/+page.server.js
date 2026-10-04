import db from '$lib/server/db.js';
import { renderMarkdown } from '$lib/server/markdown.js';

export async function load({ parent, locals }) {
	const { week } = await parent();
	const row = await db.prepare('SELECT intro_md, instructor_notes FROM weeks WHERE id = ?').get(week.id);
	return {
		introHtml: renderMarkdown(row.intro_md),
		notesHtml: locals.user.role === 'admin' && row.instructor_notes ? renderMarkdown(row.instructor_notes) : ''
	};
}
