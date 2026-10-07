<script>
	import Icon from '$lib/components/Icon.svelte';
	let { data } = $props();
	const label = { done: 'Done', review: 'Waiting for your review', changes: 'Changes requested', todo: 'Not done yet' };
	const complete = $derived(data.rows.filter((r) => r.percent === 100).length);
</script>

<svelte:head><title>Sprint review: {data.week.title}</title></svelte:head>

<div class="container page">
	<a class="small" href="/admin/curriculum/{data.week.id}"><Icon name="arrow-left" size={13} /> Week {data.week.position}: {data.week.title}</a>
	<div class="spread" style="margin: 10px 0 6px">
		<h1 style="margin: 0">Sprint review</h1>
		<a class="btn btn-sm btn-ghost" href="/learn/{data.week.slug}">Open the week</a>
	</div>
	<p class="muted">
		{data.week.course_title}, week {data.week.position}: {data.week.title}. A tick means a lesson was read or an
		assignment was approved.
	</p>

	{#if data.rows.length === 0}
		<p class="empty">No active students yet.</p>
	{:else}
		<p><strong>{complete}</strong> of {data.rows.length} students have finished everything this week.</p>
		<div class="card" style="padding: 0">
			<div class="table-wrap" style="margin: 0">
				<table class="review">
					<thead>
						<tr>
							<th>Student</th>
							{#each data.items as item}
								<th class="c" title={item.title}>
									<span class="kind"><Icon name={item.kind === 'lesson' ? 'book-open' : 'hammer'} size={14} /></span>
									<span class="t">{item.title}</span>
								</th>
							{/each}
							<th class="c">Done</th>
						</tr>
					</thead>
					<tbody>
						{#each data.rows as r}
							<tr>
								<td><a href="/admin/students/{r.id}">{r.name}</a></td>
								{#each r.cells as c, i}
									<td class="c">
										<span class="mk {c}" title="{data.items[i].title}: {label[c]}" role="img" aria-label={label[c]}>
											{#if c === 'done'}<Icon name="check" size={14} />
											{:else if c === 'review'}<Icon name="clock" size={14} />
											{:else if c === 'changes'}<Icon name="pencil" size={14} />
											{:else}<Icon name="circle" size={12} />{/if}
										</span>
									</td>
								{/each}
								<td class="c"><strong>{r.percent}%</strong></td>
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<td><strong>Finished</strong></td>
							{#each data.totals as n}<td class="c"><strong>{n}/{data.rows.length}</strong></td>{/each}
							<td></td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
		<p class="small muted" style="margin-top: 12px">
			<span class="key done"><Icon name="check" size={12} /></span> done
			<span class="key review"><Icon name="clock" size={12} /></span> waiting for review
			<span class="key changes"><Icon name="pencil" size={12} /></span> changes requested
			<span class="key todo"><Icon name="circle" size={10} /></span> not done yet
		</p>
	{/if}
</div>

<style>
	.review th.c, .review td.c { text-align: center; }
	.review th { vertical-align: bottom; min-width: 90px; max-width: 150px; font-weight: 600; }
	.review th .kind { display: block; color: var(--ink-3); margin-bottom: 2px; }
	.review th .t { display: block; font-size: 0.8rem; line-height: 1.25; }
	.review tfoot td { border-top: 2px solid var(--line); }
	.mk, .key {
		display: inline-grid;
		place-items: center;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		border: 1.5px solid var(--line-2);
		color: var(--ink-3);
	}
	.key { width: 20px; height: 20px; margin: 0 4px 0 12px; }
	.mk.done, .key.done { background: var(--sage-bg); border-color: var(--sage-bg); color: #fff; }
	.mk.review, .key.review { background: var(--sky-soft); border-color: var(--sky); color: var(--sky); }
	.mk.changes, .key.changes { background: var(--plum-soft); border-color: var(--plum); color: var(--plum); }
</style>
