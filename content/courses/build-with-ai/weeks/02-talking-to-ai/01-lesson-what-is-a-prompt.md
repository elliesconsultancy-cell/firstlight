---
title: What is a prompt?
kind: lesson
minutes: 15
---
It is Monday morning. A new intern arrives at Amina's bakery. The intern is very keen and has read every book about baking, business and writing. But the intern has never seen this bakery. They do not know the prices, the opening hours, or what kind of customers come.

Amina says: "Write something for the customers." The intern waits. "What should it be about? How long? What tone?" A real intern could ask. An AI usually cannot ask first. It will guess and write something.

This is what a prompt is, and why it matters.

## What is a prompt?

A **prompt** is the text you give a language model to start from. It can be a question, an instruction, some examples, a document, or all of these.

Remember the autocomplete picture: the model continues your text. So your prompt shapes the whole answer.

> 🧠 **Remember:** A prompt is instructions for a very keen new intern who has read everything but knows nothing about your business.

## Vague in, vague out

Look at two prompts for the same job.

```text
Prompt A:
Write something for customers.
```

```text
Prompt B:
Write a 3-sentence notice for the window of Amina's Bakery.
Say that we will close at 2pm this Friday for a family event,
and that we will open as normal on Saturday.
Use a warm and polite tone.
```

Prompt A gives the model nothing to hold. It might write a poem, an advert or a long essay. Prompt B says: what, where, how long, the facts, and the tone. The answer will be much closer to what Amina wants.

A good rule: **if a new person could not do the job from your prompt, the AI cannot either.**

## The parts of a good prompt

You do not need all of these every time. But when an answer is not good, ask which part is missing.

| Part | The question it answers | Example |
| --- | --- | --- |
| **Task** | What should it do? | Write a notice |
| **Context** | What does it need to know? | We close at 2pm on Friday |
| **Audience** | Who will read it? | Customers at the door |
| **Format** | What should it look like? | 3 sentences |
| **Tone** | How should it sound? | Warm and polite |

## Common mistakes

| Mistake | Better |
| --- | --- |
| "Tell me about cakes" | "List 5 popular birthday cake flavours for a small bakery, one line each" |
| Assuming it knows your shop | Paste the facts into the prompt |
| Asking five things at once | Ask one thing, then the next |
| Not saying how long | "In under 50 words" |

> ⚠️ **Watch out:** Never put passwords, secret keys or other people's private data into a prompt. Treat a prompt like a postcard: write only what you are happy to have read by others.

## Where the picture stops being true

A real intern asks questions, remembers yesterday, and learns your shop over time. A model usually does none of this by itself. Each time, it sees only the prompt (and the chat so far). Also, a real intern knows when they are guessing. The model may guess without telling you. So you must put what matters into the prompt, and check the result.

## Try it

Open any AI chat. First, send the vague version:

```text
Write something about my shop.
```

Then send a better one. Change the details to your own idea:

```text
Write a short, friendly "about us" paragraph (about 60 words)
for a small bakery called Amina's Bakery. We make fresh bread
every morning and cakes to order. The reader is a new customer.
Do not invent any prices.
```

Compare the two answers. Which one would you use? Why?

## Check your understanding

1. What is a prompt?
2. Why does a vague prompt give a vague answer?
3. Name three parts you can add to make a prompt better.
4. What does the intern picture tell you about what the AI knows?

<details><summary>Show answers</summary>

1. The text you give a language model to start from, such as a question, instructions, examples or a document.
2. The model continues your text and has nothing specific to hold on to, so it guesses.
3. Any three of: task, context, audience, format, tone.
4. It has read a lot in general, but knows nothing about your business unless you tell it.

</details>

> 🧠 **Remember:**
> - A prompt is instructions for a keen new intern.
> - If a new person could not do the job from your prompt, the AI cannot either.
> - Put what matters into the prompt: task, context, audience, format, tone.

## Go deeper

- [Claude docs: Prompt engineering overview](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)
- [Claude docs: Be clear and direct](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Explain a prompt using the intern picture.
- Rewrite a vague prompt into a clear one.
- Name the five parts of a good prompt: task, context, audience, format, tone.

### Purpose
Prompting is the cheapest way to get better results. In real work, most poor AI answers come from poor instructions, not a poor model.

### Things to teach
1. **The new intern.** Keen, has read everything, knows nothing about your business. A real intern can ask questions, but the AI usually guesses.
2. **Vague in, vague out.** Show Prompt A ("Write something for customers") next to Prompt B (the window notice with facts and tone). Ask learners what is missing in A.
3. **Five parts.** Task, context, audience, format, tone. When an answer is poor, ask which part is missing.
4. **The rule.** "If a new person could not do the job from your prompt, the AI cannot either."
5. **Postcard rule.** Never put passwords, keys or other people's private data in a prompt.

### Check understanding
- Ask: "What is a prompt?" A good answer: the text you give a model to start from, such as a question, instructions, examples or a document.
- Ask: "Why does a vague prompt give a vague answer?" A good answer: the model has nothing specific to hold on to, so it guesses.
- Ask: "What does the intern picture say about what the AI knows?" A good answer: it has read a lot in general but knows nothing about your business unless you tell it.

### Watch for
- Learners assume the AI already knows their shop or situation. Say: put the facts in the prompt.
- Learners ask five things at once. Say: ask one thing, then the next.
