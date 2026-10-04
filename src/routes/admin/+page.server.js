import db from '$lib/server/db.js';

export function load() {
	const count = (sql, ...a) => db.prepare(sql).get(...a).n;
	const latestOnly = `s.id = (SELECT MAX(id) FROM submissions WHERE user_id = s.user_id AND item_id = s.item_id)`;

	const stats = {
		students: count("SELECT COUNT(*) AS n FROM users WHERE role = 'student' AND status = 'active'"),
		pendingUsers: count("SELECT COUNT(*) AS n FROM users WHERE role = 'student' AND status = 'pending'"),
		toReview: count(`SELECT COUNT(*) AS n FROM submissions s WHERE status = 'submitted' AND ${latestOnly}`),
		approvedWeek: count(
			"SELECT COUNT(*) AS n FROM submissions WHERE status = 'approved' AND reviewed_at >= datetime('now','-7 days')"
		),
		published: count('SELECT COUNT(*) AS n FROM weeks WHERE published = 1'),
		weeks: count('SELECT COUNT(*) AS n FROM weeks')
	};

	const pendingUsers = db
		.prepare("SELECT id, name, email, created_at FROM users WHERE role = 'student' AND status = 'pending' ORDER BY created_at")
		.all();

	const queue = db
		.prepare(
			`SELECT s.id, s.version, s.created_at, u.name, i.title, w.position AS week
			 FROM submissions s JOIN users u ON u.id = s.user_id JOIN items i ON i.id = s.item_id JOIN weeks w ON w.id = i.week_id
			 WHERE s.status = 'submitted' AND ${latestOnly}
			 ORDER BY s.created_at LIMIT 6`
		)
		.all();

	// class progress: % of each published week each active student has finished
	const weeks = db.prepare('SELECT id, position, title FROM weeks WHERE published = 1 ORDER BY position').all();
	const students = db
		.prepare("SELECT id, name, last_seen_at FROM users WHERE role = 'student' AND status = 'active' ORDER BY name")
		.all();
	const totals = Object.fromEntries(
		db.prepare('SELECT week_id, COUNT(*) AS n FROM items GROUP BY week_id').all().map((r) => [r.week_id, r.n])
	);
	const doneRows = db
		.prepare(
			`SELECT x.user_id, i.week_id, COUNT(*) AS n FROM (
				SELECT user_id, item_id FROM progress
				UNION
				SELECT user_id, item_id FROM submissions s WHERE status = 'approved' AND ${latestOnly}
			 ) x JOIN items i ON i.id = x.item_id GROUP BY x.user_id, i.week_id`
		)
		.all();
	const grid = students.map((s) => ({
		...s,
		cells: weeks.map((w) => {
			const d = doneRows.find((r) => r.user_id === s.id && r.week_id === w.id)?.n ?? 0;
			return totals[w.id] ? Math.round((d / totals[w.id]) * 100) : 0;
		})
	}));

	const activity = db
		.prepare(
			`SELECT * FROM (
				SELECT p.completed_at AS at, u.name, i.title, 'read' AS what FROM progress p JOIN users u ON u.id = p.user_id JOIN items i ON i.id = p.item_id WHERE u.role = 'student'
				UNION ALL
				SELECT s.created_at AS at, u.name, i.title, 'submitted' AS what FROM submissions s JOIN users u ON u.id = s.user_id JOIN items i ON i.id = s.item_id
			 ) ORDER BY at DESC LIMIT 10`
		)
		.all();

	return { stats, pendingUsers, queue, weeks, grid, activity };
}
