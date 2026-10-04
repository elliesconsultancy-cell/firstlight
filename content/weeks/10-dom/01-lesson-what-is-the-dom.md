---
title: What is the DOM?
kind: lesson
minutes: 30
---
When you open a web page, the browser does not just show your HTML file. It reads it and builds a living model of the page in memory. That model is called the DOM, and once you can reach it with JavaScript, you can change anything on the page.

## The page as a family tree

**DOM** stands for **Document Object Model**. That sounds complicated, but the idea is simple: the browser turns your HTML into a **tree** of objects.

Look at this HTML:

```html
<main>
  <h1>My recipes</h1>
  <ul>
    <li>Jollof rice</li>
    <li>Pancakes</li>
  </ul>
</main>
```

The browser sees it like a family tree:

```text
main
├── h1  "My recipes"
└── ul
    ├── li  "Jollof rice"
    └── li  "Pancakes"
```

- `main` is the **parent** of `h1` and `ul`.
- `h1` and `ul` are **siblings** (same parent).
- The two `li` elements are **children** of `ul`.

Each box in the tree is called a **node**, and each HTML element becomes an **object** in JavaScript. You already know objects: they have properties, like `person.name`. DOM elements are the same. They have properties like `textContent` (the text inside them) and methods like `remove()`.

> 🧠 **Remember:** Your HTML file is the *recipe*. The DOM is the *cake*. JavaScript changes the cake, not the recipe. If you change the DOM and refresh the page, the browser rebuilds it from the HTML file and your changes are gone.

## Seeing the DOM in DevTools

Open any page in Chrome, right-click on something and choose **Inspect**. The **Elements** panel shows the DOM tree. You can click the little triangles to open and close parents, just like folders.

Try this: double-click some text in the Elements panel, change it, and press Enter. The page changes immediately! That is exactly what we are going to do with JavaScript.

## Connecting a script to your page

In your own projects (outside the playground), you link a JavaScript file to your HTML with a `<script>` tag. Put it in the `<head>` and add the word `defer`:

```html
<head>
  <title>My recipes</title>
  <script src="script.js" defer></script>
</head>
```

Why `defer`? The browser reads HTML from top to bottom. Without `defer`, it would run your script *before* it has built the rest of the page, so your code would look for elements that do not exist yet. `defer` means "download this now, but wait until the whole page is ready before running it".

It is like a waiter who takes your order straight away but waits until all the guests have arrived before serving the food.

> 💡 **Tip:** The course playground already connects your JS pane to your HTML pane for you. You only need the `<script>` tag when you build your own files in VS Code.

## Finding elements

Before you can change an element, you have to find it. There are three tools you will use all the time.

### querySelector

`document.querySelector` takes a **CSS selector** (the same ones you use in your CSS files) and gives you back the **first** element that matches.

```html
<h1 id="title">My recipes</h1>
<p class="intro">Food I love to cook.</p>
<ul>
  <li>Jollof rice</li>
  <li>Pancakes</li>
</ul>
```

```js
const title = document.querySelector("#title");
const intro = document.querySelector(".intro");
const firstItem = document.querySelector("li");

console.log(title.textContent); // "My recipes"
console.log(intro.textContent); // "Food I love to cook."
console.log(firstItem.textContent); // "Jollof rice"
```

Paste the HTML into the playground's HTML pane and the JS into the JS pane, then run it.

### querySelectorAll

`querySelectorAll` gives you **all** the matching elements, in a list called a **NodeList**. You can loop over it with `for...of` or `forEach`, just like an array.

```js
const items = document.querySelectorAll("li");

console.log(items.length); // 2

for (const item of items) {
  console.log(item.textContent);
}
```

### getElementById

`getElementById` finds one element by its `id`. Notice there is **no** `#` here, because the method name already says "Id".

```js
const title = document.getElementById("title");
console.log(title.textContent);
```

`querySelector("#title")` and `getElementById("title")` do the same job. Many developers just use `querySelector` for everything, because it works with any CSS selector.

## When nothing is found

If `querySelector` cannot find a match, it returns `null`. Then, if you try to use it, you get an error like this:

```text
Uncaught TypeError: Cannot read properties of null (reading 'textContent')
```

This is one of the most common errors in front-end JavaScript. When you see it, ask:

- Did I spell the selector correctly? (`#titel` instead of `#title`?)
- Did I forget the `#` or `.`?
- Does the element really exist in the HTML?
- Did my script run before the page was ready? (Did I forget `defer`?)

> ⚠️ **Watch out:** `querySelector(".intro")` and `querySelector("intro")` are very different. The first looks for `class="intro"`. The second looks for an `<intro>` element, which does not exist, so you get `null`.

### Try it

Paste this HTML into the playground's HTML pane:

```html
<h2 id="shop-name">Corner Shop</h2>
<ul class="products">
  <li class="product">Bread</li>
  <li class="product">Milk</li>
  <li class="product special">Mangoes</li>
</ul>
<p>Open every day</p>
```

Now, in the JS pane, write code that logs:

1. The text of the shop name (use `getElementById`)
2. How many products there are (use `querySelectorAll`)
3. The text of the special product (use `querySelector` with the `.special` class)
4. The text of every product, one per line

Then break it on purpose: change `.special` to `.speshal`. What error do you see? Can you explain it?

## Check your understanding

1. What does DOM stand for, and what is it in simple words?
2. Why should you add `defer` to your `<script>` tag?
3. What is the difference between `querySelector` and `querySelectorAll`?
4. `document.querySelector("#menu")` returns `null`. Give two possible reasons.

<details><summary>Show answers</summary>

1. Document Object Model. It is the tree of objects the browser builds from your HTML, which JavaScript can read and change.
2. So the script waits until the whole page has been built before it runs. Otherwise it might look for elements that do not exist yet.
3. `querySelector` returns only the first matching element (or `null`). `querySelectorAll` returns a list of all matching elements (which can be empty).
4. Any two of: there is no element with `id="menu"`, there is a spelling mistake, the script ran before the page loaded, or the id is really a class (it should be `.menu`).

</details>

## Go deeper

- [Introduction to the DOM (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [DOM tree (javascript.info)](https://javascript.info/dom-nodes)
- [Searching: getElement*, querySelector* (javascript.info)](https://javascript.info/searching-elements-dom)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
