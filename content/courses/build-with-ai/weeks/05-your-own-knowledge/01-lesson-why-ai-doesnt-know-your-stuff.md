---
title: Why AI doesn't know your stuff
kind: lesson
minutes: 25
---
Imagine a very keen new intern arrives at Amina's bakery on the first morning. The intern has read thousands of books about baking, food and customers. But no book had Amina's menu in it. A customer asks: "How much is your sourdough, and is it vegan?" What should the intern do?

A good intern says: "I need to check the menu." A bad intern guesses. A language model is, by default, the bad intern. It does not say "I do not know". It writes something that sounds right.

## What the model has read, and what it has not

A **language model** learns from a huge library of text. Then the learning stops. After that, it only has what it learned and what you put in front of it. That means it does not know:

- **Private things**: your menu, your prices, your customers, your school timetable.
- **New things**: anything that happened after its learning stopped.
- **Small local things**: a bakery on one street is not in the library.

This is the **desk** idea again. The model can only look at what is on the desk right now. If Amina's menu is not on the desk, the model cannot read it.

## See it fail

Start your BakeBuddy server and ask these questions:

```text
How much is your sourdough loaf?
What time do you close on Saturday?
Do you have a gluten-free cake?
```

It will answer with something. Maybe it says "I do not have exact prices". Maybe it makes up a number. Both happen. Write down what you see. This is a **hallucination** risk: a confident guesser who never says "I don't know".

> ⚠️ **Watch out:** A wrong answer about allergies can hurt a real person. Never let your product guess about health, money or safety. Give it the facts, or make it say "ask in the shop".

## The simplest fix: put the menu on the desk

If the menu is short, we can paste all of it into the system prompt. Then the intern has the menu in hand on every call.

Make a file called `menu.txt` in your project folder. Write one fact per line. These are invented examples. Use your own real facts if you have them:

```text
Opening hours: Monday to Friday 7:00 to 18:00.
Opening hours: Saturday 8:00 to 16:00. Sunday closed.
Sourdough loaf: 4.50. Contains wheat. Vegan. Baked every morning.
Baguette: 2.20. Contains wheat. Vegan. Best on the day it is baked.
Butter croissant: 2.00. Contains wheat, milk and eggs.
Chocolate brownie: 2.80. Contains wheat, eggs, milk and walnuts.
Gluten-free almond cake: 3.50. No wheat. Contains almonds and eggs.
Carrot cake slice: 3.20. Contains wheat, eggs and walnuts.
Birthday cake, whole, serves 8: 28.00. Order two days ahead.
Hot chocolate: 3.00. Contains milk.
Filter coffee: 2.20.
Delivery: free within 5 km for orders over 20. Otherwise the fee is 3.00.
Allergy note: all items are made in one kitchen and may contain traces of nuts.
```

Now change `prompt.js` so it reads the file and adds it to the prompt:

```node
import { readFile } from "node:fs/promises";

const menu = await readFile(new URL("./menu.txt", import.meta.url), "utf8");

export const SYSTEM_PROMPT =
  "You are BakeBuddy, the friendly helper of Amina's Bakery. " +
  "Answer in at most three short sentences. " +
  "Use only the menu below for facts about products, prices, allergies and hours. " +
  "If the menu does not answer the question, say you do not know and suggest asking in the shop. " +
  "Never invent prices, ingredients or hours.\n\n" +
  "MENU AND HOURS:\n" +
  menu;
```

Restart the server and ask the same three questions again. The answers should now match your file.

### Try it

Ask BakeBuddy something the menu does not say, like "Do you sell pizza?" or "Is the brownie vegan?". Does it say it does not know? Is the brownie answer right?

<details><summary>Show answers</summary>

For pizza, it should say it does not know and suggest asking in the shop. For the brownie, the menu says it contains eggs and milk, so a good answer is "no, it is not vegan". If it guesses, make the rule in your system prompt stronger.

</details>

## Where this simple fix stops working

Pasting everything is a fine start. But it has limits:

1. **The desk is limited.** A big document will not fit in the context window.
2. **You pay every time.** The whole menu is sent in every call, so every call costs more. A long chat repeats it again and again.
3. **Too much noise.** When the desk has pages and pages of text, the model can miss the one line that matters.

Amina's menu is small, so it works. But think about a school with 500 pages of rules. We do not want to carry the whole library to the desk for each question.

We want to bring only the **right few pages**. That is the next lesson: retrieval.

## Check your understanding

1. Name two kinds of information a model does not have.
2. Why is a confident wrong answer about allergies worse than "I do not know"?
3. In the simple fix, where does the menu go?
4. Give two reasons why pasting a very long document into every prompt is a problem.

<details><summary>Show answers</summary>

1. Private information (like your menu) and new information (after its learning stopped). Small local facts too.
2. Someone may trust it and get hurt. "I do not know" sends them to the shop to ask.
3. In the system prompt, which is sent with every call.
4. It may not fit on the desk, and you pay for all those tokens in every call. The model may also miss the important line.

</details>

> 🧠 **Remember:**
> - A model only knows what it learned and what is on the desk now.
> - It will guess if you do not give it the facts.
> - For small documents, paste them into the prompt. For big ones, bring only the right pages.

## Go deeper

- [Claude docs: Messages API](https://platform.claude.com/docs/en/api/messages)
- [Node.js: fs promises readFile](https://nodejs.org/api/fs.html#fspromisesreadfilepath-options)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Name what a model does not know (private, new and local facts)
- Put a short `menu.txt` in the system prompt and see answers improve
- Say when pasting everything stops working

### Purpose
Most business uses of AI need the model to use the user's own facts. A confident wrong answer, such as about allergies, can hurt someone.

### Things to teach
1. **The keen intern.** Say: "The intern read thousands of books but never saw Amina's menu. A good intern checks. A bad intern guesses." The model is the bad intern by default.
2. **See it fail.** Ask the three questions (sourdough price, Saturday closing, gluten-free cake) before adding the menu. Write down what happens.
3. **Put the menu on the desk.** Show `menu.txt` and the new `prompt.js` that reads it with `readFile`. Ask the same questions again and compare.
4. **The rule that matters.** "Use only the menu... say you do not know." Test with "Do you sell pizza?" and "Is the brownie vegan?".
5. **Where it stops.** Desk space, paying for every call, and too much noise. Think of a school with 500 pages of rules.

### Check understanding
- Ask: "Name two things a model does not know." A good answer: private facts like your menu, and new facts after its learning stopped.
- Ask: "Why is a wrong allergy answer worse than I do not know?" A good answer: someone may trust it and get hurt.
- Ask: "Why not paste a huge document each time?" A good answer: it may not fit, costs more every call, and the model can miss the key line.

### Watch for
- Learners think the model "looks things up" or "learns" from the file. It only reads what is on the desk in that call.
- Forgetting to restart the server after editing `menu.txt` or `prompt.js`, so the old answers return.
