---
title: Playing computer
kind: lesson
minutes: 25
---
Imagine watching a football goal on TV. At full speed, you miss how it happened. The referee plays it again in slow motion, frame by frame. Now everything is clear.

Good developers do this with code. They do not run it and hope. They read it slowly, step by step, and say what it will do. In this lesson you learn how. You pretend to be the computer.

## What is "playing computer"?

**Playing computer** means going through a program one line at a time, in order. At each step you note what the computer remembers. You use pen and paper.

It is slow-motion replay for code.

Why do it?

- It helps you **understand** code you did not write.
- It helps you **find bugs**. You see the exact line where the code does something you did not expect.
- It builds a picture in your head of how JavaScript really works. Developers call this a **mental model**.

## The two things to track

When you play computer, you keep track of two things.

1. **Which line you are on.** The computer runs from top to bottom, one line at a time. (Next week you will see code that skips or repeats lines.)
2. **Memory.** Which variables exist, and what value each one holds *right now*.

A good way to track memory is a **trace table**. It is a table with one row for each line. It shows what changes.

## A worked example

Here is a small program.

```js
let apples = 3;
let pears = 2;
apples = apples + pears;
pears = 10;
const total = apples + pears;
console.log(total);
```

Before you read on, cover the answer. What do you think gets logged?

Now we go through it together.

| Line | What happens | apples | pears | total | Output |
| --- | --- | --- | --- | --- | --- |
| 1 | Create `apples`, store 3 | 3 | | | |
| 2 | Create `pears`, store 2 | 3 | 2 | | |
| 3 | Work out `apples + pears` = 3 + 2 = 5, store in `apples` | 5 | 2 | | |
| 4 | Store 10 in `pears` | 5 | 10 | | |
| 5 | Work out `apples + pears` = 5 + 10 = 15, store in `total` | 5 | 10 | 15 | |
| 6 | Log `total` | 5 | 10 | 15 | `15` |

The answer is `15`. Many people guess `5` or `13`. They forget that line 4 changed `pears` **after** line 3 had used it.

> 🧠 **Remember:** A line uses only the values that are in memory **at that moment**. Changing a variable later does not go back and change earlier results.

## Work out the right-hand side first

A line with `=` has two sides. Always work out the right side first. Then store the result on the left.

```js
let count = 4;
count = count * 2 + 1;
```

On line 2, look up `count` (4). Work out `4 * 2 + 1`, which is `9`. Only then put `9` into `count`. The old value, 4, is gone.

## An example with strings

Tracing works for every type, not only numbers.

```js
const first = "kemi";
let shout = first.toUpperCase();
let message = `Hello ${shout}`;
shout = "BOB";
console.log(message);
console.log(shout);
```

Guess the two outputs first. Then check the table.

| Line | first | shout | message | Output |
| --- | --- | --- | --- | --- |
| 1 | "kemi" | | | |
| 2 | "kemi" | "KEMI" | | |
| 3 | "kemi" | "KEMI" | "Hello KEMI" | |
| 4 | "kemi" | "BOB" | "Hello KEMI" | |
| 5 | | | | `Hello KEMI` |
| 6 | | | | `BOB` |

Changing `shout` on line 4 does **not** change `message`. On line 3, the template literal became a finished string, `"Hello KEMI"`, and was stored. It is like a photo. The photo does not change when the person changes clothes later.

### Try it

Trace this program **on paper first**. Draw a table with columns for `a`, `b`, `c` and Output. Then click **Try it** to check.

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

`8`, `50`, `13`. On line 2, `b` gets a **copy** of the value in `a` (5). When `a` changes to 8, `b` stays 5. Then `c` is 8 + 5 = 13. Then `b` becomes 5 * 10 = 50.

</details>

## Use a visualiser

**Python Tutor** is a free website that also supports JavaScript. It plays computer for you. Paste your code in and click **Next**. You watch the memory change step by step. Try the examples above at [pythontutor.com](https://pythontutor.com/javascript.html).

> 💡 **Tip:** Use the visualiser to *check* your thinking, not to replace it. You learn when you predict first and compare after.

## Errors stop the computer

Sometimes the computer reaches a line it cannot understand. It **stops** there. The lines after the error never run.

```js
console.log("one");
console.log(two);
console.log("three");
```

Line 1 logs `one`. Line 2 asks for a variable called `two`. It does not exist. JavaScript shows `ReferenceError: two is not defined` and stops. `three` is never logged.

When you trace code and find a problem line, write "ERROR" in your table and stop. Next week you will learn much more about reading errors.

## Predict, run, explain

Practise this habit for the rest of the course.

1. **Predict.** Before you run code, write down what you think it prints.
2. **Run.** Run it. Look at the real output.
3. **Explain.** Was your prediction wrong? Find the exact line where your thinking was different from the computer's.

Being wrong is not failing. Each wrong guess teaches you how JavaScript really works.

### Try it

Predict the output of each `console.log`. Then run the code to check.

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
2. After `let x = 2; let y = x; x = 7;`, what is `y`?
3. JavaScript reaches `total = total + 1`. What does it do first?
4. What happens to the lines after an error?
5. Why is it useful to predict before you run code?

<details><summary>Show answers</summary>

1. Which line is running, and what is in memory (the variables and their current values).
2. `2`. `y` got a copy of the value when line 2 ran. Changing `x` later does not affect it.
3. It works out the right-hand side (`total + 1`) with the current value. Then it stores the result back in `total`.
4. They do not run. The program stops at the error.
5. Comparing your prediction with the real result shows where your understanding needs work. It also builds your mental model.

</details>

## Go deeper

- [Python Tutor: visualise JavaScript code](https://pythontutor.com/javascript.html)
- [javascript.info: Code structure](https://javascript.info/structure)
- [JS1 module: more practice with playing computer](https://curriculum.codeyourfuture.io/js1/)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can trace a short program line by line with a trace table.
- Learners can predict output before running code.
- Learners can explain that a variable keeps a copy and later changes do not alter earlier results.

### Purpose
Reading code slowly is how developers understand and debug code. This habit makes the bugs in next week's work much easier to find.

### Things to teach
1. **Two things to track.** Which line you are on, and what is in memory right now. Draw a trace table on a whiteboard or paper.
2. **The apples and pears example.** Ask for a guess first (it logs 15). Fill the table together. Point out line 4 changes `pears` after line 3 used it.
3. **Right side first.** Use `count = count * 2 + 1`. Work out the right, then store.
4. **Copies and finished strings.** Use the `kemi` and `shout` example: `message` stays `"Hello KEMI"`. Then let learners do the `a`, `b`, `c` Try it on paper first.
5. **Predict, run, explain.** Show Python Tutor as a way to check, not to replace thinking.

### Check understanding
- Ask: "After `let x = 2; let y = x; x = 7;` what is `y`?" A good answer: 2, because it got a copy.
- Ask: "What does the computer do first with `total = total + 1`?" A good answer: works out the right side using the current value.
- Ask: "What happens to lines after an error?" A good answer: they do not run.

### Watch for
- Learners who skip the paper and go straight to Python Tutor. Ask them to predict first.
- Thinking an earlier line updates when a variable changes later.
