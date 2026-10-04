---
title: Semantic HTML and page structure
kind: lesson
minutes: 30
---
Imagine a supermarket where nothing has a label: no aisle signs, no section names. You could still find the milk eventually, but it would be slow and frustrating. Semantic HTML puts the signs up on your web page.

## What does "semantic" mean?

**Semantic** means "about meaning". Semantic HTML uses tags that describe **what the content is**, not just how it looks.

Compare these two snippets. They can look exactly the same on screen:

```html
<div>My Recipe Blog</div>
<div>Welcome to my kitchen!</div>
```

```html
<h1>My Recipe Blog</h1>
<p>Welcome to my kitchen!</p>
```

A `<div>` is a plain box with no meaning. It's like an unlabelled cardboard box. The second version tells the browser: "this is the main heading, and this is a paragraph".

Who cares about meaning? Lots of people and programs:

- **Screen readers** (software that reads pages aloud for blind and partially sighted people) use it to help users jump between headings and sections.
- **Search engines** like Google use it to understand your page.
- **Other developers** (including you, in six months) can read your code more easily.
- **Browsers** give semantic elements useful built-in behaviour for free.

## The page layout elements

Most web pages have the same main areas. HTML has a semantic element for each:

| Element | What it's for |
| --- | --- |
| `<header>` | Introductory content: the site logo, title, sometimes navigation |
| `<nav>` | The main navigation links |
| `<main>` | The main content of this page. Only **one** per page |
| `<section>` | A themed group of content, usually with its own heading |
| `<article>` | A self-contained piece that would make sense on its own: a blog post, a news story, a product card |
| `<aside>` | Related extra content, like a sidebar or "did you know?" box |
| `<footer>` | Closing content: copyright, contact links, small print |

Here's a page skeleton using them:

```html
<header>
  <h1>Ada's Kitchen</h1>
  <nav>
    <ul>
      <li><a href="#recipes">Recipes</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <section id="recipes">
    <h2>Latest recipes</h2>
    <article>
      <h3>Jollof rice</h3>
      <p>A rich, smoky rice dish from West Africa.</p>
    </article>
    <article>
      <h3>Shepherd's pie</h3>
      <p>Minced lamb under a blanket of mashed potato.</p>
    </article>
  </section>

  <section id="about">
    <h2>About me</h2>
    <p>I cook for my family every Sunday.</p>
  </section>
</main>

<footer>
  <p>© 2026 Ada's Kitchen</p>
</footer>
```

Press **Try in playground**. It doesn't look special yet, because these elements have almost no styling by default. Their power is in the **meaning**. Later, CSS will make them look great.

> 💡 **Tip:** Notice `href="#recipes"` and `id="recipes"`. A link to `#something` jumps to the element with that `id` on the same page. Try clicking the links in the playground.

## Section or article?

This is a common question. Ask yourself: **"Would this make sense if I copied it onto another website, on its own?"**

- **Yes** → `<article>` (a recipe, a blog post, a review)
- **No, it's part of this page** → `<section>` (an "About me" section, a list of ingredients)

And if you just need a box for styling with no meaning at all, use `<div>`. `<div>` isn't bad; it's just the last choice, not the first.

## Heading hierarchy

Headings (`<h1>` to `<h6>`) are like the outline of a book: the book title, then chapters, then sections inside chapters.

```html
<h1>Ada's Kitchen</h1>
  <h2>Breakfast</h2>
    <h3>Akara</h3>
    <h3>Porridge</h3>
  <h2>Dinner</h2>
    <h3>Jollof rice</h3>
```

(The indentation here is just to show the structure; you don't need it in real code.)

The rules:

1. Use **one `<h1>`** per page, for the main topic.
2. **Don't skip levels** going down. After an `<h2>`, the next smaller heading should be `<h3>`, not `<h4>`.
3. Choose headings by **meaning**, not by size. If you want smaller text, that's a job for CSS later.

> ⚠️ **Watch out:** Don't use headings just to make text big or bold. Many screen reader users navigate by jumping from heading to heading, like using a table of contents. Fake headings make the page confusing for them.

### Try it

This snippet has heading problems. Find them, then fix it in the playground:

```html
<h1>My Holiday</h1>
<h1>Day one</h1>
<p>We arrived in Lagos.</p>
<h4>Food we ate</h4>
<p>Suya and puff-puff.</p>
<h2>Day two</h2>
<p>We visited the beach.</p>
```

<details><summary>Show answer</summary>

There should be only one `<h1>`, so "Day one" should be an `<h2>` (like "Day two"). "Food we ate" skips from `<h1>`/`<h2>` straight to `<h4>`, so it should be an `<h3>`.

</details>

## Seeing the outline in DevTools

Open any page and press `F12`. In the **Elements** panel, you can click the small triangles to fold and unfold elements. A well-structured page reads like a tidy outline: `header`, `main`, `footer`, with sections inside. A messy page is a wall of `div` after `div`.

### Try it

Visit a large website you use (a news site or online shop). Open the Elements panel and look for `<header>`, `<nav>`, `<main>` and `<footer>`. Which ones can you find?

## Check your understanding

1. What does "semantic" mean in semantic HTML?
2. Name three groups of people or programs that benefit from semantic HTML.
3. How many `<main>` elements should a page have?
4. When should you use `<article>` instead of `<section>`?
5. What's wrong with going from `<h2>` straight to `<h4>`?

<details><summary>Show answers</summary>

1. Choosing tags that describe the meaning of the content, not just how it looks.
2. Any three of: screen reader users, search engines, other developers, browsers.
3. One.
4. When the content is self-contained and would make sense on its own, like a blog post or recipe.
5. It skips a level, which breaks the outline and confuses people navigating by headings.

</details>

## Go deeper

- [web.dev: Learn HTML – Semantic HTML](https://web.dev/learn/html/semantic-html)
- [web.dev: Learn HTML – Headings and sections](https://web.dev/learn/html/headings-and-sections)
- [MDN: Document and website structure](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
- [MDN: HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
