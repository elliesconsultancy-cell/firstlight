<script>
	import '../lib/styles.css';
	import Logo from '$lib/components/Logo.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let menuOpen = $state(false);
	let theme = $state('dark');

	onMount(() => {
		theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('fl-theme', theme);
		} catch {}
		document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0d1117' : '#ffffff');
	}

	const initials = (name) =>
		name
			.split(/\s+/)
			.map((p) => p[0])
			.slice(0, 2)
			.join('')
			.toUpperCase();

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
		{:else}
			<nav class="nav" aria-label="Main">
				<a href="/login">Log in</a>
				<a class="btn btn-sm" href="/register">Sign up</a>
			</nav>
		{/if}

		<button
			type="button"
			class="theme"
			onclick={toggleTheme}
			aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
			title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
		>
			{#if theme === 'dark'}
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
				</svg>
			{:else}
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
				</svg>
			{/if}
		</button>

		{#if data.user}
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
						<form method="POST" action="/logout">
							<button type="submit">Log out</button>
						</form>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</header>

<main id="main">
	{@render children()}
</main>

{#if !bare}
	<footer class="site-footer">
		<div class="container spread">
			<span>{data.course.name}: free, volunteer-led training.</span>
			{#if data.user?.role === 'admin'}
				<span>Some material adapted from the <a href="https://curriculum.codeyourfuture.io" target="_blank" rel="noopener">CodeYourFuture curriculum</a> (CC BY-NC-SA 4.0).</span>
			{/if}
		</div>
	</footer>
{/if}

<style>
	.skip {
		position: absolute;
		left: -999px;
		top: 8px;
		background: var(--sun);
		color: var(--on-accent);
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
		background: color-mix(in srgb, var(--paper-2) 92%, transparent);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--line);
	}
	.site-header.bare .container {
		max-width: none;
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 12px;
		height: 60px;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		color: var(--ink);
		font-weight: 700;
		font-size: 1.1rem;
		letter-spacing: -0.02em;
	}
	.nav {
		display: flex;
		gap: 2px;
		align-items: center;
		margin-left: auto;
	}
	.nav a:not(.btn) {
		color: var(--ink-2);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.92rem;
		padding: 6px 12px;
		border-radius: 8px;
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.nav a:not(.btn):hover {
		background: var(--paper);
		color: var(--ink);
	}
	.nav a[aria-current='page'] {
		color: var(--ink);
		font-weight: 600;
		background: var(--paper);
		box-shadow: inset 0 -2px 0 var(--sun);
	}
	.dot {
		background: var(--sun);
		color: var(--on-accent);
		font-size: 0.72rem;
		font-weight: 600;
		min-width: 20px;
		height: 20px;
		border-radius: 999px;
		display: inline-grid;
		place-items: center;
		padding: 0 6px;
	}
	.theme {
		display: inline-grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border-radius: 8px;
		border: 1px solid var(--line-2);
		background: transparent;
		color: var(--ink-2);
		cursor: pointer;
	}
	.theme:hover {
		color: var(--ink);
		background: var(--paper);
	}
	.account {
		position: relative;
	}
	.who {
		display: flex;
		align-items: center;
		gap: 8px;
		background: none;
		border: 1px solid var(--line-2);
		border-radius: 999px;
		padding: 2px 12px 2px 2px;
		cursor: pointer;
		color: var(--ink);
		font: inherit;
		font-weight: 600;
		font-size: 0.875rem;
	}
	.who:hover {
		background: var(--paper);
	}
	.menu {
		position: absolute;
		right: 0;
		top: calc(100% + 8px);
		background: var(--card);
		border: 1px solid var(--line-2);
		border-radius: var(--radius);
		box-shadow: 0 8px 24px rgba(1, 4, 9, 0.4);
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
		padding: 8px 12px;
		border-radius: 6px;
		color: var(--ink);
		text-decoration: none;
		background: none;
		border: 0;
		font: inherit;
		font-size: 0.92rem;
		cursor: pointer;
		width: 100%;
	}
	.menu a:hover,
	.menu button:hover {
		background: var(--sun);
		color: var(--on-accent);
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
			padding: 6px 8px;
		}
	}
</style>
