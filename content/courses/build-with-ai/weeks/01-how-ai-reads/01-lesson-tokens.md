---
title: Tokens
kind: lesson
minutes: 18
---
Think of a box of Lego. You do not build with the whole box at once. You build with small bricks. Some bricks are big, some are tiny, and you can click them together into anything.

A language model reads and writes text in the same way. It does not use letters, and it does not always use whole words. It uses small bricks of text. We call these bricks **tokens**.

## What is a token?

A **token** is a chunk of text. It can be a whole short word, a part of a long word, a number, or a punctuation mark.

Here is an example of how a sentence might be cut into tokens. The exact cuts depend on the model, so treat this as an illustration.

```text
Sentence:  Amina bakes unbelievably good bread.

Tokens:    Am | ina |  bakes |  un | believ | ably |  good |  bread | .
```

Notice three things:

- Short, common words (like "good" and "bread") are usually one token.
- Long or rare words are cut into pieces (like "un", "believ", "ably").
- A space often belongs to the token after it.

> 🧠 **Remember:** A token is a Lego brick of text. The model reads bricks, not letters.

## A rule of thumb for English

You do not need to count tokens by hand. For normal English, a good guess is:

- **1 token is about 4 characters**
- **1 token is about three quarters of a word** (so 100 words is roughly 130 tokens)

This is only a guess. Other languages, code, and unusual words often need more tokens for the same meaning. Different models also cut text in different ways.

## Try it: a token estimator

Here is a tiny function that guesses tokens from the number of characters. Press **Try it** and change the text.

```js
function estimateTokens(text) {
  // Rule of thumb: about 4 characters per token in English
  return Math.ceil(text.length / 4);
}

const message = "Hello! Do you have gluten-free bread today?";

console.log("Characters:", message.length);
console.log("Estimated tokens:", estimateTokens(message));
```

Read it line by line. `text.length` counts the characters. We divide by 4. `Math.ceil` rounds up to a whole number, because you cannot have half a brick.

Now try the word-based rule, too:

```js
function estimateTokensFromWords(text) {
  const words = text.trim().split(/\s+/).length;
  // About 4 tokens for every 3 words
  return Math.ceil((words * 4) / 3);
}

const message = "Hello! Do you have gluten-free bread today?";

console.log("Words:", message.trim().split(/\s+/).length);
console.log("Estimated tokens:", estimateTokensFromWords(message));
```

The two answers are close but not the same. That is fine. They are estimates.

> 💡 **Tip:** To get the exact number, ask the provider. Every reply from the Claude API includes a `usage` field that reports the real token counts. We will meet it in Week 3.

## Why do tokens matter?

Tokens are the **unit of measure** for AI. Three things are counted in tokens:

| What | Why tokens matter |
| --- | --- |
| **Size limit** | The model can only look at so many tokens at once (next lesson) |
| **Price** | Providers usually charge per token (the lesson after next) |
| **Speed** | More tokens to write means more time to wait |

So when someone says "that prompt is 2,000 tokens", they say how big it is. Like saying a parcel is 2 kilos.

## Tokens in and tokens out

There are two directions:

- **Input tokens:** the text you send to the model (your question, instructions, documents).
- **Output tokens:** the text the model writes back.

Both count. Later we will see that they are often priced differently.

## Where the picture stops being true

Lego bricks come in a few fixed shapes that you can see. Tokens are chosen by a program, and you cannot see the cuts unless you use a tool. Also, the same sentence may use a different number of tokens in a different model. So a Lego count is a helpful idea, not an exact science.

## Try it

Estimate the tokens by hand with the rule "4 characters per token", then check with the function:

1. "Good morning" (12 characters including the space)
2. A 300-word customer email
3. Your own name and your country

<details><summary>Show answers</summary>

1. About 3 tokens (12 divided by 4).
2. About 400 tokens (300 words times 4, divided by 3).
3. It depends on your text. Count the characters and divide by 4. Short, common names are often 1 to 3 tokens.

</details>

## Check your understanding

1. What is a token, using the Lego picture?
2. About how many tokens are in 100 English words?
3. Why might a text in another language or in code use more tokens than you expect?
4. What are input tokens and output tokens?

<details><summary>Show answers</summary>

1. A small brick of text that the model reads and writes. It can be a word, part of a word, a number or punctuation.
2. Roughly 130 tokens. It is only an estimate.
3. The cuts are made for the most common patterns in the model's text. Rarer text is cut into more, smaller pieces.
4. Input tokens are what you send in. Output tokens are what the model writes back.

</details>

> 🧠 **Remember:**
> - A token is a brick of text, about 4 characters or three quarters of a word in English.
> - Size, price and speed are all counted in tokens.
> - A token count is an estimate until the provider tells you the real number.

## Go deeper

- [Claude docs: Token counting](https://docs.claude.com/en/docs/build-with-claude/token-counting)
- [Claude docs: Glossary](https://docs.claude.com/en/docs/about-claude/glossary)
