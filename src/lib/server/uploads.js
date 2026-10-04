import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import db, { UPLOAD_DIR } from './db.js';

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_FILES = 5;
export const ALLOWED_EXT = [
	'.html', '.htm', '.css', '.js', '.json', '.md', '.txt',
	'.pdf', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.zip'
];

const MIME = {
	'.html': 'text/plain', // never serve learner HTML as a live page on our origin
	'.htm': 'text/plain',
	'.css': 'text/plain',
	'.js': 'text/plain',
	'.json': 'text/plain',
	'.md': 'text/plain',
	'.txt': 'text/plain',
	'.svg': 'text/plain',
	'.pdf': 'application/pdf',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.zip': 'application/zip'
};

/** Validate uploaded File objects; returns an error message or null. */
export function validateFiles(files) {
	if (files.length > MAX_FILES) return `You can upload up to ${MAX_FILES} files at once.`;
	for (const f of files) {
		const ext = path.extname(f.name).toLowerCase();
		if (!ALLOWED_EXT.includes(ext)) return `“${f.name}” isn’t a supported file type.`;
		if (f.size > MAX_FILE_SIZE) return `“${f.name}” is bigger than 10 MB.`;
	}
	return null;
}

export async function saveFiles(submissionId, files) {
	const insert = db.prepare(
		'INSERT INTO files (id, submission_id, original_name, stored_name, mime, size) VALUES (?, ?, ?, ?, ?, ?)'
	);
	for (const f of files) {
		const id = crypto.randomBytes(16).toString('hex');
		const ext = path.extname(f.name).toLowerCase();
		const stored = id + ext;
		fs.writeFileSync(path.join(UPLOAD_DIR, stored), Buffer.from(await f.arrayBuffer()));
		const name = path.basename(f.name).slice(0, 180);
		insert.run(id, submissionId, name, stored, MIME[ext] || 'application/octet-stream', f.size);
	}
}

export function readStoredFile(stored) {
	return fs.readFileSync(path.join(UPLOAD_DIR, path.basename(stored)));
}
