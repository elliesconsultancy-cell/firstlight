---
title: Events and event listeners
kind: lesson
minutes: 40
---
Think about the doorbell at your home. You do not stand at the door all day and wait. You do your work. When the bell rings, you go and open the door.

A web page can work like this too. It waits quietly. When the user clicks, types or sends a form, the page reacts. In this lesson you learn how to make your code wait for the user and then answer.

## What is an event?

An **event** is something that happens on the page. A click, a key press, typing in a box, a form being sent, the mouse moving. The browser notices all of them.

An **event listener** is a function that you ask the browser to run when a certain event happens on a certain element.

Back to the doorbell:

- The **event** is "the bell rang".
- The **listener** is "go and open the door".

Where the picture stops being true: a doorbell rings once per visitor. The same listener on a button can run again and again, every time the user clicks.

## addEventListener

You attach a listener with `addEventListener`. It takes two arguments: the **name** of the event, and the **function** to run.

```html
<button id="hello-button">Say hello</button>
<p id="message"></p>
```

```js
const button = document.querySelector("#hello-button");
const message = document.querySelector("#message");

function sayHello() {
  message.textContent = "Hello there! 👋";
}

button.addEventListener("click", sayHello);
```

Paste both into the playground. Click the button.

> ⚠️ **Watch out:** Write `sayHello`, **not** `sayHello()`. With brackets, the function runs at once, one time. Its result (`undefined`) is then given to `addEventListener`. Without brackets, you hand over the function itself. The browser calls it later.

You will often see the function written directly inside, as an arrow function. It does the same thing:

```js
button.addEventListener("click", () => {
  message.textContent = "Hello there! 👋";
});
```

## A click counter

A listener can change a variable. So the page can "remember" things between clicks.

```html
<button id="add">+1</button>
<p>Count: <span id="count">0</span></p>
```

```js
const addButton = document.querySelector("#add");
const countDisplay = document.querySelector("#count");
let count = 0;

addButton.addEventListener("click", () => {
  count = count + 1;
  countDisplay.textContent = count;
});
```

### Try it

You click the button four times. What number does the page show? Decide first.

<details><summary>Show answers</summary>

It shows `4`. Each click runs the listener. The listener adds 1 to `count` each time. The variable `count` stays alive between clicks, because it lives outside the listener.

</details>

## The input event and the event object

The `input` event fires every time the value of an `<input>` or `<textarea>` changes. That means on every key press.

When the browser calls your listener, it passes in an **event object**. It holds information about what happened. By habit we name it `event` (or `e`).

The most useful property is `event.target`. It is the element where the event happened.

```html
<label for="name">Your name</label>
<input id="name" type="text" />
<p id="preview">Hello, stranger!</p>
```

```js
const nameInput = document.querySelector("#name");
const preview = document.querySelector("#preview");

nameInput.addEventListener("input", (event) => {
  const typed = event.target.value;
  preview.textContent = `Hello, ${typed || "stranger"}!`;
});
```

Look at `.value`. For form fields, the text the user typed lives in `value`, not in `textContent`.

> 💡 **Tip:** Not sure what is inside the event object? Add `console.log(event)` at the start of your listener. Open the console and look around.

## Forms and the submit event

For forms, listen for the `submit` event on the **form**. Do not listen for `click` on the button. This way, pressing Enter works too. That is better for everyone, including keyboard and screen-reader users.

There is one surprise. By default, sending a form **reloads the page**. This is an old behaviour from before JavaScript. After the reload, everything your JavaScript did is gone.

To stop the reload, call `event.preventDefault()`.

```html
<form id="todo-form">
  <label for="todo">New task</label>
  <input id="todo" type="text" />
  <button type="submit">Add</button>
</form>
<p id="error"></p>
<ul id="todos"></ul>
```

```js
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo");
const error = document.querySelector("#error");
const list = document.querySelector("#todos");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page reloading

  const task = input.value.trim();

  if (task === "") {
    error.textContent = "Please type a task first.";
    return;
  }

  error.textContent = "";
  const li = document.createElement("li");
  li.textContent = task;
  list.append(li);

  input.value = ""; // clear the box, ready for the next task
});
```

There is a lot here. We go through it step by step:

1. `preventDefault()` stops the reload.
2. `.trim()` removes spaces at the start and end. So `"   "` counts as empty.
3. If the box is empty, we show an error and `return` early. This is **validation**: checking the input before we use it.
4. Otherwise we clear the error, create a list item and add it.
5. Last, we empty the input box.

> 🧠 **Remember:** You sent a form and everything vanished? You most likely forgot `event.preventDefault()`.

## A delete button for every item

What if you have many buttons, like a "Delete" button for each item? You can add a listener to each button inside a loop, at the moment you create it.

```html
<ul id="fruits"></ul>
```

```js
const fruitList = document.querySelector("#fruits");
const fruits = ["Mango", "Pawpaw", "Banana"];

for (const fruit of fruits) {
  const li = document.createElement("li");
  li.textContent = fruit + " ";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    li.remove();
  });

  li.append(deleteButton);
  fruitList.append(li);
}
```

Each delete button "remembers" its own `li`. So a click removes only that item.

## Try it: your turn

Build a small **character counter**, like the ones on social media sites.

```html
<label for="post">What's on your mind?</label>
<textarea id="post" rows="4" cols="40"></textarea>
<p><span id="remaining">100</span> characters left</p>
```

In the JS pane:

1. Listen for the `input` event on the textarea.
2. Each time, calculate `100 - textarea.value.length` and show it in `#remaining`.
3. If fewer than 10 characters are left, make the number red (use a CSS class or `style.color`).
4. Bonus: add a "Clear" button that empties the textarea and resets the counter to 100.

## Check your understanding

1. What is the difference between `button.addEventListener("click", greet)` and `button.addEventListener("click", greet())`?
2. Which property of the event object tells you which element the event happened on?
3. Why should you listen for `submit` on the form rather than `click` on the button?
4. What does `event.preventDefault()` do in a submit listener?
5. Where does the text a user typed into an `<input>` live: `textContent` or `value`?

<details><summary>Show answers</summary>

1. The first gives the browser the function to call later, on each click. The second calls `greet` straight away, one time, and passes its return value (usually `undefined`). So clicks do nothing.
2. `event.target`.
3. `submit` also fires when the user presses Enter. So the form works for keyboard users too.
4. It stops the browser's default behaviour of reloading the page when the form is sent.
5. `value`.

</details>

## Go deeper

- [Introduction to browser events (javascript.info)](https://javascript.info/introduction-browser-events)
- [EventTarget.addEventListener() (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [Introduction to events (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can attach a listener with `addEventListener` for `click`, `input` and `submit`.
- Learners can use the event object, including `event.target.value`.
- Learners can stop a form reloading the page and validate its input.

### Purpose
Events are how a page responds to people. Forms are in nearly every real site, and the reload surprise catches everyone once.

### Things to teach
1. **Listeners.** Use the "Say hello" button. Pass the function name, `sayHello`, not `sayHello()`. Show what happens with the brackets.
2. **Variables remember.** Use the click counter. The `count` variable lives outside the listener, so it keeps its value between clicks.
3. **The event object.** Use the name preview. `input` fires on every key press, and `event.target.value` holds what was typed.
4. **Forms.** Use the todo form. Listen for `submit` on the form. Call `event.preventDefault()`, use `.trim()` and show an error if the box is empty. Then create the `li` and clear the input.
5. **Buttons in a loop.** Use the fruits list and delete buttons. The listener is added when each button is created.

### Check understanding
- Ask: "Why `sayHello` and not `sayHello()`?" A good answer: brackets run it straight away. We want the browser to run it later, on a click.
- Ask: "Your form submits and your page vanishes. Why?" A good answer: the form reloaded the page. You forgot `event.preventDefault()`.
- Ask: "Where is the typed text in an input?" A good answer: `event.target.value`, not `textContent`.

### Watch for
- Listening for `click` on the submit button instead of `submit` on the form. Enter then does not work.
- Forgetting `.trim()`, so a box of spaces counts as a task.
