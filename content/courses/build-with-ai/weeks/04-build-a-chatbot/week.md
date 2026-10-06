---
title: Build a chatbot
summary: Give BakeBuddy a memory, protect your key with a small Express server, and build a chat page that people can really use.
---
Last week your script asked one question and got one answer. A real chatbot has a conversation. But there is a surprise: the AI remembers nothing. This week you will learn why, and how an app can fix it.

First, you will see the **notebook trick**. The AI forgets everything between calls, so your app keeps a notebook of the conversation and shows the whole notebook every time. That is what memory really is.

Then you will build a small **server** with Express. A server can hold your secret key safely, so the key never travels to the browser. Finally, you will build a **chat page** with plain HTML, CSS and JavaScript, and connect it to your server.

At the end, BakeBuddy is a real chat on a web page. Use Amina's bakery, or your own idea. The steps are the same.

## By the end of this week you will be able to

- Explain why an AI has no memory and how an app gives it one
- Keep a conversation as a list of messages and send it with every call
- Build an Express server with a `POST /api/chat` route that holds your key
- Validate what the browser sends and handle errors in the server
- Build a chat page that sends messages to your own server and shows the replies
