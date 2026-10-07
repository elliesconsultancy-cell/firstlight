import db from '$lib/server/db.js';
import { renderMarkdown } from '$lib/server/markdown.js';
import { splitInstructor } from '$lib/instructor.js';

export async function load({ parent, locals }) {
	const { week } = await parent();
	const row = await db.prepare('SELECT intro_md, instructor_notes FROM weeks WHERE id = ?').get(week.id);
	// Students get the intro (including the Backlog). Only instructors get the day plan and sprint review.
	const { student, instructor } = splitInstructor(row.intro_md);
	const notes = [row.instructor_notes, instructor].filter(Boolean).join('\n\n');
	return {
		introHtml: renderMarkdown(student),
		notesHtml: locals.user.role === 'admin' && notes ? renderMarkdown(notes) : ''
	};
}
