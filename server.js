// Production entry point: `npm run build` then `npm start`.
// Allows file uploads up to ~25 MB per request (SvelteKit's default is 512 KB).
process.env.BODY_SIZE_LIMIT ??= String(25 * 1024 * 1024);
await import('./build/index.js');
