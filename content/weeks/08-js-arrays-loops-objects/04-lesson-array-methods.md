---
title: Array methods - map, filter, find, forEach and reduce
kind: lesson
minutes: 40
---
You can already answer questions about data with loops. But developers do the same few jobs with arrays again and again: "do this to every item", "keep only some items", "find one item", "add everything up". JavaScript has a ready-made method for each of these jobs, and once you know them, your code becomes shorter and easier to read.

## Our example data

All the examples in this lesson use the same small data set: a basket from an online grocery shop.

```js
const basket = [
  { name: "Plantain", price: 1.2, quantity: 3, category: "fruit" },
  { name: "Rice 5kg", price: 8.5, quantity: 1, category: "dry" },
  { name: "Tomatoes", price: 0.9, quantity: 4, category: "veg" },
  { name: "Mangoes", price: 1.5, quantity: 2, category: "fruit" },
  { name: "Palm oil", price: 4.0, quantity: 1, category: "dry" },
];
```

Each item is an object with the same four keys. This is exactly the kind of data a real website works with.

## The big idea: passing a function to a method

Each of the methods in this lesson takes a **function** as its input. The method calls your function once for **every item** in the array, passing the item in.

Think of a factory conveyor belt. The array is the belt with items on it. The method is the machine. And your function is the **instruction card** you give the machine: "for each item, do this".

A function that you pass to another function is called a **callback**. We usually write them as short arrow functions:

```js
(item) => item.price
```

This is just a function that takes an `item` and returns its price. Nothing new, only shorter.

## forEach: do something with each item

`forEach` runs your function for every item. It's like a `for...of` loop in method form. It doesn't return anything useful; use it when you want to *do* something, like logging.

```js
const basket = [
  { name: "Plantain", price: 1.2, quantity: 3, category: "fruit" },
  { name: "Rice 5kg", price: 8.5, quantity: 1, category: "dry" },
  { name: "Tomatoes", price: 0.9, quantity: 4, category: "veg" },
];

basket.forEach((item) => {
  console.log(`${item.quantity} x ${item.name}`);
});
```

Output:

```
3 x Plantain
1 x Rice 5kg
4 x Tomatoes
```

## map: transform every item into something new

`map` builds a **new array** of the same length, where each item has been changed by your function. Whatever your function **returns** goes into the new array.

Think of a photo filter: you put in 10 photos and get 10 edited photos back.

```js
const basket = [
  { name: "Plantain", price: 1.2, quantity: 3, category: "fruit" },
  { name: "Rice 5kg", price: 8.5, quantity: 1, category: "dry" },
  { name: "Tomatoes", price: 0.9, quantity: 4, category: "veg" },
];

const names = basket.map((item) => item.name);
console.log(names); // ["Plantain", "Rice 5kg", "Tomatoes"]

const lineTotals = basket.map((item) => item.price * item.quantity);
console.log(lineTotals); // roughly [3.6, 8.5, 3.6]

const labels = basket.map((item) => `${item.name.toUpperCase()} - £${item.price.toFixed(2)}`);
console.log(labels);
```

> ⚠️ **Watch out:** `map` needs your function to **return** a value. If you use curly braces in your arrow function, you must write `return`: `basket.map((item) => { return item.name; })`. If you forget, you get an array full of `undefined`. (Remember week 7!)

## filter: keep only the items that pass a test

`filter` builds a **new array** containing only the items where your function returns `true`. The original array is not changed.

Think of a sieve: the small stones fall through, and only what you want stays.

```js
const basket = [
  { name: "Plantain", price: 1.2, quantity: 3, category: "fruit" },
  { name: "Rice 5kg", price: 8.5, quantity: 1, category: "dry" },
  { name: "Tomatoes", price: 0.9, quantity: 4, category: "veg" },
  { name: "Mangoes", price: 1.5, quantity: 2, category: "fruit" },
];

const fruit = basket.filter((item) => item.category === "fruit");
console.log(fruit.length); // 2

const cheapItems = basket.filter((item) => item.price < 1.5);
console.log(cheapItems.map((item) => item.name)); // ["Plantain", "Tomatoes"]
```

Notice the last line: we **chained** `filter` and `map`. First keep the cheap items, then turn those into names. Chaining is very common and very powerful.

## find: get the first item that matches

`find` is like `filter`, but it returns only the **first** matching item (not an array). If nothing matches, it returns `undefined`.

Think of looking for your keys: you stop as soon as you find them.

```js
const basket = [
  { name: "Plantain", price: 1.2, quantity: 3, category: "fruit" },
  { name: "Rice 5kg", price: 8.5, quantity: 1, category: "dry" },
  { name: "Tomatoes", price: 0.9, quantity: 4, category: "veg" },
];

const rice = basket.find((item) => item.name === "Rice 5kg");
console.log(rice.price); // 8.5

const bread = basket.find((item) => item.name === "Bread");
console.log(bread); // undefined
```

> 💡 **Tip:** `find` returns one object. `filter` always returns an array, even if only one item (or zero items) matches. If you write `filter` and then try `.price`, you'll get `undefined`, because arrays don't have a `price`.

## reduce: boil a list down to one value

`reduce` combines all the items into a **single value**, like a total. It's the most powerful of the five, and the trickiest, so take it slowly.

Remember the accumulator pattern from the loops lesson?

```js
const basket = [
  { name: "Plantain", price: 1.2, quantity: 3, category: "fruit" },
  { name: "Rice 5kg", price: 8.5, quantity: 1, category: "dry" },
  { name: "Tomatoes", price: 0.9, quantity: 4, category: "veg" },
];

let total = 0;
for (const item of basket) {
  total = total + item.price * item.quantity;
}
console.log(total.toFixed(2)); // 15.70
```

`reduce` does exactly that, in one expression:

```js
const basket = [
  { name: "Plantain", price: 1.2, quantity: 3, category: "fruit" },
  { name: "Rice 5kg", price: 8.5, quantity: 1, category: "dry" },
  { name: "Tomatoes", price: 0.9, quantity: 4, category: "veg" },
];

const total = basket.reduce((runningTotal, item) => {
  return runningTotal + item.price * item.quantity;
}, 0);

console.log(`Basket total: £${total.toFixed(2)}`); // Basket total: £15.70
```

Your function now takes **two** parameters:

1. `runningTotal`: the result so far (the accumulator).
2. `item`: the current item.

Whatever your function returns becomes the new `runningTotal` for the next item. The `0` at the end is the **starting value**.

| Step | runningTotal (before) | item | returns |
| --- | --- | --- | --- |
| 1 | 0 | Plantain (1.2 x 3) | 3.6 |
| 2 | 3.6 | Rice (8.5 x 1) | 12.1 |
| 3 | 12.1 | Tomatoes (0.9 x 4) | 15.7 |

Think of a snowball rolling down a hill. It starts small (the starting value) and picks up a bit more with every item it rolls over.

> 🧠 **Remember:** Always give `reduce` a starting value (like `0`). It avoids confusing bugs, especially with empty arrays.

> 💡 **Tip:** If `reduce` feels hard, that's normal. A `for...of` loop with an accumulator does the same job and is perfectly fine to use. Many developers write the loop first, then turn it into `reduce` once it works.

## Choosing the right method

| I want to... | Use | Gives back |
| --- | --- | --- |
| Do something with each item (e.g. log it) | `forEach` | nothing (`undefined`) |
| Change every item into something else | `map` | new array, same length |
| Keep only some items | `filter` | new array, same or shorter |
| Get one item that matches | `find` | one item or `undefined` |
| Combine everything into one value | `reduce` | one value |

### Try it

Using the full basket, write code to:

1. Log a list of the item names in the `"dry"` category (use `filter` then `map`).
2. Find the item called `"Mangoes"` and log its price.
3. Use `reduce` to count the **total number of items** (add up all the quantities). You should get 11.
4. Bonus: use `map` and `join` to log a shopping list like `"Plantain, Rice 5kg, Tomatoes, Mangoes, Palm oil"`.

```js
const basket = [
  { name: "Plantain", price: 1.2, quantity: 3, category: "fruit" },
  { name: "Rice 5kg", price: 8.5, quantity: 1, category: "dry" },
  { name: "Tomatoes", price: 0.9, quantity: 4, category: "veg" },
  { name: "Mangoes", price: 1.5, quantity: 2, category: "fruit" },
  { name: "Palm oil", price: 4.0, quantity: 1, category: "dry" },
];

// 1. dry item names

// 2. price of mangoes

// 3. total number of items

// 4. shopping list string
```

## Check your understanding

1. What is the difference between `map` and `forEach`?
2. What does `filter` return if no items match?
3. What does `find` return if no items match?
4. Given `const nums = [1, 2, 3, 4]`, what does `nums.map((n) => n * 10)` give? And `nums.filter((n) => n > 2)`?
5. In `nums.reduce((sum, n) => sum + n, 0)`, what is `0` for, and what is the final result?

<details><summary>Show answers</summary>

1. `map` returns a new array built from what your function returns. `forEach` just runs your function for each item and returns nothing.
2. An empty array `[]`.
3. `undefined`.
4. `[10, 20, 30, 40]` and `[3, 4]`.
5. `0` is the starting value of `sum`. The result is `10`.

</details>

## Go deeper

- [javascript.info: Array methods](https://javascript.info/array-methods)
- [MDN: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
