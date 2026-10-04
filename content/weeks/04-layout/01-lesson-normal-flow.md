---
title: Normal flow, block and inline
kind: lesson
minutes: 20
---
Before you can move boxes around, it helps to know where the browser puts them when you do nothing at all. This default arrangement is called **normal flow**.

## Normal flow: like writing on lined paper

Imagine you are writing a letter on lined paper. Paragraphs go one under the other, from top to bottom. Inside a paragraph, words go left to right, and when a line is full you continue on the next line.

The browser does the same thing. It has two main kinds of boxes:

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
- **ignore** `width` and `height`, and top and bottom margins do not push other lines away

Examples: `<a>`, `<span>`, `<strong>`, `<em>`, `<img>` (images are a special kind of inline element), `<label>`, `<button>`.

```html
<p>This is a paragraph with a <a href="#">link</a> and some <strong>bold words</strong> in it.</p>
<p>This paragraph starts on a new line, because paragraphs are block elements.</p>
```

The link and the bold words stay inside the sentence. Each paragraph starts on its own line.

> 💡 **Tip:** In DevTools, select an element and look at the **Computed** tab. Search for `display` to see whether it is `block`, `inline`, or something else.

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

`inline-block` is a nice middle ground. It is great for button-style links that sit next to each other but need proper padding.

> ⚠️ **Watch out:** Do not choose an HTML element because of how it looks. Choose it for its **meaning** (remember semantic HTML from week 2), then use CSS to change how it displays. For example, a navigation list is still a `<ul>`, even if you make it horizontal.

## Width and the "too wide" problem

Block elements stretch to fill their parent. On a huge monitor, a paragraph could become 2000px wide, which is very hard to read. A common fix is `max-width`:

```css
main {
  max-width: 70ch;
  margin: 0 auto;
  padding: 0 1rem;
}
```

`ch` is a unit roughly equal to the width of one character, so `70ch` means "about 70 characters per line", which is comfortable to read. `max-width` says "you may be narrower than this, but never wider". On a small phone, the element simply shrinks to fit.

## Why we need Flexbox and Grid

Normal flow is great for articles and documents. But many designs need things like:

- a logo on the left and menu links on the right
- three cards side by side
- a button perfectly centred in a box

You *can* hack these with older tricks, but modern CSS gives us two tools designed for the job: Flexbox and Grid. Normal flow is still happening underneath. Flexbox and Grid just give you control over a particular container.

### Try it

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

Now experiment:

1. Notice the top and bottom padding on `.button` overlaps the text around it. Add `display: inline-block;` to `.button`. What changes?
2. Add `display: inline;` to `.box`. What happens to the two boxes?
3. Add `width: 200px;` to `.tag`. Does anything happen? Why not?
4. Try `display: none;` on one element.

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
