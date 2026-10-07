// Lessons and weeks can carry a part that only instructors see.
// In the Markdown it starts after a line containing exactly:  <!-- instructor -->
const MARKER = /^[ \t]*<!--\s*instructor\s*-->[ \t]*$/m;

/** Split Markdown into the part students see and the part only instructors see. */
export function splitInstructor(md = '') {
	const m = String(md).match(MARKER);
	if (!m) return { student: String(md).trim(), instructor: '' };
	return {
		student: md.slice(0, m.index).trim(),
		instructor: md.slice(m.index + m[0].length).trim()
	};
}
