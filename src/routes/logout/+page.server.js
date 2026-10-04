import { redirect } from '@sveltejs/kit';
import { destroySession } from '$lib/server/auth.js';

export function load() {
	throw redirect(303, '/');
}

export const actions = {
	async default({ cookies }) {
		await destroySession(cookies);
		throw redirect(303, '/login');
	}
};
