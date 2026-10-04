import { redirect } from '@sveltejs/kit';
export function load({ locals }) {
	if (locals.user.status === 'active' || locals.user.role === 'admin') throw redirect(303, '/learn');
	return { status: locals.user.status };
}
