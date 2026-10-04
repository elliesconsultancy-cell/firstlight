<script>
	import { enhance } from '$app/forms';
	import { marked } from 'marked';
	let { data, form } = $props();
	let body = $state(data.item.body_md);
	let kind = $state(data.item.kind);
	let view = $state('split');
	let confirmDelete = $state(false);
	const preview = $derived(marked.parse(body || ''));
</script>

<svelte:head><title>Edit: {data.item.title}</title></svelte:head>

<div class="container page wide">
	<a class="small" href="/admin/curriculum/{data.item.week_id}">← Week {data.item.week_pos}: {data.item.week_title}</a>
	<form method="POST" action="?/save" use:enhance={() => ({ update }) => update({ reset: false })}>
		<div class="spread" style="margin: 10px 0 18px">
			<h1 style="margin: 0">{data.item.title}</h1>
			<div class="row">
				<a class="btn btn-sm btn-ghost" href="/learn/{data.item.week_slug}/{data.item.slug}">View as student</a>
				<button class="btn btn-sm btn-sun">Save</button>
			</div>
		</div>
		{#if form?.error}<p class="alert alert-error">{form.error}</p>{/if}
		{#if form?.saved}<p class="alert alert-ok">Saved.</p>{/if}

		<div class="meta card">
			<div class="field"><label for="title">Title</label><input id="title" name="title" type="text" value={data.item.title} required /></div>
			<div class="field"><label for="slug">URL name</label><input id="slug" name="slug" type="text" value={data.item.slug} /></div>
			<div class="field">
				<label for="week_id">Week</label>
				<select id="week_id" name="week_id">
					{#each data.weeks as w}<option value={w.id} selected={w.id === data.item.week_id}>Week {w.position}: {w.title}</option>{/each}
				</select>
			</div>
			<div class="field">
				<label for="kind">Type</label>
				<select id="kind" name="kind" bind:value={kind}>
					<option value="lesson">Lesson (reading)</option>
					<option value="assignment">Assignment (students submit work)</option>
				</select>
			</div>
			{#if kind === 'lesson'}
				<div class="field"><label for="minutes">Reading time (min)</label><input id="minutes" name="minutes" type="number" min="1" value={data.item.minutes} /></div>
				<input type="hidden" name="submission_type" value={data.item.submission_type} />
			{:else}
				<input type="hidden" name="minutes" value={data.item.minutes} />
				<div class="field">
					<label for="submission_type">Students must submit</label>
					<select id="submission_type" name="submission_type">
						<option value="any" selected={data.item.submission_type === 'any'}>Anything (text, link or files)</option>
						<option value="link" selected={data.item.submission_type === 'link'}>A link</option>
						<option value="file" selected={data.item.submission_type === 'file'}>At least one file</option>
						<option value="text" selected={data.item.submission_type === 'text'}>A written answer</option>
					</select>
				</div>
			{/if}
		</div>

		<div class="spread" style="margin: 20px 0 10px">
			<strong>Content (Markdown)</strong>
			<div class="tabs" style="margin: 0">
				<a href="#write" aria-current={view === 'write' ? 'page' : undefined} onclick={(e) => { e.preventDefault(); view = 'write'; }}>Write</a>
				<a href="#split" aria-current={view === 'split' ? 'page' : undefined} onclick={(e) => { e.preventDefault(); view = 'split'; }}>Side by side</a>
				<a href="#preview" aria-current={view === 'preview' ? 'page' : undefined} onclick={(e) => { e.preventDefault(); view = 'preview'; }}>Preview</a>
			</div>
		</div>
		<div class="editor {view}">
			<textarea name="body_md" class="mono" bind:value={body} spellcheck="true"></textarea>
			<div class="card prose pv">{@html preview}</div>
		</div>
		<p class="hint">Tips: <code>## Heading</code>, <code>**bold**</code>, <code>- [ ] checklist</code>, fenced code blocks with <code>```html</code>, <code>```css</code> or <code>```js</code> get a “Try it” button. Start a quote with 💡, ⚠️ or 🧠 for coloured callouts.</p>
	</form>

	<form method="POST" action="?/delete" use:enhance style="margin-top: 26px">
		{#if confirmDelete}
			<button class="btn btn-sm btn-plum">Yes, delete it</button>
			<button type="button" class="btn btn-sm btn-ghost" onclick={() => (confirmDelete = false)}>Cancel</button>
		{:else}
			<button type="button" class="link-btn small" onclick={() => (confirmDelete = true)}>Delete this {kind}…</button>
		{/if}
	</form>
</div>

<style>
	.wide { max-width: 1400px; }
	.meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0 16px; padding-bottom: 6px; }
	.editor { display: grid; gap: 16px; grid-template-columns: 1fr 1fr; }
	.editor textarea { min-height: 70vh; font-size: 0.86rem; line-height: 1.6; }
	.editor.write { grid-template-columns: 1fr; }
	.editor.write .pv { display: none; }
	.editor.preview { grid-template-columns: 1fr; }
	.editor.preview textarea { display: none; }
	.pv { max-height: 70vh; overflow-y: auto; max-width: none; }
	.pv :global(pre) { background: var(--code-bg); color: var(--code-ink); padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem; }
	code { font-family: var(--font-mono); font-size: 0.85em; }
	@media (max-width: 900px) { .editor { grid-template-columns: 1fr; } }
</style>
