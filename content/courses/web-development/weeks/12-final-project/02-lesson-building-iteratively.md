---
title: Building in small steps, with feedback
kind: lesson
minutes: 35
---
Imagine you must eat a very large cake. You do not push it all into your mouth. You cut it into small slices and eat one slice at a time.

A big project is the same. You have a plan. Now how do you turn it into a working app without feeling lost? In this lesson you learn to cut your work into small tasks on GitHub. You build one piece at a time, ask for code review, and write a README that shows your project at its best.

## From plan to tasks

A user story like "As a cook, I want to search recipes by name" is still too big to code in one go. Break it into **tasks**. Each task should be small enough to finish in one session, an hour or two.

This is the decomposition skill from week 9. Now you use it on a whole project.

```text
Story: search recipes by name
  Task 1: add a search input with a label to the HTML
  Task 2: listen for the input event and log what was typed
  Task 3: filter the recipes array by name (ignore capital letters)
  Task 4: render only the filtered recipes
  Task 5: show "No recipes found" when the list is empty
```

Each task ends with something you can see or test. So you always know when you are done.

## GitHub issues: your to-do list

Every GitHub repository has a built-in to-do list. It is called **Issues**. Professional teams use issues (or similar tools) to track every piece of work.

To create one:

1. Open your repository on GitHub. Click the **Issues** tab.
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

You can add **labels** like `mvp` or `stretch` to keep things organised. When you finish an issue, close it. It feels good to watch the list of open issues get shorter.

> 💡 **Tip:** Write `Closes #3` in a commit message (3 is the issue number). When you push, GitHub closes the issue for you and links it to your code.

## Work iteratively

**Iterative** means building in loops: build a small piece, check it works, improve it, and repeat.

Think of painting a wall. You put one thin coat over the whole wall. You let it dry. Then you add another coat. You do not finish one corner perfectly while the rest stays bare.

A good order for most projects:

1. **Skeleton.** Write the HTML structure with example content typed in. Push and deploy to GitHub Pages at once.
2. **Data and render.** Move the content into an array of objects. Render it with JavaScript.
3. **Interaction.** Add the events: search, filters, forms.
4. **Style.** Make it look good and work on a phone.
5. **Polish.** Add empty states, error messages and accessibility checks.
6. **Stretch goals.** Do these only if everything above works.

Deploy on day one. Then you always have a live link. If something breaks, you notice quickly.

## Commit little and often

Make a commit every time you finish a small task. A good commit message says *what* changed, in the present tense:

```bash
git add .
git commit -m "Add search input and filter recipes by name"
git push
```

Small commits are like save points in a video game. If you break something badly, you go back to the last good point. You do not start the level again.

> ⚠️ **Watch out:** Avoid messages like "update", "fix" or "stuff". In two weeks you will not remember what they mean. A reviewer will not know either.

## Asking for code review

**Code review** is when another developer reads your code and gives feedback. In real jobs, almost no code goes live without a review.

A review is not a test that you can fail. It is a conversation that makes the code, and you, better.

### Help the reviewer

- Share the **repository link** and the **live link**.
- Say **what you want feedback on**. "Is my render function too long?" is better than "Any thoughts?"
- Point to the **file** or lines you mean.
- Say what you **know is unfinished**, so the reviewer does not waste time on it.

```text
Hi! Could you review my recipe box?
Live: https://yourname.github.io/recipe-box
Repo: https://github.com/yourname/recipe-box
I'd love feedback on script.js, especially the filter logic (lines 20-45).
I know the mobile layout isn't finished yet.
```

### When you receive feedback

- Say thank you. Someone gave you their time.
- If you do not understand a comment, ask: "Could you explain what you mean by...?" This is a great question.
- You do not have to agree with everything. If you disagree, explain your reasons politely.
- Make the changes in small commits. Reply to say what you changed.

> 🧠 **Remember:** Feedback is about the code, not about you. Even very senior developers hear "could you rename this?" on almost every piece of work.

You can also review a classmate's project. Reading other people's code is one of the fastest ways to learn new tricks.

## Write a great README

Your `README.md` is the front door of your project. It is the first thing a visitor, or an employer, sees on GitHub. A good README answers four questions:

- What is this?
- Can I see it?
- How does it work?
- Who made it?

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

To add a screenshot, take one and save it as `screenshot.png` in your project folder. Commit it. Then use the line `![description](screenshot.png)`. The text in the square brackets describes the image for people who use screen readers.

## Try it

1. Create your project repository on GitHub with an `index.html` and a short README.
2. Turn on GitHub Pages. Check that the live link works.
3. Create at least four issues: one for each MVP user story, each with a task checklist. Add an `mvp` label.
4. Finish the first task. Commit with a clear message. Push.

## Check your understanding

1. Why should each task be small enough to finish in one session?
2. What does it mean to work iteratively?
3. Name two things that help the reviewer in a code review request.
4. What should a good README include?

<details><summary>Show answers</summary>

1. So you can finish it, test it and commit it, and always know when you are done. Small tasks also stop you from feeling overwhelmed.
2. Building in small loops: build a little, check it works, improve it, and repeat. You do not try to finish everything at once.
3. Any two of: sharing the repo and live links, saying what you want feedback on, pointing to specific files or lines, saying what is unfinished.
4. What the project is, a live link, a screenshot, its main features, what it is built with, and (optionally) what you learned and what is next.

</details>

## Go deeper

- [About issues (GitHub Docs)](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Basic writing and formatting syntax (GitHub Docs)](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [How to write a good README (freeCodeCamp)](https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/)
