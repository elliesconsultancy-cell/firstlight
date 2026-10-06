---
title: Making decisions with if and else
kind: lesson
minutes: 35
---
Every day you make small decisions. "If it is raining, I take an umbrella. Otherwise, I wear sunglasses." You look at a condition and choose what to do.

In this lesson you teach your programs to choose in the same way. This is how a website decides to show "Welcome back" or "Please log in".

## Booleans: the answer to a yes or no question

You met **booleans** last week. They have only two values: `true` and `false`.

Every decision in a program is a yes or no question. The answer is a boolean. We get booleans by **comparing** values.

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

### === and ==

You may see `==` (two equals signs) in other code. It also compares. But it first tries to **convert** the types. That gives surprising results.

```js
console.log(5 == "5");  // true  (the string "5" was converted to a number)
console.log(5 === "5"); // false (different types: number vs string)
console.log(0 == "");   // true  (very surprising!)
console.log(0 === "");  // false
```

`===` is called **strict equality**. It checks that the value **and** the type are the same. It is predictable. That is what we want.

> 🧠 **Remember:** Always use `===` and `!==`. One `=` puts a value in a box. Three `===` ask "are these the same?".

## if: do something only when a condition is true

```js
const temperature = 28;

if (temperature > 25) {
  console.log("It's hot! Drink some water.");
}

console.log("Have a nice day.");
```

The condition goes inside `( )`. If it is `true`, the code inside `{ }` runs. If it is `false`, JavaScript skips the block and carries on after it.

"Have a nice day." is logged either way. What do you think happens if `temperature` is `20`?

## else: otherwise

```js
const hasTicket = false;

if (hasTicket) {
  console.log("Welcome to the concert!");
} else {
  console.log("Sorry, you need a ticket.");
}
```

Exactly **one** of the two blocks runs. Never both. Never neither. It is a fork in the road.

## else if: more than two choices

Sometimes there are several choices. Chain them with `else if`.

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

JavaScript checks each condition **from top to bottom**. It runs the **first** block whose condition is true. Then it skips the rest.

Picture a line of guards at a gate. The first guard who says "yes" lets you in. The other guards are never asked.

> ⚠️ **Watch out:** Order matters. Imagine you check `hour < 18` before `hour < 12`. Then `hour = 9` says "Good afternoon", because 9 is less than 18. Put the most specific check first.

## Decisions inside functions

Functions and `if` work well together. A function can `return` different values for different inputs.

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

`return` ends the function. So you will often see the `else` left out. This does the same job.

```js
function isEven(number) {
  if (number % 2 === 0) {
    return true;
  }
  return false;
}
```

Here is an even shorter way. The comparison already *is* a boolean. So you can return it directly: `return number % 2 === 0;`

## Logical operators: join conditions

Sometimes one question is not enough. **Logical operators** join conditions together.

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

`!isRaining` reads as "not raining". `!true` is `false`. `!false` is `true`.

### The AND and OR table

| A | B | A && B | A \|\| B |
| --- | --- | --- | --- |
| true | true | true | true |
| true | false | false | true |
| false | true | false | true |
| false | false | false | false |

> 💡 **Tip:** To check that a number is in a range, write `score >= 0 && score <= 100`. You cannot write `0 <= score <= 100` in JavaScript. It does not do what you expect.

## Truthy and falsy (a quick note)

The condition in an `if` does not have to be a real boolean. JavaScript treats some values as "false-ish". We call them **falsy**. They are `false`, `0`, `""` (an empty string), `null`, `undefined` and `NaN`. Every other value is **truthy**.

```js
const userName = "";

if (userName) {
  console.log(`Hi ${userName}`);
} else {
  console.log("Please enter your name.");
}
```

This logs "Please enter your name." An empty string is falsy.

### Try it

Complete the function `getWeatherAdvice(temperature, isRaining)`. It must **return**:

- `"Take an umbrella"` if it is raining, at any temperature
- `"Wear a coat"` if it is not raining and the temperature is below 10
- `"Wear a t-shirt"` if it is not raining and the temperature is 20 or above
- `"Bring a light jacket"` in all other cases

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

1. What is the result of `10 === "10"`? Why?
2. In an `if / else if / else` chain, how many blocks can run?
3. What does `true && false` evaluate to? What about `true || false`?
4. Write a condition that is true when `age` is between 13 and 19, including both.
5. Is `0` truthy or falsy? What about `"0"`?

<details><summary>Show answers</summary>

1. `false`. One is a number and the other is a string. `===` checks both value and type.
2. Exactly one. It is the first block whose condition is true, or the `else` block if none are.
3. `false`, and `true`.
4. `age >= 13 && age <= 19`
5. `0` is falsy. `"0"` is a text that is not empty, so it is truthy.

</details>

## Go deeper

- [javascript.info: Conditional branching, if](https://javascript.info/ifelse)
- [javascript.info: Logical operators](https://javascript.info/logical-operators)
- [MDN: Making decisions in your code — conditionals](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals)
- [MDN: Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
