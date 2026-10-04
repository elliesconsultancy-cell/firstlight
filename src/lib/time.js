/** SQLite stores UTC "YYYY-MM-DD HH:MM:SS"; turn it into a friendly relative time. */
export function ago(sqlDate) {
	if (!sqlDate) return 'never';
	const d = new Date(sqlDate.replace(' ', 'T') + 'Z');
	const s = Math.round((Date.now() - d.getTime()) / 1000);
	if (s < 60) return 'just now';
	const m = Math.round(s / 60);
	if (m < 60) return `${m} min ago`;
	const h = Math.round(m / 60);
	if (h < 24) return `${h}h ago`;
	const days = Math.round(h / 24);
	if (days < 30) return `${days}d ago`;
	return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

export function fmtDate(sqlDate) {
	if (!sqlDate) return '';
	return new Date(sqlDate.replace(' ', 'T') + 'Z').toLocaleString(undefined, {
		day: 'numeric',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit'
	});
}
