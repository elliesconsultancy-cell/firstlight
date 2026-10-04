---
title: Arrays - lists of values
kind: lesson
minutes: 25
---
If you wanted to store the names of 30 students, you could make 30 variables: `student1`, `student2`, `student3`... That would be painful. Instead, JavaScript gives us **arrays**: one variable that holds a whole list.

## What is an array?

An **array** is an ordered list of values. You create one with square brackets `[ ]`, and separate the items with commas.

```js
const shoppingList = ["bread", "milk", "eggs", "rice"];
const scores = [72, 85, 90, 64];
const mixed = ["Ada", 36, true];

console.log(shoppingList);
console.log(scores);
```

Think of an array as a row of numbered lockers at a train station. Each locker holds one item, and each locker has a number on the door so you can find it.

An array can hold any type of value: strings, numbers, booleans, even other arrays. In practice, it's best to keep one kind of thing in each array, like "all names" or "all prices".

## Index: finding an item by position

Every item in an array has a position number called its **index**. Just like with strings last week, counting starts at **0**.

```
  "bread"   "milk"   "eggs"   "rice"
     0         1        2        3
```

To get an item, write the array name followed by the index in square brackets:

```js
const shoppingList = ["bread", "milk", "eggs", "rice"];

console.log(shoppingList[0]); // bread
console.log(shoppingList[2]); // eggs
console.log(shoppingList[9]); // undefined (no locker 9)
```

> 🧠 **Remember:** The first item is at index `0`. The second is at index `1`. This "off by one" difference catches everyone at first.

## length: how many items?

Arrays have a `length`, just like strings:

```js
const shoppingList = ["bread", "milk", "eggs", "rice"];
console.log(shoppingList.length); // 4
```

Because counting starts at 0, the **last** item is always at index `length - 1`:

```js
const lastItem = shoppingList[shoppingList.length - 1];
console.log(lastItem); // rice
```

## Changing an array

### Replacing an item

You can put a new value in a locker using its index:

```js
const shoppingList = ["bread", "milk", "eggs"];
shoppingList[1] = "oat milk";
console.log(shoppingList); // ["bread", "oat milk", "eggs"]
```

"Wait," you might say, "`shoppingList` is a `const`! How can it change?" Good question. `const` means the variable will always point to the **same array**. But the items *inside* the array can still change. Think of `const` as screwing the locker unit to the wall. You can't swap it for a different unit, but you can still change what's in each locker.

### push and pop: adding and removing at the end

```js
const queue = ["Amina", "Ben"];

queue.push("Chidi");
console.log(queue); // ["Amina", "Ben", "Chidi"]

const removed = queue.pop();
console.log(removed); // Chidi
console.log(queue);   // ["Amina", "Ben"]
```

- `push(item)` adds an item to the **end**.
- `pop()` removes the **last** item, and returns it, so you can use it.

Think of a stack of plates: you add to the top and take from the top.

> 💡 **Tip:** There are also `unshift(item)` (add to the start) and `shift()` (remove from the start). They're used less often, but handy for a queue where the first person in line is served first.

## Searching an array

### includes: is it in the list?

`includes` returns `true` or `false`, just like the string version:

```js
const allergens = ["peanuts", "milk", "eggs"];

console.log(allergens.includes("milk"));  // true
console.log(allergens.includes("wheat")); // false
```

This works very nicely with `if`:

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

`indexOf` tells you the index of an item. If the item isn't in the array, it returns `-1`.

```js
const colours = ["red", "green", "blue"];

console.log(colours.indexOf("blue"));   // 2
console.log(colours.indexOf("purple")); // -1
```

> ⚠️ **Watch out:** `includes` and `indexOf` use strict equality (`===`), so `"Milk"` and `"milk"` are different, and `"5"` and `5` are different.

## Arrays and functions

You can pass an array into a function, and return one from a function, just like any other value:

```js
function getFirstAndLast(list) {
  return `First: ${list[0]}, Last: ${list[list.length - 1]}`;
}

const runners = ["Kofi", "Lara", "Musa", "Nia"];
console.log(getFirstAndLast(runners)); // First: Kofi, Last: Nia
```

## Other handy array tools

```js
const letters = ["c", "a", "b"];

console.log(letters.join(", "));  // "c, a, b" (turns an array into a string)
console.log("x-y-z".split("-"));  // ["x", "y", "z"] (turns a string into an array)
console.log(letters.slice(0, 2)); // ["c", "a"] (a copy of part of the array)
```

`slice` works just like the string version: from the start index, up to but not including the end index.

### Try it

Run the code, then:

1. Add two more songs with `push`.
2. Log the number of songs.
3. Log the **last** song, using `length - 1`.
4. Check whether your playlist includes `"Essence"`, and log a message either way.

```js
const playlist = ["Calm Down", "Last Last", "Love Nwantiti"];

console.log(playlist[0]);
console.log(playlist.indexOf("Last Last"));

// your code here

console.log(playlist.join(" | "));
```

## Check your understanding

1. What is the index of the first item in an array?
2. If `const pets = ["cat", "dog", "fish"]`, what is `pets[1]`? What is `pets.length`?
3. What does `pop()` do, and what does it return?
4. What does `indexOf` return if the item isn't found?
5. Why can you `push` to an array stored in a `const`?

<details><summary>Show answers</summary>

1. `0`.
2. `"dog"`, and `3`.
3. It removes the last item from the array and returns that item.
4. `-1`.
5. `const` stops the variable being pointed at a **different** array. It doesn't stop you changing the contents of the array it already points to.

</details>

## Go deeper

- [javascript.info: Arrays](https://javascript.info/array)
- [MDN: Arrays (learn)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays)
- [MDN: Array reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
