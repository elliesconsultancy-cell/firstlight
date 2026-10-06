import { Marked } from 'marked';
import hljs from 'highlight.js/lib/common';
import { icons } from '../icons.js';

const LABELS = {
	html: 'HTML',
	xml: 'HTML',
	css: 'CSS',
	js: 'JavaScript',
	javascript: 'JavaScript',
	json: 'JSON',
	bash: 'Terminal',
	sh: 'Terminal',
	shell: 'Terminal',
	node: 'Node.js',
	text: 'Text',
	plaintext: 'Text'
};
const RUNNABLE = new Set(['html', 'css', 'js', 'javascript']);

const escapeHtml = (s) =>
	String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

const slugify = (s) =>
	String(s)
		.toLowerCase()
		.replace(/<[^>]+>/g, '')
		.replace(/&[a-z]+;/g, '')
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');

const marked = new Marked({
	gfm: true,
	renderer: {
		code({ text, lang }) {
			const language = (lang || '').trim().split(/\s+/)[0].toLowerCase();
			const hlLang = language === 'js' || language === 'node' ? 'javascript' : language === 'html' ? 'xml' : language;
			let highlighted;
			try {
				highlighted =
					hlLang && hljs.getLanguage(hlLang)
						? hljs.highlight(text, { language: hlLang }).value
						: escapeHtml(text);
			} catch {
				highlighted = escapeHtml(text);
			}
			const runnable = RUNNABLE.has(language);
			const kind = language === 'javascript' ? 'js' : language;
			return `<figure class="code-block" data-lang="${escapeHtml(kind)}">
<figcaption><span class="code-lang">${escapeHtml(LABELS[language] || language || 'Code')}</span><span class="code-actions"><button type="button" class="code-btn" data-copy>${icons.copy}<span>Copy</span></button>${
				runnable ? `<button type="button" class="code-btn code-try" data-try>${icons.play}<span>Try it</span></button>` : ''
			}</span></figcaption>
<pre><code class="hljs">${highlighted}</code></pre>
<textarea class="code-src" hidden aria-hidden="true" tabindex="-1">${escapeHtml(text)}</textarea>
</figure>`;
		},
		heading({ tokens, depth }) {
			const inner = this.parser.parseInline(tokens);
			const id = slugify(inner);
			return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
		},
		blockquote({ tokens }) {
			const inner = this.parser.parse(tokens);
			const plain = inner.replace(/<[^>]+>/g, '').trim();
			let variant = 'note';
			let icon = icons['book-open'];
			if (plain.startsWith('💡')) (variant = 'tip'), (icon = icons.lightbulb);
			else if (plain.startsWith('⚠️') || plain.startsWith('⚠')) (variant = 'warn'), (icon = icons['triangle-alert']);
			else if (plain.startsWith('🧠')) (variant = 'remember'), (icon = icons.brain);
			// The emoji in the Markdown is only a marker: show a proper icon instead.
			const body = inner.replace(/(💡|⚠️|⚠|🧠)\uFE0F?\s*/, '');
			return `<aside class="callout callout-${variant}"><span class="callout-icon" aria-hidden="true">${icon}</span><div class="callout-body">${body}</div></aside>\n`;
		},
		link({ href, title, tokens }) {
			const text = this.parser.parseInline(tokens);
			const external = /^https?:\/\//.test(href);
			return `<a href="${escapeHtml(href)}"${title ? ` title="${escapeHtml(title)}"` : ''}${
				external ? ' target="_blank" rel="noopener noreferrer"' : ''
			}>${text}</a>`;
		},
		table(token) {
			// wrap tables so they scroll on small screens
			const header = token.header
				.map((cell) => `<th>${this.parser.parseInline(cell.tokens)}</th>`)
				.join('');
			const rows = token.rows
				.map((row) => `<tr>${row.map((cell) => `<td>${this.parser.parseInline(cell.tokens)}</td>`).join('')}</tr>`)
				.join('');
			return `<div class="table-wrap"><table><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></div>`;
		}
	}
});

/** Render trusted (instructor-authored) markdown to HTML. */
export function renderMarkdown(md) {
	return marked.parse(md || '');
}

/** Escape learner-written text and keep line breaks + make URLs clickable. */
export function renderPlain(text) {
	return escapeHtml(text || '')
		.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
		.replace(/\n/g, '<br>');
}
