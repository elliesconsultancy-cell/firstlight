---
title: CSS Grid
kind: lesson
minutes: 30
---
Think of an egg box or a muffin tray. It has fixed slots in rows and columns. Each egg drops into one slot, and everything lines up neatly.

CSS Grid works like that. Flexbox is great for one row or one column. Grid is for a whole gallery, with rows *and* columns that line up.

## Flexbox vs Grid in one sentence

- **Flexbox** is one-dimensional. It arranges items along **one line**: a row *or* a column.
- **Grid** is two-dimensional. It arranges items in **rows and columns at the same time**.

Flexbox is like people standing in a queue. Grid is like the muffin tray.

You will often use both on one page. Use Grid for big page sections or a gallery. Use Flexbox for small things inside, like a nav bar or a row of buttons.

## Your first grid

Like Flexbox, Grid has a **container** (the parent) and **items** (its direct children). Turn it on with `display: grid`. Then describe the columns:

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

You get three columns, each 200px wide. Six items fill two rows. You do not say how many rows. Grid makes new rows when it needs them.

## The fr unit: sharing space fairly

Fixed pixel columns do not bend. Grid has a special unit, `fr`. It means "a **fr**action of the free space".

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

Think of sharing a pizza. `2fr 1fr` means "cut it into 3 slices. The first column gets 2. The second gets 1."

## repeat(): less typing

Writing `1fr 1fr 1fr 1fr` is tiring. `repeat()` does it for you:

```css
.tray {
  grid-template-columns: repeat(4, 1fr); /* same as 1fr 1fr 1fr 1fr */
}
```

## gap

`gap` sets the space between rows and columns. Give one value for both, or two values (rows first, then columns):

```css
.tray {
  gap: 20px;        /* 20px between rows and columns */
  gap: 30px 10px;   /* 30px between rows, 10px between columns */
}
```

> 💡 **Tip:** `gap` works in Flexbox too. You learned it in the last lesson. Same idea, same name.

## A responsive grid with no media queries

Here is a famous short rule that is worth learning by heart:

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
```

In plain English: "Fit as many columns as you can. Each column is at least 220px wide. They share any extra space equally."

On a phone you get one column. On a tablet, two or three. On a large screen, four or more. The grid adapts by itself.

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

The `.card img` rule makes each image fill its card's width without stretching out of shape. We look at images more in the next lesson.

The pictures come from picsum.photos, a free service for random placeholder photos. So they do not really show bread or coffee. On a real site, use your own photos and describe them in the `alt` text.

## Try it

1. Put the card gallery into the playground. Resize the window. Count how many columns you get at different widths.
2. Replace the `grid-template-columns` value with `repeat(2, 1fr)`. Resize again. What is the difference?
3. Try `1fr 2fr` instead. Which column is wider?
4. Change the `gap` to `40px 10px`.
5. In DevTools, click the **grid** badge next to `.gallery`. You see the grid lines drawn on the page.

<details><summary>Show answers</summary>

1. The number of columns goes up on wide windows and down on narrow ones. On a phone-sized window you get one column.
2. You always get two columns, however wide or narrow the window is.
3. The second column is twice as wide as the first. With `1fr 2fr`, the cards fill two columns, so they sit in a repeating pattern of narrow and wide.
4. The space between rows becomes 40px. The space between columns becomes 10px.
5. You see lines that mark each row and column.

</details>

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

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can say when to use Grid and when to use Flexbox.
- Learners can write `grid-template-columns` using `fr` and `repeat()`, with `gap`.
- Learners can build a card gallery that adapts to screen width.

### Purpose
Galleries and page sections need rows and columns that line up. Grid is the tool for that, and the assignment uses it for the services section.

### Things to teach
1. **One line or two dimensions.** Flexbox is a queue, Grid is a muffin tray. Say that one page often uses both.
2. **The fr unit.** Start with `.tray` and three 200px columns, then change to `1fr 1fr 1fr`. Show `2fr 1fr` as a main area and sidebar.
3. **repeat() and gap.** Show `repeat(4, 1fr)` and the two-value `gap` (rows first, then columns).
4. **The auto-fit rule.** Write `repeat(auto-fit, minmax(220px, 1fr))` and read it in plain English. Resize the bakery gallery and count the columns.
5. **Grid overlay.** Click the grid badge in DevTools to show the lines.

### Check understanding
- Ask: "What is the main difference between Flexbox and Grid?" A good answer: Flexbox is one direction, Grid is rows and columns together.
- Ask: "Do you have to say how many rows?" A good answer: no, Grid adds rows as needed.
- Ask: "What does `repeat(4, 1fr)` mean?" A good answer: four equal columns.

### Watch for
- Putting `display: grid` on the cards, not the parent. Remind them only direct children are items.
- Reading the placeholder photos as real content. The images are random, so real sites need their own photos and good `alt` text.
