<script>
	let { size = 30 } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
	<rect width="64" height="64" rx="16" fill="#1c1a2e" />
	<path d="M12 44h40" stroke="#f5b841" stroke-width="4" stroke-linecap="round" />
	<path d="M20 44a12 12 0 0 1 24 0" fill="#e8582a" />
	<path d="M32 15v8M17 21l5 5M47 21l-5 5" stroke="#f5b841" stroke-width="4" stroke-linecap="round" />
</svg>
