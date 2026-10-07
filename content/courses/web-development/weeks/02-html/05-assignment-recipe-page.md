---
title: Recipe page
kind: assignment
submission: any
---
## What you'll build

A web page for **one recipe**: a dish you love to cook or eat. Use semantic HTML so the page is well organised and clear for screen reader users. The page must pass the HTML validator.

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

1. Choose your recipe. A family favourite is perfect. Write it in plain text first: name, description, ingredients, steps, times.
2. Create `firstlight/week-02/recipe/index.html`. Start with the boilerplate.
3. Sketch the structure before you write all the tags. For example:

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

4. Fill in your real content. Add your image and your table.
5. Check the heading order. Write your headings as a list. Does it read like a sensible table of contents?
6. Test with the keyboard. Can you Tab to the nav links and use them?
7. Validate at `https://validator.w3.org` (Validate by File Upload). Fix errors from the top down. Check again until it is clean.

> 💡 **Tip:** Keep each `<li>` in the method short: one action per step. "Chop the onions" and "Fry the onions for 5 minutes" are better as two steps than one long step.

## How to submit

Use the submit form on this page:

- **Upload** your `index.html` file (and your image, if it is a file on your computer), **or** paste a **CodePen link** (paste only the part inside `<body>` into CodePen's HTML box).
- In the **written answer** box, tell us: did your page pass the validator? What was one error it found, and how did you fix it?

## Stretch goals

- Add a second recipe as another `<article>` on the same page, or on a separate page linked from the first.
- Use a description list (`<dl>`) for prep time, cook time and servings, and a table for nutrition.
- Use nested lists to group ingredients, for example "For the sauce" and "For the rice".
- Run Lighthouse (Accessibility only) in DevTools and aim for a score of 100. Tell us your score in your submission.

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can structure a page with `header`, `nav`, `main`, `article` and `footer`
- use headings, lists, an image with good alt and a captioned table
- make a page pass the W3C validator
- describe an error they found and fixed

### Purpose
This is the semantic HTML lesson put to work on a real topic. It also gets learners into the habit of validating.

### Things to do
1. Show the file location `firstlight/week-02/recipe/index.html`. Remind them to write the recipe in plain text first.
2. Walk through the skeleton in the hints: header, nav with `#id` links, main, article, sections, footer. Say it is a starting point.
3. Demonstrate the validator with File Upload on a half-finished page. Show reading the first error and fixing from the top.
4. Show the submit form: upload `index.html` and any image, or a CodePen link. The written answer says if it passed and one error fixed.

### What good work looks like
- There is the full boilerplate, with `lang` and a meaningful `<title>`.
- There is a `header` with an `<h1>`, a `nav` with two or more working links, a `main` with an `article`, and a `footer`.
- Ingredients are in a `<ul>`, method steps are in an `<ol>`, with short steps.
- The image has specific `alt` text, and the table has a `caption` and `th` cells.
- There is one `<h1>` and no skipped heading levels, and the validator shows no errors.

### Watch for
- A second `<h1>` or skipped levels, such as `<h2>` to `<h4>`.
- Nav links where the `href` does not match an `id`.
- Learners who say it passed but did not run the validator. Ask for the result.
