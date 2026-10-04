---
title: Recipe page
kind: assignment
submission: any
---
## What you'll build

A web page for **one recipe**: a dish you love to cook or eat. It should use semantic HTML so that it's well organised, easy to read for screen reader users, and passes the HTML validator.

## Requirements

- [ ] Full HTML boilerplate, with `lang` on `<html>` and a meaningful `<title>`
- [ ] A `<header>` with the site or recipe name in an `<h1>`
- [ ] A `<nav>` with at least two links (they can jump to sections on the same page using `#id`)
- [ ] A `<main>` element containing an `<article>` for the recipe
- [ ] At least one image with good, specific `alt` text (use `<figure>` and `<figcaption>` if you like)
- [ ] A short description of the dish in one or more paragraphs
- [ ] An **ingredients** section using an unordered list (`<ul>`)
- [ ] A **method** section using an ordered list (`<ol>`) of steps
- [ ] A small table (for example prep time, cook time and servings, or nutrition facts) with a `<caption>` and `<th>` header cells
- [ ] Headings in a sensible order (one `<h1>`, no skipped levels)
- [ ] A `<footer>` (for example who wrote the recipe, or where it came from)
- [ ] The page passes the W3C validator with **no errors**

## Steps/hints

1. Choose your recipe. A family favourite is perfect. Write it out in plain text first: name, description, ingredients, steps, times.
2. Create `firstlight/week-02/recipe/index.html` and start with the boilerplate.
3. Sketch the structure before you write tags. For example:

```html
<header>
  <h1>Grandma's Jollof Rice</h1>
  <nav>
    <ul>
      <li><a href="#ingredients">Ingredients</a></li>
      <li><a href="#method">Method</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h2>About this dish</h2>
    <p>Write your description here.</p>
    <section id="ingredients">
      <h2>Ingredients</h2>
      <ul>
        <li>First ingredient</li>
      </ul>
    </section>
    <section id="method">
      <h2>Method</h2>
      <ol>
        <li>First step</li>
      </ol>
    </section>
  </article>
</main>
<footer>
  <p>Recipe by ...</p>
</footer>
```

4. Fill in your real content. Add your image and table.
5. Check the heading order: write down your headings as a list. Does it read like a sensible table of contents?
6. Test with the keyboard: can you Tab to the nav links and use them?
7. Validate at `https://validator.w3.org` (Validate by File Upload). Fix errors from the top down, then check again until it's clean.

> 💡 **Tip:** Keep each `<li>` in the method short: one action per step. "Chop the onions" and "Fry the onions for 5 minutes" are better as two steps than one long one.

## How to submit

Use the submit form on this page:

- **Upload** your `index.html` file (and your image, if it's a local file), **or** paste a **CodePen link** (paste only the part inside `<body>` into CodePen's HTML box).
- In the **written answer** box, tell us: did your page pass the validator? What was one error it found, and how did you fix it?

## Stretch goals

- Add a second recipe as another `<article>` on the same page, or on a separate page linked from the first.
- Use a description list (`<dl>`) for prep time, cook time and servings, and a table for nutrition.
- Use nested lists to group ingredients, for example "For the sauce" and "For the rice".
- Run Lighthouse (Accessibility only) in DevTools and aim for a score of 100. Mention your score in your submission.

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
