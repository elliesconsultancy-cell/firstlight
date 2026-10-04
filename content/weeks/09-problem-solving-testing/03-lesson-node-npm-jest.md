---
title: Testing with Node, npm and Jest
kind: lesson
minutes: 40
---
`console.assert` is great for a few checks. But real projects have hundreds of tests, and developers want one command that runs them all and shows a clear report. In this lesson you will set up the same tools many professional teams use: Node.js, npm and Jest.

## Three new tools, one simple job

Let's meet the team:

- **Node.js** lets you run JavaScript *outside* the browser, straight from your terminal. Until now, JavaScript only lived inside Chrome. Node gives it a second home.
- **npm** (Node Package Manager) comes with Node. It is like an app store for code: other developers publish useful tools, and npm downloads them into your project.
- **Jest** is one of those tools. It is a **test runner**: it finds your test files, runs every test, and tells you what passed and what failed.

Think of a factory. Node is the building with the electricity. npm is the delivery van that brings in machines. Jest is the quality-control machine at the end of the line.

## Step 1: Install Node.js

Go to [nodejs.org](https://nodejs.org/en/download) and download the **LTS** version ("Long Term Support" means the stable one). Run the installer and accept the default options.

When it finishes, **close and reopen** VS Code. Then open the terminal in VS Code (menu **Terminal → New Terminal**) and type:

```bash
node --version
npm --version
```

You should see two version numbers, like `v22.11.0` and `10.9.0`. Your numbers may be different, and that is fine.

> ⚠️ **Watch out:** If you see "command not found" or "not recognized", close *all* terminal and VS Code windows and open them again. If it still fails, restart your computer. Installers often need a fresh start to work.

## Step 2: Create a project

Make a new folder for this lesson, for example `testing-practice`, and open it in VS Code (**File → Open Folder**). In the terminal, run:

```bash
npm init -y
```

This creates a file called `package.json`. It is like an ID card for your project: its name, version, and which tools it needs. The `-y` means "yes to all the default answers".

## Step 3: Install Jest

```bash
npm install --save-dev jest
```

This does three things:

1. Downloads Jest into a new folder called `node_modules`.
2. Adds Jest to `package.json` under `devDependencies`. "Dev" means it is needed while *developing*, not by the final website.
3. Creates `package-lock.json`, which records the exact versions installed.

> 💡 **Tip:** `node_modules` can be huge. Never upload it to GitHub. Create a file called `.gitignore` in your project folder containing one line: `node_modules`. Anyone who downloads your project can run `npm install` to get the same tools back.

## Step 4: Tell npm how to run tests

Open `package.json`. Find the `"scripts"` section and change the `"test"` line so it says `"jest"`:

```json
{
  "name": "testing-practice",
  "version": "1.0.0",
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^30.0.0"
  }
}
```

Your file will have a few more lines, and the Jest version number may differ. Only change the `"test"` line.

## Step 5: Write a function and a test

Create a file called `sum.js`:

```js
function sum(a, b) {
  return a + b;
}

module.exports = sum;
```

The last line, `module.exports`, means "let other files use this function". It is like putting the function in a shop window.

Now create `sum.test.js`. The `.test.js` ending is important: that is how Jest finds test files.

```js
const sum = require("./sum");

test("adds 1 and 2 to make 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds negative numbers", () => {
  expect(sum(-4, -6)).toBe(-10);
});

test("adding zero changes nothing", () => {
  expect(sum(7, 0)).toBe(7);
});
```

Let's read this slowly:

- `require("./sum")` takes the function out of the shop window in `sum.js`.
- `test(description, function)` defines one test. The description is a sentence explaining what you are checking.
- `expect(actual)` takes the value your code really produced.
- `.toBe(expected)` says what it *should* be.

Read it like English: "*expect* sum of 1 and 2 *to be* 3."

> ⚠️ **Watch out:** Code that uses `require`, `module.exports`, `test` and `expect` runs in Node with Jest, not in the course playground. For this lesson, work in VS Code and its terminal.

## Step 6: Run the tests

```bash
npm test
```

You should see something like this:

```bash
 PASS  ./sum.test.js
  ✓ adds 1 and 2 to make 3 (2 ms)
  ✓ adds negative numbers
  ✓ adding zero changes nothing

Tests:       3 passed, 3 total
```

The word **PASS** appears in green, with a tick for every test. Congratulations, you are now running automated tests like a professional developer!

## Seeing red

Now let's break something on purpose. Change `sum.js` to use minus by mistake:

```js
function sum(a, b) {
  return a - b;
}

module.exports = sum;
```

Run `npm test` again. This time you see **FAIL** in red, and a report like:

```bash
 FAIL  ./sum.test.js
  ✕ adds 1 and 2 to make 3 (3 ms)

  ● adds 1 and 2 to make 3

    expect(received).toBe(expected)

    Expected: 3
    Received: -1
```

This report is your friend. It tells you:

- **Which test** failed (by its description, which is why good descriptions matter).
- **Expected**: what the test wanted.
- **Received**: what your code actually gave back.
- Further down, the **file and line number** where it happened.

Change the minus back to plus, run the tests, and enjoy the green again.

> 🧠 **Remember:** A red test is not a failure *of you*. It is information. A test that fails for a clear reason is doing its job perfectly.

### Try it

In the same project, create `isEven.js` and `isEven.test.js`.

1. In `isEven.test.js`, write at least four tests for a function `isEven(n)` that returns `true` for even numbers and `false` for odd numbers. Include `0` and a negative number.
2. Run `npm test` and watch them fail (red).
3. Write the function in `isEven.js` until they all pass (green).

```js
// isEven.js
function isEven(n) {
  // your code here (hint: the % operator gives the remainder)
}

module.exports = isEven;
```

## Check your understanding

1. What is the difference between Node.js, npm and Jest?
2. Why should you add `node_modules` to `.gitignore`?
3. How does Jest know which files contain tests?
4. In Jest's output, what do "Expected" and "Received" mean?

<details><summary>Show answers</summary>

1. Node.js runs JavaScript outside the browser. npm downloads and manages tools (packages) for your project. Jest is one of those packages, and it runs your tests.
2. It is very large and can be recreated at any time with `npm install`, using the list in `package.json`.
3. It looks for files ending in `.test.js` (or `.spec.js`, or files inside a `__tests__` folder).
4. "Expected" is the value the test said it should be. "Received" is the value your code actually returned.

</details>

## Go deeper

- [Getting started (Jest docs)](https://jestjs.io/docs/getting-started)
- [Using matchers (Jest docs)](https://jestjs.io/docs/using-matchers)
- [About npm (npm docs)](https://docs.npmjs.com/about-npm)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
