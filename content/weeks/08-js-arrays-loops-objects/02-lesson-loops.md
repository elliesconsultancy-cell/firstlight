---
title: Loops - repeating work
kind: lesson
minutes: 30
---
Imagine you need to print a name badge for every person on a list of 200 guests. You wouldn't write 200 lines of code. You'd say "for each guest, print a badge". That's exactly what a **loop** does.

## Why loops?

A **loop** repeats a block of code several times. Each time round is called an **iteration**.

Loops are the reason computers are so useful. A computer can repeat the same steps millions of times without getting tired or making a careless mistake. You describe the job once, and the loop does the repeating.

JavaScript has a few different loops. We'll learn the three you need most: `for...of`, `for` and `while`.

## for...of: "for each item in the list"

This is the simplest loop for going through an array. It reads almost like English:

```js
const guests = ["Ayo", "Bisi", "Chen", "Dara"];

for (const guest of guests) {
  console.log(`Welcome, ${guest}!`);
}
```

Output:

```
Welcome, Ayo!
Welcome, Bisi!
Welcome, Chen!
Welcome, Dara!
```

Read it as: "for each `guest` of the `guests` array, run the code in the braces". On the first iteration, `guest` is `"Ayo"`. On the second, `"Bisi"`. And so on until the list runs out.

You choose the name of the loop variable. A good habit is to use the singular of the array name: `guest` of `guests`, `book` of `books`, `price` of `prices`.

## Adding things up with a loop

A very common job is to go through a list and build up a result, like a total. We create a variable **before** the loop, and update it **inside** the loop.

```js
const prices = [4.5, 12, 3.25, 8];
let total = 0;

for (const price of prices) {
  total = total + price;
}

console.log(`Total: £${total}`); // Total: £27.75
```

Let's play computer:

| Iteration | price | total after |
| --- | --- | --- |
| start | | 0 |
| 1 | 4.5 | 4.5 |
| 2 | 12 | 16.5 |
| 3 | 3.25 | 19.75 |
| 4 | 8 | 27.75 |

This pattern, "start with an empty result, then update it for each item", is called an **accumulator**. Think of a shopping basket: it starts empty, and each item you pick up goes into it.

> 💡 **Tip:** `total = total + price` can be shortened to `total += price`. Both mean the same.

## Loops with if: picking out items

Combine a loop with `if` to choose only some items:

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

## The classic for loop: counting

Before `for...of` existed, JavaScript only had the classic `for` loop. You'll see it in lots of code. It's useful when you need to **count**, or when you need the **index** of each item.

```js
for (let i = 0; i < 5; i++) {
  console.log(`Count: ${i}`);
}
```

The brackets hold three parts, separated by semicolons:

1. **Start:** `let i = 0` creates a counter called `i`, starting at 0.
2. **Keep going while:** `i < 5`. Before each iteration, JavaScript checks this. If it's `false`, the loop stops.
3. **After each iteration:** `i++` adds 1 to `i`. (`i++` is short for `i = i + 1`.)

So this logs `Count: 0` up to `Count: 4`. That's 5 times.

Here's how to use it with an array, when you want the position number too:

```js
const podium = ["Asha", "Bola", "Carys"];

for (let i = 0; i < podium.length; i++) {
  console.log(`${i + 1}. ${podium[i]}`);
}
```

Output:

```
1. Asha
2. Bola
3. Carys
```

> ⚠️ **Watch out:** Use `i < podium.length`, not `i <= podium.length`. The last index is `length - 1`. With `<=`, the loop goes one step too far and you get `undefined`. This is called an **off-by-one error**, and it's one of the most common bugs in programming.

## while: repeat until something changes

A `while` loop keeps going **as long as** a condition is true. Use it when you don't know in advance how many times you'll need to repeat.

```js
let savings = 100;
let months = 0;

while (savings < 500) {
  savings = savings + 60;
  months++;
}

console.log(`It takes ${months} months to save £${savings}.`);
```

Think of filling a kettle: "while it's not full, keep pouring". You don't count the pours. You just check after each one.

> ⚠️ **Watch out:** If the condition **never** becomes false, the loop runs forever. This is an **infinite loop**, and it will freeze your browser tab. Always make sure something inside the loop moves you towards the end (here, `savings` goes up each time). If your tab freezes, close it and fix the code.

## Which loop should I use?

| Situation | Best loop |
| --- | --- |
| Do something with **every item** in an array | `for...of` |
| You need the **index** (position number) | `for` |
| Repeat a **set number of times** (e.g. 10 times) | `for` |
| Repeat **until a condition changes**, number of times unknown | `while` |

When in doubt with arrays, start with `for...of`. It's the easiest to read and hardest to get wrong.

### Try it

1. Run the code. It logs each student and their score.
2. Change it so it also counts how many students **passed** (score 50 or more) and logs that number at the end.
3. Then work out the **highest** score using a loop. Hint: start with `let highest = scores[0];` and replace it whenever you find a bigger one.

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

1. How many times does `for (let i = 0; i < 3; i++)` run, and what values does `i` take?
2. What is an accumulator?
3. When would you choose a `while` loop over a `for...of` loop?
4. What is an infinite loop, and how do you avoid one?
5. What's wrong with `for (let i = 0; i <= list.length; i++)`?

<details><summary>Show answers</summary>

1. 3 times. `i` is 0, then 1, then 2.
2. A variable you create before a loop and update on each iteration to build up a result, like a running total or a list of matches.
3. When you don't know in advance how many times to repeat, and want to keep going until a condition changes.
4. A loop whose condition never becomes false, so it never stops. Avoid it by making sure the loop changes something that will eventually make the condition false.
5. It's off by one. On the last iteration, `i` equals `list.length`, which is past the end of the array, so `list[i]` is `undefined`.

</details>

## Go deeper

- [javascript.info: Loops, while and for](https://javascript.info/while-for)
- [MDN: Looping code](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code)
- [MDN: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
