import adapterNode from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';

// Vercel sets VERCEL=1 during builds. Anywhere else (Docker, Render, local) we build a Node server.
const adapter = process.env.VERCEL ? adapterVercel() : adapterNode();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter,
		csrf: { checkOrigin: true }
	}
};

export default config;
