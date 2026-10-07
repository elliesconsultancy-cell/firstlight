---
title: Giving the AI a phone
kind: lesson
minutes: 30
---
Imagine a customer walks into Amina's bakery and asks a new intern: "Do you have any sourdough loaves left?"

The intern is keen and has read every baking book. But the intern is standing at the front desk and cannot see the back shelf. So the intern does not guess. The intern says: "Please call the kitchen and ask how many sourdough loaves are on the shelf." Someone calls, gets the number, and tells the intern. Now the intern can answer for real.

That is exactly how **tool use** works. The AI does not guess. It asks you to make a call.

## What is a tool?

A **tool** is a function in your own code that the AI is allowed to ask for. It could check stock, add two numbers, or look up an order.

In our picture, a tool is a **phone number** the AI can ask you to call.

> 🧠 **Remember:** The AI never runs your code. It only writes a request: "please call `check_stock` with `croissant`". Your code does the calling and sends the answer back.

Where does the picture stop being true? A real intern can walk to the shelf. The AI cannot. It can only write a note. It can also write a **wrong** note, such as an item that does not exist. So your code must always check the note before acting on it.

## Step 1: write the tool in plain JavaScript

First, the tool itself. This is normal code. The AI is not involved yet.

```node
// stock.js
const STOCK = {
  croissant: 12,
  "sourdough loaf": 0,
  "chocolate cake": 3,
};

export function checkStock(item) {
  const name = String(item).trim().toLowerCase();
  if (!Object.hasOwn(STOCK, name)) {
    return { found: false, message: `We do not sell "${name}".` };
  }
  return { found: true, item: name, in_stock: STOCK[name] };
}
```

The numbers are made up for learning. In a real shop they would come from a database. If you changed your bakery to a gym or a school, use your own data here.

## Step 2: describe the tool to the AI

The AI cannot see your code. You must describe the tool in words, using three parts:

| Part | What it is |
| --- | --- |
| `name` | A short name, like `check_stock` |
| `description` | When to use it, what it returns, what it cannot do |
| `input_schema` | A list of the inputs it needs, in a format called JSON Schema |

Add this to the bottom of `stock.js`, so the function and its description live in one file:

```node
export const tools = [
  {
    name: "check_stock",
    description:
      "Checks how many of one bakery item are in stock right now. " +
      "Use it whenever a customer asks if something is available. " +
      "Returns the number in stock, or says the item is not sold. " +
      "It does not give prices or opening hours.",
    input_schema: {
      type: "object",
      properties: {
        item: {
          type: "string",
          description: "The item name, for example croissant or sourdough loaf",
        },
      },
      required: ["item"],
    },
  },
];
```

The **description** is the most important part. The AI decides whether to call the tool by reading it. Write it like a note for a new colleague. Say when to use it and when not to.

A **JSON Schema** is a standard way to say "the input is an object with a text field called `item`". You do not need to learn all of it. Copy the shape above and change the names.

## Step 3: send the tools with your question

Make a test file called `try-tool.js`. Add `tools` to the same request you already know. Everything else stays the same.

```node
import { tools } from "./stock.js";

const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 500,
    tools,
    messages: [{ role: "user", content: "Do you have any croissants left?" }],
  }),
});

const data = await response.json();
console.log(JSON.stringify(data, null, 2));
```

Run it with `node --env-file=.env try-tool.js`. Model names change over time, so check the docs for the current list.

## What comes back

Before, `stop_reason` was `end_turn` and the answer was text. Now it looks different. This is an example of the shape (your `id` will be different):

```json
{
  "stop_reason": "tool_use",
  "content": [
    { "type": "text", "text": "Let me check the stock for you." },
    {
      "type": "tool_use",
      "id": "toolu_01ExampleId",
      "name": "check_stock",
      "input": { "item": "croissant" }
    }
  ]
}
```

Read it like a sticky note from the intern:

- `stop_reason: "tool_use"` means "I am not finished. I need you to call something."
- `name` is which phone number to call.
- `input` is what to ask.
- `id` is a ticket number. You will need it in the next lesson.

### Try it

Change the question to "Do you sell pizza?" and run the script again. What do you think the AI will do? Then try "What time do you open?". Does it ask for the tool?

<details><summary>Show answers</summary>

1. For pizza, it will probably still call `check_stock` with `pizza`, because the question is about availability. Your code will then say "We do not sell pizza".
2. For opening hours, it should answer without the tool, or say it does not know. The description says the tool does not give opening hours. This shows why good descriptions matter.

</details>

## Check your understanding

1. Who runs the `checkStock` function: the AI or your code?
2. What are the three parts of a tool description?
3. What does `stop_reason: "tool_use"` tell you?
4. Why is the `description` so important?

<details><summary>Show answers</summary>

1. Your code. The AI only asks for it.
2. `name`, `description` and `input_schema`.
3. The AI is not finished. It wants your code to run a tool and send the result back.
4. The AI reads it to decide when to use the tool and what to send.

</details>

> 🧠 **Remember:** A tool is a phone number the AI can ask you to call. You describe it, the AI asks, your code calls.

## Go deeper

- [Claude docs: Tool use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [Claude docs: Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools)
- [JSON Schema: Understanding JSON Schema](https://json-schema.org/understanding-json-schema)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Say in their own words that the AI asks for a tool and their code runs it.
- Write a tool description with `name`, `description` and `input_schema`.
- Read a `tool_use` reply and point to the tool name and its input.

### Purpose
Real products need live facts, such as what is on the shelf right now. Tools are how an AI product gets them without guessing.

### Things to teach
1. **The phone the AI asks you to call.** Use the bakery story. The intern cannot see the back shelf, so the intern asks someone to phone the kitchen. Say it out loud: the AI never runs your code, it only writes a note.
2. **The tool is normal code.** Show `checkStock` in `stock.js` first, with no AI in it. Point out the unknown-item message instead of an error.
3. **The description is the real instruction.** The AI reads the `description` to decide when to call. Show the "does not give prices or opening hours" sentence and why it is there.
4. **Reading `stop_reason: "tool_use"`.** Run `try-tool.js` and show the sticky note: `name`, `input`, and `id`. The `id` is a ticket number for next lesson.

### Check understanding
- Ask: "Who runs `checkStock`?" A good answer: our code. The AI only asks.
- Ask: "What does `stop_reason: "tool_use"` mean?" A good answer: the AI is not finished and wants us to run a tool.
- Ask: "Why can the AI write a wrong note?" A good answer: it can name an item that does not exist, so our code must check it.

### Watch for
- Learners who think the AI "has" the function. Say: it only sees the description, never the code.
- Vague descriptions such as "stock tool". Ask them to say when to use it and when not to.
