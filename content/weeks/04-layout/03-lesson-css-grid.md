---
title: CSS Grid
kind: lesson
minutes: 30
---
Flexbox is brilliant for a single row or column. But what about a whole gallery, with rows *and* columns that line up neatly? That is what CSS Grid is for.

## Flexbox vs Grid in one sentence

- **Flexbox** is one-dimensional: it arranges items along **one line** (a row *or* a column).
- **Grid** is two-dimensional: it arranges items in **rows and columns at the same time**.

Think of Flexbox like people standing in a queue. Grid is like an egg box or a muffin tray: there are fixed slots in rows and columns, and each item drops into a slot.

You will often use both in one page: Grid for the big page sections or a gallery, Flexbox for the small things inside, like a nav bar or a row of buttons.

## Your first grid

Like Flexbox, Grid has a **container** (the parent) and **items** (its direct children). Turn it on with `display: grid`, then describe the columns:

```html
<div class="tray">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
  <div class="cell">5</div>
  <div class="cell">6</div>
</div>
```

```css
.tray {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  gap: 10px;
}

.cell {
  background-color: #dbe9f4;
  padding: 20px;
  text-align: center;
}
```

You get three columns, each 200px wide. Six items fill two rows automatically. You do not have to say how many rows: Grid creates new rows as needed.

## The fr unit: sharing space fairly

Fixed pixel columns are not flexible. Grid has a special unit, `fr`, which means "a **fr**action of the free space".

```css
.tray {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
```

Now the three columns share the width equally, however wide the container is. You can also share unequally:

```css
.layout {
  display: grid;
  grid-template-columns: 2fr 1fr; /* main area twice as wide as sidebar */
}
```

Think of `fr` like sharing a pizza. `2fr 1fr` means "cut it into 3 slices: 2 for the first column, 1 for the second".

## repeat(): less typing

Writing `1fr 1fr 1fr 1fr` gets boring. `repeat()` does it for you:

```css
.tray {
  grid-template-columns: repeat(4, 1fr); /* same as 1fr 1fr 1fr 1fr */
}
```

## gap

`gap` sets the space between rows and columns. You can give one value for both, or two values (rows first, then columns):

```css
.tray {
  gap: 20px;        /* 20px between rows and columns */
  gap: 30px 10px;   /* 30px between rows, 10px between columns */
}
```

> 💡 **Tip:** `gap` works in Flexbox too. You learned it last lesson. Same idea, same name.

## A responsive grid with no media queries

Here is a famous one-liner that is worth learning by heart:

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
```

In plain English: "Fit as many columns as you can. Each column must be at least 220px wide, and they share any extra space equally." On a phone you get one column. On a tablet, two or three. On a large screen, four or more. The grid adapts by itself.

> 🧠 **Remember:** `repeat(auto-fit, minmax(MIN, 1fr))` gives you a gallery that adapts to any screen size.

## Mini project: a card gallery

Let's build a gallery of products for a bakery. Each card has an image, a heading and a short description.

```html
<section class="gallery">
  <article class="card">
    <img src="https://picsum.photos/seed/sourdough/400/300" alt="Placeholder photo for the sourdough loaf">
    <h3>Sourdough loaf</h3>
    <p>Slow-rise, crusty and chewy. Baked every morning.</p>
  </article>
  <article class="card">
    <img src="https://picsum.photos/seed/soup/400/300" alt="Placeholder photo for the seasonal soup">
    <h3>Seasonal soup</h3>
    <p>Made with vegetables from the local market.</p>
  </article>
  <article class="card">
    <img src="https://picsum.photos/seed/coffee/400/300" alt="Placeholder photo for the coffee">
    <h3>Coffee</h3>
    <p>Locally roasted beans, served any way you like.</p>
  </article>
  <article class="card">
    <img src="https://picsum.photos/seed/tart/400/300" alt="Placeholder photo for the fruit tart">
    <h3>Fruit tart</h3>
    <p>Buttery pastry filled with whatever fruit is in season.</p>
  </article>
</section>
```

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #fff8f0;
  padding: 20px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  background-color: white;
  border: 1px solid #e3d5c5;
  border-radius: 10px;
  padding: 12px;
}

.card img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 6px;
}

.card h3 {
  margin: 12px 0 4px;
  color: #5c3d2e;
}
```

The `.card img` rule makes each image fill its card's width without stretching out of shape. We will look at images more closely in the next lesson. (The pictures come from picsum.photos, a free service for random placeholder photos, so they will not really show bread or coffee. In a real site you would use your own photos and describe them in the `alt` text.)

### Try it

1. Put the card gallery into the playground. Resize the window. Count how many columns you get at different widths.
2. Replace the `grid-template-columns` value with `repeat(2, 1fr)`. Resize again. What is the difference?
3. Try `1fr 2fr` instead. Which column is wider?
4. Change the `gap` to `40px 10px`.
5. In DevTools, click the **grid** badge next to `.gallery` to see the grid lines drawn on the page.

## Check your understanding

1. What is the main difference between Flexbox and Grid?
2. What does `grid-template-columns: 1fr 1fr 1fr` create?
3. What is a shorter way to write `1fr 1fr 1fr 1fr`?
4. Do you need to tell Grid how many rows to make?
5. In plain words, what does `repeat(auto-fit, minmax(200px, 1fr))` do?

<details><summary>Show answers</summary>

1. Flexbox arranges items in one direction (a row or a column). Grid arranges items in rows and columns at the same time.
2. Three columns that share the available width equally.
3. `repeat(4, 1fr)`.
4. No. Grid creates as many rows as it needs to fit all the items.
5. It makes as many columns as will fit, each at least 200px wide, and shares any leftover space equally between them. The number of columns changes with the screen size.

</details>

## Go deeper

- [CSS Grid Garden, a game for learning Grid](https://cssgridgarden.com/)
- [CSS-Tricks: A complete guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [web.dev: Grid](https://web.dev/learn/css/grid)
- [MDN: Basic concepts of grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
