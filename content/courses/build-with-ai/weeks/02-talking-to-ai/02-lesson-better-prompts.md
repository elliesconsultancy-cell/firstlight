---
title: Better prompts
kind: lesson
minutes: 20
---
Think of how you teach a new intern at the bakery. You do not only say "Answer the customers." You say who they are ("You are the friendly voice of the shop"), you show a good example ("Here is a reply I liked"), you say how it should look ("Keep it short"), and you explain the order ("First check the question, then reply").

Those four moves also work on AI. This lesson teaches them one at a time: **role**, **examples**, **format** and **steps**.

## Tool 1: Give it a role

A **role** tells the model who it should act as. It sets the voice, the level and the point of view.

```text
You are a friendly shop assistant for a small bakery.
Customers are ordinary people, not experts.
Explain things in simple words.

A customer asks: What is sourdough?
```

Without a role, the answer might sound like an encyclopedia. With this role, it sounds like a helpful person at the counter.

> 💡 **Tip:** Say who the reader is as well. "Explain to a 10-year-old" or "to a busy customer" changes the words the model picks.

## Tool 2: Show examples

Sometimes it is hard to describe what you want. Show it. When you give examples of the input and the answer you want, the model copies the pattern. This is the autocomplete idea again: you have started the pattern, so it continues it.

```text
Sort each customer message as QUESTION, ORDER or COMPLAINT.

Message: Do you open on Sunday?
Type: QUESTION

Message: I want two loaves for Friday.
Type: ORDER

Message: My cake was late and cold.
Type: COMPLAINT

Message: Can I get a lemon cake for 8 people?
Type:
```

The model will most likely write `ORDER`. Two or three clear examples are often enough. Choose examples that look like the real messages you expect.

## Tool 3: Say the format

A **format** is the shape of the answer. If you do not say, you get whatever the model likes. If you say, you can use the answer more quickly.

```text
Give me 3 name ideas for a new chocolate cake.
Reply as a numbered list. Each line: the name, then a dash,
then a 6-word description.
```

You can ask for a table, a list, a short paragraph, or a word limit. Later in this course, your own code will read the answer. Then a fixed format (like JSON) will be very useful.

## Tool 4: Give steps

For harder tasks, tell the model the order of the work. This is like a recipe. It reduces mistakes, because the model follows the path you set.

```text
A customer message is below.
Step 1: Decide if it is a question, an order or a complaint.
Step 2: Write a reply of at most 2 sentences.
Step 3: If it is a complaint, start the reply with an apology.

Message: My cake was late and cold.
```

You can also ask the model to think before answering, for example "Think step by step, then give the final answer on a new line." This helps with problems that need several small moves.

## Putting the four tools together

Here is one prompt that uses all four. Read it and find each tool.

```text
You are the friendly voice of Amina's Bakery.              (role)

Reply to the customer message at the bottom.
Follow these steps:                                          (steps)
1. Decide if it is a question, an order or a complaint.
2. Write a reply of 2 sentences at most.

Here is a reply style I like:                                (example)
Customer: Do you open on Sunday?
Reply: Yes, we open from 8am to noon on Sunday. See you soon!

Finish with the line "Type: <QUESTION, ORDER or COMPLAINT>". (format)

Customer: Can I get a lemon cake for 8 people?
```

> ⚠️ **Watch out:** More words are not always better. A long, messy prompt can confuse the model, and it costs more tokens. Add a tool only when the answer needs it.

## Where the picture stops being true

An intern who is told "do it like this example" usually understands the idea behind it. A model may copy the example too closely, such as repeating its exact words. If that happens, use two or three examples that are different from each other. Also, models do not always follow every instruction. Test the prompt (next lesson).

## Try it

Take this weak prompt and rewrite it using at least two of the four tools:

```text
Reply to this customer: "is the bread vegan?"
```

Remember: you do not know if Amina's bread is vegan. What should you tell the model to do if the facts are missing?

<details><summary>Show a possible answer</summary>

```text
You are a friendly assistant for Amina's Bakery. Reply in at most
2 sentences. If you do not have the information, say "I'm not sure,
please ask Amina" and do not guess.

Customer: is the bread vegan?
```

This uses a role, a format limit and a rule that stops it from making things up.

</details>

## Check your understanding

1. What does a role do?
2. When are examples more useful than a description?
3. Why is it useful to state the output format?
4. Name a risk of examples.

<details><summary>Show answers</summary>

1. It tells the model who to act as, which sets voice, level and point of view.
2. When the pattern you want is hard to describe in words. The model copies the pattern.
3. You get a shape you can use and read quickly, and later your code can read it.
4. The model may copy the example too closely. Use a few different examples.

</details>

> 🧠 **Remember:**
> - Four tools: role, examples, format, steps.
> - Add a tool only when the answer needs it.
> - Always tell the model what to do when it does not know.

## Go deeper

- [Claude docs: Use examples (multishot prompting)](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting)
- [Claude docs: Give Claude a role](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/system-prompts)
