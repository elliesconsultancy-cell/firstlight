---
title: Return vs console.log, and scope
kind: lesson
minutes: 25
---
Here is a puzzle that confuses almost every new programmer: "My function shows the right answer. So why is my variable `undefined`?"

By the end of this lesson you will know why. You will not be caught by it again.

## Shouting or handing over?

You ask a friend to work out a restaurant bill. There are two ways they can answer.

- They **shout** "It is £40!" across the room. You heard it. But you have nothing to pay with.
- They **hand you a note** that says £40. You can put it in your wallet, add the tip, and pay.

Shouting is `console.log`. Handing over the note is `return`.

## Two different jobs

`console.log` and `return` can look alike. Both seem to "give an answer". But they do different jobs.

- **`console.log`** **shows** a value to a human in the console. It is like saying the answer out loud. The program cannot use what you said.
- **`return`** **gives** a value back to the code that called the function. It is like handing over the answer on paper. The program can keep it, store it and use it.

## See the difference

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

What do you think the last two lines print? Let us play computer.

- `addLogged(2, 3)` logs `5` in the console. But it does not `return` anything. A function with no `return` gives back `undefined`. So `first` is `undefined`.
- `addReturned(2, 3)` logs nothing. But it returns `5`. So `second` holds `5`.

> 🧠 **Remember:** A function without `return` always gives back `undefined`. Seeing the right number in the console does **not** mean your function returned it.

### Why return is usually what you want

A returned value can be used to build bigger things.

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

Here `addVat(15)` returns `18`. That goes straight into `formatPrice`, which returns `"£18.00"`.

This works because both functions **return**. If `addVat` only logged, `formatPrice` would get `undefined` and crash.

> 💡 **Tip:** A good rule: functions should usually **return** their result. Do the `console.log` *outside*, where you call the function. Then your function is useful in more places.

## return stops the function

When `return` runs, the function ends. Any code after it, inside the function, is skipped.

```js
function checkAge(age) {
  return age >= 18;
  console.log("This line never runs");
}

console.log(checkAge(20)); // true
```

VS Code often greys out code after a `return`. It shows that the code can never run. Developers call this **unreachable code**.

### Try it

Each function below has a problem. Run the code and read the output. Then fix the functions so all three final logs show the right answer.

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

**Scope** means *where* in your code a variable exists and can be used.

Think of a house. Things in the **living room** are shared. Everyone in the house can use them. Things in **your bedroom**, with the door locked, are for you only.

- A variable made **outside** any function is in the **global scope**. Code everywhere can see it. It is the living room.
- A variable made **inside** a function is in that function's **local scope**. Parameters count too. Only code inside that function can see it. It is your bedroom.

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

The function can see `siteName`, because it is global. The code outside cannot see `message` or `student`. They live inside the function. They are made when the function is called. They disappear when it finishes.

This is why `return` matters. **Returning is how a value gets out of the function's locked room.**

The house picture is not perfect in one way. A bedroom can look out into the living room. In the same way, a function can see global variables. But the living room cannot look into the bedroom.

### Curly braces make scope too

Variables made with `let` and `const` live only inside the `{ }` block where you made them. You will use `if` in the next lesson. Here is a first look.

```js
const temperature = 25;

if (temperature > 20) {
  const advice = "Wear sunglasses";
  console.log(advice); // works
}

console.log(advice); // ReferenceError: advice is not defined
```

> ⚠️ **Watch out:** Do you need a variable after a block ends? Create it **before** the block with `let`. Change it inside the block.

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
2. Look at `function f() { console.log(10); }`. What is stored in `x` after `const x = f();`?
3. What happens to code written after a `return` inside a function?
4. Why does this give an error: `function a() { const secret = 1; } a(); console.log(secret);`
5. How can you change the function in question 4 so you can use `secret` outside it?

<details><summary>Show answers</summary>

1. `undefined`.
2. `undefined`. The function logs 10, but it does not return anything.
3. It never runs. `return` ends the function at once.
4. `secret` is in the function's local scope. It does not exist outside the function. So you get a `ReferenceError`.
5. Add `return secret;` in the function. Then store the result: `const value = a(); console.log(value);`

</details>

## Go deeper

- [MDN: Function return values](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values)
- [MDN: Scope (glossary)](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- [javascript.info: Variable scope](https://javascript.info/closure)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
