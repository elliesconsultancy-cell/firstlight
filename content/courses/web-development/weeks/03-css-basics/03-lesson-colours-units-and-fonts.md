---
title: Colours, units and fonts
kind: lesson
minutes: 30
---
Walk into two cafes. One has soft colours, small warm lights and a handwritten menu. The other has bright colours and big bold signs. You feel different in each place, before anyone says a word.

Websites work the same way. Colours, sizes and fonts set the mood. In this lesson you learn how to describe each one in CSS.

## Colours

CSS gives you several ways to write a colour. All of them give a colour on the screen. Choose the one you like best.

### Colour names

There are about 140 named colours, like `tomato`, `navy`, `seagreen` and `whitesmoke`. They are readable, but you cannot choose exact shades.

```css
h1 {
  color: tomato;
}
```

### Hex codes

A hex code starts with `#` and has six characters, like `#1e90ff`. The three pairs say how much **r**ed, **g**reen and **b**lue light to mix.

You do not work these out yourself. Colour-picker tools and designers give them to you.

```css
body {
  background-color: #fdf6ec;
  color: #2d2d2d;
}
```

### rgb() and transparency

`rgb()` gives the same red, green and blue mix as numbers from 0 to 255. Add a fourth number to make it see-through. 0 is invisible. 1 is solid.

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

> ⚠️ **Watch out:** Light grey text on a white background may look stylish, but many people cannot read it. Check that your text has strong **contrast** with its background. DevTools shows a contrast score when you click a colour.

### Building a palette

A **palette** is the small set of colours a website uses again and again. A good palette has:

1. A **background** colour (often light)
2. A **text** colour (often dark)
3. A **main** or brand colour (for headings and buttons)
4. An **accent** colour (for links, hover states and highlights)

You can save these in **custom properties** (also called CSS variables). Then you type each colour only once:

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

Think of a paint shop. You pick the colour once and get a labelled tin. Each room uses that tin.

If you change `--main` later, every place that uses it updates. This will help you in your assignment.

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

Here is a picture to help. `px` is like "10 centimetres": always the same. `rem` is like "two hand-widths": it depends on the size of the hand. `%` is like "half the table". `vw` is like "a tenth of the room".

> 💡 **Tip:** Use `rem` for font sizes. Some people set a bigger text size in their browser because they need it. `rem` respects that choice. `px` ignores it.

## Fonts and typography

**Typography** means how text looks and how readable it is.

### font-family

`font-family` chooses the typeface. You give a list. The browser uses the first font it has. If it has none, it moves to the next:

```css
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
}
```

Always end the list with a general family: `serif`, `sans-serif` or `monospace`. Then there is always a fallback.

### Using a web font

Some fonts are not on everyone's computer. You can load one from a free service like Google Fonts. You choose a font on the website. It gives you `<link>` lines for your `<head>`. Put them **before** your own stylesheet:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
```

Then use the font in your CSS:

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

> 🧠 **Remember:** Readable text has a size of at least `1rem`, a `line-height` of about 1.5 to 1.7, and lines that are not too long. Two fonts on a page (one for headings, one for body text) is plenty.

## Try it

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

<details><summary>Show answers</summary>

1. Every rule that uses `var(...)` changes. You edited each colour in only one place.
2. The title grows and shrinks with the window. `vw` is a percentage of the window width.
3. The title now stays the same size. `rem` does not depend on the window width.

</details>

## Check your understanding

1. What is the difference between `color` and `background-color`?
2. Your base font size is 16px. How big is `1.5rem`?
3. What does `width: 50%` mean?
4. Why should a `font-family` list end with something like `sans-serif`?
5. What is the benefit of storing colours in custom properties like `--main`?

<details><summary>Show answers</summary>

1. `color` sets the text colour. `background-color` sets the colour behind the element.
2. 24px (1.5 × 16).
3. The element is half as wide as its parent element.
4. It is a fallback. If none of the named fonts are available, the browser still uses a sensible font of the right type.
5. You write each colour once and reuse it. If you change it, every place using it updates. This keeps your palette consistent.

</details>

## Go deeper

- [web.dev: Color](https://web.dev/learn/css/color)
- [web.dev: Sizing units](https://web.dev/learn/css/sizing)
- [web.dev: Typography](https://web.dev/learn/css/typography)
- [MDN: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
