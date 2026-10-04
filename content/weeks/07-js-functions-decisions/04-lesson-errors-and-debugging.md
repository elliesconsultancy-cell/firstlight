---
title: Reading errors and debugging
kind: lesson
minutes: 35
---
Red error messages can feel scary, like the computer is shouting at you. But an error message is actually a helpful note that says "here is what went wrong, and here is where". In this lesson you'll learn to read those notes calmly and track down bugs like a detective.

## Bugs are normal

A **bug** is any mistake in code that makes it behave differently from what you wanted. **Debugging** is the process of finding and fixing bugs.

Professional developers spend a large part of every day debugging. It is not a sign that you're bad at this. It *is* the job. What matters is having a routine.

There are two kinds of bugs:

1. **Errors**: JavaScript can't run the code at all, and tells you so with a red message.
2. **Logic bugs**: the code runs without complaint, but gives the wrong answer. These are often harder, because nothing tells you where to look.

## Anatomy of an error message

Let's look at a typical error in the Chrome console:

```
Uncaught ReferenceError: totl is not defined
    at calculate (script.js:4:15)
    at script.js:8:1
```

Read it in three parts:

1. **The type**: `ReferenceError`. This tells you the *category* of problem.
2. **The message**: `totl is not defined`. This tells you the *specific* problem. Here, a variable called `totl` doesn't exist (probably a typo of `total`).
3. **The location**: `script.js:4:15` means file `script.js`, **line 4**, character 15. The lines below (the **stack trace**) show how the code got there: line 8 called the function `calculate`, which failed on line 4.

> 💡 **Tip:** In Chrome, the file name and line number on the right of the error are clickable. Click it to jump straight to the problem line.

## The three errors you'll meet most

### SyntaxError: "I can't even read this"

**Syntax** means the grammar rules of a language. A `SyntaxError` means you broke a grammar rule, like a missing bracket or quote. JavaScript can't understand the code, so **none** of the file runs, not even the lines before the mistake.

```js
console.log("Hello);
// SyntaxError: Invalid or unexpected token  (the string is never closed)

if (age > 18 {
  console.log("adult");
}
// SyntaxError: Unexpected token '{'  (missing closing bracket after 18)
```

**What to check:** matching pairs of `( )`, `{ }`, `[ ]` and quotes; commas; spelling of keywords like `function` and `const`.

> 💡 **Tip:** VS Code highlights matching brackets when you click next to one, and draws a red squiggly line under syntax errors before you even run the code. Look for the squiggles!

### ReferenceError: "I don't know that name"

You used a name (variable or function) that doesn't exist where you used it.

```js
const userName = "Ife";
console.log(username); // ReferenceError: username is not defined
```

**Common causes:** a typo; wrong capital letters (`userName` vs `username`); using a variable outside its scope; using a variable before creating it; forgetting quotes around text, so JavaScript thinks the word is a variable name.

### TypeError: "You can't do that with this type of value"

You tried to do something with a value that it doesn't support.

```js
const price = 20;
price.toUpperCase(); // TypeError: price.toUpperCase is not a function

let score;
console.log(score.length); // TypeError: Cannot read properties of undefined (reading 'length')

const limit = 10;
limit = 20; // TypeError: Assignment to constant variable.
```

**Common causes:** using a string method on a number; a variable is `undefined` because it was never given a value (or a function didn't `return`); reassigning a `const`.

> 🧠 **Remember:** "Cannot read properties of undefined" almost always means: something you expected to have a value is `undefined`. Ask yourself *why* it's empty. Did a function forget to `return`?

## A debugging routine

When something goes wrong, follow these steps:

1. **Read the error message slowly**, all of it. What type? What message? Which line?
2. **Go to that line.** Read it, and the lines just before it.
3. **Make a guess** (developers call it a **hypothesis**): "I think `total` is undefined here because..."
4. **Test your guess**, usually with `console.log`.
5. **Change one thing at a time**, then run again.
6. **Still stuck after 20 minutes?** Explain the problem out loud (rubber duck!), search the error message, or ask for help with a clear question.

## Debugging with console.log

For logic bugs, there's no error to point at. The trick is to make the invisible visible: log the values at each step and find where they stop matching what you expect.

```js
function getAverage(a, b, c) {
  const total = a + b + c;
  const average = total / 3;
  return average;
}

console.log(getAverage("4", 5, 6)); // expected 5, got 152 ?!
```

Something strange is happening. Let's add logs:

```js
function getAverage(a, b, c) {
  const total = a + b + c;
  console.log("total is", total, typeof total);
  const average = total / 3;
  return average;
}

console.log(getAverage("4", 5, 6));
```

The log shows `total is 456 string`. The first argument was a string `"4"`, so `+` joined the values instead of adding them! Now we know the problem and can fix it (pass `4`, not `"4"`, or convert with `Number(a)`).

> 💡 **Tip:** Log a label as well as the value: `console.log("total is", total)`. When you have several logs, labels tell you which is which. And remember to delete your debugging logs once the bug is fixed.

### Try it

This function should return the price after a percentage discount, e.g. 10% off £50 is £45. It gives the wrong answer. Add `console.log` lines to find the problem, then fix it.

```js
function applyDiscount(price, percentOff) {
  const discount = price * percentOff;
  const finalPrice = price - discount;
  return finalPrice;
}

console.log(applyDiscount(50, 10)); // should be 45
console.log(applyDiscount(80, 25)); // should be 60
```

<details><summary>Show a hint</summary>

Log `discount`. 10% of 50 should be 5. What do you get? How do you turn `10` into `0.1`?

</details>

## Debugging with breakpoints in DevTools

`console.log` is great, but Chrome has a more powerful tool: **breakpoints**. A breakpoint pauses your code on a chosen line, so you can look at every variable at that moment, then step forward one line at a time. It's playing computer, but the computer does the tracking for you.

You need your code in a real file for this. Create `debug.html` and `debug.js` in a folder:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Debugging practice</h1>
    <script src="debug.js"></script>
  </body>
</html>
```

```js
function getAverage(a, b, c) {
  const total = a + b + c;
  const average = total / 3;
  return average;
}

const result = getAverage("4", 5, 6);
console.log(result);
```

Then:

1. Open `debug.html` in Chrome and open DevTools.
2. Click the **Sources** tab. On the left, click `debug.js` to open it.
3. Click the **line number** next to `const average = total / 3;`. A blue marker appears. That's your breakpoint.
4. Refresh the page. The code **pauses** on that line, and the line is highlighted.
5. Hover your mouse over `total`, or look at the **Scope** panel on the right. You'll see `a`, `b`, `c` and `total` with their current values.
6. Use the **Step over** button (an arrow curving over a dot), or press `F10`, to run one line at a time and watch the values change.
7. Click **Resume** (the play button) or press `F8` to let the code continue. Click the blue marker again to remove the breakpoint.

> ⚠️ **Watch out:** While the code is paused, the page may look frozen. That's normal. Press Resume to continue.

You can also add the word `debugger;` on its own line in your code. When DevTools is open, the code pauses there automatically.

## Check your understanding

1. What three pieces of information does an error message give you?
2. Which error type would you expect from `console.log(colour)` if you never created `colour`?
3. Why does a `SyntaxError` stop the whole file from running, even the lines before it?
4. What does "Cannot read properties of undefined" usually mean?
5. What's the advantage of a breakpoint over `console.log`?

<details><summary>Show answers</summary>

1. The type of error, a message describing it, and the location (file and line number).
2. `ReferenceError`.
3. JavaScript reads (parses) the whole file before running any of it. If the grammar is broken, it can't understand the program, so it runs nothing.
4. You tried to use a property or method on a value that is `undefined`. Something you expected to have a value doesn't, often because a variable was never set or a function didn't return.
5. A breakpoint pauses the program so you can see **all** variables at that moment and step line by line, without adding and removing log lines.

</details>

## Go deeper

- [MDN: What went wrong? Troubleshooting JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong)
- [Chrome for Developers: Debug JavaScript](https://developer.chrome.com/docs/devtools/javascript)
- [MDN: JavaScript error reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors)
- [javascript.info: Debugging in the browser](https://javascript.info/debugging-chrome)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
