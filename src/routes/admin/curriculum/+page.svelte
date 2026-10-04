<script>
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	let confirmSync = $state(false);
</script>

<svelte:head><title>Curriculum</title></svelte:head>

<div class="container page">
	<div class="spread">
		<div>
			<h1 style="margin: 0">Curriculum</h1>
			<p class="muted">Publish a week to make it visible to students. Drafts are only visible to instructors.</p>
		</div>
		<form method="POST" action="?/add" class="row" use:enhance>
			<input name="title" type="text" placeholder="New week title" style="width: 220px" />
			<button class="btn btn-sm">+ Add week</button>
		</form>
	</div>
	{#if form?.addError}<p class="alert alert-error">{form.addError}</p>{/if}
	{#if form?.synced}<p class="alert alert-ok">Synced {form.synced.weeks} weeks and {form.synced.items} items from the content folder.</p>{/if}

	<ol class="list-plain weeks">
		{#each data.weeks as w, idx}
			<li class="card" class:draft={!w.published}>
				<div class="num">{String(w.position).padStart(2, '0')}</div>
				<div class="body">
					<a href="/admin/curriculum/{w.id}"><strong>{w.title}</strong></a>
					<span class="small muted">{w.lessons} lessons · {w.assignments} assignments{w.instructor_notes ? ' · has instructor notes' : ''}</span>
				</div>
				<div class="row ctrls">
					<form method="POST" action="?/move" use:enhance>
						<input type="hidden" name="id" value={w.id} />
						<button class="icon" name="dir" value="up" disabled={idx === 0} aria-label="Move up">↑</button>
						<button class="icon" name="dir" value="down" disabled={idx === data.weeks.length - 1} aria-label="Move down">↓</button>
					</form>
					<form method="POST" action="?/publish" use:enhance>
						<input type="hidden" name="id" value={w.id} />
						<input type="hidden" name="published" value={w.published ? '0' : '1'} />
						<button class="btn btn-sm {w.published ? 'btn-ghost' : 'btn-sun'}">{w.published ? 'Unpublish' : 'Publish'}</button>
					</form>
					<a class="btn btn-sm btn-ghost" href="/learn/{w.slug}">Preview</a>
					<a class="btn btn-sm" href="/admin/curriculum/{w.id}">Edit</a>
				</div>
			</li>
		{/each}
	</ol>

	<div class="card-flat" style="margin-top: 36px">
		<strong>Content files</strong>
		<p class="small muted" style="margin: 6px 0 12px">
			The starting lessons live as Markdown in the <code>content/weeks</code> folder. If you edit those files, sync them here.
			This overwrites in-app edits to lessons with the same name, but never touches student work or publish settings.
		</p>
		<form method="POST" action="?/sync" use:enhance={() => ({ update }) => { confirmSync = false; return update(); }}>
			{#if confirmSync}
				<button class="btn btn-sm btn-plum">Yes, sync from files</button>
				<button type="button" class="btn btn-sm btn-ghost" onclick={() => (confirmSync = false)}>Cancel</button>
			{:else}
				<button type="button" class="btn btn-sm btn-ghost" onclick={() => (confirmSync = true)}>Sync from content folder…</button>
			{/if}
		</form>
	</div>
</div>

<style>
	.weeks { display: grid; gap: 10px; margin-top: 18px; }
	.weeks li { display: flex; align-items: center; gap: 18px; padding: 14px 18px; flex-wrap: wrap; }
	.weeks li.draft { background: var(--paper-2); box-shadow: none; border-style: dashed; }
	.num { font-family: var(--font-display); font-size: 1.6rem; color: var(--sun); min-width: 40px; }
	.draft .num { color: var(--ink-3); }
	.body { flex: 1; display: flex; flex-direction: column; min-width: 200px; }
	.body a { color: var(--ink); text-decoration: none; font-size: 1.05rem; }
	.body a:hover { color: var(--sun-ink); }
	.ctrls { gap: 8px; }
	.ctrls form { display: flex; gap: 4px; }
	.icon {
		width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--line-2);
		background: var(--card); color: var(--ink); cursor: pointer; font-weight: 700;
	}
	.icon:disabled { opacity: 0.3; cursor: default; }
	code { font-family: var(--font-mono); font-size: 0.85em; }
</style>
