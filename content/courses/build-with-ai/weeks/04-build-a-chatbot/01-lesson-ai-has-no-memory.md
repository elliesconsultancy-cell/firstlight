---
title: AI has no memory
kind: lesson
minutes: 25
---
Imagine a shop assistant with a strange problem. Every time you walk out of the door and back in, the assistant forgets you completely. You say "Hi, I'm Tolu, I want a birthday cake". The assistant helps you. You step outside for one second and come back. "Hello! How can I help?" Nothing remains.

Now imagine the assistant has a **notebook** on the counter. Before each answer, the assistant reads the whole notebook. Suddenly it looks like they remember everything. This is exactly how chatbots work.

## The AI forgets between calls

Each call to the API stands alone. The model does not keep your earlier messages on the server. It only sees what you send in **this** call. This is the **desk** from week 1: the model can only look at what is on the desk right now.

Let us prove it. First, put the call in a reusable function. Make a file called `claude.js`:

```node
const API_URL = "https://api.anthropic.com/v1/messages";

export async function askClaude({ system, messages, maxTokens = 300 }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Claude API error ${response.status}: ${data.error?.message}`);
  }
  return data.content[0].text;
}
```

This is last week's code, packed into a function. You give it a system prompt and a list of messages. It gives you the reply text, or throws an error.

Also make `prompt.js` and paste in your best system prompt from your prompt notebook:

```node
export const SYSTEM_PROMPT =
  "You are BakeBuddy, the friendly helper of Amina's Bakery. " +
  "Answer in at most three short sentences. " +
  "If you do not know something, say so and suggest the customer asks in the shop.";
```

## Two calls, no memory

Make `memory.js`:

```node
import { askClaude } from "./claude.js";
import { SYSTEM_PROMPT } from "./prompt.js";

const first = await askClaude({
  system: SYSTEM_PROMPT,
  messages: [{ role: "user", content: "Hi, my name is Tolu." }],
});
console.log("First reply:", first);

const second = await askClaude({
  system: SYSTEM_PROMPT,
  messages: [{ role: "user", content: "What is my name?" }],
});
console.log("Second reply:", second);
```

Run it with `node --env-file=.env memory.js`. What do you think the second reply says?

<details><summary>Show answer</summary>

The model says it does not know your name. The second call has only one message, "What is my name?". The first call is not on the desk.

</details>

## The notebook trick

The fix is to send the **whole conversation** each time. Messages go in a list. They alternate between the `user` (the customer) and the `assistant` (the AI). Your app keeps this list. This list is the notebook.

```node
const history = [
  { role: "user", content: "Hi, my name is Tolu." },
  { role: "assistant", content: "Hello Tolu! Welcome to Amina's Bakery." },
  { role: "user", content: "What is my name?" },
];
```

With this list, the model reads all three messages and answers "Your name is Tolu". It did not remember. It **read the notebook**.

## A chat in the terminal

Here is the loop of every chatbot. Make `chat.js`:

```node
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { askClaude } from "./claude.js";
import { SYSTEM_PROMPT } from "./prompt.js";

const rl = readline.createInterface({ input, output });
const history = [];

console.log('BakeBuddy is ready. Type "bye" to stop.');

while (true) {
  const text = (await rl.question("You: ")).trim();
  if (text === "") continue;
  if (text.toLowerCase() === "bye") break;

  history.push({ role: "user", content: text });
  try {
    const reply = await askClaude({ system: SYSTEM_PROMPT, messages: history });
    history.push({ role: "assistant", content: reply });
    console.log("BakeBuddy:", reply);
  } catch (error) {
    history.pop();
    console.log("Error:", error.message);
  }
}

rl.close();
```

The loop has four steps: add the customer's words to the notebook, send the notebook, add the reply to the notebook, show the reply. If the call fails, we remove the last customer message with `history.pop()`, so the notebook stays correct.

### Try it

Run `node --env-file=.env chat.js`. Tell BakeBuddy your name and your favourite cake, chat a little, and then ask what you said at the start.

## The notebook grows, and so does the bill

Each call sends the whole notebook. A long chat means more and more tokens in every call, so each call costs more. The notebook also has to fit on the desk (the context window).

A simple fix is to send only the most recent messages:

```node
const recent = history.slice(-9);
```

This keeps the last 9 messages. Because the list always ends with a customer message, an odd number keeps a customer message first, which the API expects. The price: BakeBuddy forgets the start of a very long chat.

> ⚠️ **Watch out:** Never keep the history only in your head or only in the AI. If your app loses the list (for example, the page reloads), the memory is gone.

## Check your understanding

1. Why can the model not remember your name from an earlier call?
2. What are the two `role` values we use in `messages`?
3. Why does a long chat cost more for each new message?
4. What is the price of keeping only the last 9 messages?

<details><summary>Show answers</summary>

1. Each call stands alone. The model only sees what is in the current request.
2. `user` for the customer and `assistant` for the AI.
3. The whole notebook is sent each time, so there are more input tokens in every call.
4. The model forgets older parts of the conversation.

</details>

> 🧠 **Remember:**
> - The AI forgets everything between calls.
> - Your app keeps the notebook (a list of messages) and sends all of it every time.
> - Long notebooks cost more and must fit on the desk, so trim them.

## Go deeper

- [Claude docs: Messages API (multi-turn conversations)](https://platform.claude.com/docs/en/api/messages)
- [Node.js: readline promises API](https://nodejs.org/api/readline.html)
