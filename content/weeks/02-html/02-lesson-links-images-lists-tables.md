---
title: Links, images, lists and tables
kind: lesson
minutes: 35
---
You've already used links, images and lists. Now let's learn to use them **properly**, and add a new tool for organising information: tables.

## Links that make sense

A link is made with the `<a>` (anchor) element and the `href` attribute:

```html
<p>Read the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">MDN HTML guide</a> for more.</p>
```

### Write good link text

Screen reader users often listen to a list of **all the links** on a page, without the words around them. Imagine hearing: "click here, click here, read more, click here". Useless!

```html
<!-- Bad: the link text means nothing on its own -->
<p>To see our menu, <a href="menu.html">click here</a>.</p>

<!-- Good: the link text says where it goes -->
<p>Have a look at <a href="menu.html">our full menu</a>.</p>
```

> 🧠 **Remember:** Good link text makes sense **on its own**. Avoid "click here" and "read more".

### Other useful kinds of links

```html
<p><a href="mailto:hello@example.com">Email us</a></p>
<p><a href="tel:+441234567890">Call us</a></p>
<p><a href="https://web.dev" target="_blank" rel="noopener">web.dev (opens in a new tab)</a></p>
```

- `mailto:` opens the user's email app.
- `tel:` lets phone users call with one tap.
- `target="_blank"` opens the link in a new tab. Use it rarely, and tell users it opens a new tab. Add `rel="noopener"` for safety.

## Images and alt text

Every `<img>` needs `src` and `alt`:

```html
<img src="https://picsum.photos/id/292/400/300" alt="Fresh vegetables and herbs on a wooden chopping board" width="400" height="300">
```

The `alt` text is read aloud by screen readers, and shown if the image fails to load. Writing good alt text is a skill. Imagine you're describing the picture to a friend **on the phone**.

- **Be specific:** "A bowl of jollof rice with fried plantain" is better than "food".
- **Be brief:** one short sentence is usually enough.
- **Don't start with "image of"**: screen readers already say "image".
- **Think about purpose:** why is the image there? Describe what matters.

If an image is **only decoration** (like a swirly border), use an empty alt: `alt=""`. The screen reader will skip it. Don't leave the `alt` attribute out completely, because then some screen readers read out the file name, like "DSC underscore 0 0 4 7 dot jpg".

> 💡 **Tip:** Adding `width` and `height` helps the browser save space for the image before it loads, so the page doesn't jump around.

### Images with captions

To add a visible caption, use `<figure>` and `<figcaption>`:

```html
<figure>
  <img src="https://picsum.photos/id/1080/400/300" alt="A basket of ripe strawberries">
  <figcaption>Strawberries from our local market.</figcaption>
</figure>
```

### Try it

Write `alt` text for each of these situations (on paper is fine):

1. A photo of a chef stirring a big pot of soup, on a cooking page.
2. A small decorative leaf icon next to every heading.
3. The company logo at the top of the page, which links to the home page.

<details><summary>Show possible answers</summary>

1. `alt="A chef stirring a large pot of pepper soup"`
2. `alt=""` (it's decoration, so screen readers should skip it)
3. Describe what the link does: `alt="Ada's Kitchen home"`

</details>

## Lists, revisited

You know `<ul>` (bullets) and `<ol>` (numbers). There's also a **description list**, `<dl>`, for pairs of terms and descriptions, like a glossary:

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

- `<dt>` = description **term**
- `<dd>` = description **details**

Lists can also be nested. Put the inner list **inside** an `<li>`:

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

> ⚠️ **Watch out:** Only `<li>` elements can be direct children of `<ul>` and `<ol>`. Don't put a `<p>` or a nested `<ul>` straight inside a `<ul>`. Wrap it in an `<li>` first.

## Tables: for data in rows and columns

Tables are for **tabular data**: information that naturally fits in a grid, like a timetable, a price list or nutrition facts.

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

- `<table>` – wraps the whole table.
- `<caption>` – a title for the table. Helps everyone understand what it's about.
- `<thead>` and `<tbody>` – the header area and the main body.
- `<tr>` – a table **row**.
- `<th>` – a **header** cell. `scope="col"` means "I'm the header for this column"; `scope="row"` means "for this row".
- `<td>` – a normal data cell.

Think of a table like a spreadsheet: rows go across, and each row has the same number of cells.

> ⚠️ **Watch out:** Don't use tables to lay out a whole page (people did this in the 1990s!). Tables are for data only. Layout is a job for CSS.

### Try it

Build a small table in the playground showing a weekly study plan with three columns: **Day**, **Time**, **Topic**. Add at least three rows and a `<caption>`. Use `<th>` for the column headers.

## Check your understanding

1. Why is "click here" bad link text?
2. When should an image have `alt=""`?
3. What's the difference between `<th>` and `<td>`?
4. What element can be the direct child of a `<ul>`?
5. Name something a table should **not** be used for.

<details><summary>Show answers</summary>

1. It doesn't say where the link goes. Screen reader users who hear a list of links won't know what each one is.
2. When the image is purely decorative and adds no information.
3. `<th>` is a header cell (a label for a row or column). `<td>` is a normal data cell.
4. Only `<li>`.
5. Page layout. Tables are for tabular data.

</details>

## Go deeper

- [web.dev: Learn HTML – Images](https://web.dev/learn/html/images)
- [web.dev: Learn HTML – Lists](https://web.dev/learn/html/lists)
- [MDN: HTML table basics](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics)
- [MDN: Creating hyperlinks](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)
