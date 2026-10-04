---
title: Building in small steps, with feedback
kind: lesson
minutes: 35
---
You have a plan. Now, how do you turn it into a working app without getting lost or overwhelmed? In this lesson you will learn to split your work into small tasks on GitHub, build one piece at a time, ask for code review, and write a README that shows your project at its best.

## From plan to tasks

A user story like "As a cook, I want to search recipes by name" is still too big to sit down and code. Break it into **tasks**, each small enough to finish in one session (an hour or two). This is the decomposition skill from week 9, applied to a whole project.

```text
Story: search recipes by name
  Task 1: add a search input with a label to the HTML
  Task 2: listen for the input event and log what was typed
  Task 3: filter the recipes array by name (ignore capital letters)
  Task 4: render only the filtered recipes
  Task 5: show "No recipes found" when the list is empty
```

Each task ends with something you can see or test. That is important: you always know if you are done.

## GitHub issues: your to-do list

GitHub has a built-in to-do list for every repository, called **Issues**. Professional teams use issues (or similar tools) to track every piece of work.

To create one:

1. Open your repository on GitHub and click the **Issues** tab.
2. Click **New issue**.
3. Give it a short, clear title, like "Search recipes by name".
4. In the description, write the user story and a checklist of tasks.

GitHub turns Markdown checklists into real tick boxes:

```text
As a cook, I want to search recipes by name, so that I can find one quickly.

- [ ] Add a search input with a label
- [ ] Filter recipes as the user types
- [ ] Show "No recipes found" when nothing matches
```

You can add **labels** like `mvp` or `stretch` to keep things organised. When you finish an issue, close it. Watching the list of open issues shrink is very motivating!

> 💡 **Tip:** Write `Closes #3` in a commit message (where 3 is the issue number). When you push, GitHub closes the issue for you and links it to your code.

## Work iteratively

**Iterative** means building in loops: build a small piece, check it works, improve, repeat. It is like painting a wall: one thin coat all over, let it dry, then another coat. Not one corner finished perfectly while the rest is bare.

A good order for most projects:

1. **Skeleton:** HTML structure with hard-coded example content. Push and deploy to GitHub Pages straight away.
2. **Data and render:** move the content into an array of objects and render it with JavaScript.
3. **Interaction:** add the events: search, filters, forms.
4. **Style:** make it look good and work on a phone.
5. **Polish:** empty states, error messages, accessibility checks.
6. **Stretch goals,** only if everything above works.

Deploying on day one means you always have a live link. If something breaks, you will notice quickly.

## Commit little and often

Make a commit every time you finish a small task. Good commit messages say *what* changed, in the present tense:

```bash
git add .
git commit -m "Add search input and filter recipes by name"
git push
```

Small commits are like save points in a video game. If you break something badly, you can go back to the last good point instead of starting the level again.

> ⚠️ **Watch out:** Avoid messages like "update", "fix" or "stuff". In two weeks, you will not remember what they mean, and neither will a reviewer.

## Asking for code review

**Code review** is when another developer reads your code and gives feedback. In real jobs, almost no code goes live without a review. It is not a test you can fail. It is a conversation that makes the code, and you, better.

When you ask for a review, make it easy for the reviewer:

- Share the **repository link** and the **live link**.
- Say **what you want feedback on**: "Is my render function too long?" is better than "Any thoughts?"
- Point to the **specific file** or lines.
- Mention anything you **know is unfinished**, so they do not waste time on it.

```text
Hi! Could you review my recipe box?
Live: https://yourname.github.io/recipe-box
Repo: https://github.com/yourname/recipe-box
I'd love feedback on script.js, especially the filter logic (lines 20-45).
I know the mobile layout isn't finished yet.
```

When you receive feedback:

- Say thank you. Someone gave you their time.
- If you do not understand a comment, ask. "Could you explain what you mean by...?" is a great question.
- You do not have to agree with everything, but explain your reasons politely.
- Make the changes in small commits, and reply to say what you changed.

> 🧠 **Remember:** Feedback is about the code, not about you. Even very senior developers get "could you rename this?" on almost every piece of work.

You can also review a classmate's project. Reading other people's code is one of the fastest ways to learn new tricks.

## Write a great README

Your `README.md` is the front door of your project. It is the first thing a visitor, or an employer, sees on GitHub. A good README answers: what is this, can I see it, how does it work, and who made it?

````text
# Recipe Box

A simple recipe app for busy families. Search recipes by name,
filter by cooking time, and see the ingredients at a glance.

**Live site:** https://yourname.github.io/recipe-box

![Screenshot of Recipe Box on desktop](screenshot.png)

## Features
- Search recipes by name
- Filter vegetarian recipes and recipes under 30 minutes
- Add your own recipes with a form

## Built with
HTML, CSS and JavaScript (no frameworks).

## What I learned
How to use the state and render pattern, and how to filter
an array of objects by more than one condition.

## Next steps
- Save recipes with localStorage
- Add photos from a free image API
````

To add a screenshot: take one, save it as `screenshot.png` in your project folder, commit it, and use the `![description](screenshot.png)` line. The text in the square brackets describes the image for people using screen readers.

### Try it

1. Create your project repository on GitHub with an `index.html` and a short README.
2. Turn on GitHub Pages and check the live link works.
3. Create at least four issues: one for each MVP user story, each with a task checklist. Add an `mvp` label.
4. Complete the first task, commit with a clear message, and push.

## Check your understanding

1. Why should each task be small enough to finish in one session?
2. What does it mean to work iteratively?
3. Name two things that make a code review request easy for the reviewer.
4. What should a good README include?

<details><summary>Show answers</summary>

1. So you can finish it, test it and commit it, and always know when you are done. Small tasks also keep you from feeling overwhelmed.
2. Building in small loops: build a little, check it works, improve it, and repeat, instead of trying to finish everything at once.
3. Any two of: sharing the repo and live links, saying what you want feedback on, pointing to specific files or lines, mentioning what is unfinished.
4. What the project is, a live link, a screenshot, its main features, what it is built with, and optionally what you learned and what is next.

</details>

## Go deeper

- [About issues (GitHub Docs)](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Basic writing and formatting syntax (GitHub Docs)](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [How to write a good README (freeCodeCamp)](https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/)
