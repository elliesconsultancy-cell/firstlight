---
title: Responsive design
kind: lesson
minutes: 35
---
People will visit your website on a small phone on the bus, on a laptop at work, and maybe on a big TV. **Responsive design** means one website that rearranges itself to look good on all of them.

After this lesson, your pages will work on a phone and on a big screen.

## Water takes the shape of its container

Pour water into a cup. It becomes cup-shaped. Pour it into a bowl. It becomes bowl-shaped.

A responsive website does the same. It fits whatever screen it is poured into.

You already know some tools for this. `%`, `fr`, `max-width` and `flex-wrap` all help a layout bend instead of break. In this lesson we add three more things:

1. The **viewport meta tag**
2. **Flexible images**
3. **Media queries**, with a **mobile-first** approach

## Step 1: the viewport meta tag

Phone browsers have a habit. They pretend to be a wide desktop screen (about 980px). Then they shrink the whole page until it is tiny and hard to read.

This line in your `<head>` tells the phone: "Use your real width. Do not zoom out."

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

> 🧠 **Remember:** Put the viewport meta tag in the `<head>` of every page you make. Without it, your responsive CSS does not work properly on phones.

## Step 2: images that fit

By default, an image shows at its full size. A 2000px-wide photo bursts out of a 375px phone screen. The page then scrolls sideways. Add this rule near the top of every stylesheet:

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

- `max-width: 100%` means "never be wider than your container". Small images stay small. Big images shrink to fit.
- `height: auto` keeps the image's shape (its aspect ratio), so it does not look squashed.
- `display: block` removes a small gap that can appear under images in a line of text.

## Step 3: media queries

A **media query** is CSS that applies only when a condition is true. For example: "when the screen is at least 700px wide".

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

It works like an "if": *if* the screen is at least 700px wide, *then* use these rules too. The media query comes later in the stylesheet. So when it applies, its rules win (remember the cascade).

The point where your layout changes is called a **breakpoint**. You do not need one for every phone model. Resize your browser slowly. Add a breakpoint where your design starts to look awkward.

> 💡 **Tip:** Good starting breakpoints are about `600px` (large phones and small tablets) and `900px` (laptops). Change them to suit your design.

## Mobile first

There are two ways to plan this:

- **Desktop first:** write the big-screen design. Then use `max-width` media queries to squeeze it down for phones.
- **Mobile first:** write the small-screen design first. Then use `min-width` media queries to *add* layout as the screen grows.

We recommend **mobile first**. Phone layouts are simpler. Most things stack in one column, which is normal flow. So your base CSS stays small. Then you add columns and space when there is more room.

Think of packing for a trip. Start with the essentials. Add extras if there is space in the suitcase.

## A full example

Here is a small page. It is one column on phones and three columns on wider screens.

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

You do not need many devices to test. In DevTools, click the **device toolbar** icon. It looks like a phone and a tablet. You can also press `Ctrl + Shift + M` on Windows or `Cmd + Shift + M` on Mac. Then choose a phone model, or drag the edges to any width.

Things to check:

- Is there any **sideways scrolling**? There should not be.
- Is the text **readable** without zooming?
- Are links and buttons **big enough to tap** with a finger?
- Do images fit?

> ⚠️ **Watch out:** Sideways scrolling on mobile means something is too wide. Common causes are images without `max-width: 100%`, fixed `width` values in `px`, and long words or links. Use DevTools to find which element sticks out.

## Try it

1. Put the full example above into the playground.
2. Use the DevTools device toolbar (or resize your window) to go from 320px wide up to 1200px. Watch for the moment the layout changes.
3. Change the breakpoint from `700px` to `900px`. What is different?
4. Add a second media query `@media (min-width: 1000px)` that makes `.logo` bigger.
5. Add an image inside one `.feature` (for example `<img src="https://picsum.photos/seed/bike/800/400" alt="Placeholder photo">`). Add the `img` rule from Step 2.

<details><summary>Show answers</summary>

3. The layout switches to a row and three columns later. Between 700px and 900px, you now see the phone layout.
4. For example: `@media (min-width: 1000px) { .logo { font-size: 2rem; } }`

</details>

## Check your understanding

1. What does the viewport meta tag do, and where does it go?
2. Why do we give images `max-width: 100%`?
3. What does `@media (min-width: 700px) { ... }` mean?
4. In a mobile-first stylesheet, do your media queries usually use `min-width` or `max-width`?
5. Name two things to check when testing a page on a small screen.

<details><summary>Show answers</summary>

1. It tells mobile browsers to use the device's real width instead of pretending to be a desktop screen. It goes in the `<head>`.
2. So images never become wider than their container. This stops them breaking the layout or causing sideways scrolling on small screens.
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

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can add the viewport meta tag and the flexible image rule.
- Learners can write a mobile-first media query with `min-width`.
- Learners can test a page at different sizes with the DevTools device toolbar.

### Purpose
Most visits are on phones, so every page must work on small screens. The assignment is judged on exactly this.

### Things to teach
1. **Viewport meta tag.** Show the tag and explain that phones otherwise pretend to be about 980px wide. It goes in every `<head>`.
2. **Images that fit.** Show the `img` rule with `max-width: 100%`, `height: auto` and `display: block`.
3. **Mobile first.** Write the small-screen CSS first. Then add `@media (min-width: 700px)` for more room. Use the packing a suitcase idea.
4. **The Spokes & Sprockets example.** Show header and features stacking on a phone and becoming a row and three columns on a wide screen.
5. **Test with the device toolbar.** Drag from 320px to 1200px. Look for sideways scrolling, readable text and tap-sized links.

### Check understanding
- Ask: "What does the viewport meta tag do?" A good answer: it makes phones use their real width.
- Ask: "Why `min-width` in a mobile-first stylesheet?" A good answer: you start small and add styles as the screen grows.
- Ask: "Name two things to check on a small screen." A good answer: no sideways scrolling, readable text.

### Watch for
- Missing viewport tag, so the page looks tiny on a phone.
- Sideways scrolling. Use DevTools to find the element that sticks out, often an image or a fixed `px` width.
