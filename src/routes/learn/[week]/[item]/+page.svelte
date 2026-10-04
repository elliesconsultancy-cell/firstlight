<script>
	import { enhance } from '$app/forms';
	import Prose from '$lib/components/Prose.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';

	let { data, form } = $props();
	let busy = $state(false);
	let picked = $state([]);
	let showForm = $state(false);

	const latest = $derived(data.submissions[0]);
	const formOpen = $derived(
		showForm || !latest || latest.status === 'changes_requested' || !!form?.error
	);

	const fmtDate = (d) =>
		new Date(d.replace(' ', 'T') + 'Z').toLocaleString(undefined, {
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	const fmtSize = (n) => (n > 1024 * 1024 ? (n / 1024 / 1024).toFixed(1) + ' MB' : Math.ceil(n / 1024) + ' KB');

	const needs = {
		any: 'a written answer, a link, and/or files',
		link: 'a link (required)',
		file: 'at least one file (required)',
		text: 'a written answer (required)'
	};
</script>

<svelte:head><title>{data.item.title} · Week {data.week.number}</title></svelte:head>

<article>
	<header class="head">
		<span class="eyebrow">
			Week {data.week.number} · {data.item.kind === 'lesson' ? `Lesson · ${data.item.minutes} min read` : 'Assignment'}
		</span>
		<h1>{data.item.title}</h1>
		{#if data.item.kind === 'assignment' && latest}
			<StatusBadge status={latest.status} />
		{/if}
	</header>

	<Prose html={data.item.html} storageKey="fl-check-{data.user.id}-{data.item.id}" />

	{#if data.item.kind === 'lesson'}
		<form
			class="done-bar"
			class:is-done={data.completed}
			method="POST"
			action="?/complete"
			use:enhance={() => {
				busy = true;
				return async ({ update }) => {
					await update({ reset: false });
					busy = false;
				};
			}}
		>
			{#if data.completed}
				<input type="hidden" name="undo" value="1" />
				<div>
					<strong>✓ You’ve finished this lesson.</strong>
					<button class="link-btn small" type="submit" disabled={busy}>Mark as not done</button>
				</div>
				{#if data.next}
					<a class="btn" href="/learn/{data.week.slug}/{data.next.slug}">Next: {data.next.title} →</a>
				{/if}
			{:else}
				<div>
					<strong>Finished reading?</strong>
					<span class="small muted">Tick it off so you and your instructor can see your progress.</span>
				</div>
				<button class="btn btn-sun" type="submit" disabled={busy}>Mark as done ✓</button>
			{/if}
		</form>
	{:else}
		<section class="submit-area" id="submit">
			<h2>Your work</h2>

			{#if form?.submitted}
				<p class="alert alert-ok" role="status">🎉 Submitted! Your instructor will review it and leave feedback.</p>
			{/if}

			{#if latest?.status === 'approved'}
				<p class="alert alert-ok">✅ Approved — great work! You can still send an updated version if you like.</p>
			{:else if latest?.status === 'changes_requested'}
				<p class="alert alert-error">✏️ Your instructor asked for some changes. Read the feedback below, then send a new version.</p>
			{:else if latest?.status === 'submitted' && !form?.submitted}
				<p class="alert alert-info">⏳ Submitted and waiting for review.</p>
			{/if}

			{#if formOpen}
				<form
					class="card sub-form"
					method="POST"
					action="?/submit"
					enctype="multipart/form-data"
					use:enhance={() => {
						busy = true;
						return async ({ update, result }) => {
							await update();
							busy = false;
							if (result.type === 'success') {
								picked = [];
								showForm = false;
							}
						};
					}}
				>
					{#if form?.error}<p class="alert alert-error" role="alert">{form.error}</p>{/if}
					<p class="small muted" style="margin-top: 0">This assignment needs {needs[data.item.submission_type]}.</p>
					<div class="field">
						<label for="answer">Written answer or notes</label>
						<textarea id="answer" name="answer" placeholder="Explain what you built, what you found tricky, or answer the questions…">{form?.answer ?? ''}</textarea>
					</div>
					<div class="field">
						<label for="link">Link <span class="hint" style="display:inline">(GitHub, GitHub Pages, CodePen…)</span></label>
						<input id="link" name="link" type="url" inputmode="url" placeholder="https://" value={form?.link ?? ''} />
					</div>
					<div class="field">
						<label for="files">Files</label>
						<label class="drop" for="files">
							<input
								id="files"
								name="files"
								type="file"
								multiple
								accept=".html,.htm,.css,.js,.json,.md,.txt,.pdf,.png,.jpg,.jpeg,.gif,.webp,.svg,.zip"
								onchange={(e) => (picked = [...e.currentTarget.files].map((f) => f.name))}
							/>
							<span>📎 {picked.length ? picked.join(', ') : 'Choose files or drop them here'}</span>
							<span class="hint">Up to 5 files, 4 MB in total. Code, images, PDF or a .zip of your project folder.</span>
						</label>
					</div>
					<div class="row">
						<button class="btn btn-sun" type="submit" disabled={busy}>
							{busy ? 'Sending…' : latest ? 'Send new version' : 'Submit for review'}
						</button>
						{#if latest && showForm}
							<button class="btn btn-ghost" type="button" onclick={() => (showForm = false)}>Cancel</button>
						{/if}
					</div>
				</form>
			{:else}
				<button class="btn btn-ghost" onclick={() => (showForm = true)}>Send an updated version</button>
			{/if}

			{#if data.submissions.length}
				<h3 style="margin-top: 32px">History</h3>
				<ol class="history list-plain">
					{#each data.submissions as s}
						<li class="card">
							<div class="spread">
								<strong>Version {s.version}</strong>
								<span class="row small muted">{fmtDate(s.created_at)} <StatusBadge status={s.status} /></span>
							</div>
							{#if s.answer}<div class="answer">{@html s.answerHtml}</div>{/if}
							{#if s.link}<p class="small">🔗 <a href={s.link} target="_blank" rel="noopener noreferrer">{s.link}</a></p>{/if}
							{#if s.files.length}
								<ul class="files list-plain">
									{#each s.files as f}
										<li><a href="/files/{f.id}">📄 {f.original_name}</a> <span class="muted small">{fmtSize(f.size)}</span></li>
									{/each}
								</ul>
							{/if}
							{#if s.feedback}
								<div class="feedback">
									<span class="small"><strong>Feedback from {s.reviewer_name ?? 'your instructor'}</strong>{#if s.reviewed_at} · {fmtDate(s.reviewed_at)}{/if}</span>
									<p>{s.feedback}</p>
								</div>
							{/if}
						</li>
					{/each}
				</ol>
			{/if}
		</section>
	{/if}

	<nav class="pager" aria-label="Lesson navigation">
		{#if data.prev}
			<a href="/learn/{data.week.slug}/{data.prev.slug}"><span class="small muted">← Previous</span>{data.prev.title}</a>
		{:else}
			<a href="/learn/{data.week.slug}"><span class="small muted">← Back to</span>Week overview</a>
		{/if}
		{#if data.next}
			<a class="right" href="/learn/{data.week.slug}/{data.next.slug}"><span class="small muted">Next →</span>{data.next.title}</a>
		{:else if data.nextWeek}
			<a class="right" href="/learn/{data.nextWeek.slug}"><span class="small muted">Next week →</span>{data.nextWeek.title}</a>
		{/if}
	</nav>
</article>

<style>
	.head {
		margin-bottom: 28px;
		padding-bottom: 20px;
		border-bottom: 1px solid var(--line);
	}
	.done-bar {
		margin-top: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
		padding: 20px 22px;
		border-radius: var(--radius);
		background: var(--card);
		border: 1.5px solid var(--line);
		box-shadow: var(--shadow);
	}
	.done-bar div { display: flex; flex-direction: column; gap: 2px; }
	.done-bar.is-done { border-color: var(--sage); background: var(--sage-soft); }
	.submit-area { margin-top: 48px; padding-top: 28px; border-top: 2px solid var(--ink); }
	.sub-form { margin-bottom: 18px; }
	.drop {
		display: flex;
		flex-direction: column;
		gap: 4px;
		border: 2px dashed var(--line-2);
		border-radius: var(--radius-sm);
		padding: 18px;
		cursor: pointer;
		font-weight: 400;
		background: var(--paper);
		position: relative;
	}
	.drop:hover { border-color: var(--sun); }
	.drop input {
		position: absolute;
		inset: 0;
		opacity: 0;
		cursor: pointer;
	}
	.history { display: grid; gap: 14px; }
	.answer {
		margin: 12px 0;
		padding: 12px 14px;
		background: var(--paper);
		border-radius: var(--radius-sm);
		border: 1px solid var(--line);
		white-space: normal;
		overflow-wrap: anywhere;
	}
	.files { margin: 8px 0; display: grid; gap: 4px; }
	.feedback {
		margin-top: 12px;
		padding: 12px 16px;
		border-left: 4px solid var(--sun);
		background: var(--sun-soft);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	}
	.feedback p { margin: 6px 0 0; white-space: pre-wrap; }
	.pager {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
		margin-top: 48px;
	}
	.pager a {
		display: flex;
		flex-direction: column;
		padding: 14px 18px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		text-decoration: none;
		color: var(--ink);
		font-weight: 700;
		background: var(--card);
	}
	.pager a:hover { border-color: var(--sun); }
	.pager .right { text-align: right; grid-column: 2; }
	@media (max-width: 600px) {
		.pager { grid-template-columns: 1fr; }
		.pager .right { grid-column: 1; }
	}
</style>
