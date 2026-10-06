<script>
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/state';
</script>

<svelte:head><title>{page.status}</title></svelte:head>

<div class="container narrow page" style="text-align: center">
	<div style="color: var(--ink-3)"><Icon name="cloud-off" size={48} /></div>
	<h1>{page.status === 404 ? 'We couldn’t find that' : 'Something went wrong'}</h1>
	<p class="muted">{page.error?.message}</p>
	<a class="btn" href="/">Go home</a>
</div>
