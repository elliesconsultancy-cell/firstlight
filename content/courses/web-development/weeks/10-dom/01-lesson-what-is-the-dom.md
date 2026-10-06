---
title: What is the DOM?
kind: lesson
minutes: 30
---
Think about your own family. There are parents, children and cousins. Everyone has a place in the tree. If you want to talk to your aunt, you can find her by following the branches.

A web page has a family tree too. The browser builds it from your HTML. When JavaScript can reach this tree, it can change anything on the page. That tree is called the DOM.

## The page as a family tree

**DOM** stands for **Document Object Model**. The idea is simple. The browser turns your HTML into a **tree** of objects.

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
- `h1` and `ul` are **siblings**. They have the same parent.
- The two `li` elements are **children** of `ul`.

Each box in the tree is a **node**. Each HTML element becomes an **object** in JavaScript.

You already know objects. They have properties, like `person.name`. DOM elements work the same way. They have properties like `textContent` (the text inside them) and methods like `remove()`.

> 🧠 **Remember:** Your HTML file is the *recipe*. The DOM is the *cake*. JavaScript changes the cake, not the recipe. If you refresh the page, the browser bakes a new cake from the recipe, and your changes are gone.

## Seeing the DOM in DevTools

Open any page in Chrome. Right-click something and choose **Inspect**. The **Elements** panel shows the DOM tree. Click the little triangles to open and close parents, like folders.

Try it. Double-click some text in the Elements panel, change it, and press Enter. The page changes at once. We will do exactly this with JavaScript.

## Connecting a script to your page

In your own projects, you link a JavaScript file to your HTML with a `<script>` tag. Put it in the `<head>` and add the word `defer`:

```html
<head>
  <title>My recipes</title>
  <script src="script.js" defer></script>
</head>
```

Why `defer`? The browser reads HTML from top to bottom. Without `defer`, it runs your script *before* it has built the rest of the page. Your code then looks for elements that do not exist yet.

`defer` means: "Download this now, but wait until the whole page is ready before you run it."

Think of a waiter. He takes your order straight away, but he waits until all the guests have arrived before he serves the food.

> 💡 **Tip:** The course playground already connects your JS pane to your HTML pane. You need the `<script>` tag only when you build your own files in VS Code.

## Finding elements

Before you can change an element, you must find it. Three tools do this. You will use them all the time.

### querySelector

`document.querySelector` takes a **CSS selector**, the same kind you use in CSS files. It gives you back the **first** element that matches.

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

Paste the HTML into the playground's HTML pane and the JS into the JS pane. Run it.

### querySelectorAll

`querySelectorAll` gives you **all** the matching elements, in a list called a **NodeList**. You can loop over it with `for...of` or `forEach`, like an array.

```js
const items = document.querySelectorAll("li");

console.log(items.length); // 2

for (const item of items) {
  console.log(item.textContent);
}
```

### getElementById

`getElementById` finds one element by its `id`. There is **no** `#` here, because the method name already says "Id".

```js
const title = document.getElementById("title");
console.log(title.textContent);
```

`querySelector("#title")` and `getElementById("title")` do the same job. Many developers use `querySelector` for everything, because it works with any CSS selector.

## When nothing is found

If `querySelector` finds no match, it returns `null`. If you then try to use it, you get an error like this:

```text
Uncaught TypeError: Cannot read properties of null (reading 'textContent')
```

This is one of the most common errors in front-end JavaScript. When you see it, ask yourself:

- Did I spell the selector correctly? (`#titel` instead of `#title`?)
- Did I forget the `#` or the `.`?
- Does the element really exist in the HTML?
- Did my script run before the page was ready? (Did I forget `defer`?)

> ⚠️ **Watch out:** `querySelector(".intro")` and `querySelector("intro")` are very different. The first looks for `class="intro"`. The second looks for an `<intro>` element. That does not exist, so you get `null`.

## Try it

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

In the JS pane, write code that logs:

1. The text of the shop name (use `getElementById`)
2. How many products there are (use `querySelectorAll`)
3. The text of the special product (use `querySelector` with the `.special` class)
4. The text of every product, one per line

Then break it on purpose. Change `.special` to `.speshal`. What error do you see? Can you explain it?

## Check your understanding

1. What does DOM stand for, and what is it in simple words?
2. Why should you add `defer` to your `<script>` tag?
3. What is the difference between `querySelector` and `querySelectorAll`?
4. `document.querySelector("#menu")` returns `null`. Give two possible reasons.

<details><summary>Show answers</summary>

1. Document Object Model. It is the tree of objects the browser builds from your HTML. JavaScript can read and change it.
2. The script then waits until the whole page is built before it runs. Otherwise it might look for elements that do not exist yet.
3. `querySelector` returns only the first matching element (or `null`). `querySelectorAll` returns a list of all matching elements (the list can be empty).
4. Any two of: there is no element with `id="menu"`, there is a spelling mistake, the script ran before the page loaded, or the name is really a class (it should be `.menu`).

</details>

## Go deeper

- [Introduction to the DOM (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [DOM tree (javascript.info)](https://javascript.info/dom-nodes)
- [Searching: getElement*, querySelector* (javascript.info)](https://javascript.info/searching-elements-dom)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
