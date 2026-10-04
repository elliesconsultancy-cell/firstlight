import crypto from 'node:crypto';
import path from 'node:path';
import db from './db.js';

// Vercel rejects request bodies over 4.5 MB, so keep the total under that.
export const MAX_FILE_SIZE = 4 * 1024 * 1024;
export const MAX_TOTAL_SIZE = 4 * 1024 * 1024;
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
		if (f.size > MAX_FILE_SIZE) return `“${f.name}” is bigger than 4 MB.`;
	}
	if (files.reduce((n, f) => n + f.size, 0) > MAX_TOTAL_SIZE) return 'Your files add up to more than 4 MB. Upload fewer or smaller files.';
	return null;
}

/** Files are stored in the database so they survive on hosts with no persistent disk. */
export async function saveFiles(submissionId, files) {
	const insert = db.prepare(
		'INSERT INTO files (id, submission_id, original_name, stored_name, mime, size, data) VALUES (?, ?, ?, ?, ?, ?, ?)'
	);
	for (const f of files) {
		const id = crypto.randomBytes(16).toString('hex');
		const ext = path.extname(f.name).toLowerCase();
		const name = path.basename(f.name).slice(0, 180);
		const data = new Uint8Array(await f.arrayBuffer());
		await insert.run(id, submissionId, name, id + ext, MIME[ext] || 'application/octet-stream', f.size, data);
	}
}
