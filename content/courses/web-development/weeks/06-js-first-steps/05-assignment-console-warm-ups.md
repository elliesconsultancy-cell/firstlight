---
title: Console warm-ups
kind: assignment
submission: any
---
Think about a gym warm-up. You do small exercises before the big workout. They get your body ready.

This assignment is your JavaScript warm-up. You write eight small programs. Each one solves a tiny real-life problem with variables, operators and strings. None is long. Each one needs careful thinking.

## What you'll build

One JavaScript file called `warm-ups.js` with 8 short exercises. Each exercise stores values in variables and shows its result with `console.log`. You also write a short reflection about your week.

You can work in any of these places:

- The course playground. Copy your finished code into a file at the end.
- [CodePen](https://codepen.io). Use the JS panel and open the CodePen console.
- VS Code. Run the file with Node.js (`node warm-ups.js`) if you installed it. Or link it from an HTML page and check the Chrome console.

## Requirements

- [ ] All 8 exercises are in one file, in order, with a comment above each like `// Exercise 1: Greeting`
- [ ] Every exercise stores values in variables (no "magic numbers" typed straight into `console.log`)
- [ ] You use `const` by default, and `let` only when a value changes
- [ ] Variable names are in camelCase and describe what they hold
- [ ] At least three exercises use template literals
- [ ] Your code runs with no errors from top to bottom
- [ ] You submit a short written reflection (100 to 200 words)

## Steps and hints

Copy this starter code. Fill in each exercise one at a time. Then change the example values to check that your code works for other values too.

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
- Exercise 3: You need `trim()`, `toUpperCase()`, `toLowerCase()`, `[0]` and `slice(1)`. Fix one name at a time.
- Exercise 4: `Math.floor(135 / 60)` is `2`. What is `135 % 60`?
- Exercise 6: To round money, use `.toFixed(2)`. For example, `(19.008).toFixed(2)` gives `"19.01"`.
- Stuck? **Play computer.** Add a `console.log` after each line. You see what is really in your variables.

## How to submit

Use the submit form on this page. Hand in two things: your code and your reflection.

1. **Your code.** Give either a link or a file.
   - **Link:** a link to your CodePen, or to the file in a GitHub repository (you learned GitHub in week 5).
   - **File upload:** upload your `warm-ups.js` file.
2. **Written answer (required).** Write your reflection in the text box. Answer these questions:
   - Which exercise was hardest? How did you get unstuck?
   - When was your prediction wrong this week? What did you learn?
   - What is one thing about JavaScript that still feels confusing?

Please include a link **or** a file, plus the written reflection.

## Stretch goals

- Exercise 4 again, but say "1 hour" instead of "1 hours" when there is only one. (You learn a neat way to do this next week. You can try now.)
- Convert a temperature from Celsius to Fahrenheit (`F = C × 9 / 5 + 32`) and log both, rounded to 1 decimal place.
- Given a sentence, log how many characters it has **without** spaces. Hint: look up `replaceAll` on MDN.
- Make a "receipt" for Exercise 2 that lines up nicely using the `padEnd` string method.

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can solve eight small problems with variables, operators and strings.
- Learners can choose `const` or `let` and use clear camelCase names.
- Learners can write a short reflection on what they found hard.

### Purpose
This is practice of the whole week in small steps. It shows who can run code and read an error on their own.

### Things to do
1. **Launch it.** Make sure everyone has a place to run code: the playground, CodePen, or VS Code with Node. Copy the starter code into `warm-ups.js` or the editor.
2. **Demonstrate one exercise.** Do Exercise 1 live with a template literal. Show that the values live in variables, not typed inside `console.log`.
3. **Model getting unstuck.** Add a `console.log` after each line of Exercise 2 to see what is really in each variable. This is "playing computer".
4. **Remind them about submitting.** They need a link or a file, plus the written reflection.

### What good work looks like
- All 8 exercises are in one file, in order, each with a comment like `// Exercise 1: Greeting`.
- Values are in variables, with `const` by default and `let` only for Exercise 8.
- Names are camelCase and describe what they hold.
- At least three exercises use backtick template literals.
- The file runs top to bottom with no errors, and the reflection is about 100 to 200 words.

### Watch for
- Money showing too many decimals. Remind them of `.toFixed(2)`.
- Exercise 3 and 5 wrong capitals or spaces. Suggest fixing one name at a time.
- Typing numbers straight into `console.log` instead of using variables.
