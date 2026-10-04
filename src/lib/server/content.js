// Reads the markdown curriculum in /content/weeks and turns it into plain objects.
// Shared by the app (first-run seeding) and scripts/sync-content.js.
import fs from 'node:fs';
import path from 'node:path';

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

/** Load every week folder (sorted by its numeric prefix). */
export function loadCurriculum(contentDir) {
	const weeksDir = path.join(contentDir, 'weeks');
	if (!fs.existsSync(weeksDir)) return [];
	const folders = fs
		.readdirSync(weeksDir, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name)
		.sort();

	return folders.map((folder, index) => {
		const dir = path.join(weeksDir, folder);
		const slug = folder.replace(/^\d+-/, '');
		const weekFile = path.join(dir, 'week.md');
		const week = fs.existsSync(weekFile)
			? parseFrontmatter(fs.readFileSync(weekFile, 'utf8'))
			: { data: {}, body: '' };

		const items = fs
			.readdirSync(dir)
			.filter((f) => f.endsWith('.md') && f !== 'week.md')
			.sort()
			.map((file, i) => {
				const { data, body } = parseFrontmatter(fs.readFileSync(path.join(dir, file), 'utf8'));
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
