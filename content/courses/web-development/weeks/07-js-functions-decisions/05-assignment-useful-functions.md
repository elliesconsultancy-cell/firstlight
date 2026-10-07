---
title: Useful functions
kind: assignment
submission: any
---
Think of a toolbox. Each tool does one job well. A hammer hits nails. A screwdriver turns screws.

This week you learned to put code into functions and to make decisions with `if` and `else`. Now you build a small toolbox of functions. Each one solves one everyday problem. You also test each one with small checks.

## What you'll build

A file called `functions.js` containing four functions:

1. `getGrade(score)` turns an exam score into a letter grade.
2. `isLeapYear(year)` says whether a year is a leap year.
3. `formatTime(hours, minutes)` turns 24-hour time into 12-hour clock text.
4. `describeBmiCategory(bmi)` turns a number into a category name (or another function you choose; see Step 4).

Each function must **return** its answer. Under the functions, you call each one with several inputs. You log the results to check that they are right.

## Requirements

- [ ] Each function uses the exact name and parameters given
- [ ] Each function **returns** a value (no `console.log` inside the functions, except while debugging)
- [ ] `getGrade` returns the right letter for all the example scores, including the boundaries (e.g. 70, 69)
- [ ] `getGrade` returns `"Invalid score"` for scores below 0 or above 100
- [ ] `isLeapYear` returns `true` or `false` (a boolean, not a string)
- [ ] `formatTime` returns strings like `"9:05 am"` and `"12:00 pm"`, with minutes always shown as two digits
- [ ] Every function is called with at least 4 different inputs, and you log what you got and what you expected
- [ ] You use `===` (not `==`) for every equality check
- [ ] The code runs with no errors

## Steps and hints

Start with this file. It has a small helper called `check`. It compares what your function returned with what you expected. You see at a glance what passes.

```js
// A small helper to test our functions
function check(description, actual, expected) {
  if (actual === expected) {
    console.log(`PASS: ${description}`);
  } else {
    console.log(`FAIL: ${description} - expected ${expected}, got ${actual}`);
  }
}

// 1. getGrade
// 90-100 "A", 80-89 "B", 70-79 "C", 60-69 "D", 0-59 "F"
// Anything below 0 or above 100: "Invalid score"
function getGrade(score) {
  // your code here
}

check("95 is an A", getGrade(95), "A");
check("80 is a B", getGrade(80), "B");
check("79 is a C", getGrade(79), "C");
check("60 is a D", getGrade(60), "D");
check("12 is an F", getGrade(12), "F");
check("101 is invalid", getGrade(101), "Invalid score");

// 2. isLeapYear
function isLeapYear(year) {
  // your code here
}

check("2024 is a leap year", isLeapYear(2024), true);
check("2023 is not a leap year", isLeapYear(2023), false);
check("1900 is not a leap year", isLeapYear(1900), false);
check("2000 is a leap year", isLeapYear(2000), true);

// 3. formatTime
function formatTime(hours, minutes) {
  // your code here
}

check("9:05 in the morning", formatTime(9, 5), "9:05 am");
check("midday", formatTime(12, 0), "12:00 pm");
check("quarter past 3 in the afternoon", formatTime(15, 15), "3:15 pm");
check("just after midnight", formatTime(0, 30), "12:30 am");
check("one minute to midnight", formatTime(23, 59), "11:59 pm");

// 4. Your choice (see below)
```

### Step 1: getGrade

Use an `if / else if / else` chain. Check for invalid scores **first**. Then think about the order of the other checks.

Try it in your head. You check `score >= 60` before `score >= 90`. What happens to a score of 95?

### Step 2: isLeapYear

These are the rules for leap years.

- A year is a leap year if 4 divides it with nothing left over...
- **except** years divisible by 100 are **not** leap years...
- **unless** they are also divisible by 400. Then they **are** leap years.

"Divisible by 4" means `year % 4 === 0`. First write the rules as an `if / else if / else` chain. When it works, try to write it as one line with `&&` and `||`.

### Step 3: formatTime

Break the problem into small pieces.

1. Decide if it is `"am"` or `"pm"`. Hours 0 to 11 are am. Hours 12 to 23 are pm.
2. Work out the 12-hour number. For most afternoon hours, take away 12. Be careful with 0 (midnight must show as 12) and 12 (midday stays 12).
3. Make sure the minutes always have two digits. `5` must become `"05"`. Look up `padStart` on MDN. `String(5).padStart(2, "0")` gives `"05"`.
4. Put the pieces together with a template literal.

> 💡 **Tip:** Test the tricky cases first: 0, 12 and 23. These are called **edge cases**. They are the inputs at the edges, where bugs often hide.

### Step 4: your choice

Write one more function of your own. It must use `if / else`. Here are some ideas.

- `describeBmiCategory(bmi)` returns `"Underweight"` (below 18.5), `"Healthy"` (18.5 to below 25), `"Overweight"` (25 to below 30) or `"Obese"` (30 and over).
- `getShippingCost(orderTotal, isMember)`: free for members or orders over £50, otherwise £4.99.
- `getTimeOfDayGreeting(hour)`: "Good morning", "Good afternoon" or "Good evening".

Write at least four `check` lines for it, including edge cases.

## How to submit

Use the submit form on this page. Hand in two things.

1. **Link or file:** a link to your `functions.js` on GitHub or CodePen, or upload the file.
2. **Written answer:** paste the output of running your file (all the PASS/FAIL lines). Then answer in 2 to 4 sentences: Which edge case surprised you? How did you find the problem?

## Stretch goals

- Make `getGrade` return `"Invalid score"` if the input isn't a number at all (hint: `typeof`).
- Rewrite `isLeapYear` as a one-line arrow function.
- Write the reverse: `to24Hour("3:15 pm")` returns `"15:15"`. You need `slice`, `includes` and `Number`.
- Make `formatTime` handle invalid input (e.g. hours of 25) by returning `"Invalid time"`.

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can write functions that return values, with `if / else if / else`.
- Learners can test edge cases with a `check` helper.
- Learners can use `===` and template literals in real code.

### Purpose
This turns the week's ideas into small useful tools. The `check` helper also shows a simple way to test code.

### Things to do
1. **Launch it.** Learners copy the starter code into `functions.js`. Explain the `check` helper: it prints PASS or FAIL for each call.
2. **Demonstrate getGrade.** Check for invalid scores first. Ask what happens to 95 if `score >= 60` comes first.
3. **Demonstrate edge cases.** For `formatTime`, try 0, 12 and 23 first. Show `String(5).padStart(2, "0")`.
4. **Explain Step 4.** They choose their own function and add at least four checks.

### What good work looks like
- `getGrade`, `isLeapYear` and `formatTime` use the exact names and return values, with no `console.log` inside.
- `getGrade` passes the boundaries (70, 69) and gives `"Invalid score"` below 0 or above 100.
- `isLeapYear` gives true or false for 2024, 2023, 1900 and 2000.
- `formatTime` gives strings like `"9:05 am"` and `"12:30 am"`.
- Each function has at least 4 inputs checked, `===` is used, and the file runs with no errors. The written answer includes the PASS/FAIL output.

### Watch for
- Functions that log instead of return. The check then shows FAIL with `undefined`.
- `isLeapYear` mistakes with 1900, and `formatTime` mistakes for hour 0 and 12.
- Wrong order in the `getGrade` chain.
