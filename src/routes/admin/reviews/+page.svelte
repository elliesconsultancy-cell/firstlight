<script>
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import { ago } from '$lib/time.js';
	let { data } = $props();
	const filters = [
		{ id: 'submitted', label: 'Waiting for review' },
		{ id: 'changes_requested', label: 'Changes requested' },
		{ id: 'approved', label: 'Approved' },
		{ id: 'all', label: 'All' }
	];
</script>

<svelte:head><title>Reviews</title></svelte:head>

<div class="container page">
	<h1>Reviews</h1>
	<nav class="tabs" aria-label="Filter">
		{#each filters as f}
			<a href="?status={f.id}" aria-current={data.status === f.id ? 'page' : undefined}>{f.label}</a>
		{/each}
	</nav>

	{#if data.rows.length === 0}
		<p class="empty">{data.status === 'submitted' ? 'Nothing waiting for review.' : 'Nothing here yet.'}</p>
	{:else}
		<div class="card" style="padding: 4px 8px">
			<div class="table-wrap" style="margin: 0">
				<table>
					<thead>
						<tr><th>Student</th><th>Assignment</th><th>Sent</th><th>Status</th><th></th></tr>
					</thead>
					<tbody>
						{#each data.rows as r}
							<tr>
								<td><a href="/admin/students/{r.user_id}">{r.name}</a></td>
								<td>
									<strong>{r.title}</strong><br />
									<span class="small muted">Week {r.week}{r.version > 1 ? ` · version ${r.version}` : ''}{r.files ? ` · ${r.files} file${r.files > 1 ? 's' : ''}` : ''}{r.link ? ' · link' : ''}</span>
								</td>
								<td class="small muted">{ago(r.created_at)}</td>
								<td><StatusBadge status={r.status} /></td>
								<td style="text-align: right"><a class="btn btn-sm {r.status === 'submitted' ? '' : 'btn-ghost'}" href="/admin/reviews/{r.id}">{r.status === 'submitted' ? 'Review' : 'Open'}</a></td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
