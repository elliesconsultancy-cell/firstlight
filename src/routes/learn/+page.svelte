<script>
	import Icon from '$lib/components/Icon.svelte';
	import Ring from '$lib/components/Ring.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	let { data } = $props();
	const hour = new Date().getHours();
	const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
</script>

<svelte:head><title>My learning · {data.course.name}</title></svelte:head>

<div class="container page">
	<section class="welcome">
		<div>
			<span class="eyebrow">{greeting}</span>
			<h1>Hi {data.user.name.split(' ')[0]}</h1>
			<p class="muted" style="max-width: 60ch">{data.welcome}</p>
		</div>
		<div class="card overall">
			<Ring percent={data.percent} label="complete" />
			<div class="stack">
				<div><b>{data.done}</b> of {data.total} steps done</div>
				{#if data.awaiting}
					<div class="small"><StatusBadge status="submitted" /> {data.awaiting} with your instructor</div>
				{/if}
			</div>
		</div>
	</section>

	{#if data.next}
		<a class="continue" href="/learn/{data.next.weekSlug}/{data.next.item.slug}">
			<div>
				<span class="eyebrow" style="color: inherit; opacity: 0.85">Up next{data.courses.length > 1 ? ` in ${data.next.courseTitle}` : ''}: week {data.next.weekNumber}</span>
				<strong>{data.next.item.title}</strong>
				<span class="small">
					{#if data.next.item.kind === 'lesson'}<Icon name="book-open" size={14} /> Lesson · about {data.next.item.minutes} min{:else}<Icon name="hammer" size={14} /> Assignment{/if}
					{#if data.next.item.status === 'changes_requested'} · changes requested{/if}
				</span>
			</div>
			<span class="go">Continue <Icon name="arrow-right" size={16} /></span>
		</a>
	{:else if data.total > 0}
		<div class="alert alert-ok"><Icon name="party-popper" size={16} /> You’re all caught up! New weeks will appear here when your instructor releases them.</div>
	{/if}

	<div class="layout">
		<section>
			{#each data.courses as course}
				<div class="course">
					{#if data.courses.length > 1}
						<div class="course-head">
							<div>
								<h2>{course.title}</h2>
								{#if course.summary}<p class="muted small">{course.summary}</p>{/if}
							</div>
							<span class="small muted" style="white-space: nowrap">{course.done}/{course.total} steps</span>
						</div>
					{:else}
						<h2>Your weeks</h2>
					{/if}
					{#if course.weeks.length === 0}
						<p class="empty">No weeks have been released yet. Check back soon!</p>
					{/if}
					<ol class="weeks list-plain">
						{#each course.weeks as week}
							<li>
								<a class="week" href="/learn/{week.slug}" class:complete={week.percent === 100}>
									<span class="wnum">{String(week.number).padStart(2, '0')}</span>
									<div class="wbody">
										<strong>{week.title}</strong>
										<span class="muted small">{week.summary}</span>
										<div class="progress" style="margin-top: 10px"><span style="width: {week.percent}%"></span></div>
										<span class="small muted">
											{week.lessonsDone}/{week.lessons} lessons · {week.assignmentsApproved}/{week.assignments} assignments approved
										</span>
									</div>
									{#if week.percent === 100}<span class="tick" aria-label="Complete"><Icon name="check" size={16} /></span>{/if}
								</a>
							</li>
						{/each}
						{#if course.lockedWeeks > 0}
							<li class="locked"><Icon name="lock" size={14} /> {course.lockedWeeks} more {course.lockedWeeks === 1 ? 'week' : 'weeks'} coming soon</li>
						{/if}
					</ol>
				</div>
			{/each}
		</section>

		<aside>
			<h2>Feedback</h2>
			{#if data.feedback.length === 0}
				<p class="empty small">When your instructor reviews your work, their notes will show up here.</p>
			{:else}
				<div class="stack">
					{#each data.feedback as f}
						<a class="card fb" href="/learn/{f.week_slug}/{f.item_slug}">
							<div class="spread"><strong>{f.title}</strong><StatusBadge status={f.status} /></div>
							{#if f.feedback}<p class="small muted">“{f.feedback.length > 140 ? f.feedback.slice(0, 140) + '…' : f.feedback}”</p>{/if}
						</a>
					{/each}
				</div>
			{/if}
			<div class="card-flat" style="margin-top: 18px">
				<strong><Icon name="flask" size={16} /> Playground</strong>
				<p class="small muted" style="margin: 6px 0 10px">Experiment with HTML, CSS and JavaScript right in your browser.</p>
				<a class="btn btn-sm btn-ghost" href="/playground">Open playground</a>
			</div>
		</aside>
	</div>
</div>

<style>
	.welcome {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 24px;
		align-items: center;
		margin-bottom: 26px;
	}
	.overall {
		display: flex;
		gap: 20px;
		align-items: center;
	}
	.continue {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		background: var(--sun);
		color: var(--on-accent);
		padding: 20px 24px;
		border-radius: var(--radius);
		text-decoration: none;
		margin-bottom: 32px;
	}
	.continue div { display: flex; flex-direction: column; }
	.continue strong { font-size: 1.3rem; font-weight: 700; }
	.continue:hover { color: var(--on-accent); filter: brightness(1.1); }
	.go { font-weight: 700; white-space: nowrap; }
	.layout {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: 32px;
	}
	.course + .course { margin-top: 36px; }
	.course-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 4px; }
	.course-head h2 { margin-bottom: 2px; }
	.weeks { display: grid; gap: 12px; }
	.week {
		display: flex;
		gap: 18px;
		align-items: flex-start;
		padding: 18px 20px;
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		text-decoration: none;
		color: var(--ink);
		transition: border-color 0.15s, transform 0.15s;
	}
	.week:hover { border-color: var(--sky); transform: translateY(-1px); color: var(--ink); }
	.wnum {
		font-family: var(--font-display);
		font-size: 2rem;
		font-weight: 700;
		line-height: 1;
		color: var(--ink-3);
		min-width: 44px;
	}
	.week.complete .wnum { color: var(--sage); }
	.wbody { flex: 1; display: flex; flex-direction: column; gap: 2px; }
	.wbody strong { font-size: 1.1rem; }
	.tick {
		width: 30px; height: 30px; border-radius: 50%;
		background: var(--sage-bg); color: #fff; display: grid; place-items: center; font-weight: 700;
	}
	.locked { padding: 16px 20px; color: var(--ink-3); border: 1.5px dashed var(--line-2); border-radius: var(--radius); }
	.fb { display: block; text-decoration: none; color: var(--ink); padding: 16px; }
	.fb p { margin: 8px 0 0; }
	@media (max-width: 900px) {
		.layout, .welcome { grid-template-columns: 1fr; }
	}
</style>
