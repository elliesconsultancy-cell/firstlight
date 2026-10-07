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

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Explain the difference between normal programming and machine learning in one sentence.
- Place AI, machine learning and language model as three boxes, one inside the other.
- Say two things a language model is not.

### Purpose
Learners will meet AI at work as a tool, a rumour and a sales pitch. If they hold the right picture from day one, they will trust it the right amount.

### Things to teach
1. **Rules versus examples.** Use the cat and dog photos. Writing rules never ends. Showing a million marked photos lets the computer find the rules itself. That is machine learning.
2. **Three boxes.** Draw them: AI is the biggest, machine learning is inside it, language model is inside that. Use the lesson's examples: chess program, spam filter, chat assistant.
3. **Not a person.** It writes human-sounding text because it learned from human text. It has no feelings and does not know the learner.
4. **Not a search engine.** A search engine finds pages that exist. A language model writes new text each time. Ask: what happens if Amina asks it her closing time? It has nothing to base the answer on.
5. **Say it out loud.** "Treat it like a very fast helper that is often right and sometimes wrong."

### Check understanding
- Ask: "What is the difference between normal programming and machine learning?" A good answer: in programming a person writes the rules; in machine learning the computer finds them from examples.
- Ask: "Which box is biggest?" A good answer: AI. Machine learning sits inside it, and language models sit inside that.
- Ask: "Why can the model not know when Amina's bakery closes?" A good answer: that fact was never in its general text, so it can only guess.

### Watch for
- Learners treat the AI as a search engine or a person who "knows" them. Say: it writes new text from patterns, it does not look things up unless the app adds that.
- Learners use "AI", "machine learning" and "LLM" as the same word. Go back to the three boxes.
