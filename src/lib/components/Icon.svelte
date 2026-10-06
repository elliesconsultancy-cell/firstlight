<script>
	import { icons } from '$lib/icons.js';
	let { name, size = 18 } = $props();
</script>

<span class="icon" style="--s: {size}px" aria-hidden="true">{@html icons[name] ?? ''}</span>

<style>
	.icon {
		display: inline-flex;
		flex: none;
		width: var(--s);
		height: var(--s);
		vertical-align: -0.2em;
	}
	.icon :global(svg) {
		width: 100%;
		height: 100%;
	}
</style>
