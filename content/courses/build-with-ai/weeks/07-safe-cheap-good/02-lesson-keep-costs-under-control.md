---
title: Keep costs under control
kind: lesson
minutes: 25
---
Amina keeps a tap running in the bakery sink. Water flows all day. At the end of the month the bill is huge, and she does not know why.

An AI product with no limits is that open tap. Every message costs a little money. A few visitors cost almost nothing. But one visitor with a script that sends ten thousand messages can cost real money, before you wake up.

The fix is not fear. The fix is a few simple limits, put in place **before** you share your link.

> ⚠️ **Watch out:** Your API key opens your wallet. Never put it in browser code or on GitHub. If you think it leaked, delete it in your account and make a new one right away.

## Where the money goes

You pay for **tokens**: the Lego bricks of text you send in and the bricks the model writes out. You can read both numbers in every reply:

```node
const data = await res.json();
console.log("tokens in:", data.usage.input_tokens, "tokens out:", data.usage.output_tokens);
```

Prices change and depend on the model. Always check the pricing page of your provider and never trust a number you read in a lesson. The idea is stable: more tokens in and out means more cost.

## Five limits, from strongest to weakest

### 1. A spending limit in your account

This is your emergency brake. Open the billing or limits settings in your provider's console. Set a small monthly limit, an amount you are happy to lose. Turn on any usage alerts. Do this today, before you deploy.

### 2. A small `max_tokens`

`max_tokens` is the longest answer the model may write. For a bakery helper, a few hundred is plenty. Our code already uses 500. A short limit also keeps answers short for readers.

### 3. A short history

Remember: the AI forgets, so you resend the notebook every time. A long chat means a longer notebook, and you pay for the whole notebook on every message. Keep only the last few messages.

```node
export function trimHistory(messages, keep = 10) {
  const recent = messages.slice(-keep);
  // The conversation must start with a user message
  while (recent.length > 0 && recent[0].role !== "user") {
    recent.shift();
  }
  return recent;
}
```

Your `cleanMessages` function from week 4 already does this job: it keeps the last 9 messages. `trimHistory` is the same idea as a small helper you can reuse. You can replace the `slice` and `while` lines inside `cleanMessages` with `const recent = trimHistory(messages, MAX_MESSAGES);`. Either way, keep the history short.

### 4. A cap on the message size

Last lesson you wrote `validateMessage` with a limit of 500 characters. It also protects your wallet, because one huge message is many tokens.

### 5. Rate limiting your own endpoint

**Rate limiting** means "no more than N requests per minute from one visitor". Here is a small version in plain Node, with no extra package. It works as Express **middleware**: a function that runs before your route.

Put it in a new file called `limits.js`. The `trimHistory` helper and the daily cap below can go in the same file. Then add `import { rateLimit } from "./limits.js";` to `server.js`.

```node
const WINDOW_MS = 60_000; // one minute
const MAX_REQUESTS = 20; // per visitor, per minute
const hits = new Map(); // visitor -> list of request times

export function rateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    return res
      .status(429)
      .json({ error: "Too many messages. Please wait a minute." });
  }

  recent.push(now);
  hits.set(key, recent);
  next();
}
```

Add it to the chat route only. Behind a hosting service like Vercel, tell Express to trust the proxy so that `req.ip` is the visitor, not the host:

```node
app.set("trust proxy", 1);
app.post("/api/chat", rateLimit, async (req, res) => {
  // ...your route
});
```

### A daily cap as a backstop

Add one counter for the whole app, so even many visitors together cannot go past your budget:

```node
let today = new Date().toDateString();
let todayCount = 0;
const DAILY_LIMIT = 500;

export function dailyCap(req, res, next) {
  const nowDay = new Date().toDateString();
  if (nowDay !== today) {
    today = nowDay;
    todayCount = 0;
  }
  if (todayCount >= DAILY_LIMIT) {
    return res.status(503).json({ error: "BakeBuddy is resting today. Please come back tomorrow." });
  }
  todayCount++;
  next();
}
```

### Where the picture stops being true

These counters live in your server's memory. On a serverless host like Vercel, your code can run in many copies, and each copy has its own counters. They also reset when a copy restarts. So treat them as a **soft fence**. The **spending limit** in your account is the hard wall. You need both.

### Try it

Set `MAX_REQUESTS` to 3, restart your server, and send five messages quickly from your chat page. What does the page show on the fourth message? Does your page show the friendly error text or does it break?

<details><summary>Show answers</summary>

The server answers with status 429 and the message "Too many messages. Please wait a minute." If your page breaks, check that your front-end code reads the `error` field and shows it to the user. Then set `MAX_REQUESTS` back to a sensible number.

</details>

## Check your understanding

1. Which limit is your emergency brake, and where do you set it?
2. Why does a long chat cost more with every message?
3. What does `trimHistory` do, and why does it check the first role?
4. Why are in-memory counters only a soft fence on Vercel?

<details><summary>Show answers</summary>

1. The spending limit, in your provider's account billing or limits settings.
2. You resend the whole history each time, so more tokens go in on every message.
3. It keeps only the latest messages. The first message must be from the user, or the API may reject the request.
4. The app can run as many copies, each with its own memory, and they reset when restarted.

</details>

> 🧠 **Remember:**
> - Set a spending limit in your account first. It is the hard wall.
> - Keep `max_tokens`, history and message size small.
> - Rate limit your own endpoint, and treat in-memory counters as a soft fence.

## Go deeper

- [Claude docs: Rate limits](https://platform.claude.com/docs/en/api/rate-limits)
- [Claude docs: Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [Express docs: Writing middleware](https://expressjs.com/en/guide/writing-middleware.html)
