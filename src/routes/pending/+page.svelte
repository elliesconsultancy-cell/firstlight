<script>
	import Icon from '$lib/components/Icon.svelte';
	let { data } = $props();
</script>

<svelte:head><title>Almost there</title></svelte:head>

<div class="container narrow page" style="text-align: center">
	<div style="color: var(--sun-ink)"><Icon name="sunrise" size={56} /></div>
	{#if data.status === 'suspended'}
		<h1>Your account is paused</h1>
		<p class="muted">Please get in touch with your instructor if you think this is a mistake.</p>
	{:else}
		<h1>You’re on the list!</h1>
		<p class="lead muted">
			Your instructor needs to approve your account before the lessons unlock. You’ll be able to
			start as soon as that happens — just come back and refresh this page.
		</p>
		<a class="btn" href="/pending">Check again</a>
	{/if}
</div>
