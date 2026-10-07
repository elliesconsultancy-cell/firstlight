---
title: Call the model
kind: lesson
minutes: 30
---
It is time to place your first order. You know the waiter (the API). You have your membership card (the key). Now you write the order slip and send it to the kitchen.

By the end of this lesson, a Node script of about 25 lines will ask the model a question and print the answer. This is the heart of every AI product in this course.

## The whole script

Make a file called `hello.js` inside your `bakebuddy` folder. Type it by hand if you can. Typing helps you remember.

```node
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    messages: [
      { role: "user", content: "Say hello to a customer of a small bakery." },
    ],
  }),
});

const data = await response.json();

if (!response.ok) {
  console.log("Something went wrong:", response.status, data.error?.message);
} else {
  console.log(data.content[0].text);
  console.log("Tokens used:", data.usage);
}
```

Run it:

```bash
node --env-file=.env hello.js
```

You should see a friendly greeting. The words will be different each time. That is normal, because the model picks its words with a little chance in it.

## Read it like a recipe

Let us go through the parts.

- **The URL** `https://api.anthropic.com/v1/messages` is the door of the kitchen.
- **`method: "POST"`** says we are sending something.
- **`x-api-key`** is your membership card, read from the environment.
- **`anthropic-version`** says which version of the menu we are using. Keep it as shown.
- **`content-type`** tells the server the body is JSON.
- **`JSON.stringify(...)`** turns a JavaScript object into JSON text, because a request body must be text.
- **`model`** names the model. We use a small, fast one. Model names change over time, so the docs list the current ones.
- **`max_tokens`** is the longest answer you accept. Keep it small while you learn.
- **`messages`** is the list of what was said so far. Right now there is only one message from you.

> ⚠️ **Watch out:** `max_tokens` is a limit, not a goal. If the model needs more words than you allow, it stops in the middle of a sentence.

## Read the reply

The server sends back JSON. A shortened example looks like this:

```json
{
  "id": "msg_...",
  "type": "message",
  "role": "assistant",
  "content": [
    { "type": "text", "text": "Hello and welcome! ..." }
  ],
  "stop_reason": "end_turn",
  "usage": { "input_tokens": 18, "output_tokens": 42 }
}
```

The important fields:

- **`content`** is a list of blocks. For a simple chat, the first block has the text. So the answer is `data.content[0].text`.
- **`stop_reason`** tells you why the model stopped. `end_turn` means it finished by itself. `max_tokens` means you cut it off.
- **`usage`** counts the tokens in and out. These numbers are what you pay for. You learned about tokens in week 1. Now you can see them for real.

## When things go wrong

Errors come back as JSON too, with a status code. The body looks like this (the `request_id` helps the support team find your request):

```json
{
  "type": "error",
  "error": {
    "type": "authentication_error",
    "message": "invalid x-api-key"
  },
  "request_id": "req_..."
}
```

| Status | Likely cause | What to do |
| --- | --- | --- |
| 400 | A mistake in the request, or your spend limit was reached | Read the message. Check field names |
| 401 | Missing or wrong key | Check `.env` and the flag |
| 429 | Too many requests | Wait a little and try again |
| 500 or 529 | The server is busy | Try again later |

That is why the script checks `response.ok` before it reads the answer. Never assume the order always arrives.

### Try it

1. Change the question to ask for a bread joke. Run it three times. Are the answers the same?
2. Set `max_tokens` to `10`. What do you see in the text and in `stop_reason`?
3. Change `x-api-key` to a wrong value on purpose. What status do you get?

<details><summary>Show answers</summary>

1. No. The answers differ, because the model chooses words with some chance.
2. The text is cut off in the middle, and `stop_reason` is `max_tokens`. (Add a line to print `data.stop_reason` to see it.)
3. `401`, with an `authentication_error` message. Put the right key back afterwards.

</details>

## Give the model a job: the system prompt

Last week you wrote system prompts, the job description for the intern. In the API, it is a top-level field called `system`. It sits next to `messages`, not inside it:

```node
const body = {
  model: "claude-haiku-4-5-20251001",
  max_tokens: 200,
  system: "You are BakeBuddy, the friendly helper of Amina's Bakery. Answer in two short sentences.",
  messages: [{ role: "user", content: "Do you open on Sundays?" }],
};
```

In `hello.js`, use this object in place of the one inside `JSON.stringify(...)`, so the line becomes `body: JSON.stringify(body)`.

> 💡 **Tip:** The bakery is only our example. Use your own idea if you like: a gym helper, a school helper, a shop helper. Only the system prompt changes.

## The official SDK

Using `fetch` shows you what really travels over the wire. Later you can use the official package `@anthropic-ai/sdk`, which hides these details and handles retries for you. Everything you learned here still applies. We keep raw `fetch` in this course so there is no magic.

## Check your understanding

1. Where is the model's text in the reply?
2. What does `usage` tell you, and why does it matter?
3. Why do we check `response.ok`?
4. Where does the system prompt go?

<details><summary>Show answers</summary>

1. In `data.content[0].text`.
2. How many tokens went in and came out. Tokens decide your cost.
3. The server may return an error. Without the check, the script would crash or print nonsense.
4. In the top-level `system` field of the body, next to `model` and `messages`.

</details>

> 🧠 **Remember:** One call has three steps: build the body, `fetch` it with your key, and read `content[0].text` after checking `response.ok`. Keep `max_tokens` small and watch `usage`.

## Go deeper

- [Claude docs: Messages API reference](https://platform.claude.com/docs/en/api/messages)
- [Claude docs: errors](https://platform.claude.com/docs/en/api/errors)
- [Node.js: global fetch](https://nodejs.org/api/globals.html#fetch)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Write `hello.js` that calls the Messages API with `fetch`
- Read `content[0].text`, `stop_reason` and `usage` from the reply
- Use the status table to react to 400, 401, 429 and 500 errors
- Add a `system` prompt as a top-level field

### Purpose
This one call is the heart of every AI product in the course. Later weeks only wrap it in more code.

### Things to teach
1. **The order slip.** Say: "You know the waiter and you have the membership card. Now you write the order." Walk through the headers (`x-api-key`, `anthropic-version`, `content-type`) and `JSON.stringify`.
2. **Check `response.ok` first.** The order may not arrive. Show the error JSON and the status table, then use a wrong key on purpose to see `401`.
3. **Read the reply.** `content[0].text` is the answer. `stop_reason` of `max_tokens` means it was cut off. `usage` shows tokens in and out, which decide cost.
4. **Answers change.** Run it three times. The words differ because the model picks words with some chance.
5. **System prompt.** Show `system` sitting next to `messages`, not inside. Link it to last week's intern job description.

### Check understanding
- Ask: "Where is the answer text?" A good answer: `data.content[0].text`.
- Ask: "Why check `response.ok`?" A good answer: the server may send an error, and the script would print nonsense.
- Ask: "What does a tiny `max_tokens` do?" A good answer: the reply stops mid-sentence and `stop_reason` says `max_tokens`.

### Watch for
- Forgotten `await` on `fetch` or `response.json()`, so `data` is a Promise. Show the error and fix.
- Running `node hello.js` without `--env-file=.env`, which gives a `401`. Also a `.env` in the wrong folder.
