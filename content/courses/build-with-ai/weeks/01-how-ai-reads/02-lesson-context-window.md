---
title: The context window
kind: lesson
minutes: 18
---
Imagine a student sitting at a desk. On the desk are a few things: the exam question, some notes, and the paper where the student writes the answer. The desk is only so big. If you pile on too many books, some fall off the edge.

The student can only use what is **on the desk right now**. Anything not on the desk does not exist for them.

This is the picture for the **context window**: the size of the desk.

## What is the context window?

The **context window** is the most text a model can look at in one go. It is counted in tokens (last lesson).

Everything the model needs goes on the desk:

- the instructions you give it
- the whole conversation so far (your messages and its replies)
- any documents you add
- the answer it is writing right now

> 🧠 **Remember:** The model only knows what is on the desk. Instructions, chat history, documents and its own answer all share the same space.

Different models have different desk sizes. Newer models often have bigger desks. We do not give numbers in this course, because they change. The provider's documentation always lists the current size for each model.

## A story: BakeBuddy's long chat

Amina's customer, Tolu, chats with BakeBuddy about a birthday cake. The chat goes on for a long time: flavours, sizes, allergies, delivery.

Every time Tolu sends a new message, the app sends the **whole conversation again** to the model. The model has no memory of its own (Week 4 explains this). So the desk fills up with each message.

```text
Message 1:   [instructions] [Tolu 1]                               -> small
Message 5:   [instructions] [Tolu 1] [Bot 1] ... [Tolu 5]          -> bigger
Message 40:  [instructions] [Tolu 1] [Bot 1] ... [Tolu 40]         -> big!
```

Two problems come from this:

1. **Cost and speed.** A longer desk means more input tokens each time. That costs more and takes longer.
2. **The desk can fill up.** When it is full, something has to go.

## What happens when the desk is full?

It depends on the product and the provider. Some things can happen:

- The request may be refused with an error, because it is too big.
- The app may cut the oldest messages, so the model forgets the start of the chat.
- The app may **summarise** the old messages into a short note, and put only the note on the desk.

> ⚠️ **Watch out:** If the start of a chat is cut off, the model can suddenly forget something important, like Tolu's nut allergy. Good apps keep important facts safe.

## A bigger desk is not always better

You might think: "Then I will always put everything on the desk!" There are reasons not to:

- More tokens cost more money.
- More tokens take longer to process.
- A desk piled with papers makes it harder to find the one that matters. Models can miss details in very long text.

A tidy desk with only the right papers often gives the best answers. In Week 5 we learn to pick the right pages and put only those on the desk.

## Try it: will it fit?

Here is a small script that checks if a conversation fits on a desk. The desk size here is a **made-up number for practice**, not the size of any real model.

```js
const DESK_SIZE = 1000; // example number only

function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

const instructions = "You are BakeBuddy, a friendly helper for Amina's bakery.";
const chat = [
  "Hi! Do you make birthday cakes?",
  "Yes! We make chocolate, vanilla and lemon cakes.",
  "How much for a lemon cake for 10 people?",
];

let total = estimateTokens(instructions);
for (const message of chat) {
  total += estimateTokens(message);
}

console.log("Tokens on the desk:", total);
console.log("Desk size:", DESK_SIZE);
console.log("Fits?", total <= DESK_SIZE);
```

Change `DESK_SIZE` to `30`. What does the last line say now?

<details><summary>Show answer</summary>

It prints `Fits? false`, because the estimated total (about 44 tokens) is more than 30.

</details>

## Where the picture stops being true

A real desk lets you glance at any paper equally. A model does not always pay equal attention to everything on its desk. Details in the middle of a very long text can be missed. Also, the desk is shared with the model's own answer, so a long answer needs free space too.

## Check your understanding

1. What is the context window, using the desk picture?
2. Name three things that share the desk.
3. Why does a long chat get more expensive with every message?
4. Give one thing an app can do when the desk is full.

<details><summary>Show answers</summary>

1. The most text the model can look at at one time, counted in tokens.
2. Any three of: your instructions, the chat history, documents you add, the answer being written.
3. The app sends the whole conversation again each time, so more input tokens are sent with each message.
4. Cut the oldest messages, or summarise them into a short note. The request may also fail with an error.

</details>

> 🧠 **Remember:**
> - The context window is the desk: the model sees only what is on it.
> - Instructions, history, documents and the answer all share the desk.
> - A tidy desk beats a crowded one.

## Go deeper

- [Claude docs: Context windows](https://docs.claude.com/en/docs/build-with-claude/context-windows)
- [Claude docs: Models overview](https://docs.claude.com/en/docs/about-claude/models/overview)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Explain the context window using the desk picture.
- Name what shares the desk.
- Say why a long chat costs more with each message and what an app can do when the desk is full.

### Purpose
Many real AI problems, like a chatbot forgetting an allergy, are really desk problems. This lesson prepares learners for memory in Week 4 and retrieval in Week 5.

### Things to teach
1. **The desk.** The model only knows what is on the desk right now. Instructions, chat history, documents and its own answer all share it.
2. **Tolu's long chat.** Use the lesson's cake chat. Each new message resends the whole conversation, so the desk grows. Point at the message 1, 5 and 40 lines.
3. **A full desk.** The request may fail, the oldest messages may be cut, or old messages may be summarised. Use the nut allergy example: cut the start and the model forgets it.
4. **Bigger is not always better.** More tokens cost more, take longer, and details can get lost in a crowded desk. A tidy desk wins.
5. **Run Will it fit?** Change DESK_SIZE to 30 and see Fits? turn false. The size there is a made-up number.

### Check understanding
- Ask: "What is the context window?" A good answer: the most text the model can look at in one go, counted in tokens.
- Ask: "Name three things on the desk." A good answer: instructions, chat history, documents, or the answer being written.
- Ask: "Why does each message in a long chat cost more?" A good answer: the whole conversation is sent again each time, so more input tokens go in.

### Watch for
- Learners think the model remembers earlier chats by itself. Say: the app resends the history each time. Week 4 covers this.
- Learners quote desk sizes as facts. Say: sizes change, so check the provider's docs. The lesson's number is made up.
