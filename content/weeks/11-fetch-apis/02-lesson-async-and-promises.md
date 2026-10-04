---
title: Waiting for things - async code and promises
kind: lesson
minutes: 30
---
Asking another computer for data takes time, maybe a tenth of a second, maybe five seconds on a slow train. JavaScript cannot simply freeze the page while it waits. In this lesson you will learn how JavaScript handles waiting, which is the key to understanding `fetch`.

## Synchronous: one thing after another

Most code you have written so far is **synchronous**. Each line runs, finishes, and only then does the next line start.

```js
console.log("1. Wash the rice");
console.log("2. Boil the water");
console.log("3. Cook the rice");
```

This always prints 1, 2, 3, in order. Simple and predictable.

## The problem with waiting

Now imagine one of those steps takes a long time, like downloading data. If JavaScript waited synchronously, **the whole page would freeze**. No scrolling, no clicking, no typing, until the data arrived. Users would think the site was broken.

Think about ordering at a busy café. In a badly run café, the cashier takes your order, then stands still, staring at the coffee machine until your drink is ready, while a long queue builds up behind you. In a well-run café, the cashier takes your order, gives you a **ticket**, and serves the next person. When your coffee is ready, your number is called.

JavaScript works like the well-run café.

## Asynchronous: start now, finish later

**Asynchronous** (or **async**) code starts a task, then carries on with other work, and deals with the result later, when it is ready.

`setTimeout` is a simple way to see this. It runs a function after a delay (in milliseconds):

```js
console.log("1. Order placed");

setTimeout(() => {
  console.log("3. Coffee is ready! ☕");
}, 2000);

console.log("2. Serving the next customer");
```

Run it and look carefully at the order of the output:

```text
1. Order placed
2. Serving the next customer
3. Coffee is ready! ☕
```

Line 3 appears last, even though it is written in the middle. JavaScript did not wait for the timer. It moved on, and came back when the time was up.

> 🧠 **Remember:** With async code, the order you **write** things is not always the order they **happen**.

## Promises: the ticket

When you start an async task like a network request, JavaScript gives you a **promise**. A promise is like that café ticket: it is not the coffee itself, it is a promise that you will get *something* later.

A promise is always in one of three states:

- **Pending** – still waiting. The coffee is being made.
- **Fulfilled** – it worked, and here is the value. Your coffee is ready.
- **Rejected** – something went wrong, and here is the error. "Sorry, we have run out of milk."

You cannot open a promise and grab the value straight away, just like you cannot drink a ticket. You must **wait** for it to finish.

```js
const ticket = fetch("https://dog.ceo/api/breeds/image/random");
console.log(ticket); // Promise {<pending>}
```

The log shows a `Promise`, not dog data. The request has started, but the answer has not arrived yet.

## Waiting with async and await

The most readable way to wait for a promise is with the keywords `async` and `await`.

- Put `async` before a function to say "this function contains waiting".
- Inside it, put `await` before a promise to say "pause **this function** here until the promise finishes, then give me the value".

```js
function makeCoffee() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Flat white ☕"), 1500);
  });
}

async function visitCafe() {
  console.log("Ordering...");
  const drink = await makeCoffee();
  console.log(`Got my ${drink}`);
}

visitCafe();
console.log("Meanwhile, the page is still working!");
```

You do not need to write promises yourself with `new Promise` very often. Here it just pretends to be a slow task. Focus on `visitCafe`: it reads top to bottom like normal code, but the `await` line pauses only that function. The rest of the program, including the last `console.log`, keeps going.

> ⚠️ **Watch out:** You can only use `await` inside a function marked `async`. If you forget `async`, you will see an error like `await is only valid in async functions`.

## When promises fail: try and catch

Promises can be rejected. To handle that, wrap your `await` in a `try...catch` block. If anything inside `try` fails, JavaScript jumps straight to `catch`, with the error.

```js
function makeCoffee(milkLeft) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (milkLeft) {
        resolve("Latte");
      } else {
        reject(new Error("Sorry, no milk left"));
      }
    }, 1000);
  });
}

async function visitCafe() {
  try {
    const drink = await makeCoffee(false);
    console.log(`Enjoying my ${drink}`);
  } catch (error) {
    console.log(`Problem: ${error.message}`);
  }
}

visitCafe();
```

Change `false` to `true` and run it again to see the happy path.

> 💡 **Tip:** You may see older code using `.then()` and `.catch()` instead of `await`. They do the same job. `async`/`await` is usually easier to read, so we use it in this course, but it is useful to recognise both.

### Try it

1. Predict the order of the output below, write your prediction down, **then** run it.

```js
console.log("A");
setTimeout(() => console.log("B"), 1000);
setTimeout(() => console.log("C"), 0);
console.log("D");
```

2. Write an `async` function called `boilEgg` that logs "Egg in the pot", waits 3 seconds using the `wait` helper below, then logs "Egg is ready 🥚".

```js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function boilEgg() {
  // your code here
}

boilEgg();
```

## Check your understanding

1. What is the difference between synchronous and asynchronous code?
2. What are the three states a promise can be in?
3. What does `await` do?
4. Why does `console.log(fetch(url))` not show the data?
5. What is `try...catch` used for with `await`?

<details><summary>Show answers</summary>

1. Synchronous code runs one step at a time and each step must finish before the next starts. Asynchronous code starts a task, carries on with other work, and handles the result later.
2. Pending, fulfilled and rejected.
3. It pauses the `async` function until a promise finishes, then gives you its value (or throws its error).
4. `fetch` returns a promise immediately, while the request is still pending. You need to `await` it to get the result.
5. To catch errors from rejected promises, so your code can show a helpful message instead of crashing.

</details>

## Go deeper

- [Introducing asynchronous JavaScript (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing)
- [Promise basics (javascript.info)](https://javascript.info/promise-basics)
- [Async/await (javascript.info)](https://javascript.info/async-await)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
