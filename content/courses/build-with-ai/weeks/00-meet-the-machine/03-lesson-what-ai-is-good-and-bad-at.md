---
title: What AI is good and bad at
kind: lesson
minutes: 18
---
Imagine a friend who has read every cookbook, newspaper and school book in the world. You ask: "Who won the football match last night?" Your friend does not know, but hates to say so. So your friend answers with a confident name. It sounds right. It is wrong.

This is the most important thing to know about AI. It is a **confident guesser who never says "I don't know"** unless it has been built or asked to.

## What AI does well

A language model is very good at work with **words**. Here are things it does well:

| Job | Example for Amina |
| --- | --- |
| Writing a first draft | A friendly email about a late order |
| Rewriting | Make this notice shorter and kinder |
| Summarising | Give me the 3 main points of 20 customer reviews |
| Translating | Her menu in English and French |
| Explaining | What does "proofing dough" mean? |
| Sorting and tagging | Is this message a question, a complaint or a thanks? |
| Brainstorming | Ten names for a new chocolate cake |

It is also fast, it does not get tired, and it is happy to try again.

## What AI does badly

| Weak spot | Why |
| --- | --- |
| Facts it was not taught | It guesses, and the guess can be wrong |
| Very recent events | Its training text stopped at some date |
| Exact maths and counting | It predicts text, it does not calculate |
| Your private information | It has never seen your shop, your prices or your stock |
| Remembering earlier chats | Each new conversation starts empty (we study this in Week 4) |
| Knowing when it is wrong | It sounds equally sure when right and wrong |

> 💡 **Tip:** A good rule: use AI for drafts and ideas that you will check. Do not use it alone for things where a mistake is costly, such as medicine, money or law.

## Hallucination: the confident guesser

When a model gives an answer that sounds right but is made up, we call it a **hallucination**. It can invent a fact, a name, a quote, a web link or even a book that does not exist.

Why does it happen? Remember the autocomplete picture. The model picks words that fit the pattern. A made-up fact can fit the pattern perfectly well. It has no inner alarm that says "careful, I am not sure".

Here is a small example. Amina asks a model that knows nothing about her shop:

```text
Question: What is the price of the sourdough loaf at Amina's Bakery?
Answer:   Amina's Bakery sells sourdough loaves for $6.50.
```

That price is invented. The model did not look it up, because it cannot. It only produced something that looks like a good answer.

> ⚠️ **Watch out:** A made-up answer usually looks the same as a true one. Smooth writing does not prove it is correct.

## How to check an answer

You do not need to be afraid of AI. You need a few habits:

1. **Ask for sources, then open them.** If it gives a link or a book name, check that it exists.
2. **Check important facts somewhere else.** A trusted website, a document, a person.
3. **Ask it to say when it is unsure.** For example: "If you do not know, say 'I don't know'." This helps, but it is not perfect.
4. **Give it the facts.** If you paste Amina's real price list into the conversation, it can answer from that. This idea (we call it retrieval) is Week 5.
5. **Test with questions where you already know the answer.** This is how you learn when to trust it.

## Where the picture stops being true

"A friend who never says 'I don't know'" is a good warning. But today's models are often better than that: they can say they are unsure, and good prompts make that more likely. Still, they can fail without any sign. So the habit of checking stays.

## Try it

Open any AI chat. Ask it this question about something that does not exist:

```text
Tell me about the famous 1987 book "The Purple Oven of Lagos" and who wrote it.
```

What does it do? Does it say it does not know that book, or does it describe it? Both outcomes teach you something. Write down what happened. (This test is not fair or unfair. It only shows how this model behaves today.)

## Check your understanding

1. Name three jobs that a language model does well.
2. Why can it get simple counting or maths wrong?
3. What is a hallucination?
4. Give two ways to check an answer.

<details><summary>Show answers</summary>

1. Any three of: drafting, rewriting, summarising, translating, explaining, sorting, brainstorming.
2. It predicts likely text. It does not calculate like a calculator does.
3. An answer that sounds right and sure, but is made up or wrong.
4. For example: check a trusted source, open any link it gives, ask a person, give it the real facts, or test it on questions you already know.

</details>

> 🧠 **Remember:**
> - AI is strong with words: drafts, summaries, rewriting, ideas.
> - It can make things up and sound sure. This is called a hallucination.
> - Always check what matters.

## Go deeper

- [Anthropic: reduce hallucinations (Claude docs)](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
- [Wikipedia: Hallucination (artificial intelligence)](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence))

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Name three jobs AI does well and three it does badly.
- Explain a hallucination using the confident guesser picture.
- Use at least two habits to check an AI answer.

### Purpose
At work, people will trust AI too much or not at all. Both cost them. This lesson gives learners a fair view and a checking habit they will use all course.

### Things to teach
1. **The confident guesser.** Retell the football match story: a friend who has read everything but hates to say "I don't know". It sounds right and is wrong.
2. **Good at words.** Walk the strengths table: drafts, rewriting, summaries, translation, sorting, brainstorming. Ask learners which one they would use in their own life.
3. **Weak spots.** Facts it was not taught, very recent events, exact counting and maths, private information, knowing when it is wrong. Link to autocomplete: it predicts text, it does not calculate.
4. **Hallucination.** Show the invented sourdough price at Amina's Bakery. A made-up fact fits the pattern perfectly well, and there is no inner alarm.
5. **Checking habits.** Open the links, check a second source, give it the real facts, and test it on things you already know.

### Check understanding
- Ask: "Why can it get simple counting wrong?" A good answer: it predicts likely text, it does not calculate like a calculator.
- Ask: "What is a hallucination?" A good answer: an answer that sounds sure and right but is made up.
- Ask: "Give two ways to check an answer." A good answer: check a trusted source, open any link it gives, ask a person, or test with questions you already know the answer to.

### Watch for
- Learners think smooth, confident writing means a correct answer. Say: a made-up answer usually looks the same as a true one.
- Learners swing to fear and refuse to use it. Say: use it for drafts and ideas you will check, and not alone for costly things like medicine, money or law.
