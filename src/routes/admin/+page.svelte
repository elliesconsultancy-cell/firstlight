<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { ago } from '$lib/time.js';
	let { data } = $props();
	const welcome = $derived(page.url.searchParams.get('welcome'));
	const signup = $derived(page.url.origin + '/register');
	let copied = $state(false);
	const heat = (p) =>
		p === 0 ? 'var(--paper-2)' : `color-mix(in srgb, var(--sage) ${Math.max(18, p)}%, var(--card))`;
</script>

<svelte:head><title>Instructor · {data.course.name}</title></svelte:head>

<div class="container page">
	{#if welcome}
		<div class="card welcome">
			<h2>🌅 Welcome, instructor!</h2>
			<p>Your course is ready with {data.stats.weeks} weeks of lessons. Here’s how to get going:</p>
			<ol>
				<li><a href="/admin/curriculum">Review the curriculum</a> and publish the weeks you want students to see (weeks 0 and 1 are already published).</li>
				<li><a href="/admin/settings">Set an invite code</a> so only your students can sign up.</li>
				<li>Share the sign-up link with your students — new accounts wait for your approval.</li>
			</ol>
		</div>
	{/if}

	<div class="spread" style="margin-bottom: 22px">
		<div>
			<h1 style="margin: 0">Overview</h1>
			<p class="muted" style="margin: 4px 0 0">{data.stats.published} of {data.stats.weeks} weeks published</p>
		</div>
		<div class="share">
			<span class="small muted">Student sign-up link</span>
			<div class="row">
				<code>{signup}</code>
				<button
					class="btn btn-sm btn-ghost"
					onclick={() => {
						navigator.clipboard?.writeText(signup);
						copied = true;
						setTimeout(() => (copied = false), 1500);
					}}>{copied ? 'Copied ✓' : 'Copy'}</button
				>
			</div>
		</div>
	</div>

	<div class="grid grid-3 stats">
		<a class="card stat" href="/admin/students"><b>{data.stats.students}</b><span class="muted">active students</span></a>
		<a class="card stat" href="/admin/students?status=pending" class:hot={data.stats.pendingUsers}><b>{data.stats.pendingUsers}</b><span class="muted">waiting for approval</span></a>
		<a class="card stat" href="/admin/reviews" class:hot={data.stats.toReview}><b>{data.stats.toReview}</b><span class="muted">submissions to review</span></a>
		<div class="card stat"><b>{data.stats.approvedWeek}</b><span class="muted">approved in the last 7 days</span></div>
	</div>

	<div class="cols">
		<section>
			{#if data.pendingUsers.length}
				<h2>New sign-ups</h2>
				<div class="card" style="padding: 6px 0; margin-bottom: 28px">
					{#each data.pendingUsers as u}
						<div class="person">
							<div>
								<strong>{u.name}</strong>
								<span class="small muted">{u.email} · joined {ago(u.created_at)}</span>
							</div>
							<div class="row">
								<form method="POST" action="/admin/students?/setStatus" use:enhance>
									<input type="hidden" name="id" value={u.id} />
									<input type="hidden" name="status" value="active" />
									<button class="btn btn-sm btn-sage">Approve</button>
								</form>
								<form method="POST" action="/admin/students?/setStatus" use:enhance>
									<input type="hidden" name="id" value={u.id} />
									<input type="hidden" name="status" value="suspended" />
									<button class="btn btn-sm btn-ghost">Decline</button>
								</form>
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<h2>Class progress</h2>
			{#if data.grid.length === 0}
				<p class="empty">No active students yet. Share the sign-up link to get started.</p>
			{:else}
				<div class="card heat-card">
					<div class="table-wrap" style="margin: 0">
						<table class="heat">
							<thead>
								<tr>
									<th>Student</th>
									{#each data.weeks as w}<th title={w.title} class="c">W{w.position}</th>{/each}
								</tr>
							</thead>
							<tbody>
								{#each data.grid as s}
									<tr>
										<td><a href="/admin/students/{s.id}">{s.name}</a><br /><span class="small muted">seen {ago(s.last_seen_at)}</span></td>
										{#each s.cells as p, i}
											<td class="c"><span class="cell" style="background: {heat(p)}" title="{data.weeks[i].title}: {p}%">{p ? p : ''}</span></td>
										{/each}
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
					<p class="small muted" style="margin: 12px 0 0">Numbers show % of each week completed (lessons read + assignments approved).</p>
				</div>
			{/if}
		</section>

		<aside>
			<div class="spread"><h2>To review</h2><a class="small" href="/admin/reviews">See all →</a></div>
			{#if data.queue.length === 0}
				<p class="empty small">Nothing waiting. Nice! ☕</p>
			{:else}
				<div class="stack">
					{#each data.queue as q}
						<a class="card q" href="/admin/reviews/{q.id}">
							<strong>{q.title}</strong>
							<span class="small muted">{q.name} · Week {q.week}{q.version > 1 ? ` · v${q.version}` : ''} · {ago(q.created_at)}</span>
						</a>
					{/each}
				</div>
			{/if}

			<h2 style="margin-top: 32px">Recent activity</h2>
			<ul class="list-plain activity">
				{#each data.activity as a}
					<li>
						<span>{a.what === 'read' ? '📖' : '📤'}</span>
						<span><strong>{a.name}</strong> {a.what === 'read' ? 'finished' : 'submitted'} <em>{a.title}</em><br /><span class="small muted">{ago(a.at)}</span></span>
					</li>
				{:else}
					<li class="muted small">No activity yet.</li>
				{/each}
			</ul>
		</aside>
	</div>
</div>

<style>
	.welcome { margin-bottom: 28px; border-color: var(--gold); background: var(--gold-soft); }
	.welcome ol { margin: 0; padding-left: 1.3em; }
	.share code {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		background: var(--card);
		border: 1px solid var(--line);
		padding: 6px 10px;
		border-radius: 8px;
	}
	.share { display: flex; flex-direction: column; gap: 4px; }
	.stats { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-bottom: 36px; }
	.stats a { text-decoration: none; color: var(--ink); }
	.stats .hot { border-color: var(--sun); box-shadow: inset 0 3px 0 var(--sun), var(--shadow); }
	.cols { display: grid; grid-template-columns: 1fr 340px; gap: 36px; }
	.person {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		padding: 12px 20px;
		border-bottom: 1px solid var(--line);
		flex-wrap: wrap;
	}
	.person:last-child { border-bottom: 0; }
	.person > div:first-child { display: flex; flex-direction: column; }
	.heat-card { padding: 12px 16px; }
	.heat th.c, .heat td.c { text-align: center; padding: 8px 4px; }
	.cell {
		display: inline-grid;
		place-items: center;
		width: 38px;
		height: 30px;
		border-radius: 6px;
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--ink);
	}
	.q { display: flex; flex-direction: column; text-decoration: none; color: var(--ink); padding: 14px 16px; }
	.q:hover { border-color: var(--sun); }
	.activity li { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--line); font-size: 0.92rem; }
	@media (max-width: 960px) {
		.cols { grid-template-columns: 1fr; }
	}
</style>
