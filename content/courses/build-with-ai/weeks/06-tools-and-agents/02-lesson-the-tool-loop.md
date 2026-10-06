---
title: The tool loop
kind: lesson
minutes: 30
---
Think about a phone call with your bank. You ask a question. The agent says, "Please hold, I will check." You wait. They come back with the answer. Then they speak to you.

Your AI does the same thing. It asks. You check. It answers. In code, this is a small **loop**: ask the model, run the tool if it asks for one, send the result, and ask again.

## The loop in five steps

1. You send the customer's question and the list of tools.
2. The model replies with `stop_reason: "tool_use"` and a `tool_use` block.
3. Your code runs the tool.
4. You send the result back in a `tool_result` block.
5. The model reads the result and writes the final answer, with `stop_reason: "end_turn"`.

Steps 2 to 4 can happen more than once. That is why it is a loop.

## What you send back

After the model asks for a tool, your next request has **three** messages:

1. The customer's original question (`user`).
2. The model's reply, **exactly as it came**, including the `tool_use` block (`assistant`).
3. A new `user` message holding the `tool_result` (`user`).

```json
{ "role": "user", "content": [
  {
    "type": "tool_result",
    "tool_use_id": "toolu_01ExampleId",
    "content": "{\"found\":true,\"item\":\"croissant\",\"in_stock\":12}"
  }
] }
```

The `tool_use_id` must match the `id` of the request. It is like a ticket number: it tells the model which question this answer belongs to.

> ⚠️ **Watch out:** Two rules cause most beginner errors. First, always put the model's whole reply back in the history, not only its text. Second, if the model asks for several tools at once, send **all** the results together in one `user` message.

## The full loop, with a hard cap

Here is the whole thing in one file. Read it slowly. Each part has a comment.

```node
// agent.js
import { tools, checkStock } from "./stock.js";

const MODEL = "claude-haiku-4-5-20251001";
const MAX_LOOPS = 5; // hard limit: never go round more than 5 times

async function callClaude(body) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 500, ...body }),
  });
  if (!res.ok) {
    throw new Error(`Claude API error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

// The "phone book": tool name -> your function
const toolFunctions = {
  check_stock: (input) => checkStock(input.item),
};

export async function chatWithTools(history, system) {
  const messages = [...history]; // a copy, so we do not change the original

  for (let loop = 1; loop <= MAX_LOOPS; loop++) {
    const reply = await callClaude({ system, tools, messages });

    // Keep the model's whole reply, tool_use blocks included
    messages.push({ role: "assistant", content: reply.content });

    // Not asking for a tool? Then we have the final answer.
    if (reply.stop_reason !== "tool_use") {
      const text = reply.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("");
      return text;
    }

    // Run every tool the model asked for
    const results = [];
    for (const block of reply.content) {
      if (block.type !== "tool_use") continue;

      let content;
      let isError = false;
      try {
        const fn = toolFunctions[block.name];
        if (!fn) throw new Error(`Unknown tool: ${block.name}`);
        content = JSON.stringify(fn(block.input));
      } catch (err) {
        content = `Tool failed: ${err.message}`;
        isError = true;
      }
      results.push({
        type: "tool_result",
        tool_use_id: block.id,
        content,
        is_error: isError,
      });
    }

    // All results go back together in ONE user message
    messages.push({ role: "user", content: results });
  }

  // We hit the cap. Stop politely instead of looping forever.
  return "Sorry, I could not finish that. Please try asking another way.";
}
```

### Line by line, the important parts

- `MAX_LOOPS = 5` is the safety fence. Without it, a confused model could ask forever, and you would pay for every round.
- `toolFunctions` is the phone book. The model only sends a **name**. Your code looks up the real function. If the name is not in the book, nothing runs.
- `is_error: true` tells the model "the call failed". It can then say sorry or try something else. It does not crash your server.
- `JSON.stringify(...)` turns your result into text, which is what `content` expects here.

## Plug it into your server

Open the `server.js` you built in weeks 4 and 5. Only two small changes are needed.

First, change the import at the top. `agent.js` now makes the API call, so `askClaude` is no longer used here:

```node
import { chatWithTools } from "./agent.js";
```

Then, in the `/api/chat` route, replace the line `const reply = await askClaude({ system, messages });` with this one:

```node
const reply = await chatWithTools(messages, system);
```

Everything else in the route stays: `cleanMessages` still checks the input, `retrieve` still finds the menu lines, and `res.json({ reply })` still sends the answer in the same shape. Your chat page does not change at all.

Your page keeps its own notebook of the chat as before. Save only the customer text and the final reply there. The tool blocks are only needed during one question.

> 💡 **Tip:** In week 5 the prompt says "Use only these notes for facts". Now BakeBuddy also has stock results. In `buildSystemPrompt`, change that sentence to "Use only these notes and the stock tool results for facts". Then the model is happy to use the tool.

### Try it

Ask BakeBuddy: "Do you have sourdough loaves?" Look at your terminal. Add `console.log("tool asked:", block.name, block.input);` right before the line `let content;`. Then ask: "How many croissants and chocolate cakes do you have?" How many tool calls do you see?

<details><summary>Show answers</summary>

For the first question you see one call, with `item: "sourdough loaf"`. For the second you will often see two calls, one for each item. The model may ask for both at once in the same reply, which is why the loop goes through every `tool_use` block.

</details>

## Check your understanding

1. Why must you send back the model's `tool_use` block in the history?
2. What does `tool_use_id` do?
3. What does `MAX_LOOPS` protect you from?
4. What should you do when your tool throws an error?

<details><summary>Show answers</summary>

1. The model needs to see its own request next to your result. Without it the API rejects the conversation.
2. It matches a result to the request it answers, like a ticket number.
3. An endless loop that costs money and never answers.
4. Catch it, and send back a `tool_result` with a short message and `is_error: true`.

</details>

> 🧠 **Remember:** Ask, call, answer. Keep the whole reply in the history, match the `tool_use_id`, and always put a hard cap on the loop.

## Go deeper

- [Claude docs: Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls)
- [Claude docs: How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works)
