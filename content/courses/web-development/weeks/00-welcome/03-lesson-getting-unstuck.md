---
title: How to get unstuck and ask good questions
kind: lesson
minutes: 25
---
Imagine you are lost in a new town. You do not sit down and cry. You check the map, read the signs, and ask a person. You have a plan.

Every programmer gets stuck, every day. An experienced developer does not get stuck less. They have a **plan** for what to do next. In this lesson you learn that plan.

## Being stuck is part of the job

When your code does not work, it can feel like your fault. It is not. A bug is a puzzle. Some puzzles take five minutes. Some take a day.

We call problems that stop you **blockers**. You cannot avoid blockers. You can learn to get past them.

Here is a four-step routine. Try the steps in order.

## Step 1: Talk to the rubber duck

Many developers keep a small rubber duck on their desk. When they are stuck, they explain their code to the duck, **line by line, out loud**.

It sounds silly, but it often works. When you explain slowly, you notice things you assumed but never checked. "This line shows the heading... and this line... oh! I forgot to close the tag."

No duck? Use a plant, a pet, or a notebook.

### Try it

This HTML has a mistake. Explain each line to your "duck" out loud. Can you find the problem?

```html
<h1>My favourite foods</h1>
<p>I love jollof rice.
<p>I also love plantain.</p>
<a href="https://developer.mozilla.org">Learn more</p>
```

<details><summary>Show the problem</summary>

The link starts with `<a>` but ends with `</p>`. It should end with `</a>`.

Also, the first paragraph has no closing `</p>`. Browsers often forgive this, but it is good practice to close it.

</details>

## Step 2: Read the error

When something goes wrong, the computer often tells you **what** went wrong and **where**. Beginners often panic and skip the message. Slow down. Read it word by word.

An error message usually has two parts:

- **What happened.** For example: "Uncaught ReferenceError: nmae is not defined".
- **Where it happened.** For example: a file name and line number, like `script.js:3`.

So you go to line 3 of `script.js` and look at `nmae`. It is a typo for `name`.

> 💡 **Tip:** To see errors, open the **Console** tab in Chrome DevTools. Red text there is a clue to help you.

### Check the basics first

Ask yourself:

- Did I **save** the file?
- Did I **refresh** the browser?
- Am I editing the **same file** that the browser shows?

Many problems end here. "I forgot to save" is very common.

## Step 3: Search well

Developers search the web all day. Good searching is a skill. These tips help:

- **Name the technology.** "html image not showing" is better than "picture not showing".
- **Use the error message.** Copy the important part. Remove your own file names and words.
- **Pick good sources.** MDN Web Docs is the most trusted reference for HTML, CSS and JavaScript. Add "mdn" to your search, for example "mdn img alt".
- **Check the date.** Web technology changes. An answer from 2010 may be old.

### Try it

Search for "mdn a element". Open the MDN page. Find the list of **attributes** (extra settings) for the `<a>` element. What does the `href` attribute do?

## Step 4: Ask for help, with context

Try steps 1 to 3 for about **20 to 30 minutes**. If you are still stuck, ask. Do not wait for days. Asking is a skill, not a weakness.

Think of calling a doctor. "I feel bad" is hard to help with. "I have had a headache since Monday and tablets do not help" is much better.

### A bad question

> "My code doesn't work. Help?"

The helper does not know what you are building, what you tried, or what "doesn't work" means. They must ask you five questions first.

### A good question

A good question has four parts:

1. **What I am trying to do:** "I want to show a photo of my cat on my About Me page."
2. **What I expected:** "I expected the photo to appear under the heading."
3. **What actually happens:** "I see a small broken image icon."
4. **What I already tried:** "I saved the file and searched 'html image not showing'. I think the file path is wrong, but I am not sure."

Then add your code. Copy and paste the text. Do not send only a photo of your screen. A screenshot can help too.

> 🧠 **Remember:** While you write a good question, you often find the answer yourself. That is the rubber duck working again.

## Helping others helps you

If you see a question from another learner and you know the answer, reply. When you explain something to someone, you learn it better.

> ⚠️ **Watch out:** There are no stupid questions here. If you are confused, someone else probably is too. Your question helps them as well.

## Check your understanding

1. What is rubber duck debugging?
2. Name two things an error message usually tells you.
3. What are three things to check before you search?
4. What are the four parts of a good question?
5. How long should you stay stuck before you ask for help?

<details><summary>Show answers</summary>

1. Explaining your code line by line, out loud, to an object like a rubber duck. It helps you notice your own mistakes.
2. What went wrong, and where it happened (file name and line number).
3. Did I save the file? Did I refresh the browser? Am I editing the same file the browser shows?
4. What I am trying to do, what I expected, what actually happens, and what I already tried.
5. About 20 to 30 minutes of real effort. Do not wait days.

</details>

## Go deeper

- [MDN: Learning and getting help](https://developer.mozilla.org/en-US/docs/Learn/Learning_and_getting_help)
- [javascript.info: Developer console](https://javascript.info/devtools)
- [MDN Web Docs home](https://developer.mozilla.org/en-US/)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
