<script>
	let { status } = $props();
	const labels = {
		submitted: 'Waiting for review',
		approved: 'Approved',
		changes_requested: 'Changes requested',
		pending: 'Pending approval',
		active: 'Active',
		suspended: 'Paused',
		draft: 'Draft'
	};
</script>

{#if status}<span class="badge badge-{status}">{labels[status] ?? status}</span>{/if}
