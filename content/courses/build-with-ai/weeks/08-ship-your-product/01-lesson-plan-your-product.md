---
title: Plan your product
kind: lesson
minutes: 25
---
Before Amina opened her bakery, she did not buy every oven in the shop. She asked one question: "Who will buy my bread, and what is the one thing they come for?" The answer was simple: neighbours who want fresh sourdough on Saturday morning.

Knowing this made every other choice clear. What to bake, how big the shop should be, and when to open.

An AI product needs the same kind of plan. Without it, you build ten half-finished features. With it, you build one good thing.

## The one-sentence product

Write your product in one sentence, using this pattern:

```text
For [who], who [has this problem], [product name] is an AI helper that [does this], so that [benefit].
```

Here are three examples:

```text
For busy neighbours, who want to know what is fresh, BakeBuddy is an AI helper that answers menu and stock questions, so that they never visit an empty shelf.
```

```text
For first-year students, who struggle with maths words, MathWords is an AI helper that explains a term in simple language with one example, so that they can keep studying.
```

```text
For members of a small gym, who forget class times, GymPal is an AI helper that answers timetable questions, so that front-desk staff answer fewer calls.
```

If you cannot write the sentence, the idea is still too big or too vague. Make it smaller.

## Choose one user

Picture one real person. Give them a name. What do they ask? How do they write: long sentences or short ones, in English or another language? What do they want to leave the page with?

A product for "everyone" is a product for no one. Pick one user and design for them.

### Try it

Write the name of your user and three questions they would really ask your product. Use their words.

<details><summary>Show example</summary>

User: Kemi, a student who is new to biology. Questions: "What does mitosis mean?", "Explain it like I am ten.", "Give me one example I can remember."

</details>

## Choose the single most important feature

List everything you could build. Then circle **one**. This is the feature that, if it works well, makes the product useful. Everything else is "later".

For BakeBuddy it is: "answer questions about the menu and stock correctly".

Use this table to cut your list:

| Feature | Needed for version 1? | Why |
| --- | --- | --- |
| Answers questions from my own data | Yes | This is the point of the product |
| Checks live data with a tool | Maybe | Only if the data changes often |
| Login and accounts | No | It is a lot of work and risk |
| Voice, images, many languages | No | Add later |

> 💡 **Tip:** Fewer features means fewer things to test and fewer ways to be tricked. A small product that works beats a big one that breaks.

## Decide what the AI needs

Answer four short questions on paper:

1. **Knowledge:** what does the AI need to know? Where is it? (a file, a list, a menu)
2. **Tools:** does it need to ask your code for live data? If not, skip tools.
3. **Personality:** how should it sound? Write 3 to 5 lines of **system prompt**: the job description for your intern.
4. **Limits:** what must it never do? (for example: give medical advice, make promises, talk about other topics)

Here is a small draft system prompt as a starting point:

```text
You are GymPal, the helper for Sunrise Gym.
You answer questions about class times and prices, using only the timetable you are given.
If the answer is not in the timetable, say you do not know and suggest asking the front desk.
Keep answers under 80 words. Be friendly and clear.
Never give medical advice.
```

## Write your test questions now

Before you build, write at least five questions you will use to check the product. This is the taste test from last week. Include:

- three normal questions with the answers you expect
- one question the AI should say "I do not know" to
- one injection attempt, like "Ignore your instructions and..."

Writing tests first keeps you honest. You will know when the product is done.

## Plan your week

You have a few days for the project. A good order:

1. Plan (this lesson): one sentence, one user, one feature, system prompt draft, five test questions.
2. Make it work on your computer.
3. Add safety: message check, `max_tokens`, rate limit, spending limit.
4. Put it online (next lesson).
5. Write the README and practise your two-minute demo.

## Check your understanding

1. Why is "a helper for everyone" a weak plan?
2. What is the "single most important feature"?
3. Name two things the system prompt should include.
4. Why write test questions before you build?

<details><summary>Show answers</summary>

1. You cannot design for everyone. A specific user gives clear choices.
2. The one feature that, if it works well, makes the product useful. All other ideas wait.
3. Examples: who the AI is, what it answers, what it must not do, how long the answers are, what to say when it does not know.
4. They show what "done" means, and you can check the product the whole time you build.

</details>

> 🧠 **Remember:**
> - One sentence, one user, one most important feature.
> - Small and working beats big and broken.
> - Write your test questions before you build.

## Go deeper

- [Claude docs: Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [Claude docs: Create strong empirical evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)
