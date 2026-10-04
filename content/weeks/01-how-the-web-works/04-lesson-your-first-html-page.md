---
title: Your first HTML page
kind: lesson
minutes: 35
---
It's time to write a real web page from scratch. By the end of this lesson you'll understand every line of it, and you'll see it in your browser.

## What is HTML?

**HTML** stands for **HyperText Markup Language**.

- **HyperText** means text with links to other text. Links are what make it a "web".
- **Markup** means you **mark** parts of your text to say what they are: "this is a heading", "this is a list", "this is a link".

HTML is not about how things look. It's about what things **are**. A heading is a heading, even before we make it big and bold.

Think of a highlighter pen on a printed document. You mark one line in yellow for "title", others in green for "important". HTML does the same job, using **tags**.

## Tags, elements and content

Here's one line of HTML:

```html
<p>I am learning HTML.</p>
```

Let's name the parts:

- `<p>` is the **opening tag**. It says "a paragraph starts here".
- `</p>` is the **closing tag**. Notice the forward slash `/`. It says "the paragraph ends here".
- `I am learning HTML.` is the **content**.
- All of it together (opening tag + content + closing tag) is called an **element**.

Tags are like the two pieces of bread in a sandwich. The content is the filling.

Some common elements:

```html
<h1>The biggest heading</h1>
<h2>A smaller heading</h2>
<p>A paragraph of text.</p>
<strong>Very important text</strong>
<em>Text with emphasis</em>
```

### Try it

Press **Try in playground** on the code above. Then:

1. Change `h2` to `h3` (in both tags!). What happens?
2. Delete the closing `</strong>` tag. What happens to the text after it?

## Nesting elements

Elements can go **inside** other elements. This is called **nesting**:

```html
<p>I <strong>really</strong> love coding.</p>
```

The `<strong>` element is inside the `<p>` element. The rule is: **close tags in the opposite order you opened them**. Like boxes inside boxes: you have to close the small box before you close the big one.

```html
<!-- Correct -->
<p>I <strong>really</strong> love coding.</p>

<!-- Wrong: tags are crossed -->
<p>I <strong>really love coding.</p></strong>
```

That green-looking line `<!-- ... -->` is a **comment**. The browser ignores comments. Use them to leave notes for yourself.

## Empty elements

A few elements have no content and no closing tag. They're called **void** or **empty** elements. Two you'll use often:

```html
<p>Line one<br>Line two</p>
<img src="https://picsum.photos/300/200" alt="A random photo">
```

- `<br>` makes a line break.
- `<img>` shows an image.

## Attributes: extra information

Some elements need extra information. We add it with **attributes**, inside the opening tag:

```html
<a href="https://developer.mozilla.org">Visit MDN</a>
```

- `href` is the attribute **name**.
- `"https://developer.mozilla.org"` is the attribute **value**, in quotes.
- `href` tells the link **where to go**.

Images use attributes too:

```html
<img src="https://picsum.photos/300/200" alt="A random landscape photo" width="300">
```

- `src` (source) – where the image file is.
- `alt` (alternative text) – describes the image for people who can't see it. Always include it!
- `width` – how wide to show it, in pixels.

> 🧠 **Remember:** Attributes always go in the **opening** tag, in the form `name="value"`. Separate multiple attributes with spaces.

## Lists

Two very common list types:

```html
<h2>Things I like</h2>
<ul>
  <li>Music</li>
  <li>Football</li>
  <li>Cooking</li>
</ul>

<h2>My morning routine</h2>
<ol>
  <li>Wake up</li>
  <li>Pray or stretch</li>
  <li>Drink tea</li>
</ol>
```

- `<ul>` = **unordered** list (bullet points; order doesn't matter)
- `<ol>` = **ordered** list (numbers; order matters)
- `<li>` = **list item**, always inside a `<ul>` or `<ol>`

Notice the **indentation** (spaces at the start of lines). The browser doesn't need it, but it makes your code much easier for humans to read.

## The HTML boilerplate

Real HTML files start with a standard structure, called the **boilerplate**. You'll write it at the top of every page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>This is my first proper web page.</p>
  </body>
</html>
```

Line by line:

- `<!DOCTYPE html>` – tells the browser "this is a modern HTML document".
- `<html lang="en">` – wraps the whole page. `lang="en"` says the page is in English (screen readers use this to choose the right voice).
- `<head>` – information **about** the page. Not shown in the page itself.
- `<meta charset="UTF-8">` – lets you use all kinds of characters: é, ñ, ₦, 😀.
- `<meta name="viewport" ...>` – makes the page work properly on phones.
- `<title>` – the text on the browser **tab**.
- `<body>` – everything **visible** on the page goes here.

> 💡 **Tip:** In VS Code, create a new `.html` file, type `!` and press **Tab** or **Enter**. VS Code writes the whole boilerplate for you! But make sure you understand each line first.

## Putting it together

### Try it

1. In your `firstlight` folder, open `week-01` in VS Code (create it if you haven't yet).
2. Create a new file called `first-page.html`.
3. Type the boilerplate above (or use the `!` shortcut).
4. Change the `<title>` to your name.
5. In the `<body>`, add:
   - an `<h1>` with a greeting
   - two `<p>` paragraphs about your day
   - a `<ul>` list of three foods you like
   - a link to a website you like
6. Save, then open the file in Chrome.
7. Open DevTools (`F12`), click **Elements**, and find your list in the code.

Did anything not show up the way you expected? Check your closing tags first. Missing or misspelled closing tags are the most common HTML mistake.

> ⚠️ **Watch out:** Your page must end in `.html`, not `.txt`. If your browser shows the tags as plain text instead of formatting them, check the file extension.

## Check your understanding

1. What is the difference between a tag and an element?
2. Where do attributes go?
3. What is the difference between `<ul>` and `<ol>`?
4. Which part of the boilerplate holds everything you see on the page?
5. What does the `alt` attribute on an image do?

<details><summary>Show answers</summary>

1. A tag is the marker, like `<p>` or `</p>`. An element is the whole thing: opening tag, content and closing tag together.
2. Inside the opening tag, as `name="value"`.
3. `<ul>` is an unordered (bullet) list. `<ol>` is an ordered (numbered) list.
4. The `<body>`.
5. It describes the image in words, for people using screen readers, or when the image fails to load.

</details>

## Go deeper

- [MDN: Getting started with HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started)
- [MDN: HTML basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [web.dev: Learn HTML – Overview](https://web.dev/learn/html/overview)
- [freeCodeCamp: Responsive Web Design (HTML practice)](https://www.freecodecamp.org/learn/2022/responsive-web-design/)
