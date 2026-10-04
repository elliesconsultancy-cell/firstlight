<script>
	import { page } from '$app/state';
	let { children } = $props();
	const tabs = [
		{ href: '/admin', label: 'Overview', exact: true },
		{ href: '/admin/reviews', label: 'Reviews' },
		{ href: '/admin/students', label: 'Students' },
		{ href: '/admin/curriculum', label: 'Curriculum' },
		{ href: '/admin/settings', label: 'Settings' }
	];
	const current = (t) => (t.exact ? page.url.pathname === t.href : page.url.pathname.startsWith(t.href));
</script>

<div class="admin-bar">
	<div class="container row" style="justify-content: space-between">
		<span class="eyebrow" style="margin: 0">Instructor space</span>
		<nav class="tabs" aria-label="Instructor">
			{#each tabs as t}
				<a href={t.href} aria-current={current(t) ? 'page' : undefined}>{t.label}</a>
			{/each}
		</nav>
	</div>
</div>
{@render children()}

<style>
	.admin-bar {
		background: var(--paper-2);
		border-bottom: 1px solid var(--line);
		padding: 12px 0;
	}
	.admin-bar .tabs {
		margin: 0;
	}
</style>
