<script>
	let { percent = 0, size = 120, stroke = 10, label = '' } = $props();
	const r = $derived((size - stroke) / 2);
	const c = $derived(2 * Math.PI * r);
</script>

<div class="ring" style="width:{size}px;height:{size}px">
	<svg width={size} height={size} viewBox="0 0 {size} {size}" role="img" aria-label="{percent}% {label}">
		<defs>
			<linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stop-color="#f5b841" />
				<stop offset="100%" stop-color="#e8582a" />
			</linearGradient>
		</defs>
		<circle cx={size / 2} cy={size / 2} {r} fill="none" stroke="var(--paper-2)" stroke-width={stroke} />
		<circle
			cx={size / 2}
			cy={size / 2}
			{r}
			fill="none"
			stroke="url(#ringGrad)"
			stroke-width={stroke}
			stroke-linecap="round"
			stroke-dasharray={c}
			stroke-dashoffset={c - (c * percent) / 100}
			transform="rotate(-90 {size / 2} {size / 2})"
			style="transition: stroke-dashoffset .6s ease"
		/>
	</svg>
	<div class="val"><b>{percent}%</b>{#if label}<span>{label}</span>{/if}</div>
</div>

<style>
	.ring { position: relative; flex: none; }
	.val {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	b { font-family: var(--font-display); font-size: 1.7rem; line-height: 1; }
	span { font-size: 0.72rem; color: var(--ink-3); margin-top: 2px; }
</style>
