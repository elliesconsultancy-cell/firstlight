<script>
	import { enhance } from '$app/forms';
	import Ring from '$lib/components/Ring.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import { ago, fmtDate } from '$lib/time.js';
	let { data } = $props();
	const published = $derived(data.weeks.filter((w) => w.published));
	const total = $derived(published.reduce((n, w) => n + w.total, 0));
	const done = $derived(published.reduce((n, w) => n + w.done, 0));
</script>

<svelte:head><title>{data.student.name}</title></svelte:head>

<div class="container page">
	<a class="small" href="/admin/students">← All students</a>
	<div class="profile">
		<div>
			<h1 style="margin: 10px 0 4px">{data.student.name}</h1>
			<p class="muted" style="margin: 0 0 10px">{data.student.email} · joined {fmtDate(data.student.created_at)} · last seen {ago(data.student.last_seen_at)}</p>
			<div class="row">
				<StatusBadge status={data.student.status} />
				{#if data.student.role === 'admin'}<span class="badge badge-admin">Instructor</span>{/if}
				{#if data.student.id !== data.user.id}
					<form method="POST" action="/admin/students?/setRole" use:enhance>
						<input type="hidden" name="id" value={data.student.id} />
						<input type="hidden" name="role" value={data.student.role === 'admin' ? 'student' : 'admin'} />
						<button class="link-btn small">{data.student.role === 'admin' ? 'Make a student' : 'Make a co-instructor'}</button>
					</form>
				{/if}
			</div>
			{#if data.student.bio}
				<blockquote class="bio">{data.student.bio}</blockquote>
			{/if}
		</div>
		<div class="card row" style="gap: 18px">
			<Ring percent={total ? Math.round((done / total) * 100) : 0} label="overall" />
			<div class="small"><b>{done}</b>/{total} steps<br />{data.submissionCount} submissions</div>
		</div>
	</div>

	<div class="stack" style="margin-top: 28px">
		{#each data.weeks as w}
			<section class="card wk" class:draft={!w.published}>
				<div class="spread">
					<h3 style="margin: 0">Week {w.number}: {w.title} {#if !w.published}<span class="badge badge-draft">Not published</span>{/if}</h3>
					<span class="small muted">{w.percent}%</span>
				</div>
				<ul class="list-plain items">
					{#each w.items as i}
						{@const sub = data.latestByItem[i.id]}
						<li>
							<span class="mk" class:ok={i.done}>{i.done ? '✓' : i.kind === 'assignment' ? '★' : '·'}</span>
							<span class="t">{i.title}</span>
							{#if i.kind === 'lesson'}
								<span class="small muted">{i.completed_at ? 'read ' + ago(i.completed_at) : 'not read'}</span>
							{:else if sub}
								<a href="/admin/reviews/{sub.id}"><StatusBadge status={sub.status} /></a>
							{:else}
								<span class="small muted">not submitted</span>
							{/if}
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</div>

<style>
	.profile { display: flex; justify-content: space-between; gap: 24px; flex-wrap: wrap; align-items: flex-start; }
	.bio { margin: 16px 0 0; padding: 10px 16px; border-left: 3px solid var(--gold); background: var(--card); border-radius: 0 8px 8px 0; max-width: 60ch; white-space: pre-wrap; }
	.wk.draft { opacity: 0.6; }
	.items { margin-top: 12px; display: grid; gap: 2px; }
	.items li { display: flex; gap: 10px; align-items: center; padding: 6px 0; border-bottom: 1px dashed var(--line); flex-wrap: wrap; }
	.items li:last-child { border: 0; }
	.t { flex: 1; min-width: 180px; }
	.mk { width: 22px; height: 22px; display: grid; place-items: center; border-radius: 50%; border: 1.5px solid var(--line-2); font-size: 0.7rem; color: var(--ink-3); flex: none; }
	.mk.ok { background: var(--sage); border-color: var(--sage); color: #fff; }
	.items a { text-decoration: none; }
</style>
