---
title: Talking to the internet - JSON, fetch & APIs
summary: Learn how your web page can ask other services for live data, like weather, jokes or dog photos, and show it to your users.
---
Think about a restaurant. You do not keep all the food at your table. You ask the waiter, and the kitchen sends it to you.

Your web page can do the same. So far, all your data was typed by you, into an array in your code. That is fine for a reading list. But what about today's weather, the latest football scores, or a random photo of a dog? You cannot type those in advance. You need to **ask the internet**.

This week you learn how web pages talk to other computers:

- **APIs** are services that hand out data.
- **JSON** is the simple text format most of them use.
- A **promise** is how JavaScript handles things that take time. You learn why some code has to *wait*.
- `fetch` with `async` and `await` gets data and puts it on the page.

Real networks are slow, and sometimes things go wrong. So you also learn to show a **loading** message while you wait, and a friendly **error** message when something fails. This is the difference between a demo and an app people can use.

All the APIs we use this week are free. They need no sign-up and no key. You can try every example in the playground.

## By the end of this week you will be able to

- Explain what an API is and read data in JSON format
- Convert between JSON text and JavaScript values with `JSON.parse` and `JSON.stringify`
- Describe the difference between synchronous and asynchronous code, and what a promise is
- Fetch data from a public API using `fetch`, `async` and `await`
- Show loading and error states, and render fetched data into the DOM
