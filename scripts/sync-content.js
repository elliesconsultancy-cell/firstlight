// Re-import the markdown in content/weeks into the database (updates by slug).
// Usage: npm run content:sync
import path from 'node:path';
import fs from 'node:fs';

process.chdir(path.resolve(path.dirname(new URL(import.meta.url).pathname), '..'));
const dataDir = path.resolve(process.env.DATA_DIR || 'data');
if (!fs.existsSync(path.join(dataDir, 'firstlight.db'))) {
	console.log('No database yet — start the app once and it will import the content automatically.');
	process.exit(0);
}
const { syncContent } = await import('../src/lib/server/db.js');
const db = (await import('../src/lib/server/db.js')).default;
const r = syncContent(db);
console.log(`Synced ${r.weeks} weeks and ${r.items} lessons/assignments.`);
