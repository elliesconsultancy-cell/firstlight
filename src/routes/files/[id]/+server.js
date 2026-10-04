import { error } from '@sveltejs/kit';
import db from '$lib/server/db.js';

export async function GET({ params, locals }) {
	const file = await db
		.prepare('SELECT f.*, s.user_id FROM files f JOIN submissions s ON s.id = f.submission_id WHERE f.id = ?')
		.get(params.id);
	if (!file) throw error(404, 'File not found');
	if (locals.user.role !== 'admin' && file.user_id !== locals.user.id) throw error(403, 'Not allowed');

	if (!file.data) throw error(404, 'File is missing from storage');
	const body = file.data;
	const inline = file.mime.startsWith('image/') || file.mime === 'application/pdf' || file.mime === 'text/plain';
	return new Response(body, {
		headers: {
			'Content-Type': file.mime === 'text/plain' ? 'text/plain; charset=utf-8' : file.mime,
			'Content-Disposition': `${inline ? 'inline' : 'attachment'}; filename*=UTF-8''${encodeURIComponent(file.original_name)}`,
			'X-Content-Type-Options': 'nosniff',
			'Content-Security-Policy': "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; sandbox",
			'Cache-Control': 'private, max-age=3600'
		}
	});
}
