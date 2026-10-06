<script>
	import Icon from '$lib/components/Icon.svelte';
	import { enhance } from '$app/forms';
	import Prose from '$lib/components/Prose.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import { fmtDate } from '$lib/time.js';

	let { data, form } = $props();
	let feedback = $state('');
	let showBrief = $state(false);
	$effect(() => {
		feedback = form?.feedback ?? data.sub.feedback ?? '';
	});

	const quick = [
		'Great work. This meets all the requirements.',
		'Nice job! One small thing to try next time: ',
		'You’re close! Please fix the following and resubmit:\n- '
	];
	const isImage = (f) => f.mime.startsWith('image/');
	const fmtSize = (n) => (n > 1024 * 1024 ? (n / 1024 / 1024).toFixed(1) + ' MB' : Math.ceil(n / 1024) + ' KB');
</script>

<svelte:head><title>Review: {data.sub.title}</title></svelte:head>

<div class="container page">
	<a class="small" href="/admin/reviews"><Icon name="arrow-left" size={13} /> All reviews</a>
	<div class="spread head">
		<div>
			<span class="eyebrow">Week {data.sub.week} · {data.sub.week_title}</span>
			<h1>{data.sub.title}</h1>
			<p class="muted" style="margin: 0">
				by <a href="/admin/students/{data.sub.user_id}">{data.sub.name}</a> · version {data.sub.version} · sent {fmtDate(data.sub.created_at)}
			</p>
		</div>
		<StatusBadge status={data.sub.status} />
	</div>

	<div class="cols">
		<div>
			{#if !data.isLatest}
				<p class="alert alert-info">This is an older version. The student has sent a newer one — see the history below.</p>
			{/if}

			<section class="card work">
				<h2>Their work</h2>
				{#if data.sub.link}
					<p><Icon name="link" size={14} /> <a href={data.sub.link} target="_blank" rel="noopener noreferrer">{data.sub.link}</a></p>
				{/if}
				{#if data.sub.answer}
					<div class="answer">{@html data.versions.find((v) => v.id === data.sub.id)?.answerHtml}</div>
				{/if}
				{#each data.versions.find((v) => v.id === data.sub.id)?.files ?? [] as f}
					<div class="file">
						<a href="/files/{f.id}" target="_blank"><Icon name="file-text" size={14} /> {f.original_name}</a>
						<span class="small muted">{fmtSize(f.size)}</span>
						{#if isImage(f)}<img src="/files/{f.id}" alt={f.original_name} loading="lazy" />{/if}
					</div>
				{/each}
				{#if !data.sub.link && !data.sub.answer && !(data.versions.find((v) => v.id === data.sub.id)?.files.length)}
					<p class="muted">Nothing attached.</p>
				{/if}
			</section>

			<button class="link-btn" style="margin: 20px 0 10px" onclick={() => (showBrief = !showBrief)}>
				{showBrief ? 'Hide' : 'Show'} the assignment brief
			</button>
			{#if showBrief}
				<div class="card brief"><Prose html={data.sub.instructionsHtml} /></div>
			{/if}

			{#if data.versions.length > 1}
				<h3 style="margin-top: 28px">All versions</h3>
				<ol class="list-plain versions">
					{#each data.versions as v}
						<li class:current={v.id === data.sub.id}>
							<a href="/admin/reviews/{v.id}">Version {v.version}</a>
							<span class="small muted">{fmtDate(v.created_at)}</span>
							<StatusBadge status={v.status} />
							{#if v.feedback}<p class="small">“{v.feedback}”</p>{/if}
						</li>
					{/each}
				</ol>
			{/if}
		</div>

		<aside>
			<form
				class="card review"
				method="POST"
				action="?/review"
				use:enhance={() => ({ update }) => update({ reset: false })}
			>
				<h2>Your review</h2>
				{#if form?.error}<p class="alert alert-error">{form.error}</p>{/if}
				{#if form?.saved}<p class="alert alert-ok">Saved — the student can see your feedback now.</p>{/if}
				<div class="field">
					<label for="feedback">Feedback for {data.sub.name.split(' ')[0]}</label>
					<textarea id="feedback" name="feedback" bind:value={feedback} rows="8" placeholder="What went well? What could be better?"></textarea>
					<div class="chips">
						{#each quick as q}
							<button type="button" class="chip" onclick={() => (feedback = feedback ? feedback + '\n' + q : q)}>{q.split(/[:—\n]/)[0]}</button>
						{/each}
					</div>
				</div>
				<label class="check small" style="margin-bottom: 14px"><input type="checkbox" name="next" value="1" checked /> Go to the next submission after saving</label>
				<div class="row">
					<button class="btn btn-sage" name="decision" value="approved"><Icon name="check" size={16} /> Approve</button>
					<button class="btn btn-plum" name="decision" value="changes_requested">Request changes</button>
				</div>
			</form>
		</aside>
	</div>
</div>

<style>
	.head { margin: 12px 0 26px; align-items: flex-start; }
	.cols { display: grid; grid-template-columns: 1fr 380px; gap: 32px; align-items: start; }
	.answer {
		padding: 14px 16px;
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		margin-bottom: 14px;
		overflow-wrap: anywhere;
	}
	.file { padding: 10px 0; border-top: 1px solid var(--line); display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
	.file img { width: 100%; border-radius: var(--radius-sm); border: 1px solid var(--line); margin-top: 6px; }
	.brief { max-height: 520px; overflow-y: auto; }
	.review { position: sticky; top: 84px; }
	.chips { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
	.chip {
		font: inherit;
		font-size: 0.78rem;
		padding: 4px 10px;
		border-radius: 999px;
		border: 1px solid var(--line-2);
		background: var(--paper);
		color: var(--ink-2);
		cursor: pointer;
	}
	.chip:hover { border-color: var(--sun); color: var(--ink); }
	.versions li { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--line); }
	.versions li.current a { font-weight: 700; }
	.versions p { width: 100%; margin: 0; color: var(--ink-2); }
	@media (max-width: 960px) {
		.cols { grid-template-columns: 1fr; }
		.review { position: static; }
	}
</style>
