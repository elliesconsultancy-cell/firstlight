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
