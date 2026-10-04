import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE, getSessionUser } from '$lib/server/auth.js';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	event.locals.user = await getSessionUser(event.cookies.get(SESSION_COOKIE));
	const { pathname } = event.url;
	const user = event.locals.user;

	const needsLogin = ['/learn', '/admin', '/account', '/files', '/pending', '/playground'].some(
		(p) => pathname === p || pathname.startsWith(p + '/')
	);

	if (needsLogin && !user) {
		throw redirect(303, `/login?next=${encodeURIComponent(pathname + event.url.search)}`);
	}
	if (user && user.role !== 'admin' && user.status !== 'active') {
		const allowed = ['/pending', '/logout', '/account'];
		if (needsLogin && !allowed.some((p) => pathname.startsWith(p))) throw redirect(303, '/pending');
	}
	if (pathname.startsWith('/admin') && user?.role !== 'admin') {
		throw redirect(303, '/learn');
	}

	return resolve(event);
}
