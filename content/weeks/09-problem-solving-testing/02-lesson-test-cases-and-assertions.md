---
title: From acceptance criteria to test cases
kind: lesson
minutes: 30
---
How do you *know* your code works? "I tried it once and it looked fine" is not enough. In this lesson you will learn to write down exactly what "working" means, and then check it automatically with `console.assert`.

## Acceptance criteria: the rules of "done"

Imagine you order a cake for a birthday. You tell the baker: "Chocolate, two layers, and write *Happy Birthday Ama* on top." Those are your **acceptance criteria**. When you collect the cake, you check each one. If the cake is vanilla, it is not accepted, no matter how pretty it looks.

In software, acceptance criteria are short statements that describe what a feature must do. Someone (a product manager, a client, or your instructor) often writes them for you. Here is an example for a function that formats a price:

> `formatPrice(pence)` takes a number of pence and returns a string in pounds.
> - `formatPrice(250)` returns `"£2.50"`
> - `formatPrice(5)` returns `"£0.05"`
> - `formatPrice(1000)` returns `"£10.00"`

Each line is clear and checkable. There is no "it should look nice". You either get `"£2.50"` or you do not.

## Test cases: one input, one expected output

A **test case** is one specific example: *if I give the function this input, I expect this output.* Acceptance criteria usually turn straight into test cases.

| Input | Expected output |
| ----- | --------------- |
| 250   | "£2.50"         |
| 5     | "£0.05"         |
| 1000  | "£10.00"        |

When you run the function, you get the **actual** output. A test **passes** when actual and expected are the same. It **fails** when they are different.

## Edge cases: the tricky corners

The examples above are the "normal" path. But bugs love to hide at the edges. An **edge case** is an input that is unusual, extreme, or on a boundary. For `formatPrice`, think about:

- `0` (nothing at all)
- A very big number, like `123456`
- A number under 10, like `5` (we already have this one, good!)

A useful habit is to ask these questions for every function:

- What if the input is **empty** (`""`, `[]`, `0`)?
- What about the **smallest** and **biggest** values?
- What about values **right on a boundary** (if the rule is "18 or older", test 17, 18 and 19)?
- What if the input has **capital letters**, **spaces**, or **odd characters**?
- What if the input is the **wrong type** altogether?

> 💡 **Tip:** When you find a bug, write a test case for it first, then fix it. That bug can never sneak back without you noticing.

## Checking with console.assert

JavaScript has a built-in way to check a test case: `console.assert`. You give it a condition. If the condition is `true`, it stays quiet. If the condition is `false`, it prints an error message.

```js
console.assert(1 + 1 === 2, "maths still works");
console.assert(1 + 1 === 3, "1 + 1 should be 3?!");
```

Only the second line prints something, because only that condition is false. The message you pass as the second argument helps you see *which* check failed.

> ⚠️ **Watch out:** If nothing appears in the playground's output panel, open Chrome's DevTools console (press F12) and look there. `console.assert` always prints to the browser console.

Now let's test `formatPrice`:

```js
function formatPrice(pence) {
  const pounds = pence / 100;
  return "£" + pounds;
}

console.assert(formatPrice(250) === "£2.50", "250 should be £2.50");
console.assert(formatPrice(5) === "£0.05", "5 should be £0.05");
console.assert(formatPrice(1000) === "£10.00", "1000 should be £10.00");
console.assert(formatPrice(0) === "£0.00", "0 should be £0.00");
console.log("Tests finished");
```

Run it. Several assertions fail! `250 / 100` is `2.5`, so we get `"£2.5"` instead of `"£2.50"`. The tests told us exactly what is wrong.

We can fix it with `toFixed(2)`, which always shows two decimal places:

```js
function formatPrice(pence) {
  const pounds = pence / 100;
  return "£" + pounds.toFixed(2);
}

console.assert(formatPrice(250) === "£2.50", "250 should be £2.50");
console.assert(formatPrice(5) === "£0.05", "5 should be £0.05");
console.assert(formatPrice(1000) === "£10.00", "1000 should be £10.00");
console.assert(formatPrice(0) === "£0.00", "0 should be £0.00");
console.log("Tests finished");
```

Now only "Tests finished" appears. Silence means success.

## Write the tests first

Here is an idea that sounds backwards but works really well: **write your test cases before you write the function.** This is often called **test-driven development (TDD)**.

Why? Because writing tests first forces you to understand the problem. If you cannot write down what the output should be, you are not ready to write the code yet. It also gives you a clear finish line: when all tests pass, you are done.

The rhythm goes like this:

1. **Red** – write a test. Run it. It fails (because the code does not exist yet).
2. **Green** – write just enough code to make it pass.
3. **Tidy** – clean up the code, and check the tests still pass.

You will see these colours for real when we use Jest in the next lesson.

### Try it

Here are the acceptance criteria for a function:

> `isTeenager(age)` returns `true` if the age is from 13 to 19 (including both), and `false` otherwise.

1. Write at least six `console.assert` lines **before** writing the function. Include edge cases: 12, 13, 19, 20, and something in the middle.
2. Then write the function and run your assertions until none of them print an error.

```js
function isTeenager(age) {
  // write your code here
}

console.assert(isTeenager(15) === true, "15 is a teenager");
console.assert(isTeenager(12) === false, "12 is not a teenager");
// add more assertions here

console.log("Tests finished");
```

## Check your understanding

1. What is the difference between acceptance criteria and a test case?
2. What does `console.assert` do when its condition is `true`? And when it is `false`?
3. For a function `canVote(age)` where the rule is "18 or older", which three ages are the most important edge cases?
4. In test-driven development, what are the three steps of the rhythm?

<details><summary>Show answers</summary>

1. Acceptance criteria describe what a feature must do in general. A test case is one concrete example, with a specific input and expected output, that checks one part of those criteria.
2. When `true`, it prints nothing. When `false`, it prints an error message (including your message, if you gave one).
3. 17, 18 and 19: just below, exactly on, and just above the boundary.
4. Red (write a failing test), green (write code to make it pass), tidy (refactor while keeping the tests passing).

</details>

## Go deeper

- [console.assert() (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/console/assert_static)
- [Number.prototype.toFixed() (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
- [Automated testing (javascript.info)](https://javascript.info/testing-mocha)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
