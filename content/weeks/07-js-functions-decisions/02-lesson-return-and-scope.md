---
title: Return vs console.log, and scope
kind: lesson
minutes: 25
---
Here is a puzzle that confuses almost every new programmer: "My function shows the right answer, so why is my variable `undefined`?" By the end of this lesson you'll understand exactly why, and you'll never be caught by it again.

## Two very different jobs

`console.log` and `return` can look similar, because both seem to "produce an answer". But they do completely different jobs.

- **`console.log`** **shows** a value to a human, in the console. It's like saying the answer out loud. The program can't use what you said.
- **`return`** **gives** a value back to the code that called the function. It's like handing over the answer on a piece of paper. The program can keep it, store it, and use it.

Imagine you ask a friend to work out a restaurant bill. If they just **shout** "It's £40!" across the room, you heard it, but you have nothing written down to pay with. If they **hand you** a note that says £40, you can put it in your wallet, add the tip, and pay. Shouting is `console.log`. Handing over the note is `return`.

## Seeing the difference

```js
function addLogged(a, b) {
  console.log(a + b);
}

function addReturned(a, b) {
  return a + b;
}

const first = addLogged(2, 3);    // logs 5
const second = addReturned(2, 3); // logs nothing

console.log(first);  // undefined
console.log(second); // 5
```

Let's play computer:

- `addLogged(2, 3)` logs `5` to the console. But it doesn't `return` anything. A function with no `return` gives back `undefined`. So `first` is `undefined`.
- `addReturned(2, 3)` logs nothing. But it returns `5`, so `second` holds `5`.

> 🧠 **Remember:** A function without `return` always returns `undefined`. Seeing the right number in the console does **not** mean your function returned it.

### Why return is usually what you want

A returned value can be used to build bigger things:

```js
function addVat(price) {
  return price * 1.2;
}

function formatPrice(amount) {
  return `£${amount.toFixed(2)}`;
}

const label = formatPrice(addVat(15));
console.log(label); // £18.00
```

Here `addVat(15)` returns `18`, which goes straight into `formatPrice`, which returns `"£18.00"`. This only works because both functions **return**. If `addVat` had only logged, `formatPrice` would receive `undefined` and crash.

> 💡 **Tip:** A good rule: functions should usually **return** their result. Do the `console.log` *outside*, where you call the function. This keeps your functions useful in more places.

## return stops the function

As soon as `return` runs, the function ends. Any code after it, inside the function, is skipped.

```js
function checkAge(age) {
  return age >= 18;
  console.log("This line never runs");
}

console.log(checkAge(20)); // true
```

VS Code often greys out code after a `return` to show it can never run. Developers call this **unreachable code** (or dead code).

### Try it

Each function below has a problem. Run the code, read the output, then fix the functions so all three final logs show the right answer.

```js
function double(n) {
  console.log(n * 2);
}

function getInitial(name) {
  name[0].toUpperCase();
}

function halve(n) {
  return;
  n / 2;
}

console.log(double(4));        // should be 8
console.log(getInitial("zara")); // should be "Z"
console.log(halve(10));        // should be 5
```

## Scope: where can a variable be seen?

**Scope** is about *where* in your code a variable exists and can be used.

Think of a house. Things in the **living room** (shared space) can be used by everyone in the house. Things in **your bedroom** with the door locked can only be used by you, inside your room. In JavaScript:

- A variable created **outside** any function is in the **global scope**. Code everywhere can see it, like the living room.
- A variable created **inside** a function (including its parameters) is in that function's **local scope**. Only code inside that function can see it, like your bedroom.

```js
const siteName = "Firstlight"; // global

function welcome(student) {
  const message = `Welcome to ${siteName}, ${student}!`; // local
  return message;
}

console.log(welcome("Dayo")); // works
console.log(siteName);        // works
console.log(message);         // ReferenceError: message is not defined
```

The function can see `siteName` because it's global. But the code outside the function can't see `message` or `student`, because they live inside the function. They're created when the function is called and disappear when it finishes.

This is exactly why `return` matters. **Returning is the way to get a value out of a function's locked room.**

### Curly braces make scope too

Variables made with `let` and `const` only live inside the `{ }` block where they were created. You'll see this with `if` statements in the next lesson:

```js
const temperature = 25;

if (temperature > 20) {
  const advice = "Wear sunglasses";
  console.log(advice); // works
}

console.log(advice); // ReferenceError: advice is not defined
```

> ⚠️ **Watch out:** If you need a variable after a block ends, create it **before** the block with `let`, then change it inside.

```js
const temperature = 25;
let advice;

if (temperature > 20) {
  advice = "Wear sunglasses";
}

console.log(advice); // Wear sunglasses
```

## Check your understanding

1. What does a function return if it has no `return` statement?
2. `function f() { console.log(10); }` What is stored in `x` after `const x = f();`?
3. What happens to code written after a `return` inside a function?
4. Why does this give an error: `function a() { const secret = 1; } a(); console.log(secret);`
5. How should you change the function in question 4 so you can use `secret` outside it?

<details><summary>Show answers</summary>

1. `undefined`.
2. `undefined`. The function logs 10, but it doesn't return anything.
3. It never runs. `return` ends the function immediately.
4. `secret` is in the function's local scope. It doesn't exist outside the function, so you get a `ReferenceError`.
5. Add `return secret;` in the function, then store the result: `const value = a(); console.log(value);`

</details>

## Go deeper

- [MDN: Function return values](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values)
- [MDN: Scope (glossary)](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- [javascript.info: Variable scope](https://javascript.info/closure)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
