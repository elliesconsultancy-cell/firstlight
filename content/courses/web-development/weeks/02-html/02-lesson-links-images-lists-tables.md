---
title: Links, images, lists and tables
kind: lesson
minutes: 35
---
Think of the signs in a train station. A good sign says exactly where to go: "Platform 3 to Lagos". A bad sign says "This way".

Links and images are the signs of your web page. In this lesson you learn to write them well. You also meet a new tool for organising data: the table.

## Links that make sense

A link uses the `<a>` (anchor) element and the `href` attribute:

```html
<p>Read the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">MDN HTML guide</a> for more.</p>
```

### Write good link text

Screen reader users often listen to a list of **all the links** on a page, without the words around them. Imagine you hear: "click here, click here, read more, click here". You would not know where any link goes.

```html
<!-- Bad: the link text means nothing on its own -->
<p>To see our menu, <a href="menu.html">click here</a>.</p>

<!-- Good: the link text says where it goes -->
<p>Have a look at <a href="menu.html">our full menu</a>.</p>
```

> 🧠 **Remember:** Good link text makes sense **on its own**. Avoid "click here" and "read more".

### Other kinds of links

```html
<p><a href="mailto:hello@example.com">Email us</a></p>
<p><a href="tel:+441234567890">Call us</a></p>
<p><a href="https://web.dev" target="_blank" rel="noopener">web.dev (opens in a new tab)</a></p>
```

- `mailto:` opens the user's email app.
- `tel:` lets phone users call with one tap.
- `target="_blank"` opens the link in a new tab. Use it rarely, and tell users that a new tab opens. Add `rel="noopener"` for safety.

## Images and alt text

Every `<img>` needs `src` and `alt`:

```html
<img src="https://picsum.photos/id/292/400/300" alt="Fresh vegetables and herbs on a wooden chopping board" width="400" height="300">
```

Screen readers read the `alt` text aloud. The browser also shows it if the image does not load.

Good alt text is a skill. Imagine you describe the picture to a friend **on the phone**.

- **Be specific.** "A bowl of jollof rice with fried plantain" is better than "food".
- **Be short.** One short sentence is usually enough.
- **Do not start with "image of".** Screen readers already say "image".
- **Think about purpose.** Why is the image there? Describe what matters.

If an image is **only decoration** (like a swirly border), use an empty alt: `alt=""`. The screen reader skips it.

Do not leave out the `alt` attribute completely. Some screen readers then read the file name, like "DSC underscore 0 0 4 7 dot jpg".

> 💡 **Tip:** Add `width` and `height`. The browser then keeps space for the image before it loads, so the page does not jump around.

### Images with captions

To add a visible caption, use `<figure>` and `<figcaption>`:

```html
<figure>
  <img src="https://picsum.photos/id/1080/400/300" alt="A basket of ripe strawberries">
  <figcaption>Strawberries from our local market.</figcaption>
</figure>
```

### Try it

Write `alt` text for each case. Paper is fine.

1. A photo of a chef stirring a big pot of soup, on a cooking page.
2. A small decorative leaf icon next to every heading.
3. The company logo at the top of the page. It links to the home page.

<details><summary>Show possible answers</summary>

1. `alt="A chef stirring a large pot of pepper soup"`
2. `alt=""` (it is decoration, so screen readers should skip it)
3. Describe what the link does: `alt="Ada's Kitchen home"`

</details>

## Lists, a second look

You know `<ul>` (bullets) and `<ol>` (numbers). There is also a **description list**, `<dl>`. It holds pairs of a term and its description, like a glossary:

```html
<dl>
  <dt>Prep time</dt>
  <dd>15 minutes</dd>
  <dt>Cook time</dt>
  <dd>45 minutes</dd>
  <dt>Serves</dt>
  <dd>4 people</dd>
</dl>
```

- `<dt>` is the description **term**.
- `<dd>` is the description **details**.

You can also put a list inside a list. Put the inner list **inside** an `<li>`:

```html
<ul>
  <li>Vegetables
    <ul>
      <li>Onions</li>
      <li>Tomatoes</li>
    </ul>
  </li>
  <li>Spices</li>
</ul>
```

> ⚠️ **Watch out:** Only `<li>` elements can be direct children of `<ul>` and `<ol>`. Do not put a `<p>` or a nested `<ul>` straight inside a `<ul>`. Wrap it in an `<li>` first.

## Tables: data in rows and columns

Think of a school timetable or a price list. The information sits in a grid. In HTML, use a **table** for this kind of data.

```html
<table>
  <caption>Nutrition per serving</caption>
  <thead>
    <tr>
      <th scope="col">Nutrient</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Calories</th>
      <td>420</td>
    </tr>
    <tr>
      <th scope="row">Protein</th>
      <td>12 g</td>
    </tr>
    <tr>
      <th scope="row">Fat</th>
      <td>9 g</td>
    </tr>
  </tbody>
</table>
```

The parts:

- `<table>` wraps the whole table.
- `<caption>` is a title for the table. It helps everyone see what the table is about.
- `<thead>` and `<tbody>` are the header area and the main body.
- `<tr>` is a table **row**.
- `<th>` is a **header** cell. `scope="col"` means "I am the header for this column". `scope="row"` means "for this row".
- `<td>` is a normal data cell.

A table is like a spreadsheet. Rows go across. Each row should have the same number of cells.

> ⚠️ **Watch out:** Do not use tables to lay out a whole page. People did this in the 1990s. Tables are for data only. Use CSS for layout.

### Try it

Build a small table in the playground. It shows a weekly study plan with three columns: **Day**, **Time**, **Topic**. Add at least three rows and a `<caption>`. Use `<th>` for the column headers.

## Check your understanding

1. Why is "click here" bad link text?
2. When should an image have `alt=""`?
3. What is the difference between `<th>` and `<td>`?
4. Which element can be a direct child of a `<ul>`?
5. Name one thing a table should **not** be used for.

<details><summary>Show answers</summary>

1. It does not say where the link goes. A screen reader user who hears a list of links cannot tell them apart.
2. When the image is only decoration and gives no information.
3. `<th>` is a header cell (a label for a row or column). `<td>` is a normal data cell.
4. Only `<li>`.
5. Page layout. Tables are for data in rows and columns.

</details>

## Go deeper

- [web.dev: Learn HTML – Images](https://web.dev/learn/html/images)
- [web.dev: Learn HTML – Lists](https://web.dev/learn/html/lists)
- [MDN: HTML table basics](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics)
- [MDN: Creating hyperlinks](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can write link text that makes sense on its own
- write good alt text, and use `alt=""` for decoration
- nest lists correctly inside an `<li>`
- build a table with `caption`, `th` and `td`

### Purpose
Links, images and tables appear on nearly every page. Doing them well is the easiest accessibility gain for a beginner.

### Things to teach
1. **Link text.** Compare "click here" with "our full menu". Screen reader users hear a list of links alone. Also show `mailto:`, `tel:` and `target="_blank"` with `rel="noopener"`.
2. **Alt text.** Imagine describing the picture on the phone. Do the three Try it cases: chef with soup, decorative leaf (`alt=""`), and the logo link (`Ada's Kitchen home`). Never leave `alt` out.
3. **Figure and caption.** Show `figure` and `figcaption` with the strawberries example. Add `width` and `height`.
4. **Lists a second time.** Show the description list `dl` for Prep time, Cook time and Serves, and the nested Vegetables list. Only `<li>` can sit directly inside `<ul>`.
5. **Tables.** Build the Nutrition per serving table. Show `caption`, `thead`, `tbody`, `th scope`, and `td`. Use tables for data, never layout. Then do the study plan Try it.

### Check understanding
- Ask: "Why is "click here" bad link text?" A good answer: it says nothing about where the link goes when heard alone.
- Ask: "When should alt be empty?" A good answer: when the image is only decoration.
- Ask: "What can be a direct child of `<ul>`?" A good answer: only `<li>`.

### Watch for
- Alt text that starts with "image of" or is just "photo".
- A nested `<ul>` placed straight inside another `<ul>`, not inside an `<li>`.
- Rows with different numbers of cells in a table.
