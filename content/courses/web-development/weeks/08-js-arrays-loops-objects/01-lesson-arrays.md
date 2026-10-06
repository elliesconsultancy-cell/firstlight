---
title: Arrays - lists of values
kind: lesson
minutes: 25
---
Imagine a shelf with numbered slots. Slot 0 holds bread. Slot 1 holds milk. Slot 2 holds eggs. To get the milk, you say "slot 1". You do not search the whole shelf.

Now think about 30 students. You could make 30 variables: `student1`, `student2`, `student3`... That is painful. JavaScript gives us **arrays**. An array is one variable that holds a whole list.

## What is an array?

An **array** is an ordered list of values. You make one with square brackets `[ ]`. You separate the items with commas.

```js
const shoppingList = ["bread", "milk", "eggs", "rice"];
const scores = [72, 85, 90, 64];
const mixed = ["Ada", 36, true];

console.log(shoppingList);
console.log(scores);
```

Picture a row of numbered lockers at a train station. Each locker holds one item. Each door has a number, so you can find the item.

An array can hold any type of value: strings, numbers, booleans, even other arrays. But it is best to keep one kind of thing in each array, such as "all names" or "all prices".

## Index: find an item by position

Each item in an array has a position number. It is called its **index**. As with strings, counting starts at **0**.

```text
  "bread"   "milk"   "eggs"   "rice"
     0         1        2        3
```

To get an item, write the array name and the index in square brackets.

```js
const shoppingList = ["bread", "milk", "eggs", "rice"];

console.log(shoppingList[0]); // bread
console.log(shoppingList[2]); // eggs
console.log(shoppingList[9]); // undefined (no locker 9)
```

What do you think `shoppingList[3]` gives? It gives `"rice"`.

> 🧠 **Remember:** The first item is at index `0`. The second is at index `1`. Everyone gets this "off by one" difference wrong at first. That is normal.

## length: how many items?

Arrays have a `length`, like strings.

```js
const shoppingList = ["bread", "milk", "eggs", "rice"];
console.log(shoppingList.length); // 4
```

Counting starts at 0. So the **last** item is always at index `length - 1`.

```js
const lastItem = shoppingList[shoppingList.length - 1];
console.log(lastItem); // rice
```

## Change an array

### Replace an item

Use the index to put a new value in a locker.

```js
const shoppingList = ["bread", "milk", "eggs"];
shoppingList[1] = "oat milk";
console.log(shoppingList); // ["bread", "oat milk", "eggs"]
```

You may ask: "`shoppingList` is a `const`. How can it change?" Good question.

`const` means the variable always points to the **same array**. But the items *inside* the array can change. Picture the locker unit screwed to the wall. You cannot swap it for a different unit. But you can change what is in each locker.

### push and pop: add and remove at the end

```js
const queue = ["Amina", "Ben"];

queue.push("Chidi");
console.log(queue); // ["Amina", "Ben", "Chidi"]

const removed = queue.pop();
console.log(removed); // Chidi
console.log(queue);   // ["Amina", "Ben"]
```

- `push(item)` adds an item to the **end**.
- `pop()` removes the **last** item. It also gives that item back, so you can use it.

Picture a stack of plates. You add to the top. You take from the top.

> 💡 **Tip:** There are also `unshift(item)` (add at the start) and `shift()` (remove from the start). You use them less often. They are handy for a queue, where the first person in line is served first.

## Search an array

### includes: is it in the list?

`includes` gives back `true` or `false`, like the string version.

```js
const allergens = ["peanuts", "milk", "eggs"];

console.log(allergens.includes("milk"));  // true
console.log(allergens.includes("wheat")); // false
```

It works well with `if`.

```js
const guestList = ["Dami", "Eve", "Femi"];
const visitor = "Eve";

if (guestList.includes(visitor)) {
  console.log(`Welcome, ${visitor}!`);
} else {
  console.log("Sorry, you're not on the list.");
}
```

### indexOf: where is it?

`indexOf` gives the index of an item. If the item is not in the array, it gives `-1`.

```js
const colours = ["red", "green", "blue"];

console.log(colours.indexOf("blue"));   // 2
console.log(colours.indexOf("purple")); // -1
```

> ⚠️ **Watch out:** `includes` and `indexOf` use strict equality (`===`). So `"Milk"` and `"milk"` are different. `"5"` and `5` are different too.

## Arrays and functions

You can pass an array into a function. You can also return one. It works like any other value.

```js
function getFirstAndLast(list) {
  return `First: ${list[0]}, Last: ${list[list.length - 1]}`;
}

const runners = ["Kofi", "Lara", "Musa", "Nia"];
console.log(getFirstAndLast(runners)); // First: Kofi, Last: Nia
```

## Other useful array tools

```js
const letters = ["c", "a", "b"];

console.log(letters.join(", "));  // "c, a, b" (turns an array into a string)
console.log("x-y-z".split("-"));  // ["x", "y", "z"] (turns a string into an array)
console.log(letters.slice(0, 2)); // ["c", "a"] (a copy of part of the array)
```

`slice` works like the string version. It starts at the start index. It stops before the end index.

### Try it

Run the code. Then do these steps.

1. Add two more songs with `push`.
2. Log the number of songs.
3. Log the **last** song, with `length - 1`.
4. Check if your playlist includes `"Essence"`. Log a message for both answers.

```js
const playlist = ["Calm Down", "Last Last", "Love Nwantiti"];

console.log(playlist[0]);
console.log(playlist.indexOf("Last Last"));

// your code here

console.log(playlist.join(" | "));
```

## Check your understanding

1. What is the index of the first item in an array?
2. Say `const pets = ["cat", "dog", "fish"]`. What is `pets[1]`? What is `pets.length`?
3. What does `pop()` do? What does it give back?
4. What does `indexOf` give back if the item is not found?
5. Why can you `push` to an array stored in a `const`?

<details><summary>Show answers</summary>

1. `0`.
2. `"dog"`, and `3`.
3. It removes the last item from the array. It gives back that item.
4. `-1`.
5. `const` stops the variable from pointing at a **different** array. It does not stop you changing the contents of the array it already points to.

</details>

## Go deeper

- [javascript.info: Arrays](https://javascript.info/array)
- [MDN: Arrays (learn)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays)
- [MDN: Array reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
