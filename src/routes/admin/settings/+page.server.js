import { getSettings, setSetting } from '$lib/server/db.js';

export function load() {
	return { settings: getSettings() };
}

export const actions = {
	default: async ({ request }) => {
		const f = await request.formData();
		setSetting('course_name', String(f.get('course_name') || 'Firstlight').trim().slice(0, 60));
		setSetting('tagline', String(f.get('tagline') || '').trim().slice(0, 200));
		setSetting('welcome_message', String(f.get('welcome_message') || '').trim().slice(0, 1000));
		setSetting('invite_code', String(f.get('invite_code') || '').trim().slice(0, 60));
		setSetting('require_approval', f.get('require_approval') ? '1' : '0');
		return { saved: true };
	}
};
