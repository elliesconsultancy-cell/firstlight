<script>
	import Icon from '$lib/components/Icon.svelte';
	import Prose from '$lib/components/Prose.svelte';
	let { data } = $props();
	const lessons = $derived(data.items.filter((i) => i.kind === 'lesson'));
	const assignments = $derived(data.items.filter((i) => i.kind === 'assignment'));
	const minutes = $derived(lessons.reduce((n, i) => n + i.minutes, 0));
	const first = $derived(data.items.find((i) => !i.done) ?? data.items[0]);
</script>

<svelte:head><title>Week {data.week.number}: {data.week.title}</title></svelte:head>

<header class="hero">
	<span class="eyebrow">Week {data.week.number} of {data.weekCount - 1}</span>
	<h1>{data.week.title}</h1>
	<p class="lead">{data.week.summary}</p>
	<div class="row meta">
		<span><Icon name="book-open" size={15} /> {lessons.length} lessons · ~{minutes} min reading</span>
		<span><Icon name="hammer" size={15} /> {assignments.length} {assignments.length === 1 ? 'assignment' : 'assignments'}</span>
		<a href="#backlog"><Icon name="list-checks" size={15} /> Backlog</a>
	</div>
	{#if first}
		<a class="btn btn-sun" href="/learn/{data.week.slug}/{first.slug}">
			{data.items.some((i) => i.done) ? 'Continue' : 'Start the week'} <Icon name="arrow-right" size={16} />
		</a>
	{/if}
</header>

{#if data.user.role === 'admin'}
	<aside class="notes instructor-panel">
		<div class="spread">
			<strong><Icon name="graduation-cap" size={17} /> For instructors: day plan and sprint review</strong>
			<a class="btn btn-sm btn-ghost" href="/admin/curriculum/{data.week.id}/review"><Icon name="users" size={14} /> See who has done what</a>
		</div>
		<span class="small muted">Only instructors can see this.</span>
		{#if data.notesHtml}
			<Prose html={data.notesHtml} storageKey="fl-review-{data.user.id}-{data.week.id}" />
		{:else}
			<p class="small muted">No day plan has been written for this week yet. Add one in Admin, Curriculum, under Instructor notes.</p>
		{/if}
	</aside>
{/if}

<Prose html={data.introHtml} storageKey="fl-backlog-{data.user.id}-{data.week.id}" />

<div class="row" style="margin-top: 40px; justify-content: space-between">
	{#if data.prevWeek}<a href="/learn/{data.prevWeek.slug}"><Icon name="arrow-left" size={14} /> Week {data.prevWeek.position}: {data.prevWeek.title}</a>{:else}<span></span>{/if}
	{#if data.nextWeek}<a href="/learn/{data.nextWeek.slug}">Week {data.nextWeek.position}: {data.nextWeek.title} <Icon name="arrow-right" size={14} /></a>{/if}
</div>

<style>
	.hero {
		padding-bottom: 26px;
		margin-bottom: 26px;
		border-bottom: 1px solid var(--line);
	}
	.lead { font-size: 1.2rem; color: var(--ink-2); max-width: 60ch; }
	.meta { color: var(--ink-2); font-size: 0.95rem; margin-bottom: 20px; gap: 20px; }
	.notes {
		margin-bottom: 28px;
	}
</style>
