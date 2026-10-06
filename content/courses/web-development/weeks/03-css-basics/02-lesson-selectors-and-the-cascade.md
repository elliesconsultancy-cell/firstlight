---
title: Selectors and the cascade
kind: lesson
minutes: 30
---
Imagine you are a teacher. You say, "Everyone, stand up." The whole room stands. Then you say, "Only the people wearing a red badge, stand up." Now only some people stand.

CSS works the same way. A **selector** tells the browser *which* elements get your style. Some selectors pick everyone. Others pick only a few.

In this lesson you learn the most useful selectors. You also learn what happens when two rules argue about the same element.

## Element selectors

The simplest selector is the name of an HTML element. It picks **every** element of that type.

```css
p {
  line-height: 1.6;
}
```

Use it for general styles, like how all paragraphs or all links should look.

## Class selectors

Often you want to style only *some* elements. Give them a **class** in your HTML. Then select the class in CSS with a dot `.` in front.

```html
<p>A normal paragraph.</p>
<p class="highlight">An important paragraph.</p>
<p class="highlight">Another important one.</p>
```

```css
.highlight {
  background-color: lightyellow;
  border-left: 4px solid orange;
}
```

A class is like a name badge at an event. Many people can wear a badge that says "Volunteer". Then you can say, "All volunteers, please come to the front."

An element can have more than one class. Separate them with spaces:

```html
<p class="highlight big">I have two classes.</p>
```

> 💡 **Tip:** You will use classes most. Name them for *what the thing is*, like `.card` or `.warning`. Do not name them for *how it looks*, like `.red-text`. Then the name still makes sense if you change the colour later.

## ID selectors

An **id** is like a passport number. Only one element on the page should have it. In CSS you select it with a hash `#`.

```html
<header id="site-header">Firstlight Bakery</header>
```

```css
#site-header {
  background-color: saddlebrown;
  color: white;
}
```

IDs are useful for links that jump to a part of the page (`href="#contact"`). For styling, most developers prefer classes. You will see why in the section on specificity.

## Descendant selectors

Sometimes you want to style an element only when it is *inside* another element. Put a space between two selectors:

```css
nav a {
  color: white;
  text-decoration: none;
}
```

Read it as "any `a` that is somewhere inside a `nav`". Links in the main text are not changed.

It is like saying "the children in the blue classroom", not "all children in the school".

## Grouping selectors

Several selectors can share the same styles. List them with commas:

```css
h1, h2, h3 {
  font-family: Georgia, serif;
}
```

## Pseudo-classes like `:hover`

A **pseudo-class** picks an element when it is in a special *state*. It starts with a colon `:`.

```css
a:hover {
  color: crimson;
  text-decoration: underline wavy;
}
```

`:hover` applies when the mouse is over the element. Here are some others:

- `:focus` when an element is selected with the keyboard (for example, pressing Tab to reach a link or input)
- `:visited` for links the user has already visited
- `:first-child` for the first element inside its parent

> ⚠️ **Watch out:** Not everyone uses a mouse, and phones do not really "hover". When you add a `:hover` style, add the same style for `:focus`. Then keyboard users get the same help: `a:hover, a:focus { ... }`.

## The cascade: who wins?

What if two rules set the same property on the same element?

```css
p {
  color: blue;
}

p {
  color: green;
}
```

The paragraph is **green**. When two rules are equally strong, **the later one wins**.

This is the *cascade* in Cascading Style Sheets. Think of painting a wall. You see the last coat of paint.

## Specificity: a more specific rule is stronger

Order is not the whole story. A more **specific** selector beats a less specific one, *even if it comes earlier*.

Try to guess first. What colour is this text?

```html
<p class="intro">Which colour am I?</p>
```

```css
.intro {
  color: purple;
}

p {
  color: orange;
}
```

The text is **purple**. The class selector is more specific than the element selector. It wins, even though the `p` rule comes later.

Imagine each selector type has a different strength:

| Selector type | Example | Strength |
| --- | --- | --- |
| Element | `p`, `h1` | weak |
| Class or pseudo-class | `.intro`, `:hover` | medium |
| ID | `#site-header` | strong |
| Inline style | `style="..."` | very strong |

When rules disagree, the browser compares strength first. Only when the strength is equal does it look at which rule came last.

Think of asking for directions. "Go to the shop" (element) is vague. "Go to the bakery on King Street" (class) is clearer. "Go to 12 King Street" (id) is the most exact, so that instruction wins.

> 🧠 **Remember:** If your style does not show up, another rule is probably more specific, or comes later. DevTools shows you which rule won. We use it later this week.

Many developers avoid ids for styling. An id is so strong that it is hard to override later. Classes keep things flexible.

## Inheritance

Some properties, like `color` and `font-family`, are **inherited**. This means children copy them from their parent. Set them on `body`, and the elements inside use them too, unless another rule says otherwise.

```css
body {
  font-family: Arial, sans-serif;
  color: #333;
}
```

Now almost all text on the page uses Arial and dark grey. One rule did it.

Properties about boxes, like `border` or `padding`, are not inherited.

## Try it

Paste this HTML into the playground:

```html
<nav>
  <a href="#">Home</a>
  <a href="#">Menu</a>
  <a href="#">Contact</a>
</nav>
<h1 id="title">Daily Specials</h1>
<p>Fresh bread every morning.</p>
<p class="special">Today: cinnamon rolls!</p>
<p>Open until 4pm.</p>
<a href="#">Read our story</a>
```

Then add this CSS:

```css
nav {
  background-color: #2b2b2b;
  padding: 10px;
}

nav a {
  color: white;
  margin-right: 12px;
}

.special {
  font-weight: bold;
  color: darkorange;
}

p {
  color: gray;
}

a:hover,
a:focus {
  color: gold;
}
```

Now explore:

1. Why is the "cinnamon rolls" paragraph orange and not gray, even though `p` comes later?
2. The "Read our story" link is *not* white. Why?
3. Add `#title { color: teal; }` and then `h1 { color: red; }` after it. Which colour wins, and why?

<details><summary>Show answers</summary>

1. `.special` is a class. It is more specific than `p`, so it wins.
2. The white rule is `nav a`. That link is not inside the `nav`, so the rule does not reach it.
3. Teal. An id is stronger than an element selector, even when the element rule comes later.

</details>

## Check your understanding

1. How do you select all elements with `class="card"`? And an element with `id="menu"`?
2. What does the selector `footer p` select?
3. Two rules have the same selector and set different colours. Which one wins?
4. A `.note` rule says `color: blue` and a later `p` rule says `color: red`. What colour is `<p class="note">`?
5. Why should you add a `:focus` style whenever you add a `:hover` style?

<details><summary>Show answers</summary>

1. `.card { }` for the class and `#menu { }` for the id.
2. Every `<p>` element that is inside a `<footer>` element.
3. The one that comes later in the stylesheet (the cascade).
4. Blue. A class selector is more specific than an element selector, so it wins even though it comes first.
5. Keyboard users and touch-screen users do not hover. `:focus` gives them the same visual help when they move to a link or button.

</details>

## Go deeper

- [MDN: CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)
- [web.dev: Specificity](https://web.dev/learn/css/specificity)
- [web.dev: The cascade](https://web.dev/learn/css/the-cascade)
- [CSS Diner, a selector game](https://flukeout.github.io/)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
