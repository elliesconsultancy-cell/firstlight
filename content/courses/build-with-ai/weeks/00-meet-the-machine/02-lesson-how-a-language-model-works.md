---
title: How a language model works
kind: lesson
minutes: 18
---
You know the autocomplete on your phone keyboard. You type "Good" and it suggests "morning", "luck" or "night". It guesses the next word.

Now imagine that autocomplete has read a giant library: millions of books, websites and articles. It is much better at guessing. This is the best picture for a language model: **a super-powered autocomplete that has read a giant library.**

## One word at a time

Let us play the game ourselves. Finish this sentence with the most likely word:

```text
The baker opened the oven and smelled fresh ...
```

Most people say "bread". Some say "cake" or "cookies". Almost nobody says "tyres". The model does the same, but with numbers. For each possible next word, it gives a **chance**:

| Next word | Chance (example) |
| --- | --- |
| bread | high |
| cake | medium |
| cookies | medium |
| tyres | almost zero |

The numbers in the table are only an example. Real models look at tens of thousands of possible pieces at once.

Then the model picks one word, adds it to the text, and guesses again. And again. And again. That is how a whole answer appears.

```text
The baker opened the oven and smelled fresh bread.
The baker opened the oven and smelled fresh bread. It
The baker opened the oven and smelled fresh bread. It was
```

Each new word is chosen by looking at **everything before it**, including your question.

> 🧠 **Remember:** A language model writes by guessing the next piece of text, again and again. Your question is only the start of the text it continues.

## Training: reading the library

How did the model get so good at guessing? Through **training**.

During training, the computer is shown a very large amount of text. It covers up the next word and tries to guess it. When it is wrong, it adjusts itself a little. It does this a huge number of times. After that, it has learned patterns: grammar, facts, styles, even how code looks.

Two things follow from this:

1. **The model's knowledge has a date.** It learned from text up to some point in time. Things that happened after that, it may not know.
2. **It does not read your private files.** It only knows what was in its training text, plus what you show it in the conversation.

## Why it can write things nobody wrote before

You might ask: if it only guesses the next word, how can it write a poem about a bakery cat? Because the patterns it learned are about words in general, not only copies of old sentences. It mixes patterns, like a musician who plays a new song in a style they know well.

## Where the picture stops being true

Your phone's autocomplete is small and simple. A language model is far bigger, and it keeps track of long text, not only the last word. It can follow instructions, answer questions and translate. But the base idea is the same: it **predicts what comes next**.

Also, the autocomplete picture does not mean the model only copies what it has read. It does not keep a copy of the library to look in. It keeps what it learned about patterns.

## Try it

Play next-word guesser with a friend, or with yourself. Write the start of a sentence, and write down three possible next words.

```text
1. Amina puts the cake in a ...
2. The customer says thank you and ...
3. On Sunday the shop is ...
```

Notice how many good answers there are for each. A model has the same problem: many words fit. This will matter in the "temperature" lesson in Week 1.

## What this means for you as a builder

Because the model continues text, **the words you give it shape the words it gives back**. A short, vague question gets a general answer. A clear, detailed question gets a more useful one. In Week 2, we learn how to ask well.

## Check your understanding

1. In your own words, how does a language model write a long answer?
2. What is "training"?
3. Why might a model not know about last week's news?
4. True or false: the model searches the internet for every answer.

<details><summary>Show answers</summary>

1. It guesses one piece of text, adds it, then guesses the next one, again and again. Each guess looks at all the text before it.
2. Training is the time when the model reads a huge amount of text, guesses the next word, and adjusts itself when it is wrong.
3. Its training text stopped at some date. Newer events were not in it.
4. False. It writes from the patterns it learned. Searching is a separate feature that an app may add.

</details>

> 🧠 **Remember:**
> - A language model is a super-powered autocomplete that has read a giant library.
> - It writes one piece at a time, using all the text before it.
> - What you write changes what it writes.

## Go deeper

- [Anthropic: Claude documentation](https://docs.claude.com)
- [Wikipedia: Large language model](https://en.wikipedia.org/wiki/Large_language_model)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Describe how a model writes an answer: one piece at a time, using all the text before it.
- Explain training in one or two sentences.
- Say why a model may not know recent news or private files.

### Purpose
Everything later in the course (prompts, context, temperature, hallucination) grows from this one idea. A learner who gets the autocomplete picture will understand most AI behaviour.

### Things to teach
1. **The autocomplete.** Start from the phone keyboard. The model is the same idea, but it has read a giant library. It is not a person and not a search engine.
2. **Next-word chances.** Do the lesson's sentence together: "The baker opened the oven and smelled fresh ...". Bread is likely, cake and cookies less, tyres almost never. The model picks one, adds it, and guesses again.
3. **Training.** The computer covers up the next word, guesses, and adjusts when wrong, a huge number of times. Two results: its knowledge has a date, and it has not read private files.
4. **New text is possible.** It can write a poem about a bakery cat because it learned patterns, like a musician playing a new song in a known style. It does not keep a copy of the library.
5. **Your words shape its words.** A vague question gets a general answer. This leads into Week 2.

### Check understanding
- Ask: "How does a model write a long answer?" A good answer: it guesses one piece, adds it to the text, guesses the next, and each guess looks at everything before it.
- Ask: "What is training?" A good answer: reading lots of text, guessing the next word, and adjusting when wrong.
- Ask: "Does it search the internet for each answer?" A good answer: no. Search is a separate feature an app may add.

### Watch for
- Learners think the model keeps a copy of the library and looks things up. Say: it keeps patterns, not pages.
- Learners think "only guessing the next word" means it is weak. Say: it is a good guesser, which is why it is useful, and also why it can be wrong.
