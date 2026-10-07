---
title: Reading errors and debugging
kind: lesson
minutes: 35
---
Imagine your car makes a strange noise. A good mechanic does not panic. They listen, find where the noise comes from, and test one idea at a time.

Debugging is the same. A red error message can feel like the computer is shouting at you. It is not. It is a helpful note: "here is what went wrong, and here is where". In this lesson you learn to read these notes calmly and find bugs like a detective.

## Bugs are normal

A **bug** is a mistake in code. It makes the code do something you did not want. **Debugging** means finding and fixing bugs.

Professional developers debug every day. It does not mean you are bad at this. It is part of the job. What matters is to have a routine.

There are two kinds of bugs.

1. **Errors.** JavaScript cannot run the code. It tells you with a red message.
2. **Logic bugs.** The code runs with no complaint, but the answer is wrong. These are often harder. Nothing tells you where to look.

## Read an error message

Here is a typical error in the Chrome console.

```text
Uncaught ReferenceError: totl is not defined
    at calculate (script.js:4:15)
    at script.js:8:1
```

Read it in three parts.

1. **The type:** `ReferenceError`. This is the *kind* of problem.
2. **The message:** `totl is not defined`. This is the *exact* problem. A variable called `totl` does not exist. It is probably a typo for `total`.
3. **The location:** `script.js:4:15` means file `script.js`, **line 4**, character 15. The lines below are the **stack trace**. They show the path to the error. Line 8 called the function `calculate`, and it failed on line 4.

> 💡 **Tip:** In Chrome, the file name and line number next to the error are links. Click one to jump to the problem line.

## The three errors you will meet most

### SyntaxError: "I cannot read this"

**Syntax** means the grammar rules of a language. A `SyntaxError` means you broke a grammar rule. For example, a bracket or a quote is missing. JavaScript cannot understand the code. So **none** of the file runs, not even the lines before the mistake.

```js no-check
console.log("Hello);
// SyntaxError: Invalid or unexpected token  (the string is never closed)

if (age > 18 {
  console.log("adult");
}
// SyntaxError: Unexpected token '{'  (missing closing bracket after 18)
```

**What to check:**

- matching pairs of `( )`, `{ }`, `[ ]` and quotes
- commas
- the spelling of words like `function` and `const`

> 💡 **Tip:** VS Code highlights matching brackets when you click next to one. It also draws a red wavy line under syntax errors before you run the code. Look for the wavy lines.

### ReferenceError: "I do not know that name"

You used a name (of a variable or function) that does not exist where you used it.

```js
const userName = "Ife";
console.log(username); // ReferenceError: username is not defined
```

**Common causes:**

- a typo
- wrong capital letters (`userName` and `username` are different)
- using a variable outside its scope
- using a variable before you create it
- forgetting quotes around text, so JavaScript thinks the word is a variable name

### TypeError: "You cannot do that with this kind of value"

You tried to do something that the value does not support.

```js
const price = 20;
price.toUpperCase(); // TypeError: price.toUpperCase is not a function

let score;
console.log(score.length); // TypeError: Cannot read properties of undefined (reading 'length')

const limit = 10;
limit = 20; // TypeError: Assignment to constant variable.
```

**Common causes:**

- using a string method on a number
- a variable is `undefined`, because it never got a value or a function did not `return`
- changing a `const`

> 🧠 **Remember:** "Cannot read properties of undefined" nearly always means that something you expected to have a value is `undefined`. Ask *why* it is empty. Did a function forget to `return`?

## A debugging routine

When something goes wrong, follow these steps.

1. **Read the error message slowly.** Read all of it. What type? What message? Which line?
2. **Go to that line.** Read it and the lines before it.
3. **Make a guess.** Developers call it a **hypothesis**. For example: "I think `total` is undefined here because..."
4. **Test your guess.** Often you use `console.log`.
5. **Change one thing at a time.** Then run again.
6. **Still stuck after 20 minutes?** Explain the problem out loud, even to a rubber duck. Or search for the error message. Or ask for help with a clear question.

## Debug with console.log

A logic bug has no error to point at. The trick is to make the hidden things visible. Log the values at each step. Find where they stop matching what you expect.

```js
function getAverage(a, b, c) {
  const total = a + b + c;
  const average = total / 3;
  return average;
}

console.log(getAverage("4", 5, 6)); // expected 5, got 152 ?!
```

Something strange is happening. Let us add a log.

```js
function getAverage(a, b, c) {
  const total = a + b + c;
  console.log("total is", total, typeof total);
  const average = total / 3;
  return average;
}

console.log(getAverage("4", 5, 6));
```

The log shows `total is 456 string`. The first argument was the string `"4"`. So `+` joined the values instead of adding them. Now we know the problem. We fix it: pass `4`, not `"4"`. Or convert it with `Number(a)`.

> 💡 **Tip:** Log a label with the value: `console.log("total is", total)`. With many logs, labels show which is which. Delete your debugging logs when the bug is fixed.

### Try it

This function should return the price after a discount in percent. For example, 10% off £50 is £45. It gives the wrong answer. Add `console.log` lines to find the problem. Then fix it.

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

## Debug with breakpoints in DevTools

`console.log` is great. Chrome also has a more powerful tool: **breakpoints**. A breakpoint pauses your code on a line you choose. You can look at every variable at that moment. Then you step forward one line at a time.

It is "playing computer", but the computer does the tracking for you.

You need your code in a real file for this. Make `debug.html` and `debug.js` in one folder.

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

Then follow these steps.

1. Open `debug.html` in Chrome. Open DevTools.
2. Click the **Sources** tab. On the left, click `debug.js` to open it.
3. Click the **line number** next to `const average = total / 3;`. A blue marker appears. That is your breakpoint.
4. Refresh the page. The code **pauses** on that line. The line is highlighted.
5. Hover your mouse over `total`, or look at the **Scope** panel on the right. You see `a`, `b`, `c` and `total` with their current values.
6. Click the **Step over** button (an arrow curving over a dot), or press `F10`. This runs one line. Watch the values change.
7. Click **Resume** (the play button) or press `F8`. The code continues. Click the blue marker again to remove the breakpoint.

> ⚠️ **Watch out:** While the code is paused, the page may look frozen. That is normal. Press Resume to continue.

You can also write `debugger;` on its own line in your code. When DevTools is open, the code pauses there by itself.

## Check your understanding

1. What three pieces of information does an error message give you?
2. Which error type do you expect from `console.log(colour)` if you never created `colour`?
3. Why does a `SyntaxError` stop the whole file from running, even the lines before it?
4. What does "Cannot read properties of undefined" usually mean?
5. What is the advantage of a breakpoint over `console.log`?

<details><summary>Show answers</summary>

1. The type of error, a message that describes it, and the location (file and line number).
2. `ReferenceError`.
3. JavaScript reads the whole file before it runs any of it. If the grammar is broken, it cannot understand the program. So it runs nothing.
4. You tried to use a property or method on a value that is `undefined`. Something you expected to have a value does not. Often a variable was never set, or a function did not return.
5. A breakpoint pauses the program. You see **all** variables at that moment and step line by line. You do not need to add and remove log lines.

</details>

## Go deeper

- [MDN: What went wrong? Troubleshooting JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong)
- [Chrome for Developers: Debug JavaScript](https://developer.chrome.com/docs/devtools/javascript)
- [MDN: JavaScript error reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors)
- [javascript.info: Debugging in the browser](https://javascript.info/debugging-chrome)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can read an error message: type, message and line.
- Learners can tell a SyntaxError, ReferenceError and TypeError apart.
- Learners can debug with `console.log` and a Chrome breakpoint.

### Purpose
Code breaks every day for every developer. A calm routine for errors is the most useful skill in this course.

### Things to teach
1. **Read the error in three parts.** Use the `totl is not defined` example. Show the type, the message and `script.js:4:15`. Show that the file name in Chrome is a clickable link.
2. **The three error types.** Show a missing quote or bracket (SyntaxError, nothing runs), `username` against `userName` (ReferenceError), and `price.toUpperCase()` (TypeError). The SyntaxError examples are broken on purpose.
3. **The routine.** Read, go to the line, guess, test, change one thing at a time. Say it is fine to ask for help with a clear question.
4. **console.log with labels.** Use `getAverage("4", 5, 6)` giving `456 string`. Then let learners try the `applyDiscount` Try it, which is broken on purpose (the percent is not divided by 100).
5. **Breakpoints.** Demonstrate `debug.html` and `debug.js`: Sources tab, click the line number, refresh, step with `F10`, resume with `F8`.

### Check understanding
- Ask: "What error do you get from `console.log(colour)` if it was never created?" A good answer: ReferenceError.
- Ask: "Why does a SyntaxError stop the whole file?" A good answer: JavaScript reads the file first and cannot understand it.
- Ask: "What does 'cannot read properties of undefined' usually mean?" A good answer: something you expected to have a value is empty.

### Watch for
- Learners who skim the red text. Make them read it aloud.
- Changing many things at once. Ask for one change per run.
