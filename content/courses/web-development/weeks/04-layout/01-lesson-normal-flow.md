---
title: Normal flow, block and inline
kind: lesson
minutes: 20
---
Before you move boxes around, you need to know where the browser puts them when you do nothing. This default way of arranging things is called **normal flow**.

After this lesson, you can tell block boxes from inline boxes. You can also change one into the other.

## Normal flow: like writing on lined paper

Imagine you write a letter on lined paper. Paragraphs go one under the other, from top to bottom. Inside a paragraph, words go from left to right. When a line is full, you continue on the next line.

The browser does the same. It has two main kinds of boxes:

- **Block** boxes stack from top to bottom, like paragraphs in a letter.
- **Inline** boxes sit side by side inside a line, like words in a sentence.

## Block elements

Block elements:

- start on a **new line**
- stretch to take the **full width** available
- respect `width`, `height`, `margin` and `padding` on all sides

Examples: `<h1>` to `<h6>`, `<p>`, `<div>`, `<section>`, `<header>`, `<footer>`, `<ul>`, `<li>`, `<form>`.

## Inline elements

Inline elements:

- sit **inside** a line of text, next to each other
- are only as wide as their content
- **ignore** `width` and `height`
- do not push other lines away with top and bottom margins

Examples: `<a>`, `<span>`, `<strong>`, `<em>`, `<label>`.

Images (`<img>`) and buttons (`<button>`) sit in a line too. But they are special: they do accept a width and a height.

```html
<p>This is a paragraph with a <a href="#">link</a> and some <strong>bold words</strong> in it.</p>
<p>This paragraph starts on a new line, because paragraphs are block elements.</p>
```

The link and the bold words stay inside the sentence. Each paragraph starts on its own line.

> 💡 **Tip:** In DevTools, select an element and open the **Computed** tab. Search for `display`. You will see whether it is `block`, `inline` or something else.

## The display property

You can change how an element behaves with the `display` property:

```css
a.button {
  display: inline-block;
  padding: 10px 16px;
  background-color: #2a7f62;
  color: white;
}
```

Here are the most useful values:

| Value | Behaviour |
| --- | --- |
| `block` | new line, full width |
| `inline` | stays in the line of text, width and height are ignored |
| `inline-block` | stays in the line, but respects width, height and padding |
| `none` | hides the element completely (it takes up no space) |
| `flex` | turns the element into a Flexbox container (next lesson) |
| `grid` | turns the element into a Grid container (lesson after next) |

`inline-block` sits in the middle. Use it for button-style links that sit next to each other but need proper padding.

> ⚠️ **Watch out:** Do not pick an HTML element for how it looks. Pick it for its **meaning** (remember semantic HTML from week 2). Then use CSS to change how it displays. A navigation list is still a `<ul>`, even if you make it horizontal.

## The "too wide" problem

Block elements stretch to fill their parent. On a huge monitor, a paragraph could be 2000px wide. That is very hard to read. A common fix is `max-width`:

```css
main {
  max-width: 70ch;
  margin: 0 auto;
  padding: 0 1rem;
}
```

`ch` is a unit about as wide as one character. So `70ch` means "about 70 characters per line". That is comfortable to read.

`max-width` says "you may be narrower than this, but never wider". On a small phone, the element shrinks to fit.

## Why we need Flexbox and Grid

Normal flow is good for articles and documents. But many designs need things like:

- a logo on the left and menu links on the right
- three cards side by side
- a button in the exact centre of a box

Older tricks can do this, but they are awkward. Modern CSS has two tools made for the job: Flexbox and Grid. Normal flow still happens underneath. Flexbox and Grid give you control over one container.

## Try it

Paste this HTML into the playground:

```html
<h2>Our services</h2>
<p>We fix <span class="tag">punctures</span>, <span class="tag">brakes</span> and <span class="tag">gears</span>.</p>
<a href="#" class="button">Book a repair</a>
<a href="#" class="button">See prices</a>
<div class="box">I am a block box.</div>
<div class="box">So am I.</div>
```

Add this CSS:

```css
.tag {
  background-color: #ffe8a3;
  padding: 2px 6px;
  border-radius: 4px;
}

.button {
  background-color: #2a7f62;
  color: white;
  padding: 10px 16px;
  margin: 8px 4px;
  text-decoration: none;
}

.box {
  background-color: #dbe9f4;
  border: 2px solid #3d5a80;
  padding: 10px;
  margin-bottom: 10px;
}
```

Now experiment. Guess what will happen before each change.

1. The top and bottom padding on `.button` overlaps the text around it. Add `display: inline-block;` to `.button`. What changes?
2. Add `display: inline;` to `.box`. What happens to the two boxes?
3. Add `width: 200px;` to `.tag`. Does anything happen? Why not?
4. Try `display: none;` on one element.

<details><summary>Show answers</summary>

1. The buttons now push the lines around them away. The vertical padding takes real space.
2. The two boxes join into one line, side by side, and only as wide as their text.
3. Nothing. `.tag` is a `<span>`, an inline element, so it ignores `width`.
4. The element disappears and leaves no gap.

</details>

## Check your understanding

1. Name two block elements and two inline elements.
2. What are two differences between block and inline elements?
3. What does `display: inline-block` let you do that `inline` does not?
4. Why is `max-width` often better than `width` for the main content area?
5. What does `display: none` do?

<details><summary>Show answers</summary>

1. Block: for example `<p>`, `<div>`, `<h1>`, `<section>`. Inline: for example `<a>`, `<span>`, `<strong>`, `<em>`.
2. Block elements start on a new line and fill the full width. Inline elements sit within a line of text and are only as wide as their content. Inline elements also ignore `width` and `height`.
3. It stays in the line like an inline element, but it respects `width`, `height`, and vertical padding and margin.
4. `max-width` stops the content becoming too wide on big screens, but it can still shrink on small screens. A fixed `width` might be too wide for a phone.
5. It hides the element completely, and it takes up no space on the page.

</details>

## Go deeper

- [MDN: Normal flow](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow)
- [MDN: display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
- [web.dev: Layout](https://web.dev/learn/css/layout)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can tell block from inline elements and give examples of each.
- Learners can change behaviour with `display`, including `inline-block` and `none`.
- Learners can keep text readable with `max-width` and `margin: 0 auto`.

### Purpose
Before learners move boxes around, they need to know what the browser does by default. Most layout bugs come from not knowing this.

### Things to teach
1. **Normal flow.** Use the lined paper idea. Block boxes stack down the page, inline boxes sit along a line of text.
2. **Block versus inline.** Use the paragraph with a link and bold words. Say that inline elements ignore `width` and `height`.
3. **The display property.** Use the `a.button` example with `inline-block`. Show that vertical padding then takes real space.
4. **Too wide.** Show `main { max-width: 70ch; margin: 0 auto; }` and explain `ch` as about one character.
5. **Check the type in DevTools.** Select an element, open Computed and search for `display`.

### Check understanding
- Ask: "Name two block and two inline elements." A good answer: for example `p` and `div`, `a` and `span`.
- Ask: "Why does `width: 200px` do nothing on a `span`?" A good answer: a span is inline, and inline elements ignore width.
- Ask: "Why use `max-width` rather than `width` for main content?" A good answer: it can still shrink on a phone.

### Watch for
- Choosing HTML elements for how they look. Remind them to pick for meaning, then change `display` in CSS.
- Learners who try to set `width` on inline elements and think CSS is broken. Point them to the `.tag` example.
