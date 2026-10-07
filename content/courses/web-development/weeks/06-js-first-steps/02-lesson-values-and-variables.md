---
title: Values and variables
kind: lesson
minutes: 30
---
Think about a shop shelf with jars. Each jar has a label: "sugar", "rice", "salt". You do not need to look inside every jar. You read the label and you know where to go.

A program keeps information in the same way. In this lesson you will learn two things. First, the kinds of information JavaScript understands. Second, how to keep that information in labelled boxes called variables.

## Values and types

A **value** is one piece of information. `"Tunde"` is a value. `42` is a value. `true` is a value.

Every value has a **type**. The type tells JavaScript what kind of thing the value is. It also tells JavaScript what you can do with it. You can add two numbers. You can make text upper case. You cannot make a number upper case.

Here are the five types you meet first.

| Type | What it is | Examples |
| --- | --- | --- |
| **string** | Text, inside quotes | `"hello"`, `'Bolton'`, `"123"` |
| **number** | Any number, whole or decimal | `7`, `-3`, `19.99` |
| **boolean** | Yes or no | `true`, `false` |
| **undefined** | "Nothing has been put here yet" | `undefined` |
| **null** | "Empty on purpose" | `null` |

> 🧠 **Remember:** `"123"` with quotes is a **string**, not a number. Quotes always mean text, even when the text looks like a number.

### Strings

A string is text. Use double quotes `"..."` or single quotes `'...'`. The start and the end must match.

```js
console.log("Good morning");
console.log('Good morning');
```

### Numbers

JavaScript uses one type for all numbers, whole or decimal.

```js
console.log(25);
console.log(3.5);
console.log(-10);
```

### Booleans

A boolean has only two possible values: `true` or `false`. Think of a light switch. It is on or off.

Booleans matter a lot next week, when the computer has to make decisions.

### undefined and null

Both mean "no value", in slightly different ways. Picture an empty box.

- `undefined` is a box that nobody has filled yet. JavaScript uses it for you.
- `null` is a box that someone left empty on purpose, with "empty" written on the lid.

You do not need to worry about the difference yet.

## Ask JavaScript for the type

The `typeof` operator tells you the type of a value. What do you think the last line prints?

```js
console.log(typeof "hello");   // "string"
console.log(typeof 42);        // "number"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof "42");      // "string" - quotes make it text!
```

> ⚠️ **Watch out:** `typeof null` gives `"object"`. This is an old mistake in JavaScript. It cannot be fixed, because fixing it would break old websites. Remember it as a strange exception.

## Variables: labelled boxes

A value on its own disappears when the line is finished. To keep it, we put it in a **variable**.

A variable is like a **box with a label**. You put a value inside. Later you use the label to find it.

```js
const name = "Amara";
console.log(name);
```

Let us read the first line slowly.

- `const` means "make a new box. This box will not get a new value."
- `name` is the label on the box.
- `=` means "put this value in the box". It does **not** mean "equals", as in maths. Read it as "gets".
- `"Amara"` is the value that goes in the box.

Now, wherever we write `name`, JavaScript opens the box and uses `"Amara"`.

The picture stops being true in one way. A real box holds the thing itself. A variable holds a copy of the value. For now, the box picture is enough.

## let and const

There are two main ways to make a variable.

```js
const city = "Manchester";
let score = 0;
```

- Use **`const`** when the value should **not** be replaced. Most of your variables will be `const`.
- Use **`let`** when the value **will** change later, such as a score in a game.

### Change a let variable

With `let`, you can put a new value in the box. This is called **reassigning**.

```js
let score = 0;
console.log(score); // 0

score = 10;
console.log(score); // 10

score = score + 5;
console.log(score); // 15
```

We write `let` only the **first** time. After that, the box exists. We use only its name.

The line `score = score + 5` looks odd if you think of `=` as maths. Read it from right to left. Take what is in `score` (10). Add 5. Put the result (15) back in `score`.

### What happens if you change a const?

```js
const birthYear = 1990;
birthYear = 1991; // TypeError: Assignment to constant variable.
```

JavaScript stops with an error. That is helpful. `const` protects you from changing something by accident.

> 💡 **Tip:** Start with `const`. Switch to `let` only when you find that the value must change.

You may see an older word, `var`, in examples online. It works differently in some tricky ways. In this course we use only `let` and `const`.

## Naming variables well

The computer does not care what you call a variable. People do. Good names make code easier to read.

### Rules

JavaScript gives an error if you break these.

- Names can have letters, numbers, `_` and `$`.
- A name cannot start with a number. `1stPlace` is not allowed.
- No spaces. `first name` is not allowed.
- Some words are reserved, such as `let`, `const` and `if`. You cannot use them as names.
- Names are case-sensitive. `age` and `Age` are two different boxes.

### Good habits

- Use **camelCase**. Start with a small letter, then give each new word a capital letter. For example: `firstName`, `totalPrice`, `isLoggedIn`.
- Choose names that describe what is inside. `priceInPounds` is better than `p` or `x`.
- Start boolean names with `is` or `has`, such as `isMember` or `hasPaid`.

```js
// Hard to understand
const x = 3;
const y = 2.5;

// Clear to read
const numberOfCoffees = 3;
const pricePerCoffee = 2.5;
```

### Try it

First, guess what this code prints. Then run it.

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

Now change it.

1. Change `firstName` and `hometown` to your own details.
2. Add a new variable called `favouriteFood` and log it.
3. Add a new line `hometown = "Lagos";`. What happens? Why?

## A variable with no value

Make a `let` variable but put nothing in it. The box exists but it is empty. JavaScript fills it with `undefined`.

```js
let favouriteColour;
console.log(favouriteColour); // undefined

favouriteColour = "green";
console.log(favouriteColour); // green
```

This is where `undefined` usually comes from. Do you see `undefined` when you expected a real value? Ask yourself: "Did I forget to put something in this box?"

## Check your understanding

1. What is the type of each value: `"hello"`, `12`, `"12"`, `false`?
2. What is the difference between `let` and `const`?
3. Which of these are valid variable names: `userAge`, `2ndName`, `total price`, `is_member`?
4. After `let a = 5; a = a * 2;`, what is in `a`?
5. What does `=` mean in JavaScript?

<details><summary>Show answers</summary>

1. string, number, string, boolean.
2. A `let` variable can get a new value later. A `const` variable cannot. JavaScript gives a `TypeError` if you try.
3. `userAge` and `is_member` are valid. (`isMember` would match our camelCase habit better.) `2ndName` starts with a number, and `total price` has a space. So both are invalid.
4. `10`.
5. It means assignment: "put the value on the right into the variable on the left". It does not mean "is equal to".

</details>

## Go deeper

- [javascript.info: Variables](https://javascript.info/variables)
- [javascript.info: Data types](https://javascript.info/types)
- [MDN: Storing the information you need — Variables](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can name the type of a value: string, number, boolean, `undefined` or `null`.
- Learners can create variables with `let` and `const` and choose between them.
- Learners can give a variable a clear camelCase name.

### Purpose
Variables are how every program remembers things. Clear names and the `const` habit make code easier to read and safer to change.

### Things to teach
1. **Types.** Use the types table and `typeof`. Stress that `"42"` with quotes is a string. Mention `typeof null` is `"object"` as a known oddity only.
2. **The box with a label.** Use `const name = "Amara"`. Read it aloud: `=` means "gets", not "equals".
3. **let and const.** Use the `score` example (0, then 10, then `score = score + 5`). Read it right to left. Then show the `birthYear` TypeError and say the error is helpful.
4. **Naming.** Compare `x` and `y` with `numberOfCoffees` and `pricePerCoffee`. Cover the rules (no leading number, no spaces, case-sensitive).
5. **undefined.** Show `let favouriteColour;` and ask "did I forget to put something in this box?"

### Check understanding
- Ask: "What is the type of `"12"`?" A good answer: string, because of the quotes.
- Ask: "After `let a = 5; a = a * 2;` what is in `a`?" A good answer: 10.
- Ask: "Which is a valid name: `2ndName`, `total price`, `userAge`?" A good answer: only `userAge`.

### Watch for
- Writing `let` again when changing a value. Say `let` is only for the first time.
- Reading `=` as "equals". Keep saying "gets" until it sticks.
