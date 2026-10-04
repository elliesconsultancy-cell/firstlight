---
title: Operators, expressions and strings
kind: lesson
minutes: 35
---
Now that you can store values, it's time to *do* something with them. In this lesson you'll use JavaScript as a calculator, then learn how to build and change text, which is something nearly every website does.

## Expressions: things that become a value

An **expression** is any piece of code that JavaScript can work out to a single value. We say the expression **evaluates** to a value.

- `2 + 3` evaluates to `5`
- `"Hi " + "there"` evaluates to `"Hi there"`
- `price * 2` evaluates to whatever is in `price`, doubled

Think of an expression like a question, and the value like the answer. Whenever JavaScript sees an expression, it works out the answer first, and then uses the answer.

```js
const total = 4 + 6;   // JavaScript works out 4 + 6 first, then stores 10
console.log(total * 2); // works out total * 2 (which is 20), then logs it
```

## Arithmetic operators

**Operators** are symbols that do something with values. Here are the maths ones:

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `+` | add | `7 + 2` | `9` |
| `-` | subtract | `7 - 2` | `5` |
| `*` | multiply | `7 * 2` | `14` |
| `/` | divide | `7 / 2` | `3.5` |
| `%` | remainder | `7 % 2` | `1` |
| `**` | to the power of | `7 ** 2` | `49` |

The `%` operator (called **remainder** or **modulo**) is very useful. It gives what is *left over* after dividing. Imagine sharing 7 sweets between 2 people: each gets 3, and 1 is left over. So `7 % 2` is `1`.

### Order of operations

JavaScript follows the same rules as school maths: multiplication and division happen before addition and subtraction. Use brackets to be clear.

```js
console.log(2 + 3 * 4);   // 14, because 3 * 4 happens first
console.log((2 + 3) * 4); // 20, brackets go first
```

> 💡 **Tip:** If you're not sure which happens first, add brackets. It makes your code clearer for humans too.

### A real example

```js
const minutes = 135;
const hours = Math.floor(minutes / 60); // 2 (Math.floor rounds down)
const leftover = minutes % 60;          // 15
console.log(hours);
console.log(leftover);
```

`Math.floor` is a built-in tool that rounds a number **down** to the whole number below. `Math.round` rounds to the nearest whole number. You'll use both in this week's assignment.

> ⚠️ **Watch out:** Computers sometimes store decimals slightly inaccurately. Try `console.log(0.1 + 0.2)`. You get `0.30000000000000004`! For money, you can use `.toFixed(2)` to show 2 decimal places: `(0.1 + 0.2).toFixed(2)` gives `"0.30"` (note: as a string).

## Joining strings with +

When `+` is used with strings, it doesn't add, it **joins** (developers call this **concatenation**). Imagine joining train carriages together.

```js
const firstName = "Grace";
const lastName = "Hopper";
const fullName = firstName + " " + lastName;
console.log(fullName); // Grace Hopper
```

Notice the `" "` in the middle. Without it you'd get `GraceHopper`. Computers don't add spaces for you.

### When strings and numbers meet

If you use `+` with a string and a number, JavaScript turns the number into a string and joins them:

```js
console.log("5" + 3); // "53", not 8!
console.log(5 + 3);   // 8
```

This surprises a lot of beginners. If you have a number stored as text, like `"5"`, you can convert it with `Number("5")`.

## Template literals: a friendlier way

Joining lots of pieces with `+` gets messy. **Template literals** are a cleaner way to build strings. They use **backticks** `` ` `` instead of quotes. (On most UK keyboards the backtick is the key just left of `1`.)

Inside a template literal, you can drop in any expression using `${ }`:

```js
const name = "Femi";
const age = 31;

const message = `My name is ${name} and I am ${age} years old.`;
console.log(message);
```

Think of `${ }` as a little window in the text where JavaScript puts a value. You can even do maths in the window:

```js
const price = 4;
const quantity = 3;
console.log(`Total: £${price * quantity}`); // Total: £12
```

> 🧠 **Remember:** Template literals need **backticks** `` ` ``. With normal quotes, `${name}` is printed exactly as written, not replaced.

## String length

Every string has a `length`, which is the number of characters in it. Spaces and punctuation count too.

```js
const city = "London";
console.log(city.length); // 6

const greeting = "Hi there!";
console.log(greeting.length); // 9
```

## String methods

Strings come with built-in tools called **methods**. A method is like a button on a machine: you press it and it does a job. You use a method with a dot, the method name, and brackets: `text.method()`.

```js
const shout = "hello";
console.log(shout.toUpperCase()); // HELLO

const whisper = "QUIET PLEASE";
console.log(whisper.toLowerCase()); // quiet please

const messy = "   spaces everywhere   ";
console.log(messy.trim()); // "spaces everywhere"
```

### includes: is this inside?

`includes` checks whether one string appears inside another. It gives back a boolean.

```js
const email = "ada@example.com";
console.log(email.includes("@")); // true
console.log(email.includes(" ")); // false
```

### slice: cut out a piece

Every character in a string has a position number called an **index**. Counting starts at **0**, not 1.

```
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

> 💡 **Tip:** A common trick is to capitalise the first letter of a name: `name[0].toUpperCase() + name.slice(1).toLowerCase()`.

### Methods don't change the original

String methods give you back a **new** string. The original stays the same.

```js
const original = "hello";
const loud = original.toUpperCase();
console.log(original); // hello (unchanged)
console.log(loud);     // HELLO
```

### Try it

Run the code, then try these changes:

1. Change `rawName` to your own name, typed in a messy way (e.g. `"   tUNDE  "`).
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
2. What is logged by `console.log("2" + 2)`? Why?
3. Rewrite `"Hello, " + name + "!"` as a template literal.
4. What is `"Firstlight".slice(0, 5)`?
5. If `const s = "hi"`, what is `s.toUpperCase()`, and what is `s` afterwards?

<details><summary>Show answers</summary>

1. `1` (10 divided by 3 is 3, with 1 left over).
2. `"22"`. One side is a string, so `+` joins instead of adding.
3. `` `Hello, ${name}!` ``
4. `"First"` (characters at index 0, 1, 2, 3 and 4).
5. `s.toUpperCase()` gives `"HI"`, but `s` is still `"hi"`. Methods return a new string.

</details>

## Go deeper

- [javascript.info: Basic operators, maths](https://javascript.info/operators)
- [javascript.info: Strings](https://javascript.info/string)
- [MDN: Handling text — strings in JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings)
- [MDN: Useful string methods](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods)
