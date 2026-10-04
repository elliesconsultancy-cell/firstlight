---
title: Console warm-ups
kind: assignment
submission: any
---
Time to put this week's skills together. You'll write eight small programs, each one solving a tiny real-life problem with variables, operators and strings. None of them is long, but each one needs careful thinking.

## What you'll build

A single JavaScript file called `warm-ups.js` containing 8 short exercises. Each exercise uses variables and logs its result with `console.log`. You will also write a short reflection about your week.

You can work in any of these places:

- The course playground (copy your finished code into a file at the end)
- [CodePen](https://codepen.io) (use the JS panel and open the CodePen console)
- VS Code, running the file with Node.js (`node warm-ups.js`) if you installed it, or linked from an HTML page and checked in the Chrome console

## Requirements

- [ ] All 8 exercises are in one file, in order, with a comment above each like `// Exercise 1: Greeting`
- [ ] Every exercise stores values in variables (no "magic numbers" typed straight into `console.log`)
- [ ] You use `const` by default, and `let` only when a value changes
- [ ] Variable names are in camelCase and describe what they hold
- [ ] At least three exercises use template literals
- [ ] Your code runs with no errors from top to bottom
- [ ] You submit a short written reflection (100 to 200 words)

## Steps and hints

Copy this starter code and fill in each exercise. Change the example values to test that your code works for other values too.

```js
// Exercise 1: Greeting
// Using a template literal, log: "Hello, Ada! Welcome to week 6 of Firstlight."
const studentName = "Ada";
const weekNumber = 6;
// your code here


// Exercise 2: Shopping total with VAT
// Three items cost 4.50, 12.00 and 3.25. Add them up, then add 20% VAT.
// Log: "Subtotal: £19.75, VAT: £3.95, Total: £23.70"
const item1 = 4.5;
const item2 = 12;
const item3 = 3.25;
const vatRate = 0.2;
// your code here (hint: use .toFixed(2) to show money with 2 decimals)


// Exercise 3: Format a name
// Turn a messy name into "Surname, Firstname" with correct capitals.
// "  oLuWaSeUn  " and "ADEYEMI" should become "Adeyemi, Oluwaseun"
const rawFirst = "  oLuWaSeUn  ";
const rawLast = "ADEYEMI";
// your code here


// Exercise 4: Minutes to hours and minutes
// 135 minutes should log "135 minutes is 2 hours and 15 minutes"
const totalMinutes = 135;
// your code here (hint: Math.floor and %)


// Exercise 5: Initials
// Log the initials of a full name, in capitals: "grace brewster hopper" -> "G.B.H."
const firstName = "grace";
const middleName = "brewster";
const lastName = "hopper";
// your code here


// Exercise 6: Splitting the bill
// A meal costs £86.40 for 5 friends, plus a 10% tip. How much does each person pay?
// Log: "Each person pays £19.01"
const mealCost = 86.4;
const numberOfFriends = 5;
const tipRate = 0.1;
// your code here


// Exercise 7: Email checker
// Log whether the email contains "@" and log the email in lowercase with spaces trimmed.
const rawEmail = "  Kemi.Ola@Example.COM ";
// your code here


// Exercise 8: Running total
// Use a let variable called stepsToday. Start at 0.
// Add 2500 (morning walk), then 4000 (shopping), then 1200 (evening).
// Log the total after each change, then log how many steps are left to reach 10000.
// your code here
```

**Hints:**

- Exercise 2: Work out each piece in its own variable (`subtotal`, `vat`, `total`). Small steps are easier to check.
- Exercise 3: Remember `trim()`, `toUpperCase()`, `toLowerCase()`, `[0]` and `slice(1)`. Do it one name at a time.
- Exercise 4: `Math.floor(135 / 60)` is `2`. What is `135 % 60`?
- Exercise 6: Rounding money: `(19.008).toFixed(2)` gives `"19.01"`.
- If you get stuck, **play computer**. Add a `console.log` after each line to see what is really in your variables.

## How to submit

Use the submit form on this page. You can submit in any of these ways:

1. **Link:** a link to your CodePen, or to the file in a GitHub repository (you learned GitHub in week 5).
2. **File upload:** upload your `warm-ups.js` file.
3. **Written answer (required):** in the text box, write your reflection. Answer these questions:
   - Which exercise was hardest, and how did you get unstuck?
   - Describe one time your prediction was wrong this week. What did you learn?
   - What is one thing about JavaScript that still feels confusing?

Please include a link **or** a file, plus the written reflection.

## Stretch goals

- Exercise 4 again, but say "1 hour" instead of "1 hours" when there is only one. (You'll learn a neat way to do this next week, but you can try now.)
- Convert a temperature from Celsius to Fahrenheit (`F = C × 9 / 5 + 32`) and log both, rounded to 1 decimal place.
- Given a sentence, log how many characters it has **without** spaces. Hint: look up `replaceAll` on MDN.
- Make a "receipt" for Exercise 2 that lines up nicely using the `padEnd` string method.

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
