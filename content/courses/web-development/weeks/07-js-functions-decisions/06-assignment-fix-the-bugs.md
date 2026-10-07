---
title: Fix the bugs
kind: assignment
submission: any
---
A good detective does not guess. They look for clues, test an idea, and explain what happened.

Fixing broken code is as important as writing new code. In this assignment you are a code detective. Four small programs are broken. You find out why, fix them, and explain what went wrong.

## What you'll build

A fixed version of each of the four snippets below. For each one, you also write a short explanation in your own words. Imagine you are explaining the bug to a classmate who started this week.

## Requirements

- [ ] All four snippets are fixed and produce the expected output
- [ ] For each snippet, you write down **before fixing**: what you predicted would happen, and what actually happened
- [ ] For each snippet that shows an error, you name the error type (`SyntaxError`, `ReferenceError` or `TypeError`) and the line it points to
- [ ] For each snippet, you explain the cause of the bug in 1 to 3 sentences
- [ ] For each snippet, you say which debugging technique helped (reading the error, `console.log`, a breakpoint, playing computer...)
- [ ] You change as little code as possible. Fix the bug. Do not rewrite the whole thing

## Steps and hints

For each snippet:

1. **Predict.** Read the code. Write down what you think will happen.
2. **Run** it in the playground or the Chrome console. Copy the exact output or error message.
3. **Investigate.** Read the error with care, or add `console.log` lines.
4. **Fix** it. Run it again to check.
5. **Explain** in writing.

> 💡 **Tip:** Some snippets have more than one bug. When you fix one error, run the code again. A new error may appear. That is progress, not failure.

### Snippet 1: The welcome message

Expected output: `Welcome back, Sam! You have 3 new messages.`

```js no-check
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

This one has no error message. It is a logic bug. First write the rule in plain English: "Allowed if they are 12 or older, **or** they have an adult with them." Then compare that sentence with the condition in the code.

</details>

### A template for your explanations

Copy this into the written answer box for each snippet.

```
Snippet 1
Prediction:
What actually happened (error type and line, or wrong output):
Cause of the bug:
How I fixed it:
Technique that helped:
```

## How to submit

Use the submit form on this page. Hand in two things.

1. **Link or file:** your four fixed snippets in one file called `fixed.js`. Give a link from GitHub or CodePen, or upload the file. Put a comment above each one, like `// Snippet 1 (fixed)`.
2. **Written answer (required):** your explanation for each of the four snippets, using the template above.

## Stretch goals

- Write your own broken snippet with a hidden bug. Swap with a classmate and fix each other's.
- For snippet 4, add a third parameter `rating` (`"U"`, `"PG"`, `"12A"` or `"15"`) and extend the rules. For example, a 15 film is never allowed for under 15s, even with an adult.
- Set a breakpoint inside `calculateTotal` (snippet 2, in a real `.js` file loaded from an HTML page) and take a screenshot of the Scope panel showing the variables. Upload it with your submission.

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can predict, run, investigate and fix broken code.
- Learners can name the error type and line.
- Learners can explain a bug in their own words.

### Purpose
This practises the debugging routine from the lesson on real broken code. The explanation matters as much as the fix.

### Things to do
1. **Say the code is broken on purpose.** All four snippets have bugs. Learners should predict before they run.
2. **Demonstrate one together.** Snippet 1 has two bugs: a missing `)` (SyntaxError, so nothing runs) and `username` instead of `userName` (ReferenceError, which shows after the first fix).
3. **Show the explanation template.** Learners copy it for each snippet.

### What good work looks like
- All four snippets are fixed and print the expected output.
- Snippet 2 returns the total instead of logging it. Snippet 3 uses `toUpperCase`. Snippet 4 uses `||` in place of `&&`.
- Each snippet has a prediction, the real result, the cause, the fix and the technique used.
- Error types are named correctly: SyntaxError, ReferenceError, TypeError, and the logic bug in snippet 4 with no error.
- Changes are small. The code was not rewritten.

### Watch for
- Skipping the written part. It is required.
- Fixing snippet 2 by printing `amount`. The function must return.
- Not rerunning after the first fix in snippet 1.
