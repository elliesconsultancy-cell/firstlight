<script>
	let { data } = $props();
	const phases = [
		{ range: [0, 2], color: 'var(--sky)' },
		{ range: [3, 5], color: 'var(--violet)' },
		{ range: [6, 9], color: 'var(--gold)' },
		{ range: [10, 99], color: 'var(--sage)' }
	];
	const phaseFor = (i) => phases.find((p) => i >= p.range[0] && i <= p.range[1]) ?? phases[3];
</script>

<svelte:head>
	<title>{data.course.name}: learn to code, free</title>
</svelte:head>

<section class="hero">
	<div class="container hero-grid">
		<div>
			<h1>Learn to build websites. Free.</h1>
			<p class="lead">{data.course.tagline}</p>
			<p class="muted copy">
				A {data.weeks.length}-week guided course for complete beginners. Read short lessons, try the code
				in your browser, and hand in a small project each week. Your instructor reviews your work and
				gives you feedback.
			</p>
			<div class="row cta">
				<a class="btn big" href="/register">Sign up for free</a>
				<a class="btn btn-ghost big" href="/login">Log in</a>
			</div>
			{#if !data.hasAdmin}
				<p class="alert alert-info small" style="margin-top: 20px">
					<strong>Setting up?</strong> The first account you create becomes the instructor account.
				</p>
			{/if}
		</div>

		<div class="window" aria-hidden="true">
			<div class="chrome">
				<span></span><span></span><span></span>
				<em>my-first-page.html</em>
			</div>
			<pre class="code"><span class="tg">&lt;h1&gt;</span>Hello, world!<span class="tg">&lt;/h1&gt;</span>
<span class="tg">&lt;button&gt;</span>Say hi<span class="tg">&lt;/button&gt;</span></pre>
			<div class="result">
				<small>Preview</small>
				<strong>Hello, world!</strong>
				<span class="fake-btn">Say hi</span>
			</div>
		</div>
	</div>
</section>

<section class="container how">
	<div class="grid grid-3">
		<div>
			<span class="num">1</span>
			<h3>Read and try</h3>
			<p>Short, friendly lessons with code you can run in one click.</p>
		</div>
		<div>
			<span class="num">2</span>
			<h3>Build and submit</h3>
			<p>Every week ends with a small project. Upload files or share a link.</p>
		</div>
		<div>
			<span class="num">3</span>
			<h3>Get feedback</h3>
			<p>Your instructor reviews your work and approves it or suggests changes.</p>
		</div>
	</div>
</section>

<section class="container map">
	<h2>The course, week by week</h2>
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
		padding: 64px 0 56px;
		border-bottom: 1px solid var(--line);
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 48px;
		align-items: center;
	}
	h1 {
		font-size: clamp(2.2rem, 5vw, 3.4rem);
		line-height: 1.1;
		letter-spacing: -0.03em;
		max-width: 14ch;
	}
	.lead {
		font-size: 1.2rem;
		color: var(--ink-2);
		max-width: 38ch;
	}
	.copy {
		max-width: 54ch;
	}
	.cta {
		margin-top: 24px;
	}
	.big {
		padding: 11px 22px;
		font-size: 1rem;
	}

	.window {
		background: var(--card);
		border: 1px solid var(--line-2);
		border-radius: var(--radius);
		box-shadow: 0 16px 40px -20px rgba(1, 4, 9, 0.6);
		overflow: hidden;
	}
	.chrome {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 11px 16px;
		background: var(--paper-2);
		border-bottom: 1px solid var(--line);
	}
	.chrome span {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--line-2);
	}
	.chrome em {
		margin-left: 10px;
		font-style: normal;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--ink-3);
	}
	.code {
		margin: 0;
		padding: 18px 20px;
		font-family: var(--font-mono);
		font-size: clamp(0.8rem, 1.5vw, 0.92rem);
		line-height: 1.7;
		color: var(--code-ink);
		background: var(--code-bg);
		white-space: pre-wrap;
	}
	.tg { color: var(--tok-tag); }
	.result {
		padding: 18px 20px 24px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
		border-top: 1px solid var(--line);
	}
	.result small {
		color: var(--ink-3);
		font-weight: 600;
	}
	.result strong {
		font-size: 1.8rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}
	.fake-btn {
		background: var(--sun);
		color: var(--on-accent);
		font-weight: 600;
		font-size: 0.9rem;
		padding: 6px 16px;
		border-radius: 8px;
	}

	.how {
		padding: 56px 20px 16px;
	}
	.num {
		display: inline-grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--sun-soft);
		color: var(--sun-ink);
		font-weight: 700;
		margin-bottom: 12px;
	}
	.how p { color: var(--ink-2); margin: 0; max-width: 32ch; }
	.map {
		padding: 40px 20px 80px;
	}
	.path {
		list-style: none;
		padding: 0;
		margin: 20px 0 0;
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
		border-left: 4px solid var(--c);
		border-radius: var(--radius-sm);
		padding: 14px 16px;
	}
	.path li div { display: flex; flex-direction: column; }
	.wk {
		font-weight: 600;
		font-size: 0.85rem;
		color: var(--ink-3);
		white-space: nowrap;
		padding-top: 2px;
		min-width: 56px;
	}
	@media (max-width: 820px) {
		.hero-grid { grid-template-columns: 1fr; }
		.window { max-width: 460px; }
	}
</style>
