---
title: Operators, expressions and strings
kind: lesson
minutes: 35
---
Think about a pocket calculator. You press 4, then +, then 6. It shows 10. The calculator did not store your question. It worked out the answer.

JavaScript works in the same way. In this lesson you use it as a calculator. Then you learn to build and change text. Nearly every website does that: a greeting, a total, a title.

## Expressions: code that becomes a value

An **expression** is a piece of code that JavaScript can work out to one value. We say it **evaluates** to that value.

- `2 + 3` evaluates to `5`.
- `"Hi " + "there"` evaluates to `"Hi there"`.
- `price * 2` evaluates to the number in `price`, doubled.

Picture an expression as a question. The value is the answer. JavaScript always works out the answer first. Then it uses the answer.

```js
const total = 4 + 6;   // JavaScript works out 4 + 6 first, then stores 10
console.log(total * 2); // works out total * 2 (which is 20), then logs it
```

## Arithmetic operators

**Operators** are symbols that do something with values. These ones do maths.

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `+` | add | `7 + 2` | `9` |
| `-` | subtract | `7 - 2` | `5` |
| `*` | multiply | `7 * 2` | `14` |
| `/` | divide | `7 / 2` | `3.5` |
| `%` | remainder | `7 % 2` | `1` |
| `**` | to the power of | `7 ** 2` | `49` |

### The remainder operator

The `%` operator is called **remainder** (some people say **modulo**). It gives what is *left over* after dividing.

Share 7 sweets between 2 people. Each person gets 3. One sweet is left over. So `7 % 2` is `1`.

Try it in your head. What is `10 % 3`? The answer is at the end of the lesson.

### Order of operations

JavaScript follows school maths. Multiplication and division come before addition and subtraction. Brackets come first of all.

```js
console.log(2 + 3 * 4);   // 14, because 3 * 4 happens first
console.log((2 + 3) * 4); // 20, brackets go first
```

> 💡 **Tip:** Not sure what happens first? Add brackets. They also help the next person who reads your code.

### A real example

How many hours and minutes are in 135 minutes?

```js
const minutes = 135;
const hours = Math.floor(minutes / 60); // 2 (Math.floor rounds down)
const leftover = minutes % 60;          // 15
console.log(hours);
console.log(leftover);
```

`Math.floor` is a built-in tool. It rounds a number **down** to the whole number below. `Math.round` rounds to the nearest whole number. You use both in this week's assignment.

### Decimals can look strange

> ⚠️ **Watch out:** Computers sometimes store decimals a little inaccurately. Try `console.log(0.1 + 0.2)`. You get `0.30000000000000004`. For money, use `.toFixed(2)` to show 2 decimal places. `(0.1 + 0.2).toFixed(2)` gives `"0.30"`. Notice it is a string.

## Join strings with +

With strings, `+` does not add. It **joins** them. Developers call this **concatenation**. Picture joining train carriages.

```js
const firstName = "Grace";
const lastName = "Hopper";
const fullName = firstName + " " + lastName;
console.log(fullName); // Grace Hopper
```

Look at the `" "` in the middle. Without it, you get `GraceHopper`. The computer does not add spaces for you.

### When a string meets a number

Use `+` with a string and a number. JavaScript turns the number into a string and joins them.

What do you think the first line prints?

```js
console.log("5" + 3); // "53", not 8!
console.log(5 + 3);   // 8
```

Many beginners are surprised by this. Do you have a number stored as text, like `"5"`? You can change it with `Number("5")`.

## Template literals: a tidier way

Joining many pieces with `+` gets messy. **Template literals** are tidier. They use **backticks** `` ` `` instead of quotes. On many keyboards, the backtick key is next to the `1` key or below `Esc`.

Inside a template literal, use `${ }` to drop in a value.

```js
const name = "Femi";
const age = 31;

const message = `My name is ${name} and I am ${age} years old.`;
console.log(message);
```

Think of `${ }` as a small window in the text. JavaScript puts a value in the window. You can even do maths in it.

```js
const price = 4;
const quantity = 3;
console.log(`Total: £${price * quantity}`); // Total: £12
```

> 🧠 **Remember:** Template literals need **backticks** `` ` ``. With normal quotes, `${name}` prints exactly as written. It is not replaced.

## String length

Every string has a `length`. It is the number of characters. Spaces and punctuation count too.

```js
const city = "London";
console.log(city.length); // 6

const greeting = "Hi there!";
console.log(greeting.length); // 9
```

## String methods

Strings come with built-in tools called **methods**. A method is like a button on a machine. You press it and it does one job.

To use a method, write a dot, the method name and brackets: `text.method()`.

```js
const shout = "hello";
console.log(shout.toUpperCase()); // HELLO

const whisper = "QUIET PLEASE";
console.log(whisper.toLowerCase()); // quiet please

const messy = "   spaces everywhere   ";
console.log(messy.trim()); // "spaces everywhere"
```

`trim()` removes spaces from the start and the end.

### includes: is it inside?

`includes` checks if one string appears inside another. It gives back a boolean.

```js
const email = "ada@example.com";
console.log(email.includes("@")); // true
console.log(email.includes(" ")); // false
```

### slice: cut out a piece

Each character in a string has a position number. It is called an **index**. Counting starts at **0**, not 1.

```text
 J   a   v   a   S   c   r   i   p   t
 0   1   2   3   4   5   6   7   8   9
```

`slice(start, end)` cuts out the characters from `start` up to, but **not including**, `end`.

```js
const word = "JavaScript";
console.log(word.slice(0, 4)); // "Java"
console.log(word.slice(4));    // "Script" (no end means "to the end")
console.log(word[0]);          // "J" (square brackets get one character)
```

> 💡 **Tip:** Here is a trick to make the first letter a capital: `name[0].toUpperCase() + name.slice(1).toLowerCase()`.

### Methods do not change the original

A string method gives back a **new** string. The original stays the same.

```js
const original = "hello";
const loud = original.toUpperCase();
console.log(original); // hello (unchanged)
console.log(loud);     // HELLO
```

### Try it

Run the code. Then make these changes.

1. Change `rawName` to your own name, typed messily. For example: `"   tUNDE  "`.
2. Log how many characters are in your cleaned name.
3. Log whether your name includes the letter `"a"`.

```js
const rawName = "   aMaRa   ";
const cleaned = rawName.trim();
const niceName = cleaned[0].toUpperCase() + cleaned.slice(1).toLowerCase();

console.log(`Before: "${rawName}"`);
console.log(`After: "${niceName}"`);
console.log(`Length: ${niceName.length}`);
console.log(`Starts with A? ${niceName.startsWith("A")}`);
```

## Check your understanding

1. What does `10 % 3` evaluate to?
2. What does `console.log("2" + 2)` print? Why?
3. Rewrite `"Hello, " + name + "!"` as a template literal.
4. What is `"Firstlight".slice(0, 5)`?
5. If `const s = "hi"`, what is `s.toUpperCase()`? What is `s` afterwards?

<details><summary>Show answers</summary>

1. `1`. 10 divided by 3 is 3, with 1 left over.
2. `"22"`. One side is a string, so `+` joins instead of adding.
3. `` `Hello, ${name}!` ``
4. `"First"`. These are the characters at index 0, 1, 2, 3 and 4.
5. `s.toUpperCase()` gives `"HI"`, but `s` is still `"hi"`. Methods return a new string.

</details>

## Go deeper

- [javascript.info: Basic operators, maths](https://javascript.info/operators)
- [javascript.info: Strings](https://javascript.info/string)
- [MDN: Handling text — strings in JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings)
- [MDN: Useful string methods](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods)
