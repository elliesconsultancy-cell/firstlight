---
title: More Jest, and refactoring safely
kind: lesson
minutes: 35
---
Once you have tests, something wonderful happens: you can change your code without being scared of breaking it. In this lesson you will learn a few more Jest tools, then use them to clean up messy code with confidence.

## Grouping tests with describe

When a function has many tests, you can group them with `describe`. It is like putting files into a labelled folder.

```js
const getGrade = require("./getGrade");

describe("getGrade", () => {
  test("returns A for 70 and above", () => {
    expect(getGrade(85)).toBe("A");
  });

  test("returns A for exactly 70 (edge case)", () => {
    expect(getGrade(70)).toBe("A");
  });

  test("returns B for 60 to 69", () => {
    expect(getGrade(65)).toBe("B");
  });

  test("returns F below 60", () => {
    expect(getGrade(12)).toBe("F");
  });
});
```

Jest prints the group name above its tests, which makes long reports much easier to read.

## A few useful matchers

`toBe` is called a **matcher**. Jest has many. Here are the ones you will use most:

| Matcher | Use it when... | Example |
| ------- | -------------- | ------- |
| `toBe` | comparing numbers, strings, booleans | `expect(sum(2, 2)).toBe(4)` |
| `toEqual` | comparing arrays or objects | `expect(getNames()).toEqual(["Ama", "Bo"])` |
| `toThrow` | the function should throw an error | `expect(() => divide(1, 0)).toThrow()` |

Why do arrays need `toEqual`? Because two arrays with the same items are still two *different* boxes in memory. `toBe` asks "is it the very same box?". `toEqual` asks "does it contain the same things?".

```js
test("doubles every number", () => {
  expect(doubleAll([1, 2, 3])).toEqual([2, 4, 6]);
});
```

For `toThrow`, notice the extra arrow function: `() => divide(1, 0)`. We hand Jest a function *to call later*, so Jest can catch the error safely. If we called `divide(1, 0)` directly, the error would crash the test before Jest could check it.

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

test("throws when dividing by zero", () => {
  expect(() => divide(1, 0)).toThrow("Cannot divide by zero");
});
```

> 💡 **Tip:** You can make Jest re-run your tests automatically every time you save a file. Run `npx jest --watch` (or `npm test -- --watchAll`). Press `q` to stop it.

## What is refactoring?

**Refactoring** means changing *how* code is written without changing *what* it does. Same inputs, same outputs, but tidier, shorter, or easier to read.

Think of rearranging your kitchen. You move the pots and label the jars. The kitchen still makes the same food, but now it is easier to cook in. Refactoring is tidying the kitchen.

The danger is obvious: while tidying, you might knock something off the shelf. That is where tests help. Your tests are a **safety net**. Make a change, run the tests. Still green? Great, keep going. Red? Undo the last change and think again.

## Refactoring in practice

Here is a working function that gives a shipping price. It passes all its tests, but it is long and repetitive:

```js
function getShippingCost(country, weightKg) {
  if (country === "UK") {
    if (weightKg <= 2) {
      return 3;
    } else {
      return 3 + (weightKg - 2) * 1;
    }
  } else {
    if (weightKg <= 2) {
      return 10;
    } else {
      return 10 + (weightKg - 2) * 1;
    }
  }
}

module.exports = getShippingCost;
```

And its tests:

```js
const getShippingCost = require("./getShippingCost");

describe("getShippingCost", () => {
  test("UK parcel up to 2kg costs 3", () => {
    expect(getShippingCost("UK", 1)).toBe(3);
    expect(getShippingCost("UK", 2)).toBe(3);
  });

  test("UK parcel over 2kg adds 1 per extra kg", () => {
    expect(getShippingCost("UK", 5)).toBe(6);
  });

  test("international parcel up to 2kg costs 10", () => {
    expect(getShippingCost("France", 2)).toBe(10);
  });

  test("international parcel over 2kg adds 1 per extra kg", () => {
    expect(getShippingCost("Ghana", 4)).toBe(12);
  });
});
```

Look for repetition. The only real difference between the two halves is the starting price: 3 or 10. Let's refactor in **small steps**, running `npm test` after each one.

**Step 1:** pull out the starting price.

```js
function getShippingCost(country, weightKg) {
  const basePrice = country === "UK" ? 3 : 10;
  if (weightKg <= 2) {
    return basePrice;
  } else {
    return basePrice + (weightKg - 2) * 1;
  }
}
```

Run the tests. Green! We removed half the code and nothing broke.

**Step 2:** the extra weight is never below zero, so we can use `Math.max`.

```js
function getShippingCost(country, weightKg) {
  const basePrice = country === "UK" ? 3 : 10;
  const extraKg = Math.max(0, weightKg - 2);
  return basePrice + extraKg;
}
```

Run the tests again. Still green. The function is now three short lines, and the names `basePrice` and `extraKg` explain what is happening.

> ⚠️ **Watch out:** Refactor *or* add new features, never both at once. If you change behaviour while tidying and a test goes red, you will not know which change caused it.

> 🧠 **Remember:** Tests only protect what they check. If no test covers a case, refactoring could break it silently. Before a big refactor, ask: "Are my tests good enough?"

### Try it

This function works, but it is repetitive. Copy it into a project with the tests below. Make sure the tests pass, then refactor it in small steps, running `npm test` after each change.

```js
function getDayType(day) {
  if (day === "Saturday") {
    return "weekend";
  } else if (day === "Sunday") {
    return "weekend";
  } else if (day === "Monday") {
    return "weekday";
  } else if (day === "Tuesday") {
    return "weekday";
  } else if (day === "Wednesday") {
    return "weekday";
  } else if (day === "Thursday") {
    return "weekday";
  } else {
    return "weekday";
  }
}

module.exports = getDayType;
```

```js
const getDayType = require("./getDayType");

test("Saturday and Sunday are weekend days", () => {
  expect(getDayType("Saturday")).toBe("weekend");
  expect(getDayType("Sunday")).toBe("weekend");
});

test("Monday to Friday are weekdays", () => {
  expect(getDayType("Monday")).toBe("weekday");
  expect(getDayType("Friday")).toBe("weekday");
});
```

Hint: could an array like `["Saturday", "Sunday"]` and the `includes` method help?

## Check your understanding

1. When should you use `toEqual` instead of `toBe`?
2. Why does `toThrow` need an arrow function around the call?
3. What is refactoring? Does it change what the code does?
4. Why should you run your tests after every small refactoring step, not just at the end?

<details><summary>Show answers</summary>

1. When comparing arrays or objects. `toEqual` checks that the contents are the same, while `toBe` checks that it is the exact same thing in memory.
2. So that Jest can call the function itself and catch the error. Without it, the error would happen before Jest gets a chance to check it.
3. Changing how code is written (structure, names, length) without changing its behaviour. The same inputs must still give the same outputs.
4. If a test goes red, you know exactly which small change broke it, so it is easy to undo or fix.

</details>

## Go deeper

- [Using matchers (Jest docs)](https://jestjs.io/docs/using-matchers)
- [Expect reference (Jest docs)](https://jestjs.io/docs/expect)
- [Throwing errors with throw (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)
