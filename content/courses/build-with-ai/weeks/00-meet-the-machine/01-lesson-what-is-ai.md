---
title: What is AI?
kind: lesson
minutes: 15
---
Meet **Amina**. She runs a small bakery. Every day, customers send her messages: "Do you have gluten-free bread?", "When do you close on Sunday?", "Can I order a cake for Friday?"

Amina is busy kneading dough. She wishes she had a helper who could answer these messages. In this course, we will build that helper together. We will call it **BakeBuddy**. But first, we need to understand what the helper really is.

## Two ways to teach a computer

Imagine you want a computer to tell cats from dogs in photos.

**Way 1: write the rules.** You write: "If it has pointy ears and whiskers, it is a cat." But many dogs have pointy ears too. You will never finish the list of rules.

**Way 2: show examples.** You show the computer one million photos. Each one is marked "cat" or "dog". The computer finds the patterns by itself.

Way 2 is called **machine learning**. The computer **learns** from examples instead of following rules that a person wrote.

> 🧠 **Remember:** In normal programming, you write the rules. In machine learning, you show examples and the computer finds the rules.

## The three words, from big to small

People use three words as if they mean the same thing. They do not. Think of three boxes, one inside the other.

| Word | What it means | Example |
| --- | --- | --- |
| **AI** (artificial intelligence) | Any computer system that does something we think needs human smarts | A chess program, a photo app that finds faces |
| **Machine learning** | AI that learns from examples | A spam filter that learned from millions of emails |
| **Language model** | Machine learning that works with text | The chat assistants you may already know |

So a language model is one kind of machine learning. Machine learning is one kind of AI. This course is about language models.

## What is a language model?

A **language model** is a computer program that has read a huge amount of text. Books, websites, articles, code. From all that reading, it learned which words tend to follow which other words.

Then you give it some text, and it writes more text. That is the whole trick. We will look at it closely in the next lesson.

The assistants you can chat with, like Claude or ChatGPT, are built on language models. Often people say **LLM**, which means **large language model**. "Large" means it learned from a very big amount of text.

### What a language model is not

This is important. Two wrong pictures cause many mistakes.

- **It is not a person.** It does not know you. It does not have feelings or a life. It writes text that sounds human because it learned from human text.
- **It is not a search engine.** A search engine finds pages that already exist. A language model **writes new text** each time. It does not look things up on the internet unless the app around it adds that feature.

> ⚠️ **Watch out:** Because the text sounds friendly and sure, it is tempting to trust it too much. We will practise checking its answers all through this course.

## Where the picture stops being true

"A computer that learned from examples" is a good picture. But a child who learns also understands why things are true. A language model learns patterns in text. Scientists still argue about how much "understanding" is inside. For us, the useful rule is: **treat it like a very fast helper that is often right, and sometimes wrong.**

## Try it

Look at your phone or computer. Find three things that you think use machine learning. Hints: the keyboard that guesses your next word, a video app that suggests what to watch, a photo app that groups faces.

Write the three things down. For each one, ask: what examples could it have learned from?

## Check your understanding

1. In one sentence, what is the difference between normal programming and machine learning?
2. Which is the biggest box: AI, machine learning or language model?
3. Name one thing a language model is not.
4. Amina asks the AI "What time does my bakery close?" Why can the model not know this by itself?

<details><summary>Show answers</summary>

1. In normal programming, a person writes the rules. In machine learning, the computer finds the rules from examples.
2. AI is the biggest box. Machine learning is inside it, and language models are inside machine learning.
3. It is not a person, and it is not a search engine.
4. The model learned from general text. Amina's opening hours were not in that text, so it has nothing to base the answer on. We will fix this later in the course.

</details>

> 🧠 **Remember:**
> - A language model is machine learning that works with text.
> - It writes new text. It does not look things up, and it is not a person.
> - It knows general things, but nothing about your business yet.

## Go deeper

- [Anthropic: Claude documentation](https://docs.claude.com)
- [Google: Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
