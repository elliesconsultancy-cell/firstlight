---
title: Fix the bugs
kind: assignment
submission: any
---
Being able to fix broken code is just as important as writing new code. In this assignment you'll be a code detective: four small programs are broken, and it's your job to find out why, fix them, and explain what went wrong.

## What you'll build

A fixed version of each of the four snippets below, plus a short written explanation for each one. Write the explanations in your own words. Imagine you're explaining the bug to a classmate who started this week.

## Requirements

- [ ] All four snippets are fixed and produce the expected output
- [ ] For each snippet, you write down **before fixing**: what you predicted would happen, and what actually happened
- [ ] For each snippet that shows an error, you name the error type (`SyntaxError`, `ReferenceError` or `TypeError`) and the line it points to
- [ ] For each snippet, you explain the cause of the bug in 1 to 3 sentences
- [ ] For each snippet, you say which debugging technique helped (reading the error, `console.log`, a breakpoint, playing computer...)
- [ ] You change as little code as possible. Fix the bug, don't rewrite the whole thing

## Steps and hints

For each snippet:

1. **Predict.** Read the code and write down what you think will happen.
2. **Run** it in the playground or the Chrome console. Copy the exact output or error message.
3. **Investigate.** Read the error carefully, or add `console.log` lines.
4. **Fix** it, and run it again to check.
5. **Explain** in writing.

> 💡 **Tip:** Some snippets have more than one bug! When you fix one error, run the code again. A new error may appear further down. That's progress, not failure.

### Snippet 1: The welcome message

Expected output: `Welcome back, Sam! You have 3 new messages.`

```js
const userName = "Sam";
const newMessages = 3;

function makeWelcome(name, count) {
  return `Welcome back, ${name}! You have ${count} new messages.`;
}

console.log(makeWelcome(username, newMessages);
```

### Snippet 2: The total that disappears

Expected output: `Total to pay: £36`

```js
function calculateTotal(price, quantity) {
  const total = price * quantity;
  console.log(total);
}

const amount = calculateTotal(12, 3);
console.log(`Total to pay: £${amount}`);
```

### Snippet 3: Shouting names

Expected output: `HELLO, KWAME` then `HELLO, ESI`

```js
function shoutGreeting(name) {
  const greeting = "Hello, " + name;
  return greeting.toUppercase();
}

console.log(shoutGreeting("Kwame"));
console.log(shoutGreeting("Esi"));
```

### Snippet 4: The cinema age check

Rules: children under 12 cannot see a 12A film without an adult. Expected output:

```
Age 8 with adult: Allowed
Age 8 alone: Not allowed
Age 15 alone: Allowed
```

```js
function canWatch(age, withAdult) {
  if (age >= 12 && withAdult) {
    return "Allowed";
  } else {
    return "Not allowed";
  }
}

console.log(`Age 8 with adult: ${canWatch(8, true)}`);
console.log(`Age 8 alone: ${canWatch(8, false)}`);
console.log(`Age 15 alone: ${canWatch(15, false)}`);
```

<details><summary>Hint for snippet 4</summary>

This one has no error message, it's a logic bug. Write out the rule in plain English first: "Allowed if they are 12 or older, **or** they have an adult with them." Then compare that sentence with the condition in the code.

</details>

### A template for your explanations

You can copy this into the written answer box for each snippet:

```
Snippet 1
Prediction:
What actually happened (error type and line, or wrong output):
Cause of the bug:
How I fixed it:
Technique that helped:
```

## How to submit

Use the submit form on this page:

1. **Link or file:** your four fixed snippets, in one file called `fixed.js` (link from GitHub or CodePen, or upload it). Put a comment above each one like `// Snippet 1 (fixed)`.
2. **Written answer (required):** your explanation for each of the four snippets, using the template above.

## Stretch goals

- Write your own broken snippet with a sneaky bug, and swap with a classmate to fix each other's.
- For snippet 4, add a third parameter `rating` (`"U"`, `"PG"`, `"12A"` or `"15"`) and extend the rules. For example, a 15 film is never allowed for under 15s, even with an adult.
- Set a breakpoint inside `calculateTotal` (snippet 2, in a real `.js` file loaded from an HTML page) and take a screenshot of the Scope panel showing the variables. Upload it with your submission.

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
