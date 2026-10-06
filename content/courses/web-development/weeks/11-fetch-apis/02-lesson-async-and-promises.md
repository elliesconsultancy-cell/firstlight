---
title: Waiting for things - async code and promises
kind: lesson
minutes: 30
---
Picture two cafes. In the first, the cashier takes your order. Then she stands still and stares at the coffee machine until your drink is ready. A long queue grows behind you.

In the second cafe, the cashier takes your order and gives you a **ticket**. Then she serves the next person. When your coffee is ready, your number is called.

JavaScript works like the second cafe. Asking another computer for data takes time. It can be a tenth of a second, or five seconds on a slow train. JavaScript must not freeze the page while it waits. In this lesson you learn how JavaScript waits. This is the key to understanding `fetch`.

## Synchronous: one thing after another

Most code you have written so far is **synchronous**. Each line runs and finishes. Only then does the next line start.

```js
console.log("1. Wash the rice");
console.log("2. Boil the water");
console.log("3. Cook the rice");
```

This always prints 1, 2, 3, in order. It is predictable.

## The problem with waiting

Now imagine one step takes a long time, like downloading data. If JavaScript waited in the same way, **the whole page would freeze**. You could not scroll, click or type until the data arrived. Users would think the site was broken.

That is the first cafe. We want the second cafe.

## Asynchronous: start now, finish later

**Asynchronous** (or **async**) code starts a task and then carries on with other work. It deals with the result later, when the result is ready.

`setTimeout` shows this well. It runs a function after a delay, in milliseconds. Here 2000 means 2 seconds.

```js
console.log("1. Order placed");

setTimeout(() => {
  console.log("3. Coffee is ready! ☕");
}, 2000);

console.log("2. Serving the next customer");
```

What order do you think the output has? Think first. Then look:

```text
1. Order placed
2. Serving the next customer
3. Coffee is ready! ☕
```

Line 3 comes last, even though it is written in the middle. JavaScript did not wait for the timer. It moved on. It came back when the time was up.

> 🧠 **Remember:** With async code, the order you **write** things is not always the order they **happen**.

## Promises: the ticket

When you start an async task, like a network request, JavaScript gives you a **promise**. A promise is like the cafe ticket. It is not the coffee. It is a promise that you will get *something* later.

A promise is always in one of three states:

- **Pending.** It is still waiting. The coffee is being made.
- **Fulfilled.** It worked, and here is the value. Your coffee is ready.
- **Rejected.** Something went wrong, and here is the error. "Sorry, we have run out of milk."

You cannot open a promise and take the value at once. You cannot drink a ticket either. You must **wait** for it to finish.

```js
const ticket = fetch("https://dog.ceo/api/breeds/image/random");
console.log(ticket); // Promise {<pending>}
```

The log shows a `Promise`, not dog data. The request has started, but the answer has not arrived yet.

## Waiting with async and await

The clearest way to wait for a promise is with the keywords `async` and `await`:

- Put `async` before a function. It says, "This function contains waiting."
- Inside it, put `await` before a promise. It says, "Pause **this function** here until the promise finishes. Then give me the value."

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

You do not often write `new Promise` yourself. Here it pretends to be a slow task. Look at `visitCafe`. It reads from top to bottom like normal code. But the `await` line pauses only that function. The rest of the program, including the last `console.log`, keeps going.

In the cafe picture: the customer waits for her coffee, but the cashier keeps serving other people.

### Try it

Look at the code above. Which line prints first: "Ordering..." or "Meanwhile, the page is still working!"? Decide first.

<details><summary>Show answers</summary>

"Ordering..." prints first. `visitCafe()` runs until it reaches `await`. Then it pauses, and the next line, "Meanwhile, the page is still working!", prints. After 1.5 seconds, "Got my Flat white" prints.

</details>

> ⚠️ **Watch out:** You can use `await` only inside a function marked `async`. If you forget `async`, you see an error like `await is only valid in async functions`.

## When promises fail: try and catch

Promises can be rejected. To handle that, put your `await` inside a `try...catch` block. If anything inside `try` fails, JavaScript jumps to `catch` and gives you the error.

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

> 💡 **Tip:** You may see older code that uses `.then()` and `.catch()` instead of `await`. They do the same job. `async` and `await` are usually easier to read, so we use them in this course. It helps to recognise both.

## Try it: your turn

1. Predict the order of the output below. Write your prediction down. **Then** run it.

```js
console.log("A");
setTimeout(() => console.log("B"), 1000);
setTimeout(() => console.log("C"), 0);
console.log("D");
```

2. Write an `async` function called `boilEgg`. It logs "Egg in the pot". Then it waits 3 seconds using the `wait` helper below. Then it logs "Egg is ready".

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

1. Synchronous code runs one step at a time, and each step must finish before the next starts. Asynchronous code starts a task, carries on with other work, and handles the result later.
2. Pending, fulfilled and rejected.
3. It pauses the `async` function until a promise finishes. Then it gives you the value (or throws the error).
4. `fetch` returns a promise at once, while the request is still pending. You need to `await` it to get the result.
5. To catch errors from rejected promises. Your code can then show a helpful message instead of crashing.

</details>

## Go deeper

- [Introducing asynchronous JavaScript (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing)
- [Promise basics (javascript.info)](https://javascript.info/promise-basics)
- [Async/await (javascript.info)](https://javascript.info/async-await)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
