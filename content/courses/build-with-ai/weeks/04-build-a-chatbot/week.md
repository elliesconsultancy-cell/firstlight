---
title: Build a chatbot
summary: Give BakeBuddy a memory, protect your key with a small Express server, and build a chat page that people can really use.
---
Last week your script asked one question and got one answer. A real chatbot has a conversation. But there is a surprise: the AI remembers nothing. This week you will learn why, and how an app can fix it.

First, you will see the **notebook trick**. The AI forgets everything between calls, so your app keeps a notebook of the conversation and shows the whole notebook every time. That is what memory really is.

Then you will build a small **server** with Express. A server can hold your secret key safely, so the key never travels to the browser. Finally, you will build a **chat page** with plain HTML, CSS and JavaScript, and connect it to your server.

At the end, BakeBuddy is a real chat on a web page. Use Amina's bakery, or your own idea. The steps are the same.

## By the end of this week you will be able to

- Explain why an AI has no memory and how an app gives it one
- Keep a conversation as a list of messages and send it with every call
- Build an Express server with a `POST /api/chat` route that holds your key
- Validate what the browser sends and handle errors in the server
- Build a chat page that sends messages to your own server and shows the replies

## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: AI has no memory
- [ ] Read: A server for your key
- [ ] Read: The chat page

**Do**
- [ ] Make `claude.js` and `prompt.js`, then run `memory.js` and `chat.js`
- [ ] Run `npm install express` and start `server.js` with `node --env-file=.env server.js`
- [ ] Test the route with `curl`, then open `http://localhost:3000`
- [ ] Finish the assignment: BakeBuddy chat

**Share**
- [ ] Submit your work and read your instructor's feedback

<!-- instructor -->
## Day plan

### Learning objectives
- Explain why an AI has no memory, and how a list of messages gives it one
- Build an Express route that holds the key and checks input
- Build a chat page that sends the history and shows replies and errors
- Test the memory and the error paths

### Purpose
Week 3 sent one question from a script. This week turns that into a chat on a web page, and keeps the key on the server. Week 5 adds the menu knowledge, so the server and page must work first.

### Agenda
1. **AI has no memory.** Teach the notebook trick and run `memory.js`, then `chat.js`. Talk about the growing cost and `slice(-9)`.
2. **A server for your key.** Teach the bank clerk and the house key staying on the server. Learners build `server.js` and test it with `curl`, including a `400`.
3. **The chat page.** Teach the table with paper and pen, the `history` list, waiting and errors, and `textContent`. Learners run the whole product.
4. **BakeBuddy chat.** Launch it, run the memory and error tests, and check that no key is in the repository or in `script.js`.

## End of sprint review

Tick each one when you have seen it.

- [ ] Every learner has run `chat.js` and seen BakeBuddy remember a name.
- [ ] Every learner's server starts and `curl` returns a reply, and `400` for a bad request.
- [ ] Every learner's page works at `http://localhost:3000` and shows a friendly error when the server is stopped.
- [ ] No key appears in `script.js` or in the repository, and `.gitignore` lists `.env`.
- [ ] Every page uses `textContent` for messages.
- [ ] Every learner can explain the notebook and the bank clerk in their own words.
- [ ] Every learner has had feedback on the assignment.
