---
title: Loops - repeating work
kind: lesson
minutes: 30
---
Think about stirring a pot of soup. You do not count the stirs. You stir until it is ready. The action repeats until a condition is met.

Now imagine you must print a name badge for each of 200 guests. You would not write 200 lines of code. You would say: "for each guest, print a badge". That is what a **loop** does.

## Why use loops?

A **loop** repeats a block of code. Each time round is called an **iteration**.

A computer can repeat steps millions of times. It does not get tired. It does not make careless mistakes. You describe the job once. The loop does the repeating.

JavaScript has several loops. We learn the three you need most: `for...of`, `for` and `while`.

## for...of: "for each item in the list"

This is the simplest loop for going through an array. It reads almost like English.

```js
const guests = ["Ayo", "Bisi", "Chen", "Dara"];

for (const guest of guests) {
  console.log(`Welcome, ${guest}!`);
}
```

Output:

```text
Welcome, Ayo!
Welcome, Bisi!
Welcome, Chen!
Welcome, Dara!
```

Read it as: "for each `guest` of the `guests` array, run the code in the braces."

- First time round, `guest` is `"Ayo"`.
- Second time, it is `"Bisi"`.
- It goes on until the list ends.

You choose the name of the loop variable. A good habit: use the singular of the array name. For example `guest` of `guests`, `book` of `books`, `price` of `prices`.

## Add things up with a loop

A common job is to go through a list and build a result, such as a total. Make a variable **before** the loop. Update it **inside** the loop.

```js
const prices = [4.5, 12, 3.25, 8];
let total = 0;

for (const price of prices) {
  total = total + price;
}

console.log(`Total: £${total}`); // Total: £27.75
```

Let us play computer.

| Iteration | price | total after |
| --- | --- | --- |
| start | | 0 |
| 1 | 4.5 | 4.5 |
| 2 | 12 | 16.5 |
| 3 | 3.25 | 19.75 |
| 4 | 8 | 27.75 |

This pattern is called an **accumulator**. You start with an empty result. You update it for each item. Picture a shopping basket. It starts empty. Each item you pick up goes in.

> 💡 **Tip:** You can shorten `total = total + price` to `total += price`. They mean the same.

## Loops with if: pick out some items

Put an `if` inside a loop to choose only some items.

```js
const temperatures = [12, 25, 18, 30, 9];
const hotDays = [];

for (const temp of temperatures) {
  if (temp >= 20) {
    hotDays.push(temp);
  }
}

console.log(hotDays); // [25, 30]
```

What do you think `hotDays` holds if we change `20` to `10`? Try it.

## The classic for loop: counting

JavaScript had the `for` loop before `for...of` existed. You will see it in a lot of code. Use it when you need to **count**, or when you need the **index** of each item.

```js
for (let i = 0; i < 5; i++) {
  console.log(`Count: ${i}`);
}
```

The brackets hold three parts. Semicolons separate them.

1. **Start:** `let i = 0` makes a counter called `i`. It starts at 0.
2. **Keep going while:** `i < 5`. Before each iteration, JavaScript checks this. If it is `false`, the loop stops.
3. **After each iteration:** `i++` adds 1 to `i`. (`i++` is short for `i = i + 1`.)

So this logs `Count: 0` up to `Count: 4`. That is 5 times.

Here it is with an array, when you also want the position number.

```js
const podium = ["Asha", "Bola", "Carys"];

for (let i = 0; i < podium.length; i++) {
  console.log(`${i + 1}. ${podium[i]}`);
}
```

Output:

```text
1. Asha
2. Bola
3. Carys
```

> ⚠️ **Watch out:** Write `i < podium.length`, not `i <= podium.length`. The last index is `length - 1`. With `<=`, the loop goes one step too far and you get `undefined`. This is an **off-by-one error**. It is one of the most common bugs in programming.

## while: repeat until something changes

A `while` loop keeps going **as long as** a condition is true. Use it when you do not know in advance how many times to repeat.

```js
let savings = 100;
let months = 0;

while (savings < 500) {
  savings = savings + 60;
  months++;
}

console.log(`It takes ${months} months to save £${savings}.`);
```

Think of filling a kettle: "while it is not full, keep pouring". You do not count the pours. You check after each one.

> ⚠️ **Watch out:** What if the condition **never** becomes false? The loop runs forever. This is an **infinite loop**. It freezes your browser tab. Make sure something inside the loop moves you towards the end. Here, `savings` goes up each time. If your tab freezes, close it and fix the code.

## Which loop should I use?

| Situation | Best loop |
| --- | --- |
| Do something with **every item** in an array | `for...of` |
| You need the **index** (position number) | `for` |
| Repeat a **set number of times** (for example 10 times) | `for` |
| Repeat **until a condition changes**, and you do not know how many times | `while` |

With arrays, start with `for...of`. It is the easiest to read. It is the hardest to get wrong.

### Try it

1. Run the code. It logs each student and their score.
2. Change it to also count how many students **passed** (score 50 or more). Log that number at the end.
3. Then find the **highest** score with a loop. Hint: start with `let highest = scores[0];`. Replace it each time you find a bigger score.

```js
const students = ["Ama", "Ben", "Cleo", "Dev", "Esi"];
const scores = [67, 45, 88, 52, 39];

for (let i = 0; i < students.length; i++) {
  console.log(`${students[i]} scored ${scores[i]}`);
}

let passed = 0;
// your code here

console.log(`${passed} students passed`);
```

## Check your understanding

1. How many times does `for (let i = 0; i < 3; i++)` run? What values does `i` take?
2. What is an accumulator?
3. When would you choose a `while` loop instead of a `for...of` loop?
4. What is an infinite loop? How do you avoid one?
5. What is wrong with `for (let i = 0; i <= list.length; i++)`?

<details><summary>Show answers</summary>

1. 3 times. `i` is 0, then 1, then 2.
2. A variable you make before a loop. You update it on each iteration to build a result, such as a running total or a list of matches.
3. When you do not know in advance how many times to repeat. You keep going until a condition changes.
4. A loop whose condition never becomes false, so it never stops. To avoid one, make sure the loop changes something that will make the condition false in the end.
5. It is off by one. On the last iteration, `i` equals `list.length`. That is past the end of the array. So `list[i]` is `undefined`.

</details>

## Go deeper

- [javascript.info: Loops, while and for](https://javascript.info/while-for)
- [MDN: Looping code](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code)
- [MDN: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can loop over an array with `for...of`.
- Learners can build a total with an accumulator.
- Learners can write a counting `for` loop and a `while` loop, and say when to use each.

### Purpose
Loops let a few lines of code handle any amount of data. Accumulators are the idea behind totals, counts and "find the biggest".

### Things to teach
1. **for...of.** Use the `guests` example. Read it aloud: "for each guest of guests". Name the loop variable as the singular of the array.
2. **Accumulator.** Use `prices` and `total`. Trace the table together. Start the variable before the loop and update it inside.
3. **Loop with if.** Use the `temperatures` and `hotDays` example. Ask what changes if 20 becomes 10.
4. **Classic for.** Explain the three parts of `for (let i = 0; i < 5; i++)`. Use the `podium` example. Show why `<=` gives `undefined` (off by one).
5. **while.** Use the `savings` example. Warn about infinite loops and say to close the tab if it freezes.

### Check understanding
- Ask: "How many times does `for (let i = 0; i < 3; i++)` run, and what is `i`?" A good answer: 3 times, with 0, 1 and 2.
- Ask: "What is an accumulator?" A good answer: a variable made before the loop and updated on each pass to build a result.
- Ask: "When would you use `while`?" A good answer: when you do not know how many times in advance.

### Watch for
- `<=` with `length`. Link it to the off-by-one example.
- Making the accumulator inside the loop, so it resets each time. Say it goes before.
