---
title: Tools and agents
summary: Let your AI ask your code for help, such as checking what is in stock, and learn how to keep a looping agent under control.
---
So far BakeBuddy can talk, remember the chat, and read Amina's menu. But there is one thing it cannot do. It cannot check what is in the shop **right now**. A menu says "croissant". It does not say "only two left".

This week we give the AI a **tool**. Think of it as a phone number the AI can ask you to call. The AI writes down which number and what to ask. Your code makes the call and brings back the answer. The AI never runs code by itself.

Then we put the steps in a loop, so the AI can ask more than once before it answers. This is the first step toward an **agent**. We will also learn why every loop needs a hard limit.

## By the end of this week you will be able to

- Explain what a tool is, and why the AI never runs your code itself
- Describe a tool to the model with a name, a description and an input schema
- Write a tool loop with a hard cap on the number of rounds
- Send a `tool_result` back to the model, including a result that reports an error
- Explain what an agent is and name four ways to keep one safe

## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: Giving the AI a phone
- [ ] Read: The tool loop
- [ ] Read: What is an agent?

**Do**
- [ ] Create `stock.js` with a small `STOCK` list and a `checkStock` function that handles an unknown item
- [ ] Add the `tools` array and try `try-tool.js` with "Do you have any croissants left?"
- [ ] Add the tool loop in `agent.js` with `MAX_LOOPS` set to 5 or less, and call it from your `/api/chat` route
- [ ] Finish the assignment: BakeBuddy checks the stock

**Share**
- [ ] Push your project to GitHub and submit the link
- [ ] Read your instructor's feedback

<!-- instructor -->
## Day plan

### Learning objectives
- Explain a tool as a phone number the AI asks you to call, run by your code.
- Follow one full tool loop from `tool_use` to `tool_result` to final answer.
- Describe an agent as an intern with a to-do list, and name the fences around it.
- Tell read-only tools from action tools.

### Purpose
Until now BakeBuddy only talked and read the menu. This week it can look up live facts. It builds on week 4 (the server and chat route) and week 5 (retrieval). Next week we make it safe, because a tool is also something a tricked AI could misuse.

### Agenda
1. **Giving the AI a phone.** Tell the bakery story: the intern cannot see the back shelf, so asks someone to phone the kitchen. Show `checkStock`, the tool description and a `tool_use` reply. Learners run `try-tool.js` with the pizza and opening hours questions.
2. **The tool loop.** Walk through the five steps and the three messages sent back. Point at `MAX_LOOPS`, the phone book and `is_error`. Learners add the loop to their server.
3. **What is an agent?** Use the intern with a clipboard and the Saturday order. Cover the four fences and read-only versus action tools. Learners do the study helper question in "Try it".
4. **BakeBuddy checks the stock.** Launch it, demonstrate the pizza question and the terminal log, then let learners build. Walk round and look at the descriptions and the history.

## End of sprint review

Tick each one when you have seen it.

- [ ] Every learner can say who runs the tool: the AI asks, their code runs it.
- [ ] Every learner has a `checkStock` function that handles an unknown item without crashing.
- [ ] Every learner's loop has `MAX_LOOPS` of 5 or less and puts the whole assistant reply into the history.
- [ ] A broken tool shows a friendly message and the server stays up.
- [ ] Tool calls are logged to the terminal.
- [ ] No API key is in any repository, and `.env` is in `.gitignore`.
- [ ] Every learner has four test questions and answers in their README.
- [ ] Every learner has had feedback on the assignment.
