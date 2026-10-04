---
title: Playing computer
kind: lesson
minutes: 25
---
Good developers don't just run code and hope. They can *read* code and predict what it will do before they press run. In this lesson you'll learn the simplest and most powerful way to do that: pretending to be the computer.

## What is "playing computer"?

**Playing computer** means stepping through a program one line at a time, in order, and keeping track of what the computer would remember at each step. You act as the computer, with a pen and paper.

Think of a football referee watching a replay in slow motion. At full speed, it's hard to see what happened. Slowed down, frame by frame, everything becomes clear. Playing computer is slow-motion replay for code.

Why bother?

- It helps you **understand** code you didn't write.
- It helps you **find bugs**, because you notice the exact line where things go differently from what you expected.
- It builds a picture in your head of how JavaScript really works. Developers call this a **mental model**.

## The two things to track

When you play computer, you keep track of two things:

1. **Which line you are on.** The computer runs from top to bottom, one line at a time (for now; next week we'll see code that can skip or repeat lines).
2. **Memory.** Which variables exist, and what value is in each one *right now*.

The easiest way to track memory is a **trace table**: a table with one row per line, showing what changes.

## A worked example

Let's trace this program:

```js
let apples = 3;
let pears = 2;
apples = apples + pears;
pears = 10;
const total = apples + pears;
console.log(total);
```

Before you read on, cover the answer and guess: what gets logged?

Now let's step through it together.

| Line | What happens | apples | pears | total | Output |
| --- | --- | --- | --- | --- | --- |
| 1 | Create `apples`, store 3 | 3 | | | |
| 2 | Create `pears`, store 2 | 3 | 2 | | |
| 3 | Work out `apples + pears` = 3 + 2 = 5, store in `apples` | 5 | 2 | | |
| 4 | Store 10 in `pears` | 5 | 10 | | |
| 5 | Work out `apples + pears` = 5 + 10 = 15, store in `total` | 5 | 10 | 15 | |
| 6 | Log `total` | 5 | 10 | 15 | `15` |

The answer is `15`. Many people guess `5` or `13` because they forget that line 4 changed `pears` **after** line 3 had already used it.

> 🧠 **Remember:** A line only uses the values that are in memory **at that moment**. Changing a variable later does not go back and change earlier results.

## Expressions are worked out first

When you reach a line with `=`, always do the right-hand side first, then store the result on the left.

```js
let count = 4;
count = count * 2 + 1;
```

On line 2, you look up `count` (4), work out `4 * 2 + 1` = `9`, and only then put `9` into `count`. The old value 4 is gone.

## Example with strings

Tracing works for all types, not just numbers.

```js
const first = "kemi";
let shout = first.toUpperCase();
let message = `Hello ${shout}`;
shout = "BOB";
console.log(message);
console.log(shout);
```

| Line | first | shout | message | Output |
| --- | --- | --- | --- | --- |
| 1 | "kemi" | | | |
| 2 | "kemi" | "KEMI" | | |
| 3 | "kemi" | "KEMI" | "Hello KEMI" | |
| 4 | "kemi" | "BOB" | "Hello KEMI" | |
| 5 | | | | `Hello KEMI` |
| 6 | | | | `BOB` |

Changing `shout` on line 4 does **not** change `message`. When line 3 ran, the template literal was turned into a finished string, `"Hello KEMI"`, and stored. It's like taking a photo: the photo doesn't change if the person changes clothes later.

### Try it

Trace this program **on paper first**. Write a trace table with columns for `a`, `b`, `c` and Output. Only then click **Try in playground** to check.

```js
let a = 5;
let b = a;
a = 8;
let c = a + b;
b = b * 10;
console.log(a);
console.log(b);
console.log(c);
```

<details><summary>Show the answer</summary>

`8`, `50`, `13`. On line 2, `b` gets a **copy** of the value in `a` (5). When `a` changes to 8, `b` stays 5. Then `c` = 8 + 5 = 13, and `b` becomes 5 * 10 = 50.

</details>

## Using a visualiser

There is a free website called **Python Tutor** (it also supports JavaScript) that plays computer for you. You paste code in and click **Next** to watch the memory change step by step. Try it with the examples above at [pythontutor.com](https://pythontutor.com/javascript.html).

> 💡 **Tip:** Use the visualiser to *check* your thinking, not to replace it. The learning happens when you predict first and then compare.

## Errors stop the computer

If the computer reaches a line it can't understand, it **stops** there. Lines after the error never run.

```js
console.log("one");
console.log(two);
console.log("three");
```

Line 1 logs `one`. Line 2 asks for a variable called `two`, which doesn't exist, so JavaScript throws a `ReferenceError: two is not defined` and stops. `three` is never logged.

When you trace code and spot a problem line, write "ERROR" in your table and stop. We'll learn much more about reading errors next week.

## Predict, run, explain

Here is a habit to practise for the rest of the course:

1. **Predict.** Before running code, write down what you think it will output.
2. **Run.** Run it and look at the real output.
3. **Explain.** If your prediction was wrong, find the exact line where your thinking was different from the computer's.

Being wrong is not a failure. Every wrong prediction teaches you something about how JavaScript really works.

### Try it

Predict the output of each `console.log`, then run to check.

```js
const price = 20;
let discount = 5;
let finalPrice = price - discount;
discount = 10;
const label = `Now only £${finalPrice}!`;
finalPrice = 0;
console.log(label);
console.log(finalPrice);
console.log(label.length);
```

## Check your understanding

1. What two things do you keep track of when playing computer?
2. After `let x = 2; let y = x; x = 7;` what is `y`?
3. When JavaScript reaches `total = total + 1`, what does it do first?
4. What happens to the lines after an error?
5. Why is it useful to predict before you run code?

<details><summary>Show answers</summary>

1. Which line is running, and what is in memory (the variables and their current values).
2. `2`. `y` got a copy of the value when line 2 ran. Changing `x` later doesn't affect it.
3. It works out the right-hand side (`total + 1`) using the current value, then stores the result back in `total`.
4. They don't run. The program stops at the error.
5. Comparing your prediction to the real result shows you exactly where your understanding needs fixing, and builds your mental model.

</details>

## Go deeper

- [Python Tutor: visualise JavaScript code](https://pythontutor.com/javascript.html)
- [javascript.info: Code structure](https://javascript.info/structure)
- [JS1 module: more practice with playing computer](https://curriculum.codeyourfuture.io/js1/)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
