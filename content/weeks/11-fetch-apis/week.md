---
title: Talking to the internet - JSON, fetch & APIs
summary: Learn how your web page can ask other services for live data, like weather, jokes or dog photos, and show it to your users.
---
So far, all the data in your apps has been typed by you, straight into an array in your code. That is fine for a reading list. But what about today's weather, the latest football scores, or a random photo of a dog? You cannot type those in advance. You need to **ask the internet**.

This week you will learn how web pages talk to other computers. You will meet **APIs**, which are services that hand out data, and **JSON**, the simple text format most of them use. You will learn why some code has to *wait*, what a **promise** is, and how to use `fetch` with `async` and `await` to get data and put it on the page.

Real networks are slow and sometimes things go wrong, so you will also learn to show a **loading** message while you wait and a friendly **error** message when something fails. This is what separates a demo from an app people can actually use.

All the APIs we use this week are free and need no sign-up or key. You can try every example straight away in the playground.

## By the end of this week you will be able to

- Explain what an API is and read data in JSON format
- Convert between JSON text and JavaScript values with `JSON.parse` and `JSON.stringify`
- Describe the difference between synchronous and asynchronous code, and what a promise is
- Fetch data from a public API using `fetch`, `async` and `await`
- Show loading and error states, and render fetched data into the DOM
