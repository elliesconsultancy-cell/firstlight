---
title: A server for your key
kind: lesson
minutes: 30
---
Think of a bank. You, the customer, stand at the counter. The money is in the vault behind the counter. You never walk into the vault. You tell the bank clerk what you need, and the clerk goes to the vault for you.

Your chat page is the customer. Your API key is the money in the vault. You need a clerk between them: a small program on a **server** that holds the key and talks to the AI for the page. That clerk is what we build now.

## Why the browser cannot call the AI

Browser code is public. Anyone who opens your page can read every line, even in DevTools. If the key were in your page, a stranger could copy it in ten seconds and spend your money.

So the flow is:

1. The chat page sends the conversation to **your** server.
2. Your server adds the secret key and calls the AI.
3. The AI answers your server.
4. Your server sends the answer to the page.

The key never leaves the server. The page never sees it.

Where does the picture stop being true? A bank clerk checks who you are. Our small server will not check anything yet. Anyone who can reach it can use it. While it runs only on your own computer, this is fine. In week 7 you will learn how to protect it better.

## Set up Express

**Express** is a small, popular package that helps you write a web server in Node. In your `bakebuddy` folder (the one with `claude.js`, `prompt.js`, `.env` and `.gitignore`), run:

```bash
npm install express
mkdir public
```

Your folder now looks like this:

```text
bakebuddy/
  .env              (your key, never uploaded)
  .gitignore        (lists .env and node_modules)
  package.json      (has "type": "module")
  claude.js         (the askClaude function)
  prompt.js         (the system prompt)
  server.js         (new, this lesson)
  public/           (the chat page, next lesson)
```

## The server file

Make `server.js`. Read it once, then we explain each part.

```node
import express from "express";
import { askClaude } from "./claude.js";
import { SYSTEM_PROMPT } from "./prompt.js";

const app = express();
app.use(express.json({ limit: "100kb" }));
app.use(express.static("public"));

const MAX_MESSAGES = 9;
const MAX_LENGTH = 1000;

function cleanMessages(messages) {
  if (!Array.isArray(messages)) return null;

  for (const m of messages) {
    const roleOk = m?.role === "user" || m?.role === "assistant";
    const textOk =
      typeof m?.content === "string" &&
      m.content.trim() !== "" &&
      m.content.length <= MAX_LENGTH;
    if (!roleOk || !textOk) return null;
  }

  const recent = messages.slice(-MAX_MESSAGES);
  while (recent.length > 0 && recent[0].role !== "user") recent.shift();

  if (recent.length === 0 || recent[recent.length - 1].role !== "user") {
    return null;
  }
  return recent.map((m) => ({ role: m.role, content: m.content }));
}

app.post("/api/chat", async (req, res) => {
  const messages = cleanMessages(req.body?.messages);
  if (!messages) {
    return res.status(400).json({
      error: "Please send a list of messages (each under 1000 characters) that ends with a customer message.",
    });
  }

  try {
    const reply = await askClaude({ system: SYSTEM_PROMPT, messages });
    res.json({ reply });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "BakeBuddy has a problem. Please try again." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`BakeBuddy is running at http://localhost:${port}`);
});
```

## Read it part by part

- **`express.json()`** teaches the server to read JSON bodies. Without it, `req.body` is empty.
- **`express.static("public")`** serves the files in `public` (your chat page) to the browser.
- **`app.post("/api/chat", ...)`** is a **route**: when a `POST` arrives at `/api/chat`, run this function. `req` is the request. `res` is the response.
- **`cleanMessages`** checks what the browser sent. We never trust the browser. It makes sure each message has a valid role and a text that is not empty or too long. Then it keeps only the last 9 messages.
- **The system prompt** is added on the server. The browser cannot change BakeBuddy's job.
- **`try / catch`** catches errors. The real error goes to your terminal with `console.error`. The browser gets only a short, friendly message. Never send details like stack traces to the page.

> ⚠️ **Watch out:** Anyone who can reach this server can spend your money. Keep it on your own computer for now. Do not share the address in public. The `MAX_LENGTH` and `MAX_MESSAGES` limits also keep each call small.

## Run it and test it

Start the server:

```bash
node --env-file=.env server.js
```

Open a second terminal and send a test request, as the chat page will do later:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "content-type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hi! Do you sell bread?"}]}'
```

You should get JSON like `{"reply":"..."}`. Now try a bad request:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "content-type: application/json" \
  -d '{"messages":"hello"}'
```

### Try it

What status code and message do you expect for the bad request? Run it with `curl -i` to see the status line.

<details><summary>Show answers</summary>

`400` with the error message "Please send a list of messages (each under 1000 characters) that ends with a customer message." The value of `messages` is a string, not a list, so `cleanMessages` returns `null`.

</details>

## Common problems

| What you see | Likely cause |
| --- | --- |
| `Cannot find package 'express'` | You are not in the project folder, or you skipped `npm install express` |
| `EADDRINUSE` | Another program uses port 3000. Stop it, or set `PORT=3001` in `.env` |
| `401` error in the terminal | The key is missing. Did you use `--env-file=.env`? |
| `req.body` is `undefined` | Missing `express.json()` or missing `content-type` header |

## Check your understanding

1. Why must the API key stay on the server?
2. What does `app.post("/api/chat", ...)` do?
3. Why does the server check the messages that come from the browser?
4. Why does the browser get a short error message and not the real one?

<details><summary>Show answers</summary>

1. Browser code is public. Anyone could read the key and spend your money.
2. It runs the function whenever a `POST` request arrives at `/api/chat`.
3. A browser, or someone pretending to be one, can send anything. Checking protects your server and your wallet.
4. Real error details can reveal secrets about your server. They stay in your own terminal.

</details>

> 🧠 **Remember:** The server is the clerk at the bank counter. It holds the key, checks every request, calls the AI, and returns only the reply.

## Go deeper

- [Express: Hello world](https://expressjs.com/en/starter/hello-world.html)
- [Express: Routing](https://expressjs.com/en/guide/routing.html)
- [MDN: Express/Node introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
