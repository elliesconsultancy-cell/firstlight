---
title: Temperature and cost
kind: lesson
minutes: 20
---
Picture an ice-cream shop. Most days, you order vanilla. It is safe and you know you will like it. One day you feel adventurous, and you try "mango and chilli". It might be wonderful. It might be strange.

A language model faces this choice for every word it writes. This lesson has two parts: how adventurous the model is (**temperature**), and what all this costs.

## Part 1: Temperature

Remember that the model gives each possible next word a chance. After "I like to eat", the word "pizza" may have a high chance, "rice" a medium chance, and "stones" a tiny chance.

**Temperature** is a setting that controls how the model picks from those chances.

- **Low temperature:** it nearly always picks the most likely word. Vanilla every time. The answers are steady and similar.
- **High temperature:** it is more willing to pick less likely words. Surprising flavours. The answers vary more, and can be more creative or more strange.

| Setting | Feels like | Good for |
| --- | --- | --- |
| Low | Careful, repeatable | Facts, sorting messages, answering from a price list |
| High | Creative, varied | Naming ideas, stories, brainstorming |

> 🧠 **Remember:** Temperature is how adventurous the next-word guess is. Low is vanilla. High tries surprising flavours.

In Anthropic's API, temperature is a number you can send with your request, and the documentation explains the allowed range and the default. Other providers have a similar setting. Check the docs of the model you use, because details can change.

### A toy example

This is a very simplified model of the idea. It has a made-up list of words with chances. It picks one word, and the temperature decides how much the top word dominates. This is **not** how a real model is built. It only helps you see the effect.

```js
const choices = [
  { word: "bread", weight: 0.6 },
  { word: "cake", weight: 0.3 },
  { word: "tyres", weight: 0.1 },
];

function pick(temperature) {
  // Low temperature makes big weights bigger. High makes them more equal.
  const adjusted = choices.map((c) => Math.pow(c.weight, 1 / temperature));
  const total = adjusted.reduce((sum, w) => sum + w, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < choices.length; i++) {
    roll -= adjusted[i];
    if (roll <= 0) return choices[i].word;
  }
  return choices[choices.length - 1].word;
}

for (const t of [0.2, 1, 3]) {
  const results = [];
  for (let i = 0; i < 8; i++) results.push(pick(t));
  console.log("Temperature", t, "->", results.join(", "));
}
```

Run it a few times. At `0.2` you will see almost only "bread". At `3` you will see more "cake" and even "tyres".

### Which setting for BakeBuddy?

- Answering "When do you close?" needs facts. Choose **low**.
- Writing ten fun names for a new cake can use **higher**.

Even at the lowest setting, you may not get exactly the same words every time. Do not build anything that depends on identical replies.

## Part 2: Why AI costs money

Running a model needs powerful computers, and they cost money to run. So providers usually charge by usage, counted in tokens (Lesson 1).

The bill usually has two parts:

- **Input tokens:** what you send.
- **Output tokens:** what the model writes. These are usually priced higher per token than input.

Prices differ by model and change over time. **Always check the provider's pricing page.** In this course we never rely on a fixed price. Below, the prices are made-up example numbers.

### A small cost calculator

```js
// Made-up example prices, in dollars per 1 million tokens.
// Replace them with the real numbers from the pricing page.
const PRICE_INPUT_PER_MILLION = 1;
const PRICE_OUTPUT_PER_MILLION = 5;

function estimateCost(inputTokens, outputTokens) {
  const input = (inputTokens / 1_000_000) * PRICE_INPUT_PER_MILLION;
  const output = (outputTokens / 1_000_000) * PRICE_OUTPUT_PER_MILLION;
  return input + output;
}

// One chat message: 400 tokens in, 150 tokens out
const one = estimateCost(400, 150);
console.log("One message costs about $" + one.toFixed(5));
console.log("1000 messages cost about $" + (one * 1000).toFixed(2));
```

### What makes a request more expensive?

1. A long instruction or many documents (more input).
2. A long chat history, because it is resent each time.
3. A long answer (more output).
4. A bigger, more powerful model.

> ⚠️ **Watch out:** Costs can grow quietly when many people use your app. Set a spending limit in your provider account, and keep the maximum answer length small while you learn.

## Try it

Using the calculator with the example prices, change the numbers: what happens to the cost if the answer is 600 tokens instead of 150? Which part of the sum grows?

<details><summary>Show answer</summary>

The output part grows four times bigger. Because output tokens are priced higher, long answers have a big effect on the cost.

</details>

## Check your understanding

1. What does a low temperature do? A high one?
2. Which setting would you choose for answering from a price list?
3. Why are output tokens often a bigger part of the bill than you expect?
4. Why should you not trust a price you read in a lesson?

<details><summary>Show answers</summary>

1. Low: the model nearly always picks the most likely word, so replies are steady. High: it picks more surprising words, so replies vary more.
2. Low, because you want steady, factual answers.
3. They are usually priced higher per token than input tokens, and long answers have many of them.
4. Prices change. The provider's pricing page is the only reliable source.

</details>

> 🧠 **Remember:**
> - Temperature is the vanilla-or-adventure dial: low for facts, higher for creative work.
> - You pay for input tokens and output tokens, and output usually costs more per token.
> - Check the pricing page, set a limit, and keep answers short while learning.

## Go deeper

- [Claude docs: Messages API reference](https://docs.claude.com/en/api/messages)
- [Anthropic: Pricing](https://www.anthropic.com/pricing)
