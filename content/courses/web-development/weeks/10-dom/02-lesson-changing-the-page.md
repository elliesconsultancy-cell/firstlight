---
title: Changing the page
kind: lesson
minutes: 35
---
Imagine a shop window. The shop owner can change the sign, swap the poster, add a new toy to the display or take one away. Customers see the new window at once.

With JavaScript you are the shop owner of your page. You can change text, colours and pictures. You can add new things and remove old ones. In this lesson you learn how.

## Changing text with textContent

Every element has a `textContent` property. You can read it. You can also **set** it to something new.

```html
<h1 id="greeting">Hello!</h1>
```

```js
const greeting = document.querySelector("#greeting");
greeting.textContent = "Good morning, Bolton!";
```

Paste both into the playground. The heading changes as soon as the code runs.

> ⚠️ **Watch out:** You may see code online that uses `innerHTML` instead of `textContent`. `innerHTML` reads text as HTML. If a user types something like `<img src=x onerror=alert(1)>`, it could run as code. That is a security problem. Use `textContent` for text. When you need new HTML, create the elements properly (see below).

## Changing attributes

**Attributes** are the extra information inside a tag, like `src`, `href` or `alt`. Many of them are available as properties:

```html
<img id="photo" src="https://picsum.photos/id/237/200" alt="A puppy" />
<a id="link" href="https://example.com">A link</a>
```

```js
const photo = document.querySelector("#photo");
photo.src = "https://picsum.photos/id/1025/200";
photo.alt = "Another dog";

const link = document.querySelector("#link");
link.href = "https://developer.mozilla.org";
link.textContent = "Learn on MDN";
```

For any attribute, you can also use `setAttribute(name, value)` and `getAttribute(name)`.

## Changing classes

The best way to change how something *looks* is to add or remove a **CSS class**. Your CSS holds the styles. JavaScript switches them on and off.

Think of a light switch. The wiring (CSS) is already in the wall. JavaScript only flips the switch.

Every element has a `classList` with useful methods:

- `classList.add("name")` adds a class.
- `classList.remove("name")` removes a class.
- `classList.toggle("name")` adds it if it is missing, and removes it if it is there.
- `classList.contains("name")` gives `true` or `false`.

```html
<style>
  .highlight {
    background: gold;
    font-weight: bold;
  }
</style>
<p id="note">Remember to drink water.</p>
```

```js
const note = document.querySelector("#note");
note.classList.add("highlight");
console.log(note.classList.contains("highlight")); // true
```

### Try it

What do you think the console shows after these lines? Decide first.

```js
const note = document.querySelector("#note");
note.classList.toggle("highlight");
note.classList.toggle("highlight");
console.log(note.classList.contains("highlight"));
```

<details><summary>Show answers</summary>

It shows `false`. The first `toggle` adds the class. The second `toggle` removes it again.

</details>

## Changing styles directly

You can also set a style with the `style` property. CSS names with a dash become **camelCase** in JavaScript. For example, `background-color` becomes `backgroundColor`.

```js
const note = document.querySelector("#note");
note.style.color = "white";
note.style.backgroundColor = "teal";
note.style.padding = "8px";
```

> 💡 **Tip:** Prefer `classList` over `style` in real projects. When all styles live in CSS, they are easier to find and change. Use `style` for values you calculate in JavaScript, like the width of a progress bar.

## Creating new elements

Imagine you build a chair in your workshop. Then you carry it into the shop. Until you carry it in, nobody can see it.

Adding a new element to the page has three steps:

1. **Create** it with `document.createElement("tagName")`.
2. **Fill** it in. Set its text, classes and attributes.
3. **Attach** it to the page with `append` on a parent element.

```html
<ul id="shopping-list">
  <li>Rice</li>
</ul>
```

```js
const list = document.querySelector("#shopping-list");

const newItem = document.createElement("li"); // 1. create
newItem.textContent = "Plantain"; // 2. fill
list.append(newItem); // 3. attach
```

You can create many elements with a loop. This is very common:

```js
const list = document.querySelector("#shopping-list");
const foods = ["Tomatoes", "Onions", "Peppers"];

for (const food of foods) {
  const li = document.createElement("li");
  li.textContent = food;
  list.append(li);
}
```

## Removing elements

To remove an element, find it and call `remove()`:

```js
const firstItem = document.querySelector("#shopping-list li");
firstItem.remove();
```

To empty a whole container, set its text to an empty string. That removes all its children:

```js
const list = document.querySelector("#shopping-list");
list.textContent = "";
```

You will use this trick a lot in the "state and render" lesson.

## Try it: your turn

Paste this into the playground's HTML pane:

```html
<style>
  .card {
    border: 2px solid #333;
    border-radius: 8px;
    padding: 12px;
    margin: 8px 0;
  }
  .favourite {
    border-color: crimson;
  }
</style>
<h2 id="heading">Loading...</h2>
<div id="cards"></div>
```

In the JS pane, use only JavaScript to do these things:

1. Change the heading text to "My favourite songs".
2. Create an array of at least three song names.
3. Loop over the array. For each song, create a `div`, give it the class `card`, set its text to the song name, and append it to `#cards`.
4. Add the class `favourite` to the first card only (hint: `document.querySelector(".card")`).
5. Bonus: remove the last card.

## Check your understanding

1. Why is `textContent` safer than `innerHTML` for showing text a user typed?
2. What does `classList.toggle("dark")` do?
3. What is `font-size` called when you use the `style` property in JavaScript?
4. You created an element with `createElement`, but it does not appear on the page. What did you probably forget?

<details><summary>Show answers</summary>

1. `textContent` always treats the value as plain text. `innerHTML` treats it as HTML, so harmful code typed by a user could run.
2. It adds the class `dark` if the element does not have it. It removes the class if the element has it.
3. `fontSize` (camelCase, no dash).
4. To attach it to the page, for example with `parent.append(element)`.

</details>

## Go deeper

- [Modifying the document (javascript.info)](https://javascript.info/modifying-document)
- [Element.classList (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- [DOM scripting introduction (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting)
