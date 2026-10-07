---
title: Breaking problems down
kind: lesson
minutes: 25
---
Imagine your family asks you to cook jollof rice for a big party. If you think "make jollof rice for 50 people", it feels scary. So a good cook does not think like that.

A good cook thinks in small steps. Programmers do the same. In this lesson you learn how to start when a task feels too big.

Many beginners think, "I have no idea where to start." Experienced developers feel that too. The difference is that they have a method.

## Big problems are made of small steps

Here is how a cook thinks about the jollof rice:

1. Wash the rice.
2. Blend the tomatoes, peppers and onions.
3. Fry the blended mix with oil and spices.
4. Add stock and the rice.
5. Cook on low heat until the rice is soft.

Each step is small. You already know how to do each one.

Breaking one big problem into smaller ones is called **decomposition**. The small pieces are called **sub-problems**.

A computer cannot understand "make me a shopping app". It can understand "add these two numbers" or "check if this text is empty". So we keep breaking the problem down until every piece is something we know how to write.

> 🧠 **Remember:** If a step still feels too hard, break that step down again. Keep going until each step is small and clear.

## A worked example: counting vowels

Here is our problem:

> Write a function `countVowels(text)` that returns how many vowels (a, e, i, o, u) are in a piece of text.

Before we type any code, we ask three questions:

- **What goes in?** A string, like `"banana"`.
- **What comes out?** A number, like `3`.
- **What happens in between?** We look at each letter, decide if it is a vowel, and keep a count.

Now the sub-problems are clear:

1. Start a count at zero.
2. Look at each letter, one at a time.
3. Decide if the letter is a vowel.
4. If it is, add one to the count.
5. When all letters are checked, give back the count.

Every step uses something from earlier weeks: variables, loops, conditionals and `return`.

## Pseudocode: a plan in plain words

**Pseudocode** is a plan for your code, written in normal language. It is not real JavaScript, so the computer cannot run it. That is useful. You think about *what* to do and forget about brackets and semicolons.

```text
function countVowels(text):
  set count to 0
  for each letter in text:
    if letter is one of a, e, i, o, u:
      add 1 to count
  return count
```

There are no strict rules for pseudocode. Use words that make sense to you.

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

Look at how each line of pseudocode became one or two lines of code. The hard thinking was already done.

> 💡 **Tip:** Write your pseudocode as comments first. Then write the code under each comment. Later you can delete the comments or keep the useful ones.

### Try it

What do you think `countVowels("queue")` prints? Think first, then read on.

It prints `4`. The letters u, e, u and e are vowels. Only the q is not.

## Finding the gaps in your plan

Planning often shows you things you forgot. What does `countVowels("APPLE")` return?

Our code only checks lowercase letters. "APPLE" is all capitals, so it returns `0`. That is wrong. We forgot about capital letters.

This is normal. When you find a gap, you update the plan:

```text
function countVowels(text):
  make text lowercase
  set count to 0
  ...
```

Then you update the code:

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

It is much better to find these gaps *before* your users do. In the next lesson we learn a clear way to find them.

## When you are stuck

Try these four things:

- **Do it by hand first.** Count the vowels in "banana" on paper. What did your brain do? Write those steps down.
- **Use a tiny example.** Try `"ab"` instead of a whole paragraph.
- **Ask "what do I already know how to do?"** You may not know the whole answer. But you know how to loop over a string. Start there.
- **Talk it through.** Explain the problem out loud to a friend, or to a rubber duck. Hearing yourself often shows the next step.

> ⚠️ **Watch out:** Do not start coding with no plan. Five minutes of planning can save an hour of confused debugging.

## Try it: your turn

Here is a new problem:

> Write a function `getInitials(fullName)` that returns the first letter of each word, in capitals. For example, `getInitials("ada lovelace")` returns `"AL"`.

1. Write down what goes in and what comes out.
2. Write the steps as pseudocode. Hint: `split(" ")` turns a string into an array of words.
3. Turn your pseudocode into code. Use this starter:

```js
function getInitials(fullName) {
  // 1. split the name into words
  // 2. for each word, take the first letter
  // 3. join the letters together and make them uppercase
}

console.log(getInitials("ada lovelace")); // "AL"
console.log(getInitials("grace brewster hopper")); // "GBH"
```

When it works, ask yourself: what happens if there are two spaces between the words? You do not need to fix it now. Only notice it.

## Check your understanding

1. What is decomposition, in your own words?
2. Why can the computer not run pseudocode, and why is that useful?
3. Before you write code, what three questions should you ask about a function?
4. You are stuck on a problem. Name two things you could try.

<details><summary>Show answers</summary>

1. Breaking one big problem into smaller sub-problems, until each one is small enough to solve.
2. It is written in normal language, not JavaScript. That is useful because you can think about the steps without worrying about exact syntax.
3. What goes in (the inputs), what comes out (the output), and what needs to happen in between.
4. Any two of: solve it by hand first, use a tiny example, start with the part you already know, or explain it out loud.

</details>

## Go deeper

- [How to think like a programmer (freeCodeCamp)](https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/)
- [Functions (javascript.info)](https://javascript.info/function-basics)
- [String methods like split and toUpperCase (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can explain decomposition and name the three questions to ask before coding.
- Learners can write pseudocode for a small function and turn it into JavaScript.
- Learners can spot a gap in a plan, such as capital letters.

### Purpose
Beginners often freeze when a task feels too big. A method for starting is the most useful habit they can build. It is how real developers begin every task.

### Things to teach
1. **Decomposition.** Use the jollof rice example. Split the job into small steps, then split any hard step again.
2. **The three questions.** What goes in, what comes out, what happens in between. Ask them for `countVowels("banana")`.
3. **Pseudocode first.** Write the `countVowels` plan in plain words. Show how each pseudocode line becomes one or two lines of JavaScript.
4. **Finding gaps.** Run `countVowels("APPLE")`. It returns 0 because of capitals. Show how the plan is updated with `toLowerCase()`.
5. **When stuck.** Do a tiny example by hand. Talk it through out loud.

### Check understanding
- Ask: "What goes in and what comes out of `getInitials`?" A good answer: a full name string goes in, and a string of capital letters like `"AL"` comes out.
- Ask: "Why write pseudocode before code?" A good answer: you can think about the steps without worrying about syntax.
- Ask: "You are stuck. What do you try first?" A good answer: do it by hand with a tiny example and write down your steps.

### Watch for
- Learners who skip the plan and start typing. Ask them to say the steps out loud first.
- Learners who write pseudocode that is really JavaScript. That is fine, but check they can say it in plain words.
