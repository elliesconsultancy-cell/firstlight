---
title: Reading list or quote app
kind: assignment
submission: any
---
## What you'll build

Think of a notebook where you write the books you want to read. You tick a book when you finish it. Now we build that notebook as a web app.

You use everything from this week: selecting elements, creating them, listening for events, and the state and render pattern. Choose **one** of these two ideas:

- **Reading list** – a list of books you want to read. You can add new books, mark them as read, and see how many are left.
- **Quote of the day** – a collection of quotes you love. One is featured at the top as "today's quote", the rest are listed underneath. You can add new quotes, mark favourites, and see how many favourites you have.

Both apps have the same shape, so pick the one you like more. You publish it on GitHub Pages, so anyone can use it.

## Requirements

- [ ] The project has three files: `index.html`, `style.css` and `script.js`, with the script linked using `defer`
- [ ] The starting data is an **array of objects** in `script.js` (at least 3 items)
- [ ] A `render()` function draws the list on the page from the array
- [ ] A form lets the user add a new item (book: title and author; quote: text and who said it)
- [ ] The form uses the `submit` event and `event.preventDefault()`
- [ ] Validation: if a field is empty (or only spaces), show a friendly error message on the page and do not add the item
- [ ] Each item has a button to toggle it (read / not read, or favourite / not favourite), and the item looks different when toggled (use a CSS class)
- [ ] A count is shown on the page (books left to read, or number of favourites) and stays correct after every change
- [ ] Listeners only change the state and then call `render()`
- [ ] Every input has a `<label>`, and the page works on a phone-sized screen
- [ ] The app is published on GitHub Pages and the code is in a public GitHub repository

## Steps/hints

### 1. Plan before you code

Write down your answers in pseudocode or plain sentences:

- What does one item in your array look like? (Which properties?)
- What does `render` need to draw?
- What happens when the form is submitted?
- What happens when a toggle button is clicked?

### 2. Starter HTML

```html
<main>
  <h1>My reading list</h1>
  <p><span id="count">0</span> books left to read</p>

  <form id="add-form">
    <label for="title">Title</label>
    <input id="title" type="text" />

    <label for="author">Author</label>
    <input id="author" type="text" />

    <button type="submit">Add book</button>
    <p id="error" class="error"></p>
  </form>

  <ul id="list"></ul>
</main>
```

In your own `index.html`, put this inside `<body>`, and link your files in the `<head>`:

```html
<link rel="stylesheet" href="style.css" />
<script src="script.js" defer></script>
```

### 3. Starter JavaScript

```js
// STATE
const books = [
  { title: "Things Fall Apart", author: "Chinua Achebe", read: false },
  { title: "The Alchemist", author: "Paulo Coelho", read: true },
  { title: "Americanah", author: "Chimamanda Ngozi Adichie", read: false },
];

// ELEMENTS
const list = document.querySelector("#list");
const count = document.querySelector("#count");
const form = document.querySelector("#add-form");
const error = document.querySelector("#error");

// RENDER
function render() {
  list.textContent = "";

  for (const book of books) {
    const li = document.createElement("li");
    li.textContent = `${book.title} – ${book.author} `;
    // TODO: add a class if the book is read
    // TODO: create a toggle button with a click listener
    list.append(li);
  }

  // TODO: update the count of unread books
}

// EVENTS
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // TODO: read and trim the inputs
  // TODO: validate, show an error if needed
  // TODO: push a new object, render, reset the form
});

render();
```

If you choose the **quote** app, change the objects to something like `{ text: "...", author: "...", favourite: false }`.

For "today's quote", you can show `quotes[0]` at the top. Or pick one at random with `Math.floor(Math.random() * quotes.length)`.

### 4. A little CSS for the toggled state

```css
.read {
  text-decoration: line-through;
  opacity: 0.6;
}

.error {
  color: crimson;
}
```

### 5. Build in small steps

Make each step work before you start the next one. **Commit after each step**:

1. Render the starting array
2. Show the count
3. Add the toggle button
4. Add new items through the form
5. Add validation
6. Style it and check it on a small screen (use Chrome DevTools' device toolbar)

### 6. Publish

Push to GitHub. Turn on GitHub Pages in your repository's **Settings → Pages**, like you did in the Git week. Open the live link and test everything again. It is common to forget a file.

> 💡 **Tip:** If your live page shows no list, open DevTools on the live site and check the console for errors. A common cause is a wrong file name in the `<script>` tag (for example `Script.js` instead of `script.js`).

## How to submit

Use the submit form to send:

- **Link**: your GitHub Pages URL (the live app). Put your repository link in the written answer.
- **Written answer** (a few sentences): which app you chose, the repository link, and one thing that was hard and how you solved it.
- **File upload** (optional): a screenshot of your app on a phone-sized screen.

## Stretch goals

- Add a **Delete** button for each item
- Add a filter: "Show all / Only unread" (or "Only favourites")
- Sort the list alphabetically, with a button to switch the order
- Save the list in `localStorage` so it is still there after a page refresh (look up `JSON.stringify` and `localStorage.setItem`; we cover JSON next week)
- For the quote app: add a "New quote" button that features a different random quote

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
