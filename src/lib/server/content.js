// Turns the markdown curriculum in /content/courses into plain objects.
// The files are bundled into the server build (see db.js), so this works on
// hosts without a persistent filesystem. It receives a map of
// { 'weeks/<folder>/<file>.md': rawText }.

/** Parse a markdown file with a simple `key: value` frontmatter block. */
export function parseFrontmatter(raw) {
	const text = raw.replace(/\r\n/g, '\n');
	const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
	if (!match) return { data: {}, body: text.trim() };
	const data = {};
	for (const line of match[1].split('\n')) {
		const i = line.indexOf(':');
		if (i === -1) continue;
		const key = line.slice(0, i).trim();
		let value = line.slice(i + 1).trim();
		if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1);
		data[key] = value;
	}
	return { data, body: text.slice(match[0].length).trim() };
}

/**
 * Build every course from a map of file contents.
 * Expected paths: courses/<course>/course.md and courses/<course>/weeks/<NN-week>/<file>.md
 */
export function loadCourses(files) {
	const courses = new Map();
	const get = (slug) => {
		if (!courses.has(slug)) courses.set(slug, { slug, meta: {}, folders: new Map() });
		return courses.get(slug);
	};
	for (const [path, text] of Object.entries(files)) {
		const p = path.replace(/\\/g, '/');
		let m = p.match(/courses\/([^/]+)\/course\.md$/);
		if (m) {
			get(m[1]).meta = parseFrontmatter(text).data;
			continue;
		}
		m = p.match(/courses\/([^/]+)\/weeks\/([^/]+)\/([^/]+\.md)$/);
		if (!m) continue;
		const c = get(m[1]);
		if (!c.folders.has(m[2])) c.folders.set(m[2], {});
		c.folders.get(m[2])[m[3]] = text;
	}

	return [...courses.values()]
		.map((c) => ({
			slug: c.slug,
			title: c.meta.title || c.slug,
			summary: c.meta.summary || '',
			level: c.meta.level || '',
			order: Number(c.meta.order) || 99,
			weeks: buildWeeks(c.folders)
		}))
		.filter((c) => c.weeks.length > 0)
		.sort((a, b) => a.order - b.order);
}

function buildWeeks(folderMap) {
	return [...folderMap.keys()].sort().map((folder, index) => {
		const dirFiles = folderMap.get(folder);
		const slug = folder.replace(/^\d+-/, '');
		const week = dirFiles['week.md'] ? parseFrontmatter(dirFiles['week.md']) : { data: {}, body: '' };

		const items = Object.keys(dirFiles)
			.filter((f) => f !== 'week.md')
			.sort()
			.map((file, i) => {
				const { data, body } = parseFrontmatter(dirFiles[file]);
				const kind = data.kind === 'assignment' ? 'assignment' : 'lesson';
				const itemSlug = file
					.replace(/\.md$/, '')
					.replace(/^\d+-/, '')
					.replace(/^(lesson|assignment)-/, '');
				return {
					slug: itemSlug,
					position: i,
					kind,
					title: data.title || itemSlug,
					minutes: Number(data.minutes) || (kind === 'lesson' ? 20 : 60),
					submission_type: ['any', 'link', 'file', 'text'].includes(data.submission)
						? data.submission
						: 'any',
					body_md: body
				};
			});

		return {
			slug,
			number: Number(folder.match(/^(\d+)/)?.[1] ?? index),
			position: index,
			title: week.data.title || slug,
			summary: week.data.summary || '',
			intro_md: week.body,
			items
		};
	});
}
