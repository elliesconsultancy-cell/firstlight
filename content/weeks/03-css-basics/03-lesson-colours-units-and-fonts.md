---
title: Colours, units and fonts
kind: lesson
minutes: 30
---
Most of what makes a page feel friendly, calm or exciting comes down to three things: its colours, its sizes and its fonts. In this lesson you will learn how to describe each one in CSS.

## Colours

CSS gives you several ways to write a colour. They all end up as a colour on the screen. You just choose the one that is easiest for you.

### Colour names

There are about 140 named colours, like `tomato`, `navy`, `seagreen` and `whitesmoke`. They are easy to read but you cannot choose exact shades.

```css
h1 {
  color: tomato;
}
```

### Hex codes

A hex code starts with `#` and has six characters, like `#1e90ff`. The pairs describe how much **r**ed, **g**reen and **b**lue light to mix. You do not need to work these out yourself. Designers and colour-picker tools give them to you.

```css
body {
  background-color: #fdf6ec;
  color: #2d2d2d;
}
```

### rgb() and transparency

`rgb()` describes the same red, green and blue mix with numbers from 0 to 255. Add a fourth number to make it see-through: 0 is invisible, 1 is solid.

```css
.banner {
  background-color: rgb(30 144 255);
}

.overlay {
  background-color: rgb(0 0 0 / 0.5); /* black at 50% */
}
```

### Two colour properties to know

- `color` changes the **text** colour.
- `background-color` changes the colour **behind** the element.

> ⚠️ **Watch out:** Light grey text on a white background might look stylish, but many people cannot read it. Always check that your text has strong **contrast** with its background. DevTools can show you a contrast score when you click a colour.

### Building a palette

Good websites usually use a small set of colours again and again. A simple palette has:

1. A **background** colour (often light)
2. A **text** colour (often dark)
3. A **main** or brand colour (for headings, buttons)
4. An **accent** colour (for links, hover states, highlights)

You can save these in **custom properties** (also called CSS variables) so you only type them once:

```css
:root {
  --bg: #fdf6ec;
  --text: #2d2d2d;
  --main: #8b4513;
  --accent: #e07a1f;
}

body {
  background-color: var(--bg);
  color: var(--text);
}

h1 {
  color: var(--main);
}
```

If you change `--main` later, every place that uses it updates. This is very handy for your assignment.

## Units: how big is big?

Many CSS properties need a size: font sizes, widths, spacing. A size is a number plus a **unit**. Here are the four you will use most.

| Unit | What it means | Good for |
| --- | --- | --- |
| `px` | pixels, a fixed size | borders, small details |
| `rem` | a multiple of the page's base font size (usually 16px) | font sizes, spacing |
| `%` | a percentage of the parent element | widths |
| `vw` | a percentage of the browser window's width (`1vw` = 1%) | big headings, full-width sections |

```css
h1 {
  font-size: 2.5rem;   /* 2.5 × 16px = 40px */
}

.box {
  width: 50%;          /* half the width of its parent */
  border: 2px solid black;
}

.hero-title {
  font-size: 8vw;      /* grows and shrinks with the window */
}
```

> 💡 **Tip:** Prefer `rem` for font sizes. Some people set a bigger default text size in their browser because they need it. `rem` respects that choice, while `px` ignores it.

An analogy: `px` is like saying "10 centimetres". `rem` is like saying "two hand-widths": it depends on the size of the hand. `%` is like "half the table", and `vw` is like "a tenth of the room".

## Fonts and typography

**Typography** means how text looks and how easy it is to read.

### font-family

`font-family` chooses the typeface. You give a list. The browser uses the first one it has, and falls back to the next:

```css
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
}
```

Always end with a general family like `serif`, `sans-serif` or `monospace`, so there is always a fallback.

### Using a web font

To use a font that is not already on everyone's computer, you can load one from a free service like Google Fonts. You choose a font on the website, and it gives you a `<link>` to put in your `<head>`, **before** your own stylesheet:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
```

Then use it in your CSS:

```css
body {
  font-family: "Poppins", sans-serif;
}
```

### Other text properties

```css
p {
  font-size: 1.125rem;     /* slightly larger than default */
  line-height: 1.6;        /* space between lines */
  font-weight: 400;        /* 400 is normal, 700 is bold */
}

h1 {
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

a {
  text-decoration: none;   /* removes the underline */
}
```

> 🧠 **Remember:** Readable text usually has a size of at least `1rem`, a `line-height` around 1.5 to 1.7, and lines that are not too long. Two fonts on a page (one for headings, one for body) is plenty.

### Try it

Paste this HTML into the playground:

```html
<header class="hero">
  <h1 class="hero-title">Spokes & Sprockets</h1>
  <p>Friendly bike repairs in the town centre.</p>
</header>
<p>Bring your bike in any weekday. Most repairs are done the same day.</p>
<a href="#">See our prices</a>
```

Then add this CSS:

```css
:root {
  --bg: #f4f7f5;
  --text: #1f2a24;
  --main: #2a7f62;
  --accent: #f2a541;
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: Arial, sans-serif;
  font-size: 1.125rem;
  line-height: 1.6;
}

.hero {
  background-color: var(--main);
  color: white;
  text-align: center;
}

.hero-title {
  font-size: 6vw;
  margin: 0;
}

a {
  color: var(--main);
  font-weight: 700;
}

a:hover {
  color: var(--accent);
}
```

Now experiment:

1. Change the four colours in `:root` to make your own palette. Watch the whole page change.
2. Make the browser window narrower and wider. What happens to the title? Why?
3. Change `.hero-title` to `font-size: 3rem`. Resize again. What is different?

## Check your understanding

1. What is the difference between `color` and `background-color`?
2. Your base font size is 16px. How big is `1.5rem`?
3. What does `width: 50%` mean?
4. Why should a `font-family` list end with something like `sans-serif`?
5. What is the benefit of storing colours in custom properties like `--main`?

<details><summary>Show answers</summary>

1. `color` sets the text colour, `background-color` sets the colour behind the element.
2. 24px (1.5 × 16).
3. The element is half as wide as its parent element.
4. It is a fallback. If none of the named fonts are available, the browser still uses a sensible font of the right type.
5. You write each colour once and reuse it. If you change it, every place using it updates, which keeps the palette consistent.

</details>

## Go deeper

- [web.dev: Color](https://web.dev/learn/css/color)
- [web.dev: Sizing units](https://web.dev/learn/css/sizing)
- [web.dev: Typography](https://web.dev/learn/css/typography)
- [MDN: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
