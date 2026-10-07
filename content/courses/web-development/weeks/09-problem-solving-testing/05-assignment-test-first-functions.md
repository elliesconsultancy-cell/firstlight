---
title: Test-first functions
kind: assignment
submission: any
---
## What you'll build

Remember the baker with her checklist? Now you use a checklist for code. You write three small functions, with one twist: **you write the tests first**.

For each function you get acceptance criteria. Follow these steps:

1. Turn the criteria into Jest tests.
2. Watch the tests fail (red).
3. Write the code until every test passes (green).

The three functions are:

1. `getOrdinalNumber(n)` – turns a number into its ordinal form: `1` → `"1st"`, `2` → `"2nd"`, `11` → `"11th"`.
2. `isValidPassword(password)` – checks a password against some rules. It returns `true` or `false`.
3. `getCardValue(card)` – takes a playing card like `"A♠"` and returns its value in a game.

### Acceptance criteria

**1. getOrdinalNumber(n)**

- Numbers ending in 1 get `"st"`: `1` → `"1st"`, `21` → `"21st"`, `101` → `"101st"`
- Numbers ending in 2 get `"nd"`: `2` → `"2nd"`, `42` → `"42nd"`
- Numbers ending in 3 get `"rd"`: `3` → `"3rd"`, `33` → `"33rd"`
- All other numbers get `"th"`: `4` → `"4th"`, `10` → `"10th"`, `100` → `"100th"`
- **Except**: numbers ending in 11, 12 or 13 always get `"th"`: `11` → `"11th"`, `12` → `"12th"`, `13` → `"13th"`, `111` → `"111th"`, `212` → `"212th"`

**2. isValidPassword(password)**

Return `true` only if **all** of these rules are true. Otherwise return `false`.

- It has at least 8 characters
- It has at least one uppercase letter (A–Z)
- It has at least one lowercase letter (a–z)
- It has at least one number (0–9)
- It has at least one of these symbols: `! # $ % . * &`

Examples: `"Sunrise#2024"` → `true`. `"sunrise#2024"` → `false` (no uppercase). `"Sun#1"` → `false` (too short).

**3. getCardValue(card)**

A card is a string made of a **rank** followed by a **suit** (♠ ♥ ♦ ♣).

- Number cards `"2"` to `"10"` are worth their number: `"7♥"` → `7`, `"10♦"` → `10`
- Face cards `"J"`, `"Q"`, `"K"` are worth `10`: `"K♣"` → `10`
- An ace `"A"` is worth `11`: `"A♠"` → `11`
- Anything else is invalid and must **throw an error**: `"1♠"`, `"Z♥"`, `"11♦"`, `""`

## Requirements

- [ ] A public GitHub repository containing a Node project (`package.json`) with Jest installed as a dev dependency
- [ ] `npm test` runs all your tests
- [ ] A `.gitignore` file that ignores `node_modules`
- [ ] Three function files and three test files (for example `getOrdinalNumber.js` and `getOrdinalNumber.test.js`)
- [ ] At least 5 tests per function, covering every acceptance criterion
- [ ] At least 2 edge-case tests per function, with descriptions that explain them
- [ ] All tests pass when your instructor runs `npm install` then `npm test`
- [ ] Your commit history shows tests being added before (or together with) the code that makes them pass
- [ ] A short `README.md` explaining what the project is and how to run the tests

## Steps/hints

### 1. Set up the project

```bash
mkdir test-first-functions
cd test-first-functions
npm init -y
npm install --save-dev jest
```

Change the `"test"` script in `package.json` to `"jest"`, and create `.gitignore` containing `node_modules`. Then create a repository on GitHub and push your empty project, like you did in the Git week.

### 2. Starter files

Create `getOrdinalNumber.js`:

```js
function getOrdinalNumber(n) {
  // Pseudocode first!
  // 1. Find the last two digits (hint: n % 100)
  // 2. If they are 11, 12 or 13, use "th"
  // 3. Otherwise look at the last digit (hint: n % 10)
}

module.exports = getOrdinalNumber;
```

And `getOrdinalNumber.test.js` with your first test:

```js
const getOrdinalNumber = require("./getOrdinalNumber");

describe("getOrdinalNumber", () => {
  test("adds 'st' to numbers ending in 1", () => {
    expect(getOrdinalNumber(1)).toBe("1st");
    expect(getOrdinalNumber(21)).toBe("21st");
  });

  // add your other tests here
});
```

Run `npm test`. It should be **red**. Commit with a message like `Add tests for getOrdinalNumber`. Now write the code until it is **green**, and commit again.

### 3. Hints for isValidPassword

Break the problem into one small check per rule. You could write a helper function for each rule, or loop over the characters. These examples may help:

```js
const password = "Sunrise#2024";

console.log(password.length >= 8); // true
console.log(password !== password.toLowerCase()); // true if it has an uppercase letter
console.log(password !== password.toUpperCase()); // true if it has a lowercase letter

const symbols = ["!", "#", "$", "%", ".", "*", "&"];
console.log(symbols.some((symbol) => password.includes(symbol))); // true
```

For "has a number", think about how to check each character with `"0123456789".includes(...)`.

### 4. Hints for getCardValue

Pseudocode idea:

```text
take everything except the last character as the rank
if rank is "A", return 11
if rank is "J", "Q" or "K", return 10
if rank is a number from 2 to 10, return that number
otherwise throw an error
```

`card.slice(0, -1)` gives you everything except the last character.

To test that an error is thrown, wrap the call in an arrow function:

```js
test("throws an error for an invalid rank", () => {
  expect(() => getCardValue("Z♥")).toThrow();
});
```

> ⚠️ **Watch out:** `Number("1")` is `1`, but a card with rank `"1"` is not valid. Make sure your number check only allows 2 to 10.

### 5. Refactor

When all tests are green, read your code again. Can you make it shorter or clearer? Refactor in small steps. Run `npm test` after each step.

## How to submit

Use the submit form to send:

- **Link**: the URL of your GitHub repository
- **Written answer** (a few sentences): Which edge case surprised you the most? Did writing tests first help you or slow you down? Why?
- **File upload** (optional): a screenshot of your terminal showing all tests passing

## Stretch goals

- Add a fourth function, `formatPosition(n)`, that uses `getOrdinalNumber` to return a message like `"You finished 3rd!"`, and test it
- Make `isValidPassword` also return `false` if the password is in an array of banned passwords, like `["Password1!", "Qwerty123!"]`
- Make `getOrdinalNumber` throw an error for negative numbers, non-whole numbers and non-numbers, with tests for each
- Use `npx jest --coverage` to see which lines of your code are covered by tests, and add tests until coverage is 100%

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can set up a Node and Jest project and publish it on GitHub.
- Learners can write tests from acceptance criteria before writing the code.
- Learners can refactor with passing tests.

### Purpose
This pulls the whole week together on three real functions. It also shows learners how professionals work: tests first, small commits, then tidy up.

### Things to do
1. **Launch.** Walk through the three functions: `getOrdinalNumber`, `isValidPassword` and `getCardValue`. Make sure every learner has a working `npm test` before they start.
2. **Demonstrate test-first.** Write one failing test for `getOrdinalNumber` live (numbers ending in 1). Show it red, commit, then make it green.
3. **Show the tricky parts.** Point at the 11, 12 and 13 exception, and at `n % 100` and `n % 10`. For `getCardValue`, show a test using `expect(() => getCardValue("Z♥")).toThrow()`.
4. **Explain the README and the written answer.** Point learners to the submit form.

### What good work looks like
- The repo is public, has `package.json` with Jest as a dev dependency, and has a `.gitignore` containing `node_modules`.
- You can run `npm install` then `npm test` and everything passes.
- There are three function files and three `.test.js` files, with at least 5 tests each and at least 2 clearly described edge-case tests each.
- Tests cover every criterion, including 11 to 13 for ordinals and invalid cards such as `"1♠"`.
- The commit history shows tests arriving before or with the code, and the README explains how to run the tests.

### Watch for
- `getCardValue("1♠")` or `"11♦"` wrongly accepted. Check that only 2 to 10 are valid.
- Tests written after the code, with a single big commit. Ask learners to explain what they would do differently.
- A committed `node_modules` folder. Help them add `.gitignore` and remove it from the repo.
