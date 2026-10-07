// Checks every lesson file in content/courses for common mistakes.
// Usage: npm run content:check
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

const root = path.resolve('content/courses');
const only = process.argv.slice(2).map((a) => path.resolve(a));
const MARKERS = ['💡', '⚠️', '⚠', '🧠'];
const BANNED = /\b(simply|obviously|trivial|trivially)\b/i;
const problems = [];
const fail = (file, msg) => problems.push(`${path.relative(process.cwd(), file)}: ${msg}`);

function walk(dir) {
	return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
		const f = path.join(dir, e.name);
		return e.isDirectory() ? walk(f) : f.endsWith('.md') ? [f] : [];
	});
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fl-check-'));
let blocks = 0;

for (const file of walk(root)) {
	if (only.length && !only.some((o) => file === o || file.startsWith(o + path.sep))) continue;
	const raw = fs.readFileSync(file, 'utf8');
	const isCourse = file.endsWith('course.md');
	const m = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n/);
	if (!m) {
		fail(file, 'missing frontmatter');
		continue;
	}
	const fm = Object.fromEntries(m[1].split('\n').map((l) => [l.slice(0, l.indexOf(':')).trim(), l.slice(l.indexOf(':') + 1).trim()]));
	const body = raw.slice(m[0].length);
	const isWeek = file.endsWith('week.md');
	if (!fm.title) fail(file, 'frontmatter needs a title');
	if (!isWeek && !isCourse) {
		if (!['lesson', 'assignment'].includes(fm.kind)) fail(file, 'kind must be lesson or assignment');
		if (!/^\d+$/.test(fm.minutes ?? '') && fm.kind === 'lesson') fail(file, 'lessons need minutes');
		if (fm.kind === 'assignment' && !['any', 'link', 'file', 'text'].includes(fm.submission)) fail(file, 'assignment needs submission: any|link|file|text');
	}
	if (isCourse) continue;

	// code fences
	const lines = body.split('\n');
	let open = null;
	let skip = false;
	let buf = [];
	let prose = [];
	for (const line of lines) {
		const fence = line.match(/^\s*```(\S*)(?:\s+(\S+))?/);
		if (fence) {
			if (open === null) {
				open = fence[1];
				skip = fence[2] === 'no-check';
				buf = [];
			} else {
				const lang = open;
				open = null;
				if ((lang === 'js' || lang === 'node') && !skip) {
					blocks++;
					const f = path.join(tmp, `b${blocks}.mjs`);
					fs.writeFileSync(f, buf.join('\n'));
					const r = spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' });
					if (r.status !== 0) fail(file, `${lang} block does not parse: ${buf[0]?.slice(0, 50)} ... (${(r.stderr.split('\n').find((l) => /Error/.test(l)) || '').slice(0, 80)})`);
				}
			}
			continue;
		}
		if (open !== null) buf.push(line);
		else prose.push(line);
	}
	if (open !== null) fail(file, 'a code fence is never closed');

	const text = prose.join('\n');
	if ((text.match(/<details/g) || []).length !== (text.match(/<\/details>/g) || []).length) fail(file, '<details> not balanced');
	// emoji outside code: only the three callout markers, at the start of a quote
	for (const line of prose) {
		const ems = [...line.matchAll(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}]/gu)].map((x) => x[0]).filter((c) => !'♠♣♥♦♡♢♤♧'.includes(c));
		if (!ems.length) continue;
		const ok = /^>\s*(💡|⚠️|⚠|🧠)/.test(line) && ems.filter((e) => !MARKERS.includes(e) && e !== '️').length === 0 && ems.length <= 2;
		if (!ok) fail(file, `emoji outside a callout marker: ${line.slice(0, 60)}`);
	}
	const bad = text.match(BANNED);
	if (bad) fail(file, `banned word "${bad[0]}"`);
	if (/^#\s/m.test(text)) fail(file, 'uses a # heading; use ## instead');
	if (!isWeek && body.trim().length < 400) fail(file, 'very short');

	// instructor sections
	const markers = [...body.matchAll(/^[ \t]*<!--\s*instructor\s*-->[ \t]*$/gm)];
	if (markers.length !== 1) {
		fail(file, `needs exactly one <!-- instructor --> line (found ${markers.length})`);
	} else {
		const student = body.slice(0, markers[0].index);
		const instructor = body.slice(markers[0].index + markers[0][0].length);
		if (/\b\d+\s*(min|mins|minutes)\b|\bbreak\b|\blunch\b/i.test(instructor)) fail(file, 'instructor part mentions timings or breaks');
		const boxes = (t) => (t.match(/^\s*- \[ \]/gm) || []).length;
		if (isWeek) {
			if (!/^## Backlog\s*$/m.test(student)) fail(file, 'week needs a "## Backlog" section before the marker');
			else if (boxes(student) < 5) fail(file, 'Backlog needs at least 5 "- [ ]" items');
			for (const h of ['## Day plan', '## End of sprint review']) if (!instructor.includes(h)) fail(file, `instructor part needs "${h}"`);
			if (!/^### Agenda/m.test(instructor)) fail(file, 'Day plan needs "### Agenda"');
			if (boxes(instructor) < 4) fail(file, 'End of sprint review needs at least 4 "- [ ]" items');
		} else {
			if (!/^## Instructor agenda\s*$/m.test(instructor)) fail(file, 'needs "## Instructor agenda" after the marker');
			for (const h of ['### Learning objectives', '### Purpose']) if (!instructor.includes(h)) fail(file, `agenda needs "${h}"`);
			if (fm.kind === 'assignment' ? !instructor.includes('### Things to do') || !instructor.includes('### What good work looks like') : !instructor.includes('### Things to teach')) {
				fail(file, fm.kind === 'assignment' ? 'assignment agenda needs "Things to do" and "What good work looks like"' : 'lesson agenda needs "### Things to teach"');
			}
		}
	}
}

fs.rmSync(tmp, { recursive: true, force: true });
if (problems.length) {
	console.log(problems.join('\n'));
	console.log(`\n${problems.length} problem(s) found.`);
	process.exit(1);
}
console.log(`Content looks good (${blocks} code blocks parsed).`);
