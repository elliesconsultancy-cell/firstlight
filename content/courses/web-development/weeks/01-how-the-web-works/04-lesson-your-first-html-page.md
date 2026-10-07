---
title: Your first HTML page
kind: lesson
minutes: 35
---
Imagine you have a printed page and a highlighter pen. You mark one line yellow: "this is the title". You mark another line green: "this is important". You did not change the words. You only said what each part **is**.

HTML works like this. In this lesson you write a real web page from scratch. At the end you will understand every line, and you will see it in your browser.

## What is HTML?

**HTML** means **HyperText Markup Language**.

- **HyperText** is text with links to other text. Links make it a "web".
- **Markup** means you **mark** parts of your text to say what they are: "this is a heading", "this is a list", "this is a link".

HTML is not about how things look. It is about what things **are**. A heading is a heading, before we make it big or bold.

The highlighter marks are called **tags** in HTML.

## Tags, elements and content

Here is one line of HTML:

```html
<p>I am learning HTML.</p>
```

Let us name the parts:

- `<p>` is the **opening tag**. It says "a paragraph starts here".
- `</p>` is the **closing tag**. It has a forward slash `/`. It says "the paragraph ends here".
- `I am learning HTML.` is the **content**.
- All three together make an **element**.

Think of a sandwich. The two tags are the bread. The content is the filling. The whole sandwich is the element.

Here are some common elements:

```html
<h1>The biggest heading</h1>
<h2>A smaller heading</h2>
<p>A paragraph of text.</p>
<strong>Very important text</strong>
<em>Text with emphasis</em>
```

### Try it

Press **Try it** on the code above. Then:

1. Change `h2` to `h3` (in both tags). What happens?
2. Delete the closing `</strong>` tag. What happens to the text after it?

## Nesting: elements inside elements

One element can go **inside** another. This is called **nesting**:

```html
<p>I <strong>really</strong> love coding.</p>
```

The `<strong>` element is inside the `<p>` element.

The rule: **close tags in the opposite order you opened them.** Think of boxes inside boxes. You close the small box before you close the big box.

```html
<!-- Correct -->
<p>I <strong>really</strong> love coding.</p>

<!-- Wrong: tags are crossed -->
<p>I <strong>really love coding.</p></strong>
```

The lines that start with `<!--` are **comments**. The browser ignores them. Use comments to leave notes for yourself.

## Empty elements

A few elements have no content and no closing tag. They are called **void** (or empty) elements. You will use two of them often:

```html
<p>Line one<br>Line two</p>
<img src="https://picsum.photos/300/200" alt="A random photo">
```

- `<br>` makes a line break.
- `<img>` shows an image.

## Attributes: extra information

Some elements need more information. We add it with **attributes**, inside the opening tag:

```html
<a href="https://developer.mozilla.org">Visit MDN</a>
```

- `href` is the attribute **name**. It tells the link **where to go**.
- `"https://developer.mozilla.org"` is the attribute **value**, in quotes.

Images use attributes too:

```html
<img src="https://picsum.photos/300/200" alt="A random landscape photo" width="300">
```

- `src` (source): where the image file is.
- `alt` (alternative text): words that describe the image, for people who cannot see it. Always add it.
- `width`: how wide to show the image, in pixels.

> 🧠 **Remember:** Attributes go in the **opening** tag, written as `name="value"`. Separate several attributes with spaces.

## Lists

There are two common kinds of list:

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

- `<ul>` is an **unordered** list. It has bullet points. The order does not matter.
- `<ol>` is an **ordered** list. It has numbers. The order matters.
- `<li>` is a **list item**. It always goes inside a `<ul>` or an `<ol>`.

See the **indentation** (spaces at the start of a line). The browser does not need it. It helps people read your code.

## The HTML boilerplate

Real HTML files start with a standard frame. It is called the **boilerplate**. You write it at the top of every page:

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

Here it is, line by line:

- `<!DOCTYPE html>` tells the browser: "this is a modern HTML document".
- `<html lang="en">` wraps the whole page. `lang="en"` says the page is in English. Screen readers use it to choose the right voice.
- `<head>` holds information **about** the page. It does not show on the page.
- `<meta charset="UTF-8">` lets you use many kinds of characters, like é, ñ and ₦.
- `<meta name="viewport" ...>` helps the page work well on phones.
- `<title>` is the text on the browser **tab**.
- `<body>` holds everything **visible** on the page.

> 💡 **Tip:** In VS Code, make a new `.html` file. Type `!` and press **Tab** or **Enter**. VS Code writes the boilerplate for you. First make sure you understand each line.

## Putting it together

### Try it

1. In your `firstlight` folder, open `week-01` in VS Code. Create it if it is not there yet.
2. Create a new file called `first-page.html`.
3. Type the boilerplate above, or use the `!` shortcut.
4. Change the `<title>` to your name.
5. In the `<body>`, add:
   - an `<h1>` with a greeting
   - two `<p>` paragraphs about your day
   - a `<ul>` list of three foods you like
   - a link to a website you like
6. Save. Open the file in Chrome.
7. Open DevTools (`F12`), click **Elements**, and find your list in the code.

Does something not look as you expected? Check your closing tags first. A missing or misspelled closing tag is the most common HTML mistake.

> ⚠️ **Watch out:** Your file name must end in `.html`, not `.txt`. If the browser shows the tags as plain text, check the file extension.

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
5. It describes the image in words, for people who use screen readers, or when the image does not load.

</details>

## Go deeper

- [MDN: Getting started with HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started)
- [MDN: HTML basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [web.dev: Learn HTML – Overview](https://web.dev/learn/html/overview)
- [freeCodeCamp: Responsive Web Design (HTML practice)](https://www.freecodecamp.org/learn/2022/responsive-web-design/)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can name a tag, an element, content and an attribute in one line of HTML
- nest elements and close them in the right order
- write a list with `<ul>`, `<ol>` and `<li>`
- write the HTML boilerplate and explain each line
- open their page in Chrome and find it in DevTools

### Purpose
This is the first page learners build. A clear grasp of tags, attributes and the boilerplate is the base for every week after.

### Things to teach
1. **Tags, elements, content.** Use `<p>I am learning HTML.</p>`. The tags are the bread, the content is the filling, the whole sandwich is the element. HTML says what things are, not how they look.
2. **Nesting.** Show `<p>I <strong>really</strong> love coding.</p>` and the crossed-tags wrong example. Close in the opposite order you opened.
3. **Attributes.** Use `<a href=...>` and `<img src alt width>`. Attributes go in the opening tag as `name="value"`. Always add `alt`.
4. **Lists.** `<ul>` is bullets, `<ol>` is numbers, `<li>` always sits inside one of them.
5. **The boilerplate.** Go through the page line by line: doctype, `html lang`, `head`, `meta charset`, viewport, `title`, `body`. Show the `!` then Tab shortcut after they understand it.

### Check understanding
- Ask: "What is the difference between a tag and an element?" A good answer: a tag is the marker; the element is opening tag, content and closing tag together.
- Ask: "Where do attributes go?" A good answer: in the opening tag, as `name="value"`.
- Ask: "Which part holds what you see on the page?" A good answer: the `<body>`.

### Watch for
- A missing or misspelled closing tag, the most common mistake. Use the Elements panel to see how the browser read it.
- A file saved as `.txt` or `.html.txt`, so the tags show as plain text. Check the extension.
