<script>
	import { enhance } from '$app/forms';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import { ago } from '$lib/time.js';
	let { data, form } = $props();
	let q = $state('');
	const shown = $derived(
		data.users.filter((u) => !q || (u.name + ' ' + u.email).toLowerCase().includes(q.toLowerCase()))
	);
	const filters = [
		{ id: 'all', label: 'Everyone' },
		{ id: 'pending', label: 'Waiting approval' },
		{ id: 'active', label: 'Active' },
		{ id: 'suspended', label: 'Paused' }
	];
</script>

<svelte:head><title>Students</title></svelte:head>

<div class="container page">
	<div class="spread">
		<h1>Students</h1>
		<input type="search" placeholder="Search by name or email" bind:value={q} style="max-width: 280px" />
	</div>
	<nav class="tabs" aria-label="Filter">
		{#each filters as f}
			<a href="?status={f.id}" aria-current={data.status === f.id ? 'page' : undefined}>{f.label}</a>
		{/each}
	</nav>

	{#if form?.tempPassword}
		<div class="alert alert-info">
			Temporary password for <strong>{form.tempFor}</strong>: <code class="pw">{form.tempPassword}</code><br />
			<span class="small">Share it privately. They can change it in Account settings after logging in.</span>
		</div>
	{/if}
	{#if form?.error}<p class="alert alert-error">{form.error}</p>{/if}

	{#if shown.length === 0}
		<p class="empty">No one here yet.</p>
	{:else}
		<div class="card" style="padding: 4px 8px">
			<div class="table-wrap" style="margin: 0">
				<table>
					<thead><tr><th>Name</th><th>Status</th><th>Progress</th><th>Last seen</th><th style="text-align:right">Actions</th></tr></thead>
					<tbody>
						{#each shown as u}
							<tr>
								<td>
									<a href="/admin/students/{u.id}"><strong>{u.name}</strong></a>
									{#if u.role === 'admin'}<span class="badge badge-admin" style="margin-left: 6px">Instructor</span>{/if}<br />
									<span class="small muted">{u.email}</span>
								</td>
								<td><StatusBadge status={u.status} /></td>
								<td style="min-width: 150px">
									{#if u.role === 'student'}
										<div class="progress"><span style="width: {u.percent}%"></span></div>
										<span class="small muted">{u.percent}%{u.waiting ? ` · ${u.waiting} to review` : ''}</span>
									{/if}
								</td>
								<td class="small muted">{ago(u.last_seen_at)}</td>
								<td>
									{#if u.id !== data.user.id}
										<div class="row actions">
											{#if u.status !== 'active'}
												<form method="POST" action="?/setStatus" use:enhance>
													<input type="hidden" name="id" value={u.id} /><input type="hidden" name="status" value="active" />
													<button class="btn btn-sm btn-sage">{u.status === 'pending' ? 'Approve' : 'Reactivate'}</button>
												</form>
											{:else}
												<form method="POST" action="?/setStatus" use:enhance>
													<input type="hidden" name="id" value={u.id} /><input type="hidden" name="status" value="suspended" />
													<button class="btn btn-sm btn-ghost">Pause</button>
												</form>
											{/if}
											<form method="POST" action="?/resetPassword" use:enhance>
												<input type="hidden" name="id" value={u.id} />
												<button class="btn btn-sm btn-ghost">Reset password</button>
											</form>
										</div>
									{:else}
										<span class="small muted" style="display:block;text-align:right">You</span>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>

<style>
	.actions { justify-content: flex-end; gap: 6px; flex-wrap: nowrap; }
	.pw { font-family: var(--font-mono); background: var(--card); padding: 2px 8px; border-radius: 6px; border: 1px solid var(--line); }
</style>
