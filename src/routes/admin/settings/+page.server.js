import { getSettings, setSetting } from '$lib/server/db.js';

export async function load() {
	return { settings: await getSettings() };
}

export const actions = {
	default: async ({ request }) => {
		const f = await request.formData();
		await setSetting('course_name', String(f.get('course_name') || 'Firstlight').trim().slice(0, 60));
		await setSetting('tagline', String(f.get('tagline') || '').trim().slice(0, 200));
		await setSetting('welcome_message', String(f.get('welcome_message') || '').trim().slice(0, 1000));
		await setSetting('invite_code', String(f.get('invite_code') || '').trim().slice(0, 60));
		await setSetting('require_approval', f.get('require_approval') ? '1' : '0');
		return { saved: true };
	}
};
