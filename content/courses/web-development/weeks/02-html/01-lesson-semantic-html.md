---
title: Semantic HTML and page structure
kind: lesson
minutes: 30
---
Imagine a supermarket where nothing has a label. No aisle signs. No section names. You could find the milk in the end, but it would be slow and tiring.

Semantic HTML puts the signs up on your web page. In this lesson you learn which signs to use, and where.

## What does "semantic" mean?

**Semantic** means "about meaning". Semantic HTML uses tags that say **what the content is**, not only how it looks.

Look at these two pieces of code. They can look the same on screen:

```html
<div>My Recipe Blog</div>
<div>Welcome to my kitchen!</div>
```

```html
<h1>My Recipe Blog</h1>
<p>Welcome to my kitchen!</p>
```

A `<div>` is a plain box with no meaning. It is like a cardboard box with no label. The second version tells the browser: "this is the main heading, and this is a paragraph".

Who cares about meaning? Many people and programs:

- **Screen readers** read pages aloud for blind and partially sighted people. They use meaning to jump between headings and sections.
- **Search engines** like Google use it to understand your page.
- **Other developers** (and you, in six months) can read your code more easily.
- **Browsers** give semantic elements useful behaviour for free.

## The page layout elements

Most web pages have the same main areas. HTML has an element for each one:

| Element | What it is for |
| --- | --- |
| `<header>` | Opening content: the site logo, the title, sometimes navigation |
| `<nav>` | The main navigation links |
| `<main>` | The main content of this page. Only **one** per page |
| `<section>` | A group of content about one theme, usually with its own heading |
| `<article>` | A piece that makes sense on its own: a blog post, a news story, a product card |
| `<aside>` | Extra related content, like a sidebar or a "did you know?" box |
| `<footer>` | Closing content: copyright, contact links, small print |

Here is a page skeleton that uses them:

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

Press **Try it**. It does not look special. These elements have almost no style by default. Their power is in the **meaning**. Later, CSS will make them look good.

> 💡 **Tip:** See `href="#recipes"` and `id="recipes"`. A link to `#something` jumps to the element with that `id` on the same page. Click the links in the playground to try.

## Section or article?

Many beginners ask this. Ask yourself: **"Would this make sense if I copied it alone onto another website?"**

- **Yes:** use `<article>` (a recipe, a blog post, a review).
- **No, it only belongs to this page:** use `<section>` (an "About me" part, a list of ingredients).

Sometimes you need a box only for styling, with no meaning. Use `<div>`. A `<div>` is not bad. It is the last choice, not the first.

## Heading order

Headings (`<h1>` to `<h6>`) are like the outline of a book: the book title, then chapters, then parts inside chapters.

```html
<h1>Ada's Kitchen</h1>
  <h2>Breakfast</h2>
    <h3>Akara</h3>
    <h3>Porridge</h3>
  <h2>Dinner</h2>
    <h3>Jollof rice</h3>
```

(The indentation only shows the structure. You do not need it in real code.)

The rules:

1. Use **one `<h1>`** per page, for the main topic.
2. **Do not skip levels** going down. After an `<h2>`, the next smaller heading is `<h3>`, not `<h4>`.
3. Choose a heading for its **meaning**, not its size. If you want smaller text, use CSS later.

> ⚠️ **Watch out:** Do not use headings only to make text big or bold. Many screen reader users jump from heading to heading, like using a table of contents. Fake headings confuse them.

### Try it

This code has heading problems. Find them. Then fix them in the playground:

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

There should be only one `<h1>`. So "Day one" should be an `<h2>`, like "Day two".

"Food we ate" skips straight to `<h4>`. It should be an `<h3>`.

</details>

## See the outline in DevTools

Open any page and press `F12`. In the **Elements** panel, click the small triangles to fold and unfold elements.

A well-built page reads like a tidy outline: `header`, `main`, `footer`, with sections inside. A messy page is a wall of `div` after `div`.

### Try it

Visit a large website you use, like a news site or an online shop. Open the Elements panel. Look for `<header>`, `<nav>`, `<main>` and `<footer>`. Which ones can you find?

## Check your understanding

1. What does "semantic" mean in semantic HTML?
2. Name three groups of people or programs that benefit from semantic HTML.
3. How many `<main>` elements should a page have?
4. When should you use `<article>` instead of `<section>`?
5. What is wrong with going from `<h2>` straight to `<h4>`?

<details><summary>Show answers</summary>

1. Choosing tags that say what the content means, not only how it looks.
2. Any three of: screen reader users, search engines, other developers, browsers.
3. One.
4. When the content is complete on its own and makes sense alone, like a blog post or a recipe.
5. It skips a level. This breaks the outline and confuses people who move around by headings.

</details>

## Go deeper

- [web.dev: Learn HTML – Semantic HTML](https://web.dev/learn/html/semantic-html)
- [web.dev: Learn HTML – Headings and sections](https://web.dev/learn/html/headings-and-sections)
- [MDN: Document and website structure](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
- [MDN: HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can explain what semantic HTML means and who benefits
- choose between `header`, `nav`, `main`, `section`, `article`, `aside` and `footer`
- order headings correctly with one `<h1>` and no skipped levels

### Purpose
Semantic HTML makes pages usable with a screen reader and easier to maintain. Real teams review this in every page.

### Things to teach
1. **Meaning, not looks.** Compare the two versions of My Recipe Blog: `<div>` and `<h1>` plus `<p>`. They look the same but only one has meaning. Name who benefits: screen readers, search engines, developers, browsers.
2. **The page skeleton.** Walk through Ada's Kitchen: `header`, `nav`, `main` (only one per page), `section`, `article`, `footer`. Press Try it and click the `#recipes` and `#about` links.
3. **Section or article?** Ask: would it make sense copied alone onto another site? Yes means `article`. `div` is the last choice, not a bad one.
4. **Heading order.** One `<h1>`, no skipped levels, choose by meaning not size. Fix the My Holiday example together: the second `<h1>` becomes `<h2>`, `<h4>` becomes `<h3>`.
5. **See it in DevTools.** Open a news site, press F12, and find `header`, `nav`, `main` and `footer` in Elements.

### Check understanding
- Ask: "How many `<main>` elements should a page have?" A good answer: one.
- Ask: "When do you use `article`?" A good answer: when the content makes sense on its own, like a recipe or blog post.
- Ask: "Why not jump from `<h2>` to `<h4>`?" A good answer: it breaks the outline for people who move by headings.

### Watch for
- Using headings to make text big. Say that size is for CSS later.
- Using `div` for everything, or putting `section` everywhere. Ask what the content is.
