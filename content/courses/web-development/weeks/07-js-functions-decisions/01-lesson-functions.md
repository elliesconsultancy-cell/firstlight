---
title: Functions - reusable recipes
kind: lesson
minutes: 30
---
Think about your favourite recipe card, for example jollof rice. You write the steps once. Then you cook from the card again and again. If you find a better way to cook, you fix the card in one place.

A function is a recipe card for code. Imagine you wrote code to add VAT to a price. Now you need it for 50 prices. Copying the lines 50 times is slow. If the VAT rate changes, you must fix 50 places. A function solves this.

## Why use functions?

A **function** is a named block of code that does one job. You write it once. Then you **call** it (run it) as many times as you like.

Think of a kettle. You do not build a new kettle each time you want hot water. You own one. You fill it, press the switch, and get hot water. Build once, use many times.

Functions help you in three ways.

- **Reuse.** Use the same code again without copying it.
- **Names.** A name makes code easier to read. `addVat(price)` explains itself.
- **One place to fix.** Fix a bug inside the function, and every use is fixed.

## Declare a function

Here is a small function.

```js
function sayHello() {
  console.log("Hello there!");
}
```

Let us read it piece by piece.

- `function` is the keyword. It says "I am making a function".
- `sayHello` is the name. Use camelCase. Start with a verb, because functions *do* things.
- `()` are brackets. They hold the function's inputs. This one has none yet.
- `{ }` are curly braces. They hold the **body**. The body is the code that runs when you call the function.

> ⚠️ **Watch out:** Writing a function does **not** run it. It is like writing a recipe card. Nothing is cooked until someone follows the recipe.

## Call a function

To run a function, write its name and then brackets.

```js
function sayHello() {
  console.log("Hello there!");
}

sayHello();
sayHello();
sayHello();
```

What do you think this prints? It prints `Hello there!` three times.

The brackets `()` are the "press the switch" part. Without them, nothing runs.

## Parameters and arguments

A function that always does the same thing is limited. Often we want to give it an **input**.

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("Ama");
greet("Bilal");
```

Two words matter here. People mix them up often.

- A **parameter** is the placeholder name in the function declaration. Here, `name` is a parameter. It is an empty slot with a label.
- An **argument** is the real value you pass in when you call the function. Here, `"Ama"` and `"Bilal"` are arguments.

Picture a form with a blank: "Your name: ______". The label is the parameter. What you write in the blank is the argument.

You call `greet("Ama")`. JavaScript makes a variable called `name` inside the function. It puts `"Ama"` in it. Then it runs the body.

### More than one parameter

Separate parameters with commas. Arguments are matched **in order**.

```js
function describePet(petName, animal) {
  console.log(`${petName} is a ${animal}.`);
}

describePet("Biscuit", "dog");  // Biscuit is a dog.
describePet("cat", "Whiskers"); // cat is a Whiskers. (wrong order!)
```

> 🧠 **Remember:** Arguments go into parameters by **position**, not by name. The first argument goes into the first parameter. The second goes into the second.

### A missing argument

Forget an argument, and the parameter is `undefined`.

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet(); // Hello, undefined!
```

Do you see `undefined` in your output? Check that you passed all the arguments.

## Give back a value with return

So far, our functions only logged things. Often we want a function to **work something out and give the answer back**. Then the rest of the program can use it. That is what `return` does.

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

When JavaScript reaches `return`, two things happen.

1. The function **stops** at once.
2. The value after `return` is sent back to the place where you called the function.

So `addVat(50)` is an expression. It evaluates to `60`. You can store it, log it, or use it in more maths, like any other value.

### A machine with input and output

Think of a vending machine. You put in money (the argument). It **gives you back** a drink (the return value). What you do with the drink is your choice.

```text
input (argument)  ->  [ function ]  ->  output (return value)
       50                addVat               60
```

The next lesson explains `return` and `console.log` in more detail. Many new programmers mix them up.

## Arrow functions (a short look)

You will often see a shorter way to write functions. These are **arrow functions**. They are named after the `=>` arrow.

```js
const addVat = (price) => {
  return price * 1.2;
};

console.log(addVat(10)); // 12
```

When the body is only one `return`, you can make it shorter. The value after the arrow is returned for you.

```js
const double = (number) => number * 2;
console.log(double(7)); // 14
```

For this course, arrow functions and `function` declarations do the same job. Use the one you find easier to read. In week 8 you will see many arrow functions with array methods.

### Try it

1. Run the code below.
2. Write a function called `minutesToSeconds(minutes)`. It **returns** the number of seconds. Log the result for 3 minutes.
3. Write an arrow function `makeShout(text)`. It returns the text in capital letters with `"!"` at the end.

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
2. Look at `function square(n) { return n * n; }` and `square(4)`. Which is the parameter? Which is the argument?
3. What does `square(4)` evaluate to?
4. What happens if you call a function with fewer arguments than parameters?
5. Rewrite `function triple(x) { return x * 3; }` as an arrow function.

<details><summary>Show answers</summary>

1. Declaring creates the function. It is like writing the recipe. Calling runs it, with `name()`.
2. `n` is the parameter. `4` is the argument.
3. `16`.
4. The missing parameters get the value `undefined`.
5. `const triple = (x) => x * 3;`

</details>

## Go deeper

- [javascript.info: Functions](https://javascript.info/function-basics)
- [javascript.info: Arrow functions, the basics](https://javascript.info/arrow-functions-basics)
- [MDN: Functions — reusable blocks of code](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can declare a function and call it.
- Learners can tell a parameter from an argument.
- Learners can write a function that returns a value, including a short arrow function.

### Purpose
Functions let developers write code once and reuse it. Almost all real code is organised into functions.

### Things to teach
1. **Declare is not call.** Write `sayHello` and show that nothing prints until `sayHello();` runs. Use the recipe card idea.
2. **Parameter and argument.** Use `greet(name)` with `"Ama"` and `"Bilal"`. The parameter is the blank on the form. The argument is what you write in it.
3. **Order matters.** Show `describePet("Biscuit", "dog")` against the swapped call. Show `greet()` giving `Hello, undefined!`.
4. **Return.** Use `addVat(50)` giving 60. Say that a call is an expression that becomes a value, so you can store it or add two calls together.
5. **Arrow functions.** Show `double = (number) => number * 2`. Say they do the same job here.

### Check understanding
- Ask: "In `square(4)` with `function square(n)`, which is the argument?" A good answer: 4. `n` is the parameter.
- Ask: "What happens with fewer arguments than parameters?" A good answer: the missing ones are `undefined`.
- Ask: "What does `addVat(50)` evaluate to?" A good answer: 60.

### Watch for
- Forgetting the brackets when calling, so nothing runs.
- Swapping the order of arguments. Remind them it goes by position, not by name.
