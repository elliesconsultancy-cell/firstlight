---
title: How to get unstuck and ask good questions
kind: lesson
minutes: 25
---
Every programmer gets stuck. Every day. The difference between a beginner and an experienced developer is not that the experienced one never gets stuck. It is that they have a **plan** for what to do next.

## Being stuck is part of the job

When your code does not work, it can feel like a personal failure. It is not. A bug is just a puzzle. Some puzzles take five minutes, some take a day.

In this course we call problems that stop your progress **blockers**. Your goal is not to avoid blockers. Your goal is to get through them.

Here is a simple four-step routine. Try the steps in order.

## Step 1: Talk to the rubber duck

Many developers keep a small rubber duck (or any toy) on their desk. When they are stuck, they explain their code to the duck, **line by line, out loud**.

It sounds silly, but it works surprisingly often. When you explain something slowly, you notice the thing you assumed but never checked. "This line shows the heading... and this line... oh! I forgot to close the tag."

No duck? Explain it to a plant, a pet, or write it down in a notebook.

### Try it

Here is some HTML with a mistake. Explain each line to your "duck" out loud. Can you find the problem?

```html
<h1>My favourite foods</h1>
<p>I love jollof rice.
<p>I also love plantain.</p>
<a href="https://developer.mozilla.org">Learn more</p>
```

<details><summary>Show the problem</summary>

The link starts with `<a>` but ends with `</p>`. It should end with `</a>`. Also, the first paragraph is missing its closing `</p>`. (Browsers often forgive this one, but it is good practice to close it.)

</details>

## Step 2: Read the error (really read it)

When something goes wrong, computers often tell you **what** went wrong and **where**. Beginners often panic and skip the message. Slow down and read it, word by word.

An error message usually has:

- **What happened**, for example "Uncaught ReferenceError: nmae is not defined"
- **Where it happened**, for example a file name and line number like `script.js:3`

That tells you: go to line 3 of `script.js`, and look at `nmae`. Oh, it is a typo for `name`!

> 💡 **Tip:** If you see an error, look in Chrome DevTools in the **Console** tab. Red text there is a clue, not an insult.

Also check the simple things first:

- Did you **save** the file?
- Did you **refresh** the browser?
- Are you editing the **same file** that the browser is showing?

You would be amazed how often the answer is "I forgot to save".

## Step 3: Search well

Developers search the web all day. Good searching is a skill.

Tips for better searches:

- **Include the technology:** "html image not showing" is better than "picture not showing".
- **Copy the important part of the error:** search for the exact error message, but remove your own file names or words.
- **Prefer good sources:** MDN Web Docs is the most trusted reference for HTML, CSS and JavaScript. Adding "mdn" to your search often helps, for example "mdn img alt".
- **Check the date:** web technology changes. An answer from 2010 might be outdated.

### Try it

Search for "mdn a element". Open the MDN result. Find the section that lists the **attributes** of the `<a>` element. Can you find what the `href` attribute does?

## Step 4: Ask for help, with context

If you have tried the first three steps for about **20 to 30 minutes** and you are still stuck, it is time to ask. Do not wait for days! Asking is a skill, not a weakness.

A bad question looks like this:

> "My code doesn't work. Help?"

The person helping has no idea what you are building, what you tried, or what "doesn't work" means. They will have to ask you five questions before they can help.

A good question has four parts:

1. **What I am trying to do:** "I want to show a photo of my cat on my About Me page."
2. **What I expected:** "I expected the photo to appear under the heading."
3. **What actually happens:** "I see a small broken image icon instead."
4. **What I already tried:** "I checked the file is saved, and I searched 'html image not showing'. I think the file path is wrong but I am not sure."

Then add your code (copy and paste the text, do not only send a photo of your screen) and, if useful, a screenshot.

> 🧠 **Remember:** Very often, while writing a good question, you find the answer yourself. That is the rubber duck working again!

## Helping others helps you

When you see another learner's question and you think you know the answer, reply! Explaining something to someone else is one of the best ways to learn it yourself.

> ⚠️ **Watch out:** There are no stupid questions on this course. If you are confused, someone else probably is too. Your question helps them as well.

## Check your understanding

1. What is rubber duck debugging?
2. Name two things an error message usually tells you.
3. What are three simple things to check before searching?
4. What are the four parts of a good question?
5. How long should you stay stuck before asking for help?

<details><summary>Show answers</summary>

1. Explaining your code line by line, out loud, to an object (like a rubber duck). It helps you notice your own mistakes.
2. What went wrong, and where it happened (file name and line number).
3. Did I save the file? Did I refresh the browser? Am I editing the same file the browser is showing?
4. What I am trying to do, what I expected, what actually happens, and what I already tried.
5. About 20 to 30 minutes of real effort. Do not wait days.

</details>

## Go deeper

- [MDN: Learning and getting help](https://developer.mozilla.org/en-US/docs/Learn/Learning_and_getting_help)
- [javascript.info: Developer console](https://javascript.info/devtools)
- [MDN Web Docs home](https://developer.mozilla.org/en-US/)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
