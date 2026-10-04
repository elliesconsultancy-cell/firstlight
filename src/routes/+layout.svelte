<script>
	import '../lib/styles.css';
	import Logo from '$lib/components/Logo.svelte';
	import { page } from '$app/state';

	let { data, children } = $props();
	let menuOpen = $state(false);

	const initials = (name) =>
		name
			.split(/\s+/)
			.map((p) => p[0])
			.slice(0, 2)
			.join('')
			.toUpperCase();

	function toggleTheme() {
		const root = document.documentElement;
		const current =
			root.dataset.theme ||
			(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		const next = current === 'dark' ? 'light' : 'dark';
		root.dataset.theme = next;
		try {
			localStorage.setItem('fl-theme', next);
		} catch {}
	}

	const isActive = (href) => page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	const bare = $derived(page.url.pathname.startsWith('/playground'));
</script>

<svelte:head>
	<title>{data.course.name}</title>
</svelte:head>

<a class="skip" href="#main">Skip to content</a>

<header class="site-header" class:bare>
	<div class="container bar">
		<a class="brand" href={data.user ? (data.user.role === 'admin' ? '/admin' : '/learn') : '/'}>
			<Logo />
			<span>{data.course.name}</span>
		</a>

		{#if data.user}
			<nav class="nav" aria-label="Main">
				{#if data.user.role === 'admin'}
					<a href="/admin" aria-current={isActive('/admin') ? 'page' : undefined}>
						Instructor
						{#if data.pendingReviews > 0}<span class="dot">{data.pendingReviews}</span>{/if}
					</a>
				{/if}
				{#if data.user.status === 'active' || data.user.role === 'admin'}
					<a href="/learn" aria-current={isActive('/learn') ? 'page' : undefined}>Learn</a>
					<a href="/playground" aria-current={isActive('/playground') ? 'page' : undefined}>Playground</a>
				{/if}
			</nav>
			<div class="account">
				<button class="who" onclick={() => (menuOpen = !menuOpen)} aria-expanded={menuOpen}>
					<span class="avatar">{initials(data.user.name)}</span>
					<span class="who-name">{data.user.name.split(' ')[0]}</span>
				</button>
				{#if menuOpen}
					<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
					<div class="menu" onclick={() => (menuOpen = false)}>
						<div class="menu-head">
							<strong>{data.user.name}</strong>
							<span class="muted small">{data.user.email}</span>
						</div>
						<a href="/account">Account settings</a>
						<button type="button" onclick={toggleTheme}>Toggle dark mode</button>
						<form method="POST" action="/logout">
							<button type="submit">Log out</button>
						</form>
					</div>
				{/if}
			</div>
		{:else}
			<nav class="nav" aria-label="Main">
				<a href="/login">Log in</a>
				<a class="btn btn-sm" href="/register">Join the course</a>
			</nav>
		{/if}
	</div>
</header>

<main id="main">
	{@render children()}
</main>

{#if !bare}
	<footer class="site-footer">
		<div class="container spread">
			<span>{data.course.name} — free, volunteer-led training.</span>
			<span>Some material adapted from the <a href="https://curriculum.codeyourfuture.io" target="_blank" rel="noopener">CodeYourFuture curriculum</a> (CC BY-NC-SA 4.0).</span>
		</div>
	</footer>
{/if}

<style>
	.skip {
		position: absolute;
		left: -999px;
		top: 8px;
		background: var(--ink);
		color: var(--paper);
		padding: 8px 14px;
		border-radius: 8px;
		z-index: 100;
	}
	.skip:focus {
		left: 8px;
	}
	.site-header {
		position: sticky;
		top: 0;
		z-index: 20;
		background: color-mix(in srgb, var(--paper) 88%, transparent);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--line);
	}
	.site-header.bare .container {
		max-width: none;
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 20px;
		height: 64px;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		color: var(--ink);
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.25rem;
		letter-spacing: -0.02em;
	}
	.nav {
		display: flex;
		gap: 4px;
		align-items: center;
		margin-left: auto;
	}
	.nav a:not(.btn) {
		color: var(--ink-2);
		text-decoration: none;
		font-weight: 700;
		font-size: 0.95rem;
		padding: 8px 12px;
		border-radius: 999px;
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.nav a:not(.btn):hover {
		background: var(--paper-2);
		color: var(--ink);
	}
	.nav a[aria-current='page'] {
		color: var(--ink);
		background: var(--paper-2);
		box-shadow: inset 0 -2px 0 var(--sun);
	}
	.dot {
		background: var(--sun);
		color: #1c1a2e;
		font-size: 0.72rem;
		min-width: 20px;
		height: 20px;
		border-radius: 999px;
		display: inline-grid;
		place-items: center;
		padding: 0 6px;
	}
	.account {
		position: relative;
	}
	.who {
		display: flex;
		align-items: center;
		gap: 8px;
		background: none;
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 3px 12px 3px 3px;
		cursor: pointer;
		color: var(--ink);
		font: inherit;
		font-weight: 700;
		font-size: 0.9rem;
	}
	.menu {
		position: absolute;
		right: 0;
		top: calc(100% + 8px);
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		min-width: 230px;
		padding: 6px;
		display: flex;
		flex-direction: column;
	}
	.menu-head {
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid var(--line);
		margin-bottom: 4px;
	}
	.menu a,
	.menu button {
		text-align: left;
		padding: 9px 12px;
		border-radius: 8px;
		color: var(--ink);
		text-decoration: none;
		background: none;
		border: 0;
		font: inherit;
		font-size: 0.95rem;
		cursor: pointer;
		width: 100%;
	}
	.menu a:hover,
	.menu button:hover {
		background: var(--paper-2);
	}
	.site-footer {
		border-top: 1px solid var(--line);
		padding: 22px 0;
		font-size: 0.85rem;
		color: var(--ink-3);
	}
	@media (max-width: 640px) {
		.who-name {
			display: none;
		}
		.bar {
			gap: 8px;
		}
		.brand span {
			display: none;
		}
		.nav a:not(.btn) {
			padding: 8px 9px;
		}
	}
</style>
