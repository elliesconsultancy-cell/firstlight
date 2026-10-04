---
title: What is CSS?
kind: lesson
minutes: 20
---
Your HTML page works, but it probably looks a bit plain: black text, white background, blue links. In this lesson you will write your first CSS and change that.

## HTML is the "what", CSS is the "how it looks"

Think about a cake. The HTML is the cake itself: the sponge, the layers, the filling. It says *what* is there. CSS is the icing and decoration. It says *how it looks*: the colour, the size, the pattern on top.

Keeping these two jobs separate is very useful. You can completely change the look of a website without touching the HTML at all. You only change the CSS.

## The shape of a CSS rule

A piece of CSS is called a **rule** (you may also hear "ruleset"). Here is one:

```css
h1 {
  color: darkgreen;
  font-size: 40px;
}
```

Let's name each part:

- `h1` is the **selector**. It says *which* elements this rule is for. Here, every `<h1>` on the page.
- Inside the curly braces `{ }` are the **declarations**.
- `color` is a **property**. It is the thing you want to change.
- `darkgreen` is the **value**. It is what you want to change it to.
- Each declaration ends with a semicolon `;`.

A helpful way to read it out loud: "For every h1, set the colour to dark green and the font size to 40 pixels."

> ⚠️ **Watch out:** CSS uses American spelling. It is `color`, not `colour`, and `center`, not `centre`. If you spell it the British way, the browser will quietly ignore it.

## Three ways to add CSS to a page

There are three places you can write CSS. You should know all three, but you will mostly use the last one.

### 1. Inline styles

You can put CSS directly on an element with the `style` attribute:

```html
<p style="color: purple; font-weight: bold;">This paragraph is purple and bold.</p>
```

This is quick, but it gets messy fast. If you have 30 paragraphs, you need to write it 30 times. Avoid this for real work.

### 2. A `<style>` element

You can put CSS rules inside a `<style>` element, usually in the `<head>` of your page:

```html
<style>
  p {
    color: purple;
  }
</style>
<p>This paragraph is purple.</p>
<p>So is this one, with no extra work.</p>
```

This is better, because one rule styles every paragraph. But the CSS only works on this one page.

### 3. An external stylesheet (the best way)

Most real websites keep their CSS in a separate file, usually called something like `styles.css`. Then every HTML page links to it with a `<link>` element inside `<head>`:

```html
<!-- inside index.html, in the <head> -->
<link rel="stylesheet" href="styles.css">
```

And in `styles.css` you write only CSS, with no `<style>` tags:

```css
p {
  color: purple;
}
```

Why is this the best way?

- **One file styles many pages.** Change a colour once, and every page updates.
- **It is tidy.** HTML stays about structure, CSS stays about looks.
- **The browser can remember it.** It downloads the stylesheet once and reuses it, so pages load faster.

> 💡 **Tip:** The `href` is a path, just like a link. If `styles.css` is in the same folder as `index.html`, write `href="styles.css"`. If it is in a folder called `css`, write `href="css/styles.css"`.

## A small folder setup

Here is a simple way to organise a project:

```text
about-me/
├── index.html
└── styles.css
```

And a full, minimal `index.html` that uses the stylesheet:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My styled page</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Hello, CSS!</h1>
    <p>This page gets its looks from styles.css.</p>
  </body>
</html>
```

## Comments in CSS

You can leave notes for yourself in CSS. The browser ignores anything between `/*` and `*/`:

```css
/* Main heading styles */
h1 {
  color: navy; /* a dark blue */
}
```

Comments are great for explaining *why* you did something, or for turning a rule off for a moment while you test.

## When CSS does not work

Everyone writes broken CSS sometimes. When nothing changes, check these things first:

1. Is the `<link>` inside `<head>`, and is the file name spelled exactly right (including capital letters)?
2. Did you save both files and refresh the browser?
3. Is every `{` closed with a `}`?
4. Does every declaration have a colon `:` between property and value, and a semicolon `;` at the end?
5. Is the property spelled correctly (American spelling)?

> 🧠 **Remember:** The browser does not show an error message for broken CSS. It just skips the part it does not understand. So if something does not change, look closely at the spelling and punctuation.

### Try it

Paste this HTML into the playground:

```html
<h1>Bolton Community Garden</h1>
<p>We grow vegetables, flowers and friendships.</p>
<p>Everyone is welcome on Saturday mornings.</p>
```

Now add this CSS and see what happens:

```css
body {
  background-color: honeydew;
}

h1 {
  color: seagreen;
}

p {
  color: dimgray;
  font-size: 20px;
}
```

Then experiment:

1. Change `seagreen` to another colour name, like `tomato` or `steelblue`.
2. Make the heading bigger with `font-size`.
3. Break the CSS on purpose: remove a semicolon or a `}`. What happens? Put it back.

## Check your understanding

1. In the rule `p { color: red; }`, which part is the selector, which is the property and which is the value?
2. Name the three ways to add CSS to a page.
3. Why is an external stylesheet usually the best choice?
4. Where does the `<link rel="stylesheet">` element go in your HTML?
5. You wrote `colour: blue;` and nothing changed. Why?

<details><summary>Show answers</summary>

1. `p` is the selector, `color` is the property, `red` is the value.
2. Inline styles (the `style` attribute), a `<style>` element, and an external stylesheet linked with `<link>`.
3. One file can style many pages, the HTML and CSS stay separate and tidy, and the browser can reuse the file so pages load faster.
4. Inside the `<head>` element.
5. CSS uses American spelling. The property is `color`. The browser ignores properties it does not recognise.

</details>

## Go deeper

- [MDN: CSS first steps](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics)
- [web.dev: Learn CSS](https://web.dev/learn/css)
- [MDN: The link element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
