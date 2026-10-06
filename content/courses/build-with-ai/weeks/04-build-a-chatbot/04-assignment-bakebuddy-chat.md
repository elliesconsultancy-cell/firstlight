---
title: BakeBuddy chat
kind: assignment
submission: link
---
## What you'll build

A working chat page for BakeBuddy. A customer types a message in the browser, your Express server calls the AI with your secret key, and the reply appears on the page. BakeBuddy remembers the conversation, because your page sends the notebook each time.

You can keep Amina's bakery or use your own idea. Change the system prompt, the page title and the colours to make it yours.

## Requirements

- [ ] `npm install express` is done, and `package.json` lists `express`
- [ ] `server.js` serves the `public` folder and has a `POST /api/chat` route
- [ ] The API key is read from `process.env.ANTHROPIC_API_KEY` and appears in no file you upload
- [ ] `.gitignore` lists `.env` and `node_modules`
- [ ] The server checks that `messages` is a list, and returns status `400` if it is not
- [ ] The server keeps only the most recent messages and uses a small `max_tokens`
- [ ] The system prompt lives on the server, not in the browser
- [ ] The chat page shows customer messages and replies in different styles
- [ ] The page shows a waiting message and disables the button while it waits
- [ ] The page shows a friendly error message if the server fails
- [ ] Messages are added to the page with `textContent`, not `innerHTML`
- [ ] BakeBuddy can answer "What did I say first?" correctly in a conversation of three or more messages

## Steps/hints

1. Start from the files in the lessons: `claude.js`, `prompt.js`, `server.js`, and the three files in `public`.
2. Run the server with `node --env-file=.env server.js` and open `http://localhost:3000`.
3. Test the route alone with `curl` before you test the page. If `curl` works, the problem is in the page.
4. Make the page yours. Change the name, the placeholder text and the colours. Try giving BakeBuddy a short welcome message when the page opens:

   ```text
   addMessage("Hi! I'm BakeBuddy. Ask me about our bread and cakes.", "assistant");
   ```

   (If you add this, do not push it into `history`. History must start with a customer message.)
5. Test the memory. Say your name, ask two other questions, then ask "What is my name?".
6. Test the errors. Stop the server and send a message. Then start it again and check the chat still works.
7. Test a very long message (more than 1000 characters). What does the server answer? Make sure the page shows it nicely.

> ⚠️ **Watch out:** Check twice that `.env` is not in your repository before you upload. Also remember your spending limit from week 3. A chat page can run many calls without you noticing.

## How to submit

Upload your project to GitHub (without `.env`) and paste the link to the repository in the link box. In your `README.md`, write the three commands someone needs to run it: `npm install`, setting up `.env` with their own key, and `node --env-file=.env server.js`. Also add a screenshot or two lines about a conversation you had with BakeBuddy.

## Stretch goals

- Add a **New chat** button that clears the page and the `history` list.
- Show a small line under each reply with the token counts. (Send them from the server in the JSON.)
- Save the history in `localStorage`, so a page reload does not erase the notebook.
- Add a short "Try asking" list of three example questions that fill the input when clicked.
