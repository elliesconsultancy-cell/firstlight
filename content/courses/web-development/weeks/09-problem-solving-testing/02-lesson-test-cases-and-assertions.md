---
title: From acceptance criteria to test cases
kind: lesson
minutes: 30
---
Imagine a baker who makes birthday cakes. Before she hands over a cake, she reads her checklist: chocolate? Two layers? "Happy Birthday Ama" on top? She ticks each box. If one box is empty, the cake is not ready.

A test is a checklist for your code. How do you *know* your code works? "I tried it once and it looked fine" is not enough. In this lesson you write down exactly what "working" means. Then you let the computer check it.

## Acceptance criteria: the rules of "done"

A customer tells the baker: "Chocolate, two layers, and write *Happy Birthday Ama* on top." These are the **acceptance criteria**. If the cake is vanilla, it is not accepted, even when it looks beautiful.

In software, acceptance criteria are short statements about what a feature must do. A client, a manager or your instructor often writes them. Here is an example for a function that formats a price:

> `formatPrice(pence)` takes a number of pence and returns a string in pounds.
> - `formatPrice(250)` returns `"£2.50"`
> - `formatPrice(5)` returns `"£0.05"`
> - `formatPrice(1000)` returns `"£10.00"`

Each line can be checked. There is no "it should look nice". You get `"£2.50"` or you do not.

## Test cases: one input, one expected output

A **test case** is one example: *if I give the function this input, I expect this output.* Acceptance criteria turn directly into test cases.

| Input | Expected output |
| ----- | --------------- |
| 250   | "£2.50"         |
| 5     | "£0.05"         |
| 1000  | "£10.00"        |

When you run the function, you get the **actual** output. A test **passes** when actual and expected are the same. It **fails** when they are different.

## Edge cases: the tricky corners

The examples above are the normal path. Bugs like to hide at the edges. An **edge case** is an input that is unusual, extreme, or on a boundary.

For `formatPrice`, think about:

- `0` (nothing at all)
- A very big number, like `123456`
- A number under 10, like `5` (we already have this one)

Ask these questions about every function:

- What if the input is **empty** (`""`, `[]`, `0`)?
- What are the **smallest** and **biggest** values?
- What about values **right on a boundary**? If the rule is "18 or older", test 17, 18 and 19.
- What if the input has **capital letters**, **spaces**, or **odd characters**?
- What if the input is the **wrong type**?

> 💡 **Tip:** When you find a bug, write a test case for it first. Then fix the bug. Now the bug cannot come back without you noticing.

## Checking with console.assert

JavaScript has a built-in way to check a test case: `console.assert`. You give it a condition. If the condition is `true`, it stays quiet. If it is `false`, it prints an error.

```js
console.assert(1 + 1 === 2, "maths still works");
console.assert(1 + 1 === 3, "1 + 1 should be 3?!");
```

Only the second line prints something, because only that condition is false. The second argument is a message. It tells you *which* check failed.

> ⚠️ **Watch out:** If nothing appears in the playground's output panel, open Chrome's DevTools console (press F12) and look there. `console.assert` always prints to the browser console.

### Try it

What do you think this prints? Decide first.

```js
console.assert(2 * 3 === 6, "A");
console.assert(2 * 3 === 5, "B");
console.assert("a" === "A", "C");
```

<details><summary>Show answers</summary>

It prints errors for "B" and "C". The first condition is true, so it stays quiet. `"a"` and `"A"` are different strings, so the third condition is false.

</details>

## Testing formatPrice

Now we test `formatPrice`. Here is a first try:

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

Run it. Several assertions fail. Why? `250 / 100` is `2.5`, so we get `"£2.5"` and not `"£2.50"`. The tests tell us exactly what is wrong.

We fix it with `toFixed(2)`. It always shows two decimal places:

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

This idea sounds backwards, but it works well: **write your test cases before you write the function.** This is called **test-driven development (TDD)**.

Think of the baker again. She reads the checklist *before* she bakes, not after.

Why is this good?

- Writing tests first makes you understand the problem. If you cannot say what the output should be, you are not ready to code.
- You get a clear finish line. When all tests pass, you are done.

The rhythm has three steps:

1. **Red.** Write a test. Run it. It fails, because the code does not exist yet.
2. **Green.** Write only enough code to make it pass.
3. **Tidy.** Clean up the code. Check the tests still pass.

You will see these colours for real when we use Jest in the next lesson.

## Try it: your turn

Here are the acceptance criteria for a function:

> `isTeenager(age)` returns `true` if the age is from 13 to 19 (including both), and `false` otherwise.

1. Write at least six `console.assert` lines **before** you write the function. Include edge cases: 12, 13, 19, 20, and a number in the middle.
2. Now write the function. Run your assertions until none of them prints an error.

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

1. Acceptance criteria describe in general what a feature must do. A test case is one concrete example, with a specific input and expected output, that checks one part of those criteria.
2. When `true`, it prints nothing. When `false`, it prints an error message (including your message, if you gave one).
3. 17, 18 and 19: one below, exactly on, and one above the boundary.
4. Red (write a failing test), green (write code to make it pass), tidy (clean up while the tests keep passing).

</details>

## Go deeper

- [console.assert() (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/console/assert_static)
- [Number.prototype.toFixed() (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
- [Automated testing (javascript.info)](https://javascript.info/testing-mocha)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can turn acceptance criteria into test cases.
- Learners can name edge cases, such as boundaries, empty values and capital letters.
- Learners can check a function with `console.assert`.

### Purpose
"It looked fine when I tried it" is not proof. Tests say exactly what "working" means, and they catch bugs before users do.

### Things to teach
1. **Acceptance criteria and test cases.** Use the `formatPrice` examples (250, 5 and 1000). Each criterion becomes one input and one expected output.
2. **Edge cases.** For `formatPrice`, add 0 and 123456. For a rule like "18 or older", test 17, 18 and 19.
3. **`console.assert`.** It is silent when true and prints an error when false. Run the "A", "B", "C" example. Remind learners that output may be in the browser console (F12).
4. **Tests find real bugs.** The first `formatPrice` prints `"£2.5"`. The tests show why, and `toFixed(2)` fixes it.
5. **Red, green, tidy.** Explain test-driven development as a rhythm: failing test, then code, then clean up.

### Check understanding
- Ask: "What is the difference between acceptance criteria and a test case?" A good answer: criteria say generally what a feature must do. A test case is one concrete input and expected output.
- Ask: "Which ages would you test for `canVote` at 18?" A good answer: 17, 18 and 19.
- Ask: "What does `console.assert` print when the condition is true?" A good answer: nothing.

### Watch for
- Learners who think silence means nothing ran. Show a deliberately false assertion so they see the error.
- Learners who write only the easy cases. Ask "what is the strangest input you can think of?"
