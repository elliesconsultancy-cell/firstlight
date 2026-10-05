<script>
	import { page } from '$app/state';
	let { data, children } = $props();
	let open = $state(false);
	const done = $derived(data.items.filter((i) => i.done).length);
</script>

<div class="container wk-layout">
	<aside class="side" class:open>
		<a class="back small" href="/learn">← All weeks</a>
		<a class="wk-head" href="/learn/{data.week.slug}">
			<span class="eyebrow">Week {data.week.number}{data.week.published ? '' : ' · draft'}</span>
			<strong>{data.week.title}</strong>
		</a>
		<div class="progress"><span style="width: {data.items.length ? (done / data.items.length) * 100 : 0}%"></span></div>
		<p class="small muted" style="margin: 6px 0 14px">{done} of {data.items.length} done</p>
		<button class="btn btn-ghost btn-sm toggle" onclick={() => (open = !open)}>
			{open ? 'Hide' : 'Show'} this week’s steps
		</button>
		<ol class="steps list-plain">
			{#each data.items as item}
				{@const active = page.params.item === item.slug}
				<li>
					<a href="/learn/{data.week.slug}/{item.slug}" aria-current={active ? 'page' : undefined} onclick={() => (open = false)}>
						<span class="mark" class:done={item.done} class:waiting={item.status === 'submitted'} class:changes={item.status === 'changes_requested'}>
							{#if item.done}✓{:else if item.kind === 'assignment'}★{/if}
						</span>
						<span class="lbl">
							{item.title}
							<span class="small muted">
								{item.kind === 'lesson' ? `Lesson · ${item.minutes} min` : item.status === 'submitted' ? 'Assignment · in review' : item.status === 'changes_requested' ? 'Assignment · changes requested' : 'Assignment'}
							</span>
						</span>
					</a>
				</li>
			{/each}
		</ol>
	</aside>
	<div class="content">
		{@render children()}
	</div>
</div>

<style>
	.wk-layout {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: 48px;
		padding-top: 28px;
		padding-bottom: 80px;
	}
	.side {
		position: sticky;
		top: 84px;
		align-self: start;
		max-height: calc(100vh - 100px);
		overflow-y: auto;
	}
	.back { display: inline-block; margin-bottom: 14px; color: var(--ink-3); text-decoration: none; }
	.wk-head { display: block; text-decoration: none; color: var(--ink); margin-bottom: 12px; }
	.wk-head strong { font-family: var(--font-display); font-size: 1.35rem; font-weight: 600; line-height: 1.2; display: block; }
	.toggle { display: none; }
	.steps { display: flex; flex-direction: column; gap: 2px; }
	.steps a {
		display: flex;
		gap: 12px;
		padding: 9px 10px;
		border-radius: var(--radius-sm);
		text-decoration: none;
		color: var(--ink);
		align-items: flex-start;
	}
	.steps a:hover { background: var(--paper-2); }
	.steps a[aria-current='page'] { background: var(--card); box-shadow: inset 3px 0 0 var(--sun), var(--shadow); }
	.lbl { display: flex; flex-direction: column; font-weight: 700; font-size: 0.93rem; line-height: 1.35; }
	.lbl .small { font-weight: 400; margin-top: 2px; }
	.mark {
		flex: none;
		width: 22px; height: 22px; border-radius: 50%;
		border: 2px solid var(--line-2);
		display: grid; place-items: center;
		font-size: 0.7rem; font-weight: 700; color: var(--ink-3);
		margin-top: 1px;
	}
	.mark.done { background: var(--sage-bg); border-color: var(--sage-bg); color: #fff; }
	.mark.waiting { border-color: var(--sky); color: var(--sky); }
	.mark.changes { border-color: var(--plum); color: var(--plum); }
	.content { min-width: 0; }
	@media (max-width: 900px) {
		.wk-layout { grid-template-columns: 1fr; gap: 20px; }
		.side { position: static; max-height: none; border-bottom: 1px solid var(--line); padding-bottom: 14px; }
		.toggle { display: inline-flex; }
		.steps { display: none; margin-top: 10px; }
		.side.open .steps { display: flex; }
	}
</style>
