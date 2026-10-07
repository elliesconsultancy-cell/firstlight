---
title: Final project, your own AI product
kind: assignment
submission: link
---
## What you'll build

This is your final project. You will build and ship **your own** AI product, one that you plan yourself in the first lesson of this week. It can be a helper for a shop, a school, a club, a hobby or a job you know well. It must be small, useful for one kind of person, and live on the internet.

You may reuse BakeBuddy code. The idea, system prompt and data must be yours.

## Requirements

- [ ] The product is online at a `.vercel.app` link (or your own domain), and the link works when you are signed out
- [ ] Your API key is private: it is only in `.env` and Vercel environment variables, and not in the page source, the code or the GitHub history
- [ ] `.env` is listed in `.gitignore`
- [ ] The app has a clear system prompt, with a role, what it answers, what it must not do, and what to say when it does not know
- [ ] The app handles errors with a friendly message: empty input, very long input, a failing API call, and too many requests
- [ ] `max_tokens` is set, the history is trimmed, and a rate limit is on
- [ ] You set a spending limit in your provider account
- [ ] You have a `tests.js` list with at least five test questions, including one injection attempt, and `npm test` runs them
- [ ] The README has: your one-sentence product, who it is for, how to run it, how to set up the key, and your test results
- [ ] You can give a two-minute demo explanation (see below)

## Steps/hints

1. Use your plan from the first lesson: one sentence, one user, one main feature, system prompt draft and five test questions.
2. Copy your working BakeBuddy project into a new folder. Change the data, the system prompt and the page text.
3. Run it on your computer. Run `npm test`. Fix the failures.
4. Check the safety list: message validation, `max_tokens`, `trimHistory`, `rateLimit`, tags around the customer's message.
5. Follow "Put it online": `public` folder, `export default app`, push to GitHub, import in Vercel, add `ANTHROPIC_API_KEY`, deploy.
6. Test the live site with your test questions. View the page source and confirm there is no key.
7. Write the README. Keep it short: what, who, how to run, what you tested, what you would add next.

### Your two-minute demo

Prepare a two-minute explanation. Write it in your README or say it to a friend. Cover:

1. What the product is and who it is for (the one sentence)
2. A live example: ask it one question and show the answer
3. How it works, using words from this course: the system prompt, the server that hides the key, and your data or tool
4. One thing that went wrong and how you fixed it
5. One thing you would add next

> ⚠️ **Watch out:** Never paste your API key into the README, into an issue, or into a screenshot. If you think it leaked, delete it in your provider account and create a new one.

## How to submit

Submit **two links** in the link box:

1. The link to your live site (the `.vercel.app` address)
2. The link to your GitHub repository

If the form takes one link, paste the GitHub link and put the live link on the first line of your README.

## Stretch goals

- Add a tool, as in week 6, that checks live data.
- Ask three real people to use your product and write down what they asked. Add their best question to your tests.

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Build and deploy their own small AI product.
- Show that the key, limits and tests are in place.
- Explain the product with words from this course.

### Purpose
This is the proof of the whole course. Each learner leaves with a live product and a story they can tell to an employer or a friend.

### Things to do
1. **Launch.** Ask learners to open their plan from "Plan your product". Remind them the idea, prompt and data must be their own, but BakeBuddy code may be reused.
2. **Demonstrate the safety pass.** Walk through the list: validation, `max_tokens`, `trimHistory`, `rateLimit`, tags. Then the deploy steps from "Put it online".
3. **Demonstrate the live check.** Open a deployed site, ask a question, try an injection test, view page source for the key.
4. **Run a showcase.** Each learner shows the live link, asks it one question, explains how it works, shares one thing that went wrong and one next step. Others watch and note one thing they liked. The instructor goes last with feedback. Keep it friendly, and let someone else drive if a learner is nervous.

### What good work looks like
- The `.vercel.app` link works when signed out, and the key is not in the page source, code or history.
- `.env` is in `.gitignore`, and a spending limit is set.
- The system prompt has a role, what it answers, what it must not do and what to say when it does not know.
- Friendly errors for empty, long, failed and too many requests, plus `max_tokens`, a trimmed history and a rate limit.
- `tests.js` has five or more tests with one injection, `npm test` runs, and the README has the sentence, the user, how to run it and the results.

### Giving feedback
- Start with one real strength, then give one or two changes. Be specific: "your system prompt says what to do when it does not know" works better than "good".
- Ask a question when you can: "What happens if someone pastes a very long message?"
- Frame problems as next steps. Never ask a learner to fix everything at once.
- Safety problems come first, in private, and a leaked key means a new key at once.

### Watch for
- Projects too big to finish. Help cut to the main feature.
- A key in a screenshot or README.
- A demo that skips the problem and fix. Ask for it, it is often the best part.
