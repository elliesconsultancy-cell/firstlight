---
title: Values and variables
kind: lesson
minutes: 30
---
Programs work with information: names, prices, ages, whether someone is logged in. In this lesson you will learn the different *kinds* of information JavaScript understands, and how to keep that information safe in variables so you can use it later.

## Values and types

A **value** is a single piece of information. `"Tunde"` is a value. `42` is a value. `true` is a value.

Every value has a **type**. The type tells JavaScript what kind of thing it is, and what you can do with it. You can add two numbers. You can make text uppercase. But it doesn't make sense to make a number uppercase.

Here are the five types you'll meet first:

| Type | What it is | Examples |
| --- | --- | --- |
| **string** | Text, inside quotes | `"hello"`, `'Bolton'`, `"123"` |
| **number** | Any number, whole or decimal | `7`, `-3`, `19.99` |
| **boolean** | Yes or no | `true`, `false` |
| **undefined** | "Nothing has been put here yet" | `undefined` |
| **null** | "Empty on purpose" | `null` |

> 🧠 **Remember:** `"123"` (with quotes) is a **string**, not a number. Quotes always mean text, even if the text looks like a number.

### Strings

A string is text. You can use double quotes `"..."` or single quotes `'...'`. Just make sure the start and end match.

```js
console.log("Good morning");
console.log('Good morning');
```

### Numbers

JavaScript uses one type for all numbers: whole numbers and decimals.

```js
console.log(25);
console.log(3.5);
console.log(-10);
```

### Booleans

A boolean has only two possible values: `true` or `false`. Think of a light switch. It's on or off. Booleans become very important next week when the computer has to make decisions.

### undefined and null

These two both mean "no value", but in slightly different ways. Imagine an empty box:

- `undefined` is a box that nobody has filled yet. JavaScript uses it automatically.
- `null` is a box that someone deliberately left empty, and wrote "empty" on the lid.

You don't need to worry too much about the difference yet.

## Asking JavaScript for the type

There is a handy operator called `typeof` that tells you the type of a value:

```js
console.log(typeof "hello");   // "string"
console.log(typeof 42);        // "number"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof "42");      // "string" - quotes make it text!
```

> ⚠️ **Watch out:** `typeof null` gives `"object"`. This is a famous old mistake in JavaScript that can never be fixed, because fixing it would break old websites. Just remember it as a strange exception.

## Variables: labelled boxes

Values on their own disappear as soon as the line is finished. To keep a value so we can use it again, we put it in a **variable**.

Think of a variable as a **box with a label on it**. You put a value inside, and you use the label to find it later.

```js
const name = "Amara";
console.log(name);
```

Let's read this line slowly:

- `const` means "make a new box, and the contents will not be swapped out".
- `name` is the label on the box.
- `=` means "put this value in the box". It does **not** mean "equals" like in maths. Read it as "gets" or "is assigned".
- `"Amara"` is the value going into the box.

Now anywhere we write `name`, JavaScript looks inside the box and uses `"Amara"`.

## let and const

There are two main ways to create a variable:

```js
const city = "Manchester";
let score = 0;
```

- Use **`const`** when the value should **not** be replaced. Most of your variables will be `const`.
- Use **`let`** when you know the value **will** change later, like a score in a game.

### Reassigning with let

With `let`, you can put a new value in the box:

```js
let score = 0;
console.log(score); // 0

score = 10;
console.log(score); // 10

score = score + 5;
console.log(score); // 15
```

Notice we only write `let` the **first** time. After that, the box already exists, so we just use its name.

The line `score = score + 5` looks strange if you think of `=` as maths. But read it from right to left: "take what's in `score` (10), add 5, and put the result (15) back into `score`".

### Trying to change a const

```js
const birthYear = 1990;
birthYear = 1991; // TypeError: Assignment to constant variable.
```

JavaScript stops with an error. This is helpful: `const` protects you from changing something by accident.

> 💡 **Tip:** A good habit is: start with `const`. Only switch to `let` if you find you really need to change the value.

You may also see an older keyword, `var`, in examples on the internet. It works differently in some tricky ways. In this course we use `let` and `const` only.

## Naming variables well

The computer doesn't care what you name your variables. **Humans** do. Good names make code easy to read.

Rules (JavaScript will complain if you break these):

- Names can contain letters, numbers, `_` and `$`.
- Names cannot start with a number. `1stPlace` is not allowed.
- No spaces. `first name` is not allowed.
- Some words are reserved, like `let`, `const`, `if`. You can't use them as names.
- Names are case-sensitive. `age` and `Age` are two different boxes.

Conventions (good habits developers follow):

- Use **camelCase**: start lowercase, then capitalise each new word. `firstName`, `totalPrice`, `isLoggedIn`.
- Choose names that describe what's inside. `priceInPounds` is better than `p` or `x`.
- Booleans often start with `is` or `has`: `isMember`, `hasPaid`.

```js
// Hard to understand
const x = 3;
const y = 2.5;

// Easy to understand
const numberOfCoffees = 3;
const pricePerCoffee = 2.5;
```

### Try it

Run this code. Then:

1. Change `firstName` and `hometown` to your own details.
2. Add a new variable called `favouriteFood` and log it.
3. Try changing `hometown` on a new line (e.g. `hometown = "Lagos";`). What happens? Why?

```js
const firstName = "Tunde";
const hometown = "Bolton";
let cupsOfTea = 1;

console.log(firstName);
console.log(hometown);
console.log(cupsOfTea);

cupsOfTea = cupsOfTea + 1;
console.log(cupsOfTea);
console.log(typeof cupsOfTea);
```

## A variable without a value

If you create a `let` variable but don't put anything in it, the box exists but is empty. JavaScript fills it with `undefined`:

```js
let favouriteColour;
console.log(favouriteColour); // undefined

favouriteColour = "green";
console.log(favouriteColour); // green
```

This is where `undefined` comes from most often. If you ever see `undefined` when you expected a real value, ask yourself: "Did I forget to put something in this box?"

## Check your understanding

1. What is the type of each value: `"hello"`, `12`, `"12"`, `false`?
2. What is the difference between `let` and `const`?
3. Which of these are valid variable names: `userAge`, `2ndName`, `total price`, `is_member`?
4. After running `let a = 5; a = a * 2;` what is in `a`?
5. What does `=` mean in JavaScript?

<details><summary>Show answers</summary>

1. string, number, string, boolean.
2. A `let` variable can be given a new value later. A `const` variable cannot be reassigned. JavaScript gives a `TypeError` if you try.
3. `userAge` and `is_member` are valid (though `isMember` follows our camelCase convention). `2ndName` starts with a number and `total price` has a space, so both are invalid.
4. `10`.
5. Assignment: "put the value on the right into the variable on the left". It does not mean "is equal to".

</details>

## Go deeper

- [javascript.info: Variables](https://javascript.info/variables)
- [javascript.info: Data types](https://javascript.info/types)
- [MDN: Storing the information you need — Variables](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables)
