---
title: The box model and DevTools
kind: lesson
minutes: 30
---
Picture a framed photo on a wall. There is the photo. There is a card mount around it. There is the frame. And there is empty wall between this frame and the next one.

Every element on a web page looks like that. Once you see the layers, spacing stops being a mystery. This lesson teaches the layers, and a browser tool that lets you see them.

## Every element is a box

Headings, paragraphs, links, images: the browser draws each of them as a rectangle. We call it a **box**. Each box has four layers, from the inside out:

1. **Content**: the text or image itself
2. **Padding**: space *inside* the box, between the content and the border
3. **Border**: a line around the padding (it can be invisible)
4. **Margin**: space *outside* the box, pushing other boxes away

```text
+---------------------------------------+
|                MARGIN                 |
|   +-------------------------------+   |
|   |            BORDER             |   |
|   |   +-----------------------+   |   |
|   |   |        PADDING        |   |   |
|   |   |   +---------------+   |   |   |
|   |   |   |    CONTENT    |   |   |   |
|   |   |   +---------------+   |   |   |
|   |   +-----------------------+   |   |
|   +-------------------------------+   |
+---------------------------------------+
```

Back to the framed photo:

- The **photo** is the content.
- The **mount** (the card around the photo, inside the frame) is the padding.
- The **frame** is the border.
- The **gap on the wall** between this frame and the next one is the margin.

The picture stops being true in one place. A real wall is never transparent, but a margin always is. You cannot colour it.

## Padding, border and margin in CSS

```css
.card {
  padding: 20px;
  border: 3px solid #2a7f62;
  margin: 24px;
  background-color: #f4f7f5;
}
```

The `background-color` fills the content **and** the padding. It does not fill the margin. Margin is always transparent.

### The shorthand

`padding` and `margin` can take one to four values. With four values, the order goes clockwise like a clock: **top, right, bottom, left**.

```css
.box {
  margin: 10px;                 /* all four sides */
  padding: 10px 20px;           /* top & bottom 10px, left & right 20px */
  margin: 10px 20px 30px 40px;  /* top, right, bottom, left */
}
```

You can also set one side:

```css
h2 {
  margin-top: 2rem;
  padding-left: 1rem;
}
```

> 💡 **Tip:** To remember the order, think "TRouBLe": **T**op, **R**ight, **B**ottom, **L**eft.

### Borders

A border needs a width, a style and a colour:

```css
.note {
  border: 2px dashed tomato;
  border-radius: 8px; /* rounded corners */
}
```

Common styles are `solid`, `dashed` and `dotted`. `border-radius` is not a box layer, but you will use it often for rounded corners.

### Centering a box

Give a box a width. Then set its left and right margins to `auto`. The browser shares the leftover space equally, so the box sits in the middle.

```css
.page {
  max-width: 700px;
  margin: 0 auto;
}
```

## box-sizing: a surprise to fix

Look at this CSS. How wide do you think the box is on screen?

```css
.box {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}
```

It is **350px**. That is 300 for the content, plus 20 + 20 for padding, plus 5 + 5 for the border. By default, `width` measures only the content.

This surprises everyone at first. So most developers add this rule at the top of their stylesheet:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

The `*` selector means "every element". With `border-box`, `width: 300px` means the *whole* box is 300px, including padding and border. That is much clearer to plan with.

> 🧠 **Remember:** Put the `box-sizing: border-box` rule at the top of every new stylesheet. It is a small habit that saves a lot of confusion.

## Your new best friend: DevTools

Every modern browser has **Developer Tools** (DevTools) built in. To open them, right-click any part of a page and choose **Inspect**. Or press `F12` (Windows) or `Cmd + Option + I` (Mac).

You will see two important areas:

- **Elements panel**: your HTML, as the browser sees it. Click an element to select it.
- **Styles panel**: every CSS rule that applies to the selected element.

### What you can do in the Styles panel

- **See which rules apply.** The most specific rules are at the top.
- **See which rules lost.** An overridden declaration has a ~~line through it~~. This is the quickest way to answer "why is my style not working?".
- **Turn rules on and off.** Hover over a declaration and untick its checkbox.
- **Edit values live.** Click a value and type a new one. Use the up and down arrow keys to change numbers.
- **Add new declarations.** Click inside a rule, after the last line, and type.
- **Pick colours.** Click the little colour square to open a colour picker. It also shows a contrast score.

### See the box model

Scroll down in the Styles panel, or open the **Computed** tab. You will find a diagram of the box model for the selected element. It shows the exact content size, padding, border and margin.

When you hover over an element in the Elements panel, the page highlights its layers in colour. In Chrome, content is blue, padding is green and margin is orange.

> ⚠️ **Watch out:** Changes in DevTools are temporary. When you refresh the page, they disappear. When you find something you like, copy it into your `styles.css` file.

DevTools is a safe playground. You cannot break a website by trying things there, not even someone else's. Try it on a news site you like.

## Try it

Paste this HTML into the playground:

```html
<div class="page">
  <div class="card">
    <h2>Opening hours</h2>
    <p>Monday to Friday, 8am to 4pm.</p>
  </div>
  <div class="card">
    <h2>Find us</h2>
    <p>12 Market Street, next to the library.</p>
  </div>
</div>
```

Add this CSS:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #eeeeee;
}

.page {
  max-width: 500px;
  margin: 0 auto;
}

.card {
  background-color: white;
  padding: 16px 24px;
  border: 2px solid #8b4513;
  border-radius: 10px;
  margin-bottom: 20px;
}
```

Now:

1. Open DevTools and select one of the cards. Find its box model diagram. Do the numbers match your CSS?
2. In the Styles panel, change `padding` to `40px`. What changes?
3. Untick `box-sizing` in the `*` rule. Does the card get wider?
4. Make the cards further apart by changing a margin.

<details><summary>Show answers</summary>

1. Yes. The diagram shows padding 16 (top and bottom) and 24 (left and right), and a border of 2.
2. The space between the text and the border grows, and the card gets taller. The background colour fills that space.
3. Probably not by much. The card has no fixed `width`, so it fills its parent either way. The box-sizing rule matters most when you set a `width`.
4. Increase `margin-bottom` on `.card`.

</details>

## Check your understanding

1. Name the four layers of the box model, from inside to outside.
2. What is the difference between padding and margin?
3. What does `margin: 5px 10px 15px 20px` set on each side?
4. Without `box-sizing: border-box`, how wide is a box with `width: 200px`, `padding: 10px` and `border: 1px solid`?
5. In DevTools, how can you tell that a declaration has been overridden by another rule?

<details><summary>Show answers</summary>

1. Content, padding, border, margin.
2. Padding is space inside the border (it shows the background colour). Margin is space outside the border, between this box and others.
3. Top 5px, right 10px, bottom 15px, left 20px.
4. 222px: 200 + 10 + 10 + 1 + 1.
5. It has a line through it (struck out).

</details>

## Go deeper

- [web.dev: Box model](https://web.dev/learn/css/box-model)
- [MDN: box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)
- [Chrome DevTools: View and change CSS](https://developer.chrome.com/docs/devtools/css)
- [MDN: What are browser developer tools?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
