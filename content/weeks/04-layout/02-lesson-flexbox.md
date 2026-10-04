---
title: Flexbox
kind: lesson
minutes: 35
---
Flexbox is the tool you will reach for whenever you want to line things up in a row or a column, space them out, or centre them. By the end of this lesson you will build a small navigation bar with it.

## Containers and items

Flexbox always involves two roles:

- The **flex container** is the parent. You turn it on with `display: flex`.
- The **flex items** are the *direct children* of that container. They are the things that get arranged.

Think of a bookshelf. The shelf is the container. The books are the items. You decide whether the books stand in a row or stack in a pile, whether they are pushed to one end or spread out evenly.

```html
<div class="shelf">
  <div class="book">A</div>
  <div class="book">B</div>
  <div class="book">C</div>
</div>
```

```css
.shelf {
  display: flex;
  background-color: #f1e3d3;
  padding: 10px;
}

.book {
  background-color: #8b4513;
  color: white;
  padding: 20px;
}
```

With just `display: flex`, the three blocks that normally stack now sit side by side in a row.

> 🧠 **Remember:** Flexbox only affects **direct children**. Grandchildren (elements inside the items) are not flex items, unless you make their parent a flex container too.

## flex-direction: row or column?

Flex items run along a line called the **main axis**. `flex-direction` sets which way it goes:

```css
.shelf {
  display: flex;
  flex-direction: row;     /* default: left to right */
}

.pile {
  display: flex;
  flex-direction: column;  /* top to bottom */
}
```

The other direction, across the main axis, is called the **cross axis**. If the main axis is a row, the cross axis goes up and down.

## justify-content: spacing along the main axis

`justify-content` decides where items go along the main axis, and what to do with leftover space.

```css
.shelf {
  display: flex;
  justify-content: space-between;
}
```

Common values:

| Value | Result |
| --- | --- |
| `flex-start` | items bunched at the start (default) |
| `center` | items bunched in the middle |
| `flex-end` | items bunched at the end |
| `space-between` | first item at the start, last at the end, equal gaps between |
| `space-around` | equal space around each item |
| `space-evenly` | exactly equal gaps everywhere, including the edges |

## align-items: lining up on the cross axis

`align-items` decides where items sit on the cross axis. In a row, that means top, middle or bottom.

```css
.shelf {
  display: flex;
  align-items: center;
  height: 150px;
}
```

Common values are `stretch` (the default, items fill the height), `flex-start`, `center` and `flex-end`.

> 💡 **Tip:** The famous "how do I centre something?" problem is solved with three lines on the parent: `display: flex; justify-content: center; align-items: center;`

## gap: space between items

Instead of adding margins to each item, put `gap` on the container:

```css
.shelf {
  display: flex;
  gap: 12px;
}
```

Gap only adds space *between* items, never on the outside edges. Clean and simple.

## flex-wrap: what if there is not enough room?

By default, flex items stay on one line and squash together. With `flex-wrap: wrap`, they move onto a new line when they run out of space, like words in a paragraph.

```css
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
```

This is very useful on phones.

## Growing and shrinking items

Items can also be told to fill leftover space with `flex-grow`:

```css
.search-input {
  flex-grow: 1; /* take all the spare space */
}
```

You will often see the shorthand `flex: 1`, which means "share the spare space equally with the other `flex: 1` items".

## Mini project: a navigation bar

A typical nav bar has a logo on the left and links on the right. Here is the HTML. Notice the links are still a list, because semantically they *are* a list of links.

```html
<header class="site-header">
  <a href="#" class="logo">Crumbs Bakery</a>
  <nav>
    <ul class="nav-links">
      <li><a href="#">Menu</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Visit us</a></li>
    </ul>
  </nav>
</header>
```

And the CSS:

```css
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 24px;
  background-color: #5c3d2e;
}

.logo {
  color: #fff3e0;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #fff3e0;
  text-decoration: none;
}

.nav-links a:hover,
.nav-links a:focus {
  text-decoration: underline;
}
```

There are **two** flex containers here:

1. `.site-header` holds two items: the logo and the `nav`. `space-between` pushes them to opposite ends, and `align-items: center` lines them up vertically.
2. `.nav-links` holds the three `li` items, putting them in a row with a gap.

`list-style: none` removes the bullet points, and `margin: 0; padding: 0` removes the list's default indent.

### Try it

1. Put the nav bar HTML and CSS above into the playground.
2. Change `justify-content` on `.site-header` to `center`. Then try `flex-end`. Then go back to `space-between`.
3. Add `flex-direction: column;` to `.nav-links`. What happens? Put it back to a row.
4. Make the playground window very narrow. What does `flex-wrap: wrap` do for the header?
5. Open DevTools and select `.site-header`. Click the small **flex** badge next to it in the Elements panel to see an overlay of the flex layout.

> ⚠️ **Watch out:** `justify-content` and `align-items` swap their visual direction when you change `flex-direction` to `column`. `justify-content` always follows the main axis, wherever it points.

## Check your understanding

1. Which element gets `display: flex`: the parent or the children?
2. What is the main axis when `flex-direction: column`?
3. Which property would you use to push a logo to the left and the links to the right?
4. How do you centre one item both horizontally and vertically inside a box?
5. What does `flex-wrap: wrap` do?

<details><summary>Show answers</summary>

1. The parent (the container). Its direct children become flex items.
2. Top to bottom (vertical).
3. `justify-content: space-between` on their shared parent.
4. On the parent: `display: flex; justify-content: center; align-items: center;` (and give the parent some height).
5. It lets items move onto a new line when there is not enough room, instead of squashing them all onto one line.

</details>

## Go deeper

- [Flexbox Froggy, a game for learning Flexbox](https://flexboxfroggy.com/)
- [CSS-Tricks: A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [web.dev: Flexbox](https://web.dev/learn/css/flexbox)
- [MDN: Basic concepts of flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
