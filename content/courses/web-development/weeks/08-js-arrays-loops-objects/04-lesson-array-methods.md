---
title: Array methods - map, filter, find, forEach and reduce
kind: lesson
minutes: 40
---
Think about a factory conveyor belt. Items ride along. A machine stands beside the belt. You give the machine an instruction card: "paint each item", "remove the broken ones", "count them all".

You do the same jobs with arrays again and again. "Do this to every item." "Keep only some items." "Find one item." "Add everything up." JavaScript has a ready-made method for each job. With them, your code gets shorter and easier to read.

## Our example data

All examples in this lesson use the same data. It is a basket from an online grocery shop.

```js
const basket = [
  { name: "Plantain", price: 1.2, quantity: 3, category: "fruit" },
  { name: "Rice 5kg", price: 8.5, quantity: 1, category: "dry" },
  { name: "Tomatoes", price: 0.9, quantity: 4, category: "veg" },
  { name: "Mangoes", price: 1.5, quantity: 2, category: "fruit" },
  { name: "Palm oil", price: 4.0, quantity: 1, category: "dry" },
];
```

Each item is an object with the same four keys. A real website works with data like this.

## The big idea: give a function to a method

Each method in this lesson takes a **function** as its input. The method calls your function once for **every item** in the array. It passes the item in.

Back to the factory. The array is the belt with items on it. The method is the machine. Your function is the **instruction card** you give to the machine: "for each item, do this".

A function that you give to another function is a **callback**. We usually write callbacks as short arrow functions.

```js
(item) => item.price
```

This is a function that takes an `item` and returns its price. It is nothing new. It is only shorter.

## forEach: do something with each item

`forEach` runs your function for every item. It is like a `for...of` loop written as a method. It does not give back a useful value. Use it when you want to *do* something, such as log.

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

```text
3 x Plantain
1 x Rice 5kg
4 x Tomatoes
```

## map: change every item into something new

`map` builds a **new array** of the same length. Your function changes each item. Whatever your function **returns** goes into the new array.

Think of a photo filter. You put in 10 photos. You get 10 edited photos back.

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

> ⚠️ **Watch out:** `map` needs your function to **return** a value. With curly braces in your arrow function, you must write `return`: `basket.map((item) => { return item.name; })`. If you forget, you get an array full of `undefined`. Remember week 7.

## filter: keep only the items that pass a test

`filter` builds a **new array**. It contains only the items for which your function returns `true`. The original array does not change.

Think of a sieve. Small stones fall through. Only what you want stays.

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

Look at the last line. We **chained** `filter` and `map`. First we keep the cheap items. Then we turn them into names. Chaining is common and powerful.

## find: get the first item that matches

`find` is like `filter`. But it returns only the **first** matching item, not an array. If nothing matches, it returns `undefined`.

Think of looking for your keys. You stop when you find them.

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

> 💡 **Tip:** `find` returns one object. `filter` always returns an array, even when one item or no item matches. Write `filter` and then `.price`, and you get `undefined`. An array has no `price`.

## reduce: boil a list down to one value

`reduce` combines all the items into **one value**, such as a total. It is the most powerful of the five. It is also the hardest. Most beginners find it tricky. That is normal. Go slowly.

You know the accumulator pattern from the loops lesson. Here it is again.

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

`reduce` does the same job in one expression.

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

Your function now has **two** parameters.

1. `runningTotal`: the result so far (the accumulator).
2. `item`: the current item.

Whatever your function returns becomes the new `runningTotal` for the next item. The `0` at the end is the **starting value**.

| Step | runningTotal (before) | item | returns |
| --- | --- | --- | --- |
| 1 | 0 | Plantain (1.2 x 3) | 3.6 |
| 2 | 3.6 | Rice (8.5 x 1) | 12.1 |
| 3 | 12.1 | Tomatoes (0.9 x 4) | 15.7 |

Picture a snowball rolling down a hill. It starts small, which is the starting value. It picks up more with each item it rolls over.

> 🧠 **Remember:** Always give `reduce` a starting value, such as `0`. It avoids confusing bugs, especially with empty arrays.

> 💡 **Tip:** `reduce` feels hard? A `for...of` loop with an accumulator does the same job. It is fine to use. Many developers write the loop first. They change it to `reduce` when it works.

## Choose the right method

| I want to... | Use | Gives back |
| --- | --- | --- |
| Do something with each item (for example, log it) | `forEach` | nothing (`undefined`) |
| Change every item into something else | `map` | new array, same length |
| Keep only some items | `filter` | new array, same or shorter |
| Get one item that matches | `find` | one item or `undefined` |
| Combine everything into one value | `reduce` | one value |

### Try it

Use the full basket. Write code to do these jobs.

1. Log a list of the item names in the `"dry"` category. Use `filter` and then `map`.
2. Find the item called `"Mangoes"` and log its price.
3. Use `reduce` to count the **total number of items**. Add up all the quantities. You should get 11.
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
4. Say `const nums = [1, 2, 3, 4]`. What does `nums.map((n) => n * 10)` give? What does `nums.filter((n) => n > 2)` give?
5. In `nums.reduce((sum, n) => sum + n, 0)`, what is `0` for? What is the final result?

<details><summary>Show answers</summary>

1. `map` returns a new array built from what your function returns. `forEach` runs your function for each item and returns nothing.
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

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can use `forEach`, `map`, `filter`, `find` and `reduce` on an array of objects.
- Learners can explain what a callback is.
- Learners can choose the right method for a job.

### Purpose
These methods are how developers answer questions about data every day. They are also the tools needed for the Library data assignment.

### Things to teach
1. **Callbacks.** A callback is a function given to a method. Show that `(item) => item.price` is just a short function. Keep the `basket` data on screen.
2. **map and filter.** Use `basket.map((item) => item.name)` and `basket.filter((item) => item.category === "fruit")`. Show the chain: filter cheap items, then map to names.
3. **find against filter.** `find` gives one object or `undefined`. `filter` always gives an array. Use `rice.price` and the `Bread` example.
4. **reduce.** Show the `for...of` accumulator first, then the `reduce` version giving `15.70`. Walk through the step table. Stress the starting value `0`. A loop is fine if reduce feels hard.
5. **Choosing.** Use the "I want to..." table. Let learners try the `basket` Try it. The total count should be 11.

### Check understanding
- Ask: "What is the difference between `map` and `forEach`?" A good answer: `map` returns a new array. `forEach` returns nothing.
- Ask: "What do `filter` and `find` return when nothing matches?" A good answer: `[]` and `undefined`.
- Ask: "In `reduce((sum, n) => sum + n, 0)`, what is `0`?" A good answer: the starting value.

### Watch for
- Forgetting `return` when an arrow function has curly braces, so `map` gives `undefined` items.
- Using `.price` on the result of `filter`. It is an array, so use `find` or an index.
