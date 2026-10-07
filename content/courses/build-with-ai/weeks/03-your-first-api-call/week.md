---
title: Your first API call
summary: Learn what an API is, keep your secret key safe, and write a small Node script that talks to an AI model and prints its reply.
---
Until now you have talked to AI in a chat window that someone else built. This week you will talk to the AI **from your own code**. That is the moment you stop being only a user and become a builder.

To do this, you need an **API**. We will see what an API is with a picture from a restaurant, and then try a real one that needs no key. After that you will learn how to keep your **API key** safe. This is very important, because a key also opens your wallet.

Then you will write your first Node script. It sends one question to an AI model and prints the answer. You will also read the reply carefully, because it tells you how many tokens you used.

Finally, you will give **BakeBuddy** its first words. You will meet Amina's helper in code. If you prefer, you may use your own idea (a gym, a school, a shop) instead of a bakery.

## By the end of this week you will be able to

- Explain what an API is, using the picture of a waiter
- Read an HTTP request and response made of a URL, headers, a body and a status code
- Store an API key in a `.env` file and keep it out of Git
- Write a Node script that calls the Messages API with `fetch` and prints the reply
- Read the `usage` numbers and the error messages that come back

## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: What is an API?
- [ ] Read: API keys and secrets
- [ ] Read: Call the model

**Do**
- [ ] Create a `.env` file with your key and add `.env` to `.gitignore`
- [ ] Set a spend limit in the Claude Console
- [ ] Run `hello.js` with `node --env-file=.env hello.js`
- [ ] Finish the assignment: BakeBuddy says hello

**Share**
- [ ] Submit your work and read your instructor's feedback

<!-- instructor -->
## Day plan

### Learning objectives
- Explain an API with the waiter picture and read a status code
- Store a key in `.env` and keep it out of Git
- Call the Messages API from Node and read `content`, `stop_reason` and `usage`
- Handle an error response without crashing

### Purpose
This is where learners stop being only users and become builders. Week 2 gave them system prompts. This week sends them from code. Week 4 builds a chatbot on top, so the safe-key habit has to stick now.

### Agenda
1. **What is an API?** Teach the waiter, the four parts of a request and the status codes. Learners run the GitHub examples in the playground.
2. **API keys and secrets.** Teach the house key that opens your wallet, the three safe rules, `.env` and `.gitignore`. Learners set a spend limit and run `check-key.js`.
3. **Call the model.** Teach the order slip: build the body, `fetch`, check `response.ok`, read `content[0].text`. Learners run `hello.js` and use a wrong key on purpose.
4. **BakeBuddy says hello.** Launch it from the lesson folder. Look at each repository to confirm `.env` is not uploaded, then run the script with three questions.

## End of sprint review

Tick each one when you have seen it.

- [ ] Every learner has an account with a spend limit set.
- [ ] Every learner has a `.env` and a `.gitignore` that lists `.env`, made before any `git add`.
- [ ] Every learner has run `hello.js` and seen a reply, `usage` and a `401` from a wrong key.
- [ ] No uploaded repository contains `.env` or a key (open the file list on GitHub to check).
- [ ] Every learner can explain the waiter and the house key in their own words.
- [ ] Every submitted script prints a friendly error instead of crashing.
- [ ] Every learner has had feedback on the assignment.
