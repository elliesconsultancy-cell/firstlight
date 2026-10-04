---
title: Functions - reusable recipes
kind: lesson
minutes: 30
---
Imagine you wrote the code to add VAT to a price. Now you need to do it for 50 different prices. Copying the same lines 50 times would be slow and messy, and if VAT changed you'd have 50 places to fix. Functions solve this.

## Why functions?

A **function** is a named block of code that does one job. You write it once, and then you can **call** it (run it) as many times as you like.

Think of a kettle. You don't build a new kettle every time you want hot water. You built (or bought) it once. After that, you just fill it, press the switch, and get hot water. A function is like that: build it once, use it many times.

Functions help us:

- **Reuse** code instead of copying it.
- **Name** a job, so the code is easier to read. `addVat(price)` explains itself.
- **Fix things in one place.** If there's a bug, you fix the function and every use is fixed.

## Declaring a function

Here is a simple function:

```js
function sayHello() {
  console.log("Hello there!");
}
```

Let's read it piece by piece:

- `function` is the keyword that says "I'm making a function".
- `sayHello` is the name. Use camelCase, and choose a verb because functions *do* things.
- `()` brackets hold the function's inputs (this one has none yet).
- `{ }` curly braces hold the **body**: the code that runs when the function is called.

> ⚠️ **Watch out:** Writing a function does **not** run it. Declaring a function is like writing a recipe card. Nothing gets cooked until someone follows the recipe.

## Calling a function

To run the function, write its name followed by brackets:

```js
function sayHello() {
  console.log("Hello there!");
}

sayHello();
sayHello();
sayHello();
```

This logs `Hello there!` three times. The brackets `()` are the "press the switch" part. Without them, nothing happens.

## Parameters and arguments

A function that always does exactly the same thing is a bit limited. Usually we want to give it some **input**.

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("Ama");
greet("Bilal");
```

Two important words here, and people mix them up all the time:

- A **parameter** is the placeholder name in the function declaration. Here, `name` is a parameter. It's like an empty slot labelled "name".
- An **argument** is the real value you pass in when you call the function. Here, `"Ama"` and `"Bilal"` are arguments.

Think of a form with a blank space labelled "Your name: ______". The label is the parameter. What you write in the blank is the argument.

When you call `greet("Ama")`, JavaScript creates a variable called `name` inside the function and puts `"Ama"` in it. Then it runs the body.

### More than one parameter

Separate parameters with commas. The arguments are matched **in order**.

```js
function describePet(petName, animal) {
  console.log(`${petName} is a ${animal}.`);
}

describePet("Biscuit", "dog");  // Biscuit is a dog.
describePet("cat", "Whiskers"); // cat is a Whiskers. (wrong order!)
```

> 🧠 **Remember:** Arguments go into parameters by **position**, not by name. First argument into first parameter, second into second.

### Missing arguments

If you forget an argument, the parameter is `undefined`:

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet(); // Hello, undefined!
```

If you ever see `undefined` in your output, check whether you passed all the arguments.

## Giving back a value with return

So far, our functions have only logged things. But very often we want a function to **work something out and give the answer back**, so we can use it in the rest of our program. That's what `return` does.

```js
function addVat(price) {
  return price * 1.2;
}

const shoesWithVat = addVat(50);
const bagWithVat = addVat(20);

console.log(shoesWithVat); // 60
console.log(bagWithVat);   // 24
console.log(shoesWithVat + bagWithVat); // 84
```

When JavaScript reaches `return`, two things happen:

1. The function **stops** immediately.
2. The value after `return` is sent back to the place where the function was called.

So `addVat(50)` is an expression that evaluates to `60`. You can store it, log it, or use it in more maths, just like any other value.

Think of a vending machine: you put in money (the argument), and it **gives you back** a drink (the return value). What you do with the drink is up to you.

We'll look at `return` versus `console.log` in much more detail in the next lesson, because it is the most common confusion for new programmers.

## Arrow functions (a short look)

You'll often see a shorter way to write functions, called **arrow functions**, because of the `=>` arrow:

```js
const addVat = (price) => {
  return price * 1.2;
};

console.log(addVat(10)); // 12
```

If the body is just one `return`, you can make it even shorter. The value after the arrow is returned automatically:

```js
const double = (number) => number * 2;
console.log(double(7)); // 14
```

Arrow functions and `function` declarations do the same job for everything we'll do in this course. Use whichever you find easier to read. You'll see arrow functions a lot in Week 8 with array methods.

### Try it

1. Run the code below.
2. Write a function called `minutesToSeconds(minutes)` that **returns** the number of seconds. Log the result for 3 minutes.
3. Write an arrow function `makeShout(text)` that returns the text in uppercase with `"!"` on the end.

```js
function calculateArea(width, height) {
  return width * height;
}

const kitchen = calculateArea(3, 4);
const bedroom = calculateArea(4, 5);

console.log(`Kitchen: ${kitchen} square metres`);
console.log(`Bedroom: ${bedroom} square metres`);
console.log(`Total: ${kitchen + bedroom} square metres`);

// Write minutesToSeconds here

// Write makeShout here
```

## Check your understanding

1. What is the difference between declaring a function and calling it?
2. In `function square(n) { return n * n; }` and `square(4)`, which is the parameter and which is the argument?
3. What does `square(4)` evaluate to?
4. What happens if you call a function with fewer arguments than it has parameters?
5. Rewrite `function triple(x) { return x * 3; }` as an arrow function.

<details><summary>Show answers</summary>

1. Declaring creates the function (writes the recipe). Calling runs it, with `name()`.
2. `n` is the parameter. `4` is the argument.
3. `16`.
4. The missing parameters get the value `undefined`.
5. `const triple = (x) => x * 3;`

</details>

## Go deeper

- [javascript.info: Functions](https://javascript.info/function-basics)
- [javascript.info: Arrow functions, the basics](https://javascript.info/arrow-functions-basics)
- [MDN: Functions — reusable blocks of code](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions)
