<script>
	import { goto } from '$app/navigation';

	/** html: trusted rendered markdown. storageKey: where to remember ticked checklists. */
	let { html, storageKey = '' } = $props();
	let root;

	function codeOf(block) {
		return block?.querySelector('.code-src')?.value ?? '';
	}

	function previousOfLang(block, lang) {
		const all = [...root.querySelectorAll('.code-block')];
		const idx = all.indexOf(block);
		for (let i = idx - 1; i >= 0; i--) if (all[i].dataset.lang === lang) return all[i];
		return null;
	}

	function onClick(e) {
		const btn = e.target.closest('button');
		if (!btn) return;
		const block = btn.closest('.code-block');
		if (!block) return;
		if (btn.hasAttribute('data-copy')) {
			navigator.clipboard?.writeText(codeOf(block));
			btn.textContent = 'Copied ✓';
			setTimeout(() => (btn.textContent = 'Copy'), 1400);
		}
		if (btn.hasAttribute('data-try')) {
			const lang = block.dataset.lang;
			const code = codeOf(block);
			const payload = { html: '', css: '', js: '' };
			payload[lang] = code;
			if (lang !== 'html') {
				const htmlBlock = previousOfLang(block, 'html');
				payload.html = htmlBlock
					? codeOf(htmlBlock)
					: lang === 'css'
						? '<h1>Hello, playground!</h1>\n<p>Edit the HTML to see your CSS in action.</p>\n<a href="#">A link</a>'
						: '';
			}
			if (lang === 'js') {
				const cssBlock = previousOfLang(block, 'css');
				if (cssBlock) payload.css = codeOf(cssBlock);
			}
			try {
				sessionStorage.setItem('fl-playground-load', JSON.stringify(payload));
			} catch {}
			goto('/playground?from=lesson');
		}
	}

	function onChange(e) {
		const box = e.target;
		if (box.type !== 'checkbox' || !storageKey) return;
		const boxes = [...root.querySelectorAll('li > input[type="checkbox"]')];
		try {
			localStorage.setItem(storageKey, JSON.stringify(boxes.map((b) => b.checked)));
		} catch {}
	}

	$effect(() => {
		html; // re-run when content changes
		if (!root) return;
		const boxes = [...root.querySelectorAll('li > input[type="checkbox"]')];
		let saved = [];
		try {
			saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
		} catch {}
		boxes.forEach((b, i) => {
			b.disabled = !storageKey;
			b.checked = !!saved[i];
		});
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="prose" bind:this={root} onclick={onClick} onchange={onChange}>
	{@html html}
</div>
