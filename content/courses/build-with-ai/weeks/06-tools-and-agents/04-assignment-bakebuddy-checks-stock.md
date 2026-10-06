---
title: BakeBuddy checks the stock
kind: assignment
submission: link
---
## What you'll build

You will give BakeBuddy a tool called `check_stock`. When a customer asks "Do you have croissants?", BakeBuddy will call your function, read the real number and answer with it. You will use the tool loop from this week, with a hard cap on the rounds.

If you changed BakeBuddy into your own idea (a gym, a school, a shop), build a tool that fits it. For example, `check_class_spaces` for a gym.

## Requirements

- [ ] A file with a plain `checkStock(item)` function and a small made-up stock list
- [ ] The function handles an unknown item and returns a clear message, not an error
- [ ] The tool has a `name`, a `description` of at least three sentences, and an `input_schema` with `required`
- [ ] Your server runs a loop with `MAX_LOOPS` set to 5 or less
- [ ] The model's whole reply is added to the history, and the `tool_result` uses the matching `tool_use_id`
- [ ] A failing tool sends back `is_error: true` instead of crashing the server
- [ ] The tool name is looked up in an object (a phone book), not run with `eval`
- [ ] Each tool call is logged to the terminal
- [ ] Your API key is read from `.env` and `.env` is in `.gitignore`
- [ ] You tested at least four questions (see below) and wrote the results in your README

## Steps/hints

1. Create `stock.js`. Add a `STOCK` object and `checkStock`. Use `Object.hasOwn(STOCK, name)` to test for unknown items.
2. Add the `tools` array. Write the description as if you are briefing a new colleague: when to use the tool, what it returns, what it does not do.
3. Copy the loop from "The tool loop" into `agent.js`. Read it line by line and make sure you can explain each part.
4. In `server.js`, call `chatWithTools(...)` in your `/api/chat` route. Keep the response shape your chat page already expects.
5. Add a `console.log` for each `tool_use` block.
6. Test these four questions and write down what happened:
   - "Do you have croissants?" (the answer should use your stock number)
   - "Do you sell pizza?" (a polite answer that the item is not sold)
   - "What are your opening hours?" (should not need the tool)
   - "How many croissants and chocolate cakes do you have?" (two tool calls)
7. Break it on purpose. Make `checkStock` throw an error, ask a question, and check that the page shows a friendly message and the server stays up. Then put it back.
8. Set `MAX_LOOPS = 1`, ask a question that needs a tool, and see the "Sorry, I could not finish" message. Then set it back to 5.

> ⚠️ **Watch out:** Check your API usage and spending limit in your account before you test many times. Keep `max_tokens` small while you learn.

> 💡 **Tip:** If the model never calls your tool, improve the `description`. If it calls the tool with a strange input, add an example to the `item` description.

## How to submit

Push your project to GitHub and submit the link to the repository. Make sure:

- the README lists your four test questions and what BakeBuddy answered
- there is no API key anywhere in the code or in the repository history

## Stretch goals

- Add a second read-only tool, such as `get_opening_hours`, and test a question that needs both tools.
- Add `reserve_item` that only prepares an order and needs a Confirm button.
- Add the time limit helper from the agent lesson.
