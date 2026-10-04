---
title: Making decisions with if and else
kind: lesson
minutes: 35
---
Every day you make decisions based on conditions: "If it's raining, take an umbrella. Otherwise, wear sunglasses." In this lesson you'll teach your programs to make choices in the same way.

## Booleans: the answer to a yes/no question

Remember **booleans** from last week? They have only two values: `true` and `false`. Every decision in a program comes down to a yes/no question, and the answer is a boolean.

We get booleans by **comparing** values.

## Comparison operators

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `===` | is equal to | `5 === 5` | `true` |
| `!==` | is not equal to | `5 !== 3` | `true` |
| `>` | greater than | `10 > 3` | `true` |
| `<` | less than | `10 < 3` | `false` |
| `>=` | greater than or equal to | `18 >= 18` | `true` |
| `<=` | less than or equal to | `17 <= 16` | `false` |

```js
const age = 20;
console.log(age >= 18);         // true
console.log(age === 21);        // false
console.log("cat" === "cat");   // true
console.log("Cat" === "cat");   // false (capital letters matter)
```

### === versus ==

You might see `==` (two equals signs) in other code. It also compares, but it tries to **convert** the types first, which gives surprising results:

```js
console.log(5 == "5");  // true  (the string "5" was converted to a number)
console.log(5 === "5"); // false (different types: number vs string)
console.log(0 == "");   // true  (very surprising!)
console.log(0 === "");  // false
```

`===` is called **strict equality**. It checks that the value **and** the type are the same. It's predictable, and that's what we want.

> 🧠 **Remember:** Always use `===` and `!==`. And remember: one `=` puts a value in a box; three `===` asks "are these the same?".

## if: do something only when a condition is true

```js
const temperature = 28;

if (temperature > 25) {
  console.log("It's hot! Drink some water.");
}

console.log("Have a nice day.");
```

The condition goes inside `( )`. If it's `true`, the code inside `{ }` runs. If it's `false`, JavaScript skips the block and carries on after it. "Have a nice day." is logged either way.

## else: otherwise...

```js
const hasTicket = false;

if (hasTicket) {
  console.log("Welcome to the concert!");
} else {
  console.log("Sorry, you need a ticket.");
}
```

Exactly **one** of the two blocks runs. Never both, never neither. It's like a fork in the road.

## else if: more than two options

When there are several possibilities, chain them with `else if`:

```js
const hour = 15;

if (hour < 12) {
  console.log("Good morning");
} else if (hour < 18) {
  console.log("Good afternoon");
} else {
  console.log("Good evening");
}
```

JavaScript checks each condition **from top to bottom** and runs the **first** block whose condition is true. Then it skips all the rest. Think of a queue of bouncers: the first one who says "yes" lets you in, and the others never get asked.

> ⚠️ **Watch out:** Order matters! If you check `hour < 18` first, then `hour = 9` would say "Good afternoon", because 9 is less than 18. Put the most specific checks first.

## Decisions inside functions

Functions and `if` work brilliantly together. A function can `return` different values depending on its input:

```js
function getTicketPrice(age) {
  if (age < 5) {
    return 0;
  } else if (age < 16) {
    return 6;
  } else if (age >= 65) {
    return 8;
  } else {
    return 12;
  }
}

console.log(getTicketPrice(3));  // 0
console.log(getTicketPrice(10)); // 6
console.log(getTicketPrice(30)); // 12
console.log(getTicketPrice(70)); // 8
```

Because `return` ends the function, you'll sometimes see the `else` left out. This does the same thing:

```js
function isEven(number) {
  if (number % 2 === 0) {
    return true;
  }
  return false;
}
```

Even shorter: the comparison already *is* a boolean, so you can return it directly: `return number % 2 === 0;`

## Logical operators: combining conditions

Sometimes one question isn't enough. You can combine conditions with **logical operators**.

### && (AND): both must be true

"You can drive if you are 17 or older **and** you have a licence."

```js
const age = 19;
const hasLicence = true;

if (age >= 17 && hasLicence) {
  console.log("You can drive.");
}
```

### || (OR): at least one must be true

"You get free entry if you are a student **or** a member."

```js
const isStudent = false;
const isMember = true;

if (isStudent || isMember) {
  console.log("Free entry!");
}
```

### ! (NOT): flips true and false

```js
const isRaining = false;

if (!isRaining) {
  console.log("Let's go for a walk.");
}
```

`!isRaining` reads as "not raining". `!true` is `false`, and `!false` is `true`.

| A | B | A && B | A \|\| B |
| --- | --- | --- | --- |
| true | true | true | true |
| true | false | false | true |
| false | true | false | true |
| false | false | false | false |

> 💡 **Tip:** A common pattern is checking a number is inside a range: `score >= 0 && score <= 100`. You can't write `0 <= score <= 100` in JavaScript; it doesn't do what you'd expect.

## Truthy and falsy (a quick note)

The condition in an `if` doesn't have to be a real boolean. JavaScript treats some values as "false-ish" (**falsy**): `false`, `0`, `""` (empty string), `null`, `undefined` and `NaN`. Everything else is **truthy**.

```js
const userName = "";

if (userName) {
  console.log(`Hi ${userName}`);
} else {
  console.log("Please enter your name.");
}
```

This logs "Please enter your name." because an empty string is falsy.

### Try it

Complete the function `getWeatherAdvice(temperature, isRaining)` so that it **returns**:

- `"Take an umbrella"` if it is raining (whatever the temperature)
- `"Wear a coat"` if it's not raining and below 10
- `"Wear a t-shirt"` if it's not raining and 20 or above
- `"Bring a light jacket"` otherwise

```js
function getWeatherAdvice(temperature, isRaining) {
  // your code here
}

console.log(getWeatherAdvice(5, true));   // Take an umbrella
console.log(getWeatherAdvice(5, false));  // Wear a coat
console.log(getWeatherAdvice(25, false)); // Wear a t-shirt
console.log(getWeatherAdvice(15, false)); // Bring a light jacket
```

## Check your understanding

1. What is the result of `10 === "10"`, and why?
2. In an `if / else if / else` chain, how many blocks can run?
3. What does `true && false` evaluate to? What about `true || false`?
4. Write a condition that is true when `age` is between 13 and 19 (including both).
5. Is `0` truthy or falsy? What about `"0"`?

<details><summary>Show answers</summary>

1. `false`. One is a number and the other is a string, and `===` checks both value and type.
2. Exactly one (the first whose condition is true, or the `else` if none are).
3. `false`, and `true`.
4. `age >= 13 && age <= 19`
5. `0` is falsy. `"0"` is a non-empty string, so it is truthy.

</details>

## Go deeper

- [javascript.info: Conditional branching, if](https://javascript.info/ifelse)
- [javascript.info: Logical operators](https://javascript.info/logical-operators)
- [MDN: Making decisions in your code — conditionals](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals)
- [MDN: Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
