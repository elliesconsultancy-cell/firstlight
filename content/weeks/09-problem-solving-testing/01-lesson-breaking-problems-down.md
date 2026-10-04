---
title: Breaking problems down
kind: lesson
minutes: 25
---
Have you ever looked at a coding task and thought, "I have no idea where to start"? Good news: experienced developers feel that too. The difference is that they have a method for getting started, and this lesson teaches you that method.

## Big problems are made of small problems

Think about cooking jollof rice for a family party. If you think of it as one giant job, it feels scary. But a cook does not think "make jollof rice". A cook thinks:

1. Wash the rice
2. Blend the tomatoes, peppers and onions
3. Fry the blended mix with oil and spices
4. Add stock and the rice
5. Cook on low heat until the rice is soft

Each step is small. Each step is something you already know how to do. That is **decomposition**: breaking one big problem into smaller **sub-problems**.

Programming works the same way. A computer cannot understand "make me a shopping app". But it can understand "add these two numbers" or "check if this text is empty". Your job is to keep breaking the problem down until every piece is something you know how to write in JavaScript.

> 🧠 **Remember:** If a step still feels too hard, break that step down again. Keep going until each step feels easy.

## A worked example: counting vowels

Here is a problem:

> Write a function `countVowels(text)` that returns how many vowels (a, e, i, o, u) are in a piece of text.

Before typing any code, ask yourself some questions:

- **What goes in?** A string, like `"banana"`.
- **What comes out?** A number, like `3`.
- **What do I need to do in between?** Look at each letter, decide if it is a vowel, and keep a count.

Now the sub-problems are clear:

1. Start a count at zero
2. Look at each letter, one at a time
3. Decide if the letter is a vowel
4. If it is, add one to the count
5. When all letters are checked, give back the count

Every one of these steps uses something from earlier weeks: variables, loops, conditionals and `return`.

## Pseudocode: a plan in plain words

**Pseudocode** is a plan for your code, written in normal language. It is not real JavaScript, so the computer cannot run it, and that is the point. You can focus on *what* to do without worrying about brackets and semicolons.

```text
function countVowels(text):
  set count to 0
  for each letter in text:
    if letter is one of a, e, i, o, u:
      add 1 to count
  return count
```

There are no strict rules for pseudocode. Use words that make sense to you. Some people write it as comments inside their file, so the plan sits right where the code will go.

Now we turn each line into JavaScript:

```js
function countVowels(text) {
  let count = 0;
  for (const letter of text) {
    if ("aeiou".includes(letter)) {
      count = count + 1;
    }
  }
  return count;
}

console.log(countVowels("banana")); // 3
console.log(countVowels("sky")); // 0
```

Notice how each line of pseudocode became one or two lines of code. The hard thinking was already done.

> 💡 **Tip:** Write your pseudocode as comments first, then write the code under each comment. Afterwards you can delete the comments or keep the useful ones.

## Spotting the questions you have not answered

Planning often shows you gaps. What about `countVowels("APPLE")`? Our code only checks lowercase letters, so it returns `0`, which is wrong. We did not think about capital letters!

This is normal. When you find a gap, update the plan:

```text
function countVowels(text):
  make text lowercase
  set count to 0
  ...
```

And the code:

```js
function countVowels(text) {
  const lowerText = text.toLowerCase();
  let count = 0;
  for (const letter of lowerText) {
    if ("aeiou".includes(letter)) {
      count = count + 1;
    }
  }
  return count;
}

console.log(countVowels("APPLE")); // 2
```

Finding these gaps *before* your users do is a big part of the job. In the next lesson we will learn a structured way to find them.

## When you are stuck

If you cannot see how to break a problem down, try these:

- **Do it by hand first.** Count the vowels in "banana" on paper. What did your brain do? Write those steps down.
- **Use a tiny example.** Instead of a whole paragraph, try `"ab"`.
- **Ask "what do I know how to do?"** You may not know how to solve the whole thing, but you probably know how to loop over a string. Start there.
- **Talk it through.** Explain the problem out loud to a friend, or to a rubber duck. Hearing yourself often shows you the next step.

> ⚠️ **Watch out:** Do not jump straight into coding with no plan. Five minutes of planning can save an hour of confused debugging.

### Try it

Here is a new problem:

> Write a function `getInitials(fullName)` that returns the first letter of each word, in capitals. For example, `getInitials("ada lovelace")` returns `"AL"`.

1. Write down what goes in and what comes out.
2. Write the steps as pseudocode (hint: `split(" ")` turns a string into an array of words).
3. Turn your pseudocode into code using this starter:

```js
function getInitials(fullName) {
  // 1. split the name into words
  // 2. for each word, take the first letter
  // 3. join the letters together and make them uppercase
}

console.log(getInitials("ada lovelace")); // "AL"
console.log(getInitials("grace brewster hopper")); // "GBH"
```

When it works, ask yourself: what happens if there are two spaces between the words? You do not have to fix it yet. Just notice it.

## Check your understanding

1. What is decomposition, in your own words?
2. Why can pseudocode not be run by the computer, and why is that useful?
3. Before writing code, what three questions should you ask about a function?
4. You are stuck on a problem. Name two things you could try.

<details><summary>Show answers</summary>

1. Breaking one big problem into smaller sub-problems, until each one is small enough to solve easily.
2. It is written in normal language, not JavaScript. That is useful because you can think about the steps without worrying about exact syntax.
3. What goes in (the inputs), what comes out (the output), and what needs to happen in between.
4. Any two of: solve it by hand first, use a tiny example, start with the part you already know, or explain it out loud.

</details>

## Go deeper

- [How to think like a programmer (freeCodeCamp)](https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/)
- [Functions (javascript.info)](https://javascript.info/function-basics)
- [String methods like split and toUpperCase (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
