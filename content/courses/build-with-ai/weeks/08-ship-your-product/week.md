---
title: Ship your product
summary: Plan your own AI product, put it on the internet with GitHub and Vercel, and show it to the world.
---
You have learned how an AI reads, how to talk to it, how to call it from a server, how to give it knowledge and tools, and how to keep it safe. Now comes the best part: you build something of your own and put it online.

This week has two lessons and one big project. First, we plan. A good plan fits in one sentence and names one user and one main feature. A small product that works is better than a big one that does not.

Then we **deploy**. That means we put your server on a computer that is always on, so anyone with the link can use it. We use GitHub and Vercel. The most important rule: your API key stays private, even online.

## By the end of this week you will be able to

- Describe your product in one sentence, with a clear user and one most important feature
- Push a project to GitHub without leaking your API key
- Deploy an Express app to Vercel from GitHub
- Set `ANTHROPIC_API_KEY` as an environment variable in your Vercel project
- Check that your live site works, and explain your product in two minutes

## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: Plan your product
- [ ] Read: Put it online

**Do**
- [ ] Write your one-sentence product, name one user, and write five test questions
- [ ] Check that `.env` is in `.gitignore`, then push your project to GitHub
- [ ] Import the repository in Vercel, add `ANTHROPIC_API_KEY` and deploy
- [ ] Finish the assignment: Final project, your own AI product

**Share**
- [ ] Submit your live link and your GitHub link
- [ ] Present your product and read your instructor's feedback

<!-- instructor -->
## Day plan

### Learning objectives
- Describe a product in one sentence with one user and one main feature.
- Push to GitHub without leaking the API key.
- Deploy an Express app to Vercel and set the environment variable.
- Check a live site and explain how it works in the course's words.

### Purpose
This is the last week. Learners bring together everything: prompts, API calls, memory, retrieval, tools, safety and tests. They finish with a product online that they can show.

### Agenda
1. **Plan your product.** Teach the one-sentence pattern, one user and one feature. Learners write their sentence, name their user and draft five test questions. Check that every idea is small.
2. **Put it online.** Teach the key rule, the `public` folder and `export default app`. Learners push to GitHub and deploy, then view page source to check for the key. Help anyone who is stuck.
3. **Final project, your own AI product.** Launch it and demonstrate the safety pass. Learners finish, test the live site and write the README. Run the showcase, then give feedback.

## End of sprint review

Tick each one when you have seen it.

- [ ] Every learner has a one-sentence product and a named user.
- [ ] Every learner's site opens at a `.vercel.app` link when signed out.
- [ ] No API key is in any page source, repository or README, and `.env` is in `.gitignore`.
- [ ] Every learner has set a spending limit in their account.
- [ ] Every project has friendly errors, `max_tokens`, a rate limit and a trimmed history.
- [ ] Every learner has five or more tests, including an injection attempt, and `npm test` runs.
- [ ] Every learner has shown their product and explained how it works.
- [ ] Every learner has had feedback on the assignment.
