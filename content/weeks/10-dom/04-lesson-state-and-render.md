---
title: State and render
kind: lesson
minutes: 40
---
As soon as your app has more than one button, it is easy to get lost: which parts of the page need updating, and when? In this lesson you will learn a simple pattern that professional front-end developers rely on, and that tools like React are built around: keep your data in one place, and draw the page from it.

## The problem with changing the page bit by bit

In the last lesson, every listener changed the page directly: add an `li` here, remove one there, update a counter somewhere else. That works for small things. But imagine a to-do app with a list, a "done" button, a delete button and a count of tasks left. Every time anything changes, you must remember to update *every* part that depends on it. Forget one, and the count says 3 when the list shows 4.

## The idea: state, then render

The pattern has two parts:

- **State** – the data that describes your app right now. Usually an array of objects in a variable.
- **Render** – one function that empties the page area and draws it again from the state.

And one rule: **when something changes, update the state, then call render.** Never change the page directly in a listener.

Think of a football scoreboard. The referee does not repaint the numbers by hand. Someone updates the score in the system (the state), and the board redraws itself from it (the render). The board can never disagree with the real score.

## Step 1: the state

```js
const books = [
  { title: "Things Fall Apart", author: "Chinua Achebe", done: true },
  { title: "Small Island", author: "Andrea Levy", done: false },
  { title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie", done: false },
];
```

This array is the single source of truth. Everything the user sees will come from it.

## Step 2: the render function

```html
<h2>Reading list (<span id="count"></span> to read)</h2>
<ul id="book-list"></ul>
```

```js
const books = [
  { title: "Things Fall Apart", author: "Chinua Achebe", done: true },
  { title: "Small Island", author: "Andrea Levy", done: false },
  { title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie", done: false },
];

const list = document.querySelector("#book-list");
const count = document.querySelector("#count");

function render() {
  list.textContent = ""; // 1. clear the old version

  for (const book of books) { // 2. draw each item from state
    const li = document.createElement("li");
    li.textContent = `${book.title} by ${book.author}`;
    if (book.done) {
      li.style.textDecoration = "line-through";
    }
    list.append(li);
  }

  const toRead = books.filter((book) => !book.done); // 3. derived info
  count.textContent = toRead.length;
}

render();
```

Paste both into the playground. The list and the count are both drawn from the same array, so they always agree.

Notice step 3: we do not keep a separate `toReadCount` variable. We **work it out** from the state every time we render. Information you can calculate from the state should be calculated, not stored twice.

## Step 3: changing the state

Now let's add interaction. Each book gets a button that toggles `done`. In the listener, we change only the **state**, then call `render()`.

```js
function render() {
  list.textContent = "";

  for (const book of books) {
    const li = document.createElement("li");
    li.textContent = `${book.title} by ${book.author} `;
    if (book.done) {
      li.style.textDecoration = "line-through";
    }

    const toggleButton = document.createElement("button");
    toggleButton.textContent = book.done ? "Mark unread" : "Mark read";
    toggleButton.addEventListener("click", () => {
      book.done = !book.done; // update state
      render(); // redraw
    });

    li.append(toggleButton);
    list.append(li);
  }

  count.textContent = books.filter((book) => !book.done).length;
}

render();
```

Replace the old `render` function in the JS pane with this one (keep the `books`, `list` and `count` lines at the top). Click the buttons: the line-through, the button text and the count all update together, and you only wrote the update logic once.

## Step 4: adding from a form

The same rule works for adding. The form's job is to **push a new object into the array**, then render.

```html
<form id="add-form">
  <label for="title">Title</label>
  <input id="title" />
  <label for="author">Author</label>
  <input id="author" />
  <button type="submit">Add book</button>
</form>
<p id="error"></p>
```

```js
const form = document.querySelector("#add-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const error = document.querySelector("#error");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title === "" || author === "") {
    error.textContent = "Please fill in both the title and the author.";
    return;
  }

  error.textContent = "";
  books.push({ title: title, author: author, done: false }); // update state
  render(); // redraw
  form.reset(); // empty the inputs
});
```

Add this HTML above the list and this JS below your other code. Now you have a small but complete app.

> 💡 **Tip:** `form.reset()` clears every field in the form at once.

> ⚠️ **Watch out:** If you forget `list.textContent = ""` at the start of `render`, every render adds the whole list *again* underneath the old one, and your list doubles each time you click.

## Why this pattern is worth it

- **Fewer bugs.** The page is always a picture of the state, so parts cannot disagree.
- **Easier to add features.** Want a delete button? Remove the item from the array and call `render()`. Want sorting? Sort the array and call `render()`.
- **Easier to debug.** If the page looks wrong, `console.log(books)`. Either the state is wrong (fix the listener) or the drawing is wrong (fix `render`).
- **It prepares you for frameworks.** React, Vue and Svelte all work on this idea. They just make rendering faster and the code shorter.

> 🧠 **Remember:** Listeners change the **state**. `render` changes the **page**. Keep those two jobs apart.

### Try it

Starting from the reading list above:

1. Add a **Delete** button to each book. In its listener, remove that book from the array (hint: `books.indexOf(book)` and `books.splice(index, 1)`), then call `render()`.
2. Show a message "Your list is empty! 📚" when there are no books left (hint: check `books.length` inside `render`).
3. Bonus: add a "Hide read books" checkbox. Store whether it is ticked in a variable, and use `filter` inside `render` to decide which books to draw.

## Check your understanding

1. In your own words, what is "state"?
2. What are the three things a typical `render` function does?
3. A user clicks "Mark read". What two things should the click listener do, in which order?
4. Why do we calculate the number of unread books inside `render` instead of keeping a separate counter variable?

<details><summary>Show answers</summary>

1. The data that describes what the app looks like right now, usually stored in variables such as an array of objects.
2. Clear the old content, create elements for each item in the state, and update any extra information (like a count) worked out from the state.
3. First update the state (set `done` on that book), then call `render()` to redraw the page.
4. So there is only one source of truth. A separate counter could get out of step with the array if we forget to update it.

</details>

## Go deeper

- [Array.prototype.filter() (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.splice() (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [Forms: event and method submit (javascript.info)](https://javascript.info/forms-submit)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
