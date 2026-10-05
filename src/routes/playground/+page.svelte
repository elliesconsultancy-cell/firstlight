<script>
	import { onMount } from 'svelte';

	const STARTER = {
		html: '<h1>Hello, Firstlight!</h1>\n<p>Edit the HTML, CSS and JavaScript — the preview updates as you type.</p>\n<button id="btn">Click me</button>',
		css: 'body {\n  font-family: system-ui, sans-serif;\n  padding: 24px;\n  line-height: 1.5;\n}\n\nh1 {\n  color: #2458d8;\n}\n\nbutton {\n  padding: 8px 16px;\n  border-radius: 8px;\n  border: 0;\n  background: #2458d8;\n  color: white;\n  cursor: pointer;\n}',
		js: 'const button = document.querySelector("#btn");\nlet clicks = 0;\n\nbutton.addEventListener("click", () => {\n  clicks = clicks + 1;\n  console.log("You clicked", clicks, "times");\n});\n\nconsole.log("Hello from JavaScript!");'
	};

	let code = $state({ ...STARTER });
	let tab = $state('html');
	let srcdoc = $state('');
	let logs = $state([]);
	let auto = $state(true);
	let fromLesson = $state(false);
	let timer;
	let runId = 0;

	const consoleShim = (id) => `<script>
(function(){
  const send = (type, args) => parent.postMessage({ __fl: ${id}, type, args: args.map(a => {
    try {
      if (a instanceof Error) return a.name + ': ' + a.message;
      if (typeof a === 'object' && a !== null) {
        if (a instanceof Element) return '<' + a.tagName.toLowerCase() + '>';
        return JSON.stringify(a, null, 2);
      }
      return String(a);
    } catch (e) { return String(a); }
  }) }, '*');
  ['log','info','warn','error','table'].forEach(k => {
    const orig = console[k];
    console[k] = (...args) => { send(k, args); orig && orig.apply(console, args); };
  });
  window.addEventListener('error', e => send('error', [ (e.error && e.error.name ? e.error.name + ': ' : '') + e.message + (e.lineno ? ' (line ' + e.lineno + ')' : '') ]));
  window.addEventListener('unhandledrejection', e => send('error', ['Unhandled promise rejection: ' + (e.reason && e.reason.message || e.reason)]));
  document.addEventListener('click', e => { const a = e.target.closest('a'); if (a && a.getAttribute('href') === '#') e.preventDefault(); });
})();
<\/script>`;

	function build() {
		runId++;
		logs = [];
		const safeJs = code.js.replace(/<\/script/gi, '<\\/script');
		srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${consoleShim(runId)}<style>${code.css}</style></head><body>${code.html}<script>try{\n${safeJs}\n}catch(e){console.error(e)}<\/script></body></html>`;
	}

	function scheduleRun() {
		save();
		if (!auto) return;
		clearTimeout(timer);
		timer = setTimeout(build, 450);
	}

	function save() {
		try {
			localStorage.setItem('fl-playground', JSON.stringify(code));
		} catch {}
	}

	function reset() {
		if (!confirmReset) {
			confirmReset = true;
			setTimeout(() => (confirmReset = false), 2500);
			return;
		}
		confirmReset = false;
		code = { ...STARTER };
		save();
		build();
	}
	let confirmReset = $state(false);

	function download() {
		const doc = `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My playground page</title>\n  <style>\n${code.css}\n  </style>\n</head>\n<body>\n${code.html}\n  <script>\n${code.js}\n  <\/script>\n</body>\n</html>\n`;
		const url = URL.createObjectURL(new Blob([doc], { type: 'text/html' }));
		const a = Object.assign(document.createElement('a'), { href: url, download: 'playground.html' });
		a.click();
		URL.revokeObjectURL(url);
	}

	function onKey(e) {
		// Tab inserts two spaces instead of leaving the editor
		if (e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault();
			const el = e.currentTarget;
			const { selectionStart: s, selectionEnd: end } = el;
			code[tab] = code[tab].slice(0, s) + '  ' + code[tab].slice(end);
			requestAnimationFrame(() => (el.selectionStart = el.selectionEnd = s + 2));
			scheduleRun();
		}
		if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
			e.preventDefault();
			build();
		}
	}

	onMount(() => {
		try {
			const incoming = sessionStorage.getItem('fl-playground-load');
			if (incoming) {
				sessionStorage.removeItem('fl-playground-load');
				const p = JSON.parse(incoming);
				code = { html: p.html || '', css: p.css || '', js: p.js || '' };
				tab = p.js ? 'js' : p.css ? 'css' : 'html';
				fromLesson = true;
			} else {
				const saved = JSON.parse(localStorage.getItem('fl-playground') || 'null');
				if (saved) code = saved;
			}
		} catch {}
		build();
		const onMessage = (e) => {
			if (!e.data || e.data.__fl !== runId) return;
			logs = [...logs, { type: e.data.type, text: e.data.args.join(' ') }].slice(-200);
		};
		window.addEventListener('message', onMessage);
		return () => window.removeEventListener('message', onMessage);
	});

	const tabs = [
		{ id: 'html', label: 'HTML' },
		{ id: 'css', label: 'CSS' },
		{ id: 'js', label: 'JavaScript' }
	];
</script>

<svelte:head><title>Playground</title></svelte:head>

<div class="pg">
	<div class="toolbar">
		<div class="row">
			<strong class="title">🧪 Playground</strong>
			{#if fromLesson}
				<button class="link-btn small" onclick={() => history.back()}>← Back to lesson</button>
			{/if}
		</div>
		<div class="row">
			<label class="check small"><input type="checkbox" bind:checked={auto} /> Auto-run</label>
			<button class="btn btn-sm btn-sun" onclick={build} title="Ctrl/Cmd + Enter">▶ Run</button>
			<button class="btn btn-sm btn-ghost" onclick={download}>Download .html</button>
			<button class="btn btn-sm btn-ghost" onclick={reset}>{confirmReset ? 'Click again to reset' : 'Reset'}</button>
		</div>
	</div>

	<div class="panes">
		<section class="editor">
			<div class="etabs" role="tablist">
				{#each tabs as t}
					<button role="tab" aria-selected={tab === t.id} class:active={tab === t.id} onclick={() => (tab = t.id)}>
						{t.label}
						{#if code[t.id].trim()}<span class="dot"></span>{/if}
					</button>
				{/each}
			</div>
			{#key tab}
				<textarea
					class="code"
					spellcheck="false"
					autocapitalize="off"
					autocomplete="off"
					aria-label="{tab} code"
					bind:value={code[tab]}
					oninput={scheduleRun}
					onkeydown={onKey}
				></textarea>
			{/key}
		</section>
		<section class="output">
			<div class="preview-wrap">
				<span class="lbl">Preview</span>
				<iframe title="Preview" sandbox="allow-scripts allow-modals allow-forms" {srcdoc}></iframe>
			</div>
			<div class="console">
				<div class="spread lbl-row">
					<span class="lbl">Console</span>
					<button class="link-btn small" onclick={() => (logs = [])}>Clear</button>
				</div>
				<ol class="logs">
					{#each logs as l}
						<li class={l.type}>{l.text}</li>
					{:else}
						<li class="hint-line">console.log() output shows up here.</li>
					{/each}
				</ol>
			</div>
		</section>
	</div>
</div>

<style>
	.pg {
		height: calc(100vh - 65px);
		display: flex;
		flex-direction: column;
	}
	.toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
		padding: 10px 20px;
		border-bottom: 1px solid var(--line);
	}
	.title { font-family: var(--font-display); font-size: 1.15rem; }
	.panes {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr 1fr;
		min-height: 0;
	}
	.editor {
		display: flex;
		flex-direction: column;
		background: var(--code-bg);
		min-height: 0;
	}
	.etabs { display: flex; border-bottom: 1px solid var(--line); background: var(--paper-2); }
	.etabs button {
		background: none;
		border: 0;
		color: var(--ink-3);
		font: 700 0.85rem var(--font-body);
		padding: 12px 18px;
		cursor: pointer;
		border-bottom: 2px solid transparent;
		display: flex;
		gap: 6px;
		align-items: center;
	}
	.etabs button.active { color: var(--ink); border-bottom-color: var(--sky); background: var(--code-bg); }
	.dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sun); }
	.code {
		flex: 1;
		width: 100%;
		resize: none;
		border: 0;
		border-radius: 0;
		background: transparent;
		color: var(--code-ink);
		font-family: var(--font-mono);
		font-size: 0.92rem;
		line-height: 1.65;
		padding: 16px 20px;
		tab-size: 2;
		min-height: 0;
		white-space: pre;
	}
	.code:focus { box-shadow: none; }
	.output {
		display: grid;
		grid-template-rows: 1fr 200px;
		min-height: 0;
		border-left: 1px solid var(--line);
	}
	.preview-wrap { position: relative; background: #fff; min-height: 0; }
	iframe { width: 100%; height: 100%; border: 0; display: block; background: #fff; }
	.lbl {
		font-family: var(--font-body);
		font-weight: 700;
		font-size: 0.78rem;
		color: var(--ink-3);
	}
	.preview-wrap .lbl {
		position: absolute;
		top: 6px;
		right: 10px;
		background: rgba(255, 255, 255, 0.85);
		padding: 1px 6px;
		border-radius: 4px;
		color: #57606a;
	}
	.console {
		border-top: 1px solid var(--line);
		background: var(--paper-2);
		display: flex;
		flex-direction: column;
		min-height: 0;
	}
	.lbl-row { padding: 6px 14px; border-bottom: 1px solid var(--line); }
	.logs {
		list-style: none;
		margin: 0;
		padding: 6px 0;
		overflow-y: auto;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		flex: 1;
	}
	.logs li {
		padding: 3px 14px;
		border-bottom: 1px solid var(--line);
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}
	.logs li.error { color: var(--plum); background: var(--plum-soft); }
	.logs li.warn { background: var(--gold-soft); }
	.hint-line { color: var(--ink-3); border: 0 !important; }
	@media (max-width: 860px) {
		.pg { height: auto; }
		.panes { grid-template-columns: 1fr; }
		.editor { height: 50vh; }
		.output { grid-template-rows: 50vh 180px; border-left: 0; }
	}
</style>
