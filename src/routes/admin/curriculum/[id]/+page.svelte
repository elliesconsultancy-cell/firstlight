<script>
	import Icon from '$lib/components/Icon.svelte';
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	let confirmDelete = $state(false);
</script>

<svelte:head><title>Edit: {data.week.title}</title></svelte:head>

<div class="container page">
	<a class="small" href="/admin/curriculum"><Icon name="arrow-left" size={13} /> Curriculum</a>
	<div class="spread" style="margin: 10px 0 20px">
		<h1 style="margin: 0">Week {data.week.position}: {data.week.title}</h1>
		<a class="btn btn-sm btn-ghost" href="/learn/{data.week.slug}">Preview as student</a>
	</div>
	{#if form?.error}<p class="alert alert-error">{form.error}</p>{/if}
	{#if form?.saved}<p class="alert alert-ok">Saved.</p>{/if}

	<div class="cols">
		<form class="card" method="POST" action="?/save" use:enhance={() => ({ update }) => update({ reset: false })}>
			<h2>Week details</h2>
			<div class="field">
				<label for="title">Title</label>
				<input id="title" name="title" type="text" value={data.week.title} required />
			</div>
			<div class="field">
				<label for="slug">URL name</label>
				<input id="slug" name="slug" type="text" value={data.week.slug} />
				<p class="hint">Shown in the address: /learn/<b>{data.week.slug}</b></p>
			</div>
			<div class="field">
				<label for="summary">One-line summary</label>
				<input id="summary" name="summary" type="text" value={data.week.summary} />
			</div>
			<div class="field">
				<label for="intro_md">Week introduction (Markdown)</label>
				<textarea id="intro_md" name="intro_md" class="mono" rows="12">{data.week.intro_md}</textarea>
			</div>
			<div class="field">
				<label for="instructor_notes"><Icon name="lock" size={14} /> Instructor notes (only instructors see these)</label>
				<textarea id="instructor_notes" name="instructor_notes" class="mono" rows="6" placeholder="Session plan, things to emphasise, links to slides, reminders…">{data.week.instructor_notes}</textarea>
			</div>
			<label class="check" style="margin-bottom: 18px"><input type="checkbox" name="published" checked={!!data.week.published} /> Published (students can see this week)</label>
			<button class="btn">Save week</button>
		</form>

		<div>
			<div class="card">
				<h2>Lessons & assignments</h2>
				<ol class="list-plain items">
					{#each data.items as item, idx}
						<li>
							<span class="kind {item.kind}">{#if item.kind === 'lesson'}<Icon name="book-open" size={16} />{:else}<Icon name="hammer" size={16} />{/if}</span>
							<a href="/admin/curriculum/item/{item.id}">{item.title}</a>
							{#if item.submissions}<span class="small muted">{item.submissions} subs</span>{/if}
							<form method="POST" action="?/moveItem" use:enhance class="mv">
								<input type="hidden" name="id" value={item.id} />
								<button name="dir" value="up" disabled={idx === 0} aria-label="Move up"><Icon name="arrow-up" size={14} /></button>
								<button name="dir" value="down" disabled={idx === data.items.length - 1} aria-label="Move down"><Icon name="arrow-down" size={14} /></button>
							</form>
						</li>
					{:else}
						<li class="muted">Nothing yet — add the first lesson below.</li>
					{/each}
				</ol>
				<form method="POST" action="?/addItem" class="add" use:enhance>
					{#if form?.itemError}<p class="alert alert-error">{form.itemError}</p>{/if}
					<input name="title" type="text" placeholder="Title" />
					<div class="row">
						<select name="kind" style="width: auto">
							<option value="lesson">Lesson</option>
							<option value="assignment">Assignment</option>
						</select>
						<button class="btn btn-sm">+ Add</button>
					</div>
				</form>
			</div>

			<form method="POST" action="?/deleteWeek" use:enhance style="margin-top: 20px">
				{#if confirmDelete}
					<button class="btn btn-sm btn-plum">Yes, delete this week</button>
					<button type="button" class="btn btn-sm btn-ghost" onclick={() => (confirmDelete = false)}>Cancel</button>
				{:else}
					<button type="button" class="link-btn small" onclick={() => (confirmDelete = true)}>Delete this week…</button>
				{/if}
			</form>
		</div>
	</div>
</div>

<style>
	.cols { display: grid; grid-template-columns: 1fr 380px; gap: 28px; align-items: start; }
	.items { display: grid; gap: 2px; margin-bottom: 18px; }
	.items li { display: flex; gap: 10px; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--line); }
	.items a { flex: 1; color: var(--ink); text-decoration: none; font-weight: 700; font-size: 0.95rem; }
	.items a:hover { color: var(--sun-ink); }
	.mv { display: flex; gap: 2px; }
	.mv button { border: 1px solid var(--line-2); background: var(--card); color: var(--ink); border-radius: 6px; width: 26px; height: 26px; cursor: pointer; }
	.mv button:disabled { opacity: 0.3; }
	.add { display: grid; gap: 8px; }
	@media (max-width: 960px) { .cols { grid-template-columns: 1fr; } }
</style>
