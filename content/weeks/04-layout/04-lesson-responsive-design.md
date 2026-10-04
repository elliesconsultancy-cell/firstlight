---
title: Responsive design
kind: lesson
minutes: 35
---
People will visit your website on a small phone on the bus, on a laptop at work, and maybe on a big TV. Responsive design means one website that rearranges itself to look good on all of them.

## Water takes the shape of its container

A famous piece of advice for web designers is "be like water". Pour water into a cup and it becomes cup-shaped. Pour it into a bowl and it becomes bowl-shaped. A responsive website does the same: it fits whatever screen it is poured into.

You already know some tools for this: `%`, `fr`, `max-width` and `flex-wrap` all help layouts bend instead of break. In this lesson we add three more things:

1. The **viewport meta tag**
2. **Flexible images**
3. **Media queries**, with a **mobile-first** approach

## Step 1: the viewport meta tag

Without help, phone browsers pretend to be a wide desktop screen (about 980px), then shrink the whole page down so it is tiny and unreadable. This line in your `<head>` tells the phone: "use your real width, and don't zoom out":

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

> 🧠 **Remember:** Put the viewport meta tag in the `<head>` of every page you make. Without it, none of your responsive CSS will work properly on phones.

## Step 2: images that fit

By default, an image shows at its full size. A 2000px-wide photo will burst out of a 375px phone screen and cause sideways scrolling. Add this rule near the top of every stylesheet:

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

- `max-width: 100%` means "never be wider than your container". Small images stay small. Big images shrink to fit.
- `height: auto` keeps the image's shape (its aspect ratio) so it does not look squashed.
- `display: block` removes a small, annoying gap that appears under inline images.

## Step 3: media queries

A **media query** is CSS that only applies when a condition is true, for example "when the screen is at least 700px wide".

```css
/* These rules always apply */
.title {
  font-size: 1.75rem;
}

/* These rules only apply when the window is 700px wide or more */
@media (min-width: 700px) {
  .title {
    font-size: 3rem;
  }
}
```

It works like an "if" statement: *if* the screen is at least 700px wide, *then* use these rules too. Because the media query comes later in the stylesheet, its rules win when they apply (remember the cascade).

The point where your layout changes is called a **breakpoint**. You do not need a breakpoint for every phone model. Instead, resize your browser slowly and add a breakpoint where your design starts to look awkward.

> 💡 **Tip:** Good starting breakpoints for beginners are around `600px` (large phones and small tablets) and `900px` (laptops). Adjust them to suit your design.

## Mobile first

There are two ways to approach this:

- **Desktop first:** write the big-screen design, then use `max-width` media queries to squeeze it down for phones.
- **Mobile first:** write the small-screen design first, then use `min-width` media queries to *add* layout as the screen grows.

We recommend **mobile first**. Phone layouts are usually simpler (most things stack in one column, which is normal flow!), so your base CSS stays small. Then you add columns and extra space as more room becomes available. It is like packing for a trip: start with the essentials, then add extras if there is space in the suitcase.

## A full example

Here is a small page section that is one column on phones and three columns on wider screens.

```html
<header class="site-header">
  <a href="#" class="logo">Spokes & Sprockets</a>
  <nav>
    <ul class="nav-links">
      <li><a href="#">Repairs</a></li>
      <li><a href="#">Prices</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</header>
<main class="features">
  <section class="feature">
    <h2>Quick fixes</h2>
    <p>Punctures and brake tweaks while you wait.</p>
  </section>
  <section class="feature">
    <h2>Full service</h2>
    <p>A complete check-up to keep you riding safely.</p>
  </section>
  <section class="feature">
    <h2>Bike sales</h2>
    <p>Refurbished bikes at friendly prices.</p>
  </section>
</main>
```

```css
/* ---- Mobile first: base styles ---- */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.site-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background-color: #2a7f62;
}

.site-header a {
  color: white;
  text-decoration: none;
}

.logo {
  font-size: 1.4rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.features {
  display: grid;
  gap: 16px;
  padding: 16px;
  max-width: 1100px;
  margin: 0 auto;
}

.feature {
  background-color: #f4f7f5;
  padding: 16px;
  border-radius: 8px;
}

/* ---- Bigger screens ---- */
@media (min-width: 700px) {
  .site-header {
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 32px;
  }

  .features {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 32px;
  }
}
```

On a phone, the logo sits above the links, and the three features stack. On a wider screen, the header becomes a row and the features become three columns.

## Testing on different sizes

You do not need lots of devices to test. In DevTools, click the **device toolbar** icon (it looks like a phone and tablet, or press `Ctrl + Shift + M` on Windows, `Cmd + Shift + M` on Mac). You can then choose a phone model or drag the edges to any width.

Things to check:

- Is there any **sideways scrolling**? There should not be.
- Is the text **readable** without zooming?
- Are links and buttons **big enough to tap** with a finger?
- Do images fit?

> ⚠️ **Watch out:** If you see sideways scrolling on mobile, something is too wide. Common causes are images without `max-width: 100%`, fixed `width` values in `px`, and long words or links. Use DevTools to find which element sticks out.

### Try it

1. Put the full example above into the playground.
2. Use the DevTools device toolbar (or resize your window) to go from 320px wide up to 1200px. Watch for the moment the layout changes.
3. Change the breakpoint from `700px` to `900px`. What is different?
4. Add a second media query `@media (min-width: 1000px)` that makes `.logo` bigger.
5. Add an image inside one `.feature` (for example `<img src="https://picsum.photos/seed/bike/800/400" alt="Placeholder photo">`) and add the `img` rule from Step 2.

## Check your understanding

1. What does the viewport meta tag do, and where does it go?
2. Why do we give images `max-width: 100%`?
3. What does `@media (min-width: 700px) { ... }` mean?
4. In a mobile-first stylesheet, do your media queries usually use `min-width` or `max-width`?
5. Name two things to check when testing a page on a small screen.

<details><summary>Show answers</summary>

1. It tells mobile browsers to use the device's real width instead of pretending to be a desktop screen. It goes in the `<head>`.
2. So images never become wider than their container, which stops them breaking the layout or causing sideways scrolling on small screens.
3. The rules inside only apply when the browser window is 700px wide or wider.
4. `min-width`, because you start with the small screen and add styles as the screen gets bigger.
5. For example: no sideways scrolling, readable text, big enough tap targets, images that fit.

</details>

## Go deeper

- [web.dev: Learn responsive design](https://web.dev/learn/design)
- [web.dev: Media queries](https://web.dev/learn/design/media-queries)
- [MDN: Responsive design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [MDN: Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
