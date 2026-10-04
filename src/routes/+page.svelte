<script>
	let { data } = $props();
	const phases = [
		{ name: 'Foundations', range: [0, 2], color: 'var(--gold)' },
		{ name: 'Styling & layout', range: [3, 5], color: 'var(--sun)' },
		{ name: 'JavaScript', range: [6, 9], color: 'var(--plum)' },
		{ name: 'Building real things', range: [10, 99], color: 'var(--sage)' }
	];
	const phaseFor = (i) => phases.find((p) => i >= p.range[0] && i <= p.range[1]) ?? phases[3];
</script>

<svelte:head>
	<title>{data.course.name} — learn to code, free</title>
</svelte:head>

<section class="hero">
	<div class="container hero-grid">
		<div>
			<span class="eyebrow">Free · Volunteer-led · Beginner friendly</span>
			<h1>Your first light<br />into <em>code</em>.</h1>
			<p class="lead">{data.course.tagline}</p>
			<p class="muted">
				A {data.weeks.length}-week guided course. Each week you read short lessons, try things in the
				built-in playground, and hand in a small project. Your instructor reviews your work and helps you grow.
			</p>
			<div class="row" style="margin-top: 24px">
				<a class="btn btn-sun" href="/register">Join the course</a>
				<a class="btn btn-ghost" href="/login">I already have an account</a>
			</div>
			{#if !data.hasAdmin}
				<p class="alert alert-info small" style="margin-top: 20px">
					<strong>Setting up?</strong> The first account you create becomes the instructor account.
				</p>
			{/if}
		</div>
		<div class="sunrise" aria-hidden="true">
			<div class="sun"></div>
			<div class="horizon"></div>
			<div class="ray r1"></div>
			<div class="ray r2"></div>
			<div class="ray r3"></div>
			<pre class="snippet"><span class="t">&lt;h1&gt;</span>Hello, world<span class="t">&lt;/h1&gt;</span>
<span class="k">const</span> me = <span class="s">"a developer"</span>;</pre>
		</div>
	</div>
</section>

<section class="container how">
	<div class="grid grid-3">
		<div class="step">
			<span class="num">1</span>
			<h3>Read & try</h3>
			<p>Short, friendly lessons with code you can run in one click.</p>
		</div>
		<div class="step">
			<span class="num">2</span>
			<h3>Build & submit</h3>
			<p>Every week ends with a small project. Upload files or share a link.</p>
		</div>
		<div class="step">
			<span class="num">3</span>
			<h3>Get feedback</h3>
			<p>Your instructor reviews each piece of work, approves it or suggests changes.</p>
		</div>
	</div>
</section>

<section class="container map">
	<span class="eyebrow">The journey</span>
	<h2>From blank page to working app</h2>
	<ol class="path">
		{#each data.weeks as week, i}
			<li style="--c: {phaseFor(i).color}">
				<span class="wk">Week {i}</span>
				<div>
					<strong>{week.title}</strong>
					<span class="muted small">{week.summary}</span>
				</div>
			</li>
		{/each}
	</ol>
</section>

<style>
	.hero {
		padding: 56px 0 40px;
		overflow: hidden;
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1.15fr 1fr;
		gap: 48px;
		align-items: center;
	}
	h1 {
		font-size: clamp(2.6rem, 6vw, 4.4rem);
		line-height: 1.02;
		letter-spacing: -0.03em;
	}
	h1 em {
		font-style: italic;
		color: var(--sun);
	}
	.lead {
		font-size: 1.25rem;
		color: var(--ink-2);
	}
	.sunrise {
		position: relative;
		aspect-ratio: 1 / 0.9;
		border-radius: 28px;
		background: linear-gradient(180deg, #2a2445 0%, #5b3a5e 45%, #e8582a 85%, #f5b841 100%);
		overflow: hidden;
		box-shadow: var(--shadow);
	}
	.sun {
		position: absolute;
		left: 50%;
		bottom: 18%;
		width: 46%;
		aspect-ratio: 1;
		transform: translate(-50%, 50%);
		border-radius: 50%;
		background: radial-gradient(circle at 50% 40%, #ffe3a1, #f5b841 55%, #e8582a);
		box-shadow: 0 0 80px 20px rgba(245, 184, 65, 0.5);
		z-index: 1;
		animation: rise 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) both;
	}
	.horizon {
		position: absolute;
		z-index: 2;
		inset: auto 0 0 0;
		height: 18%;
		background: #1c1a2e;
	}
	.ray {
		position: absolute;
		left: 50%;
		bottom: 18%;
		width: 3px;
		height: 60%;
		background: linear-gradient(to top, rgba(255, 227, 161, 0.7), transparent);
		transform-origin: bottom center;
		opacity: 0.6;
	}
	.r1 { transform: rotate(-35deg); }
	.r2 { transform: rotate(0deg); }
	.r3 { transform: rotate(35deg); }
	.snippet {
		position: absolute;
		z-index: 3;
		left: 6%;
		right: 6%;
		bottom: 4%;
		margin: 0;
		font-family: var(--font-mono);
		font-size: clamp(0.7rem, 1.4vw, 0.9rem);
		color: #ece7f5;
		white-space: pre-wrap;
	}
	.t { color: #ff9d74; }
	.k { color: #9cc4ff; }
	.s { color: #a8e6c4; }
	@keyframes rise {
		from { transform: translate(-50%, 110%); }
		to { transform: translate(-50%, 50%); }
	}
	@media (prefers-reduced-motion: reduce) {
		.sun { animation: none; }
	}
	.how {
		padding: 24px 20px 40px;
	}
	.step {
		padding: 22px;
		border-top: 3px solid var(--ink);
	}
	.num {
		font-family: var(--font-display);
		font-size: 2.4rem;
		color: var(--sun);
		line-height: 1;
	}
	.step h3 { margin-top: 10px; }
	.step p { color: var(--ink-2); margin: 0; }
	.map {
		padding: 40px 20px 80px;
	}
	.path {
		list-style: none;
		padding: 0;
		margin: 24px 0 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 12px;
	}
	.path li {
		display: flex;
		gap: 14px;
		align-items: flex-start;
		background: var(--card);
		border: 1px solid var(--line);
		border-left: 5px solid var(--c);
		border-radius: var(--radius-sm);
		padding: 14px 16px;
	}
	.path li div { display: flex; flex-direction: column; }
	.wk {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--ink-3);
		white-space: nowrap;
		padding-top: 3px;
		min-width: 58px;
	}
	@media (max-width: 820px) {
		.hero-grid { grid-template-columns: 1fr; }
		.sunrise { max-width: 420px; }
	}
</style>
