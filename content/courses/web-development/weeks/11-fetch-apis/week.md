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

## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: APIs and JSON
- [ ] Read: Waiting for things - async code and promises
- [ ] Read: Fetching data with fetch
- [ ] Read: Loading, errors and rendering fetched data

**Do**
- [ ] Open an API URL in your browser and write down the path to the data you want
- [ ] Write a function that fetches data with `async`, `await` and a `response.ok` check
- [ ] Add a loading message and a friendly error message, and test them with Slow 4G and Offline
- [ ] Finish the assignment: Build an app with a public API

**Share**
- [ ] Submit your work and read your instructor's feedback

<!-- instructor -->
## Day plan

### Learning objectives
- Learners can explain what an API is and read JSON.
- Learners can explain asynchronous code and promises.
- Learners can fetch data with `fetch`, `async` and `await`, and check `response.ok`.
- Learners can show loading and error states and render fetched data.

### Purpose
Learners move from data they typed to live data from the internet. It builds on last week's DOM and state and render work, and it gives them a skill they can use in the final project.

### Agenda
1. **APIs and JSON.** Teach the restaurant picture and open real endpoints in the browser. Teach `JSON.parse` and `JSON.stringify`, and read nested data.
2. **Waiting for things - async code and promises.** Teach the two cafes, the `setTimeout` order and the three promise states. Learners predict the A, B, C, D output before running it.
3. **Fetching data with fetch.** Teach the two `await`s, showing a dog or joke on the page and the `response.ok` check. Try a GitHub username that does not exist.
4. **Loading, errors and rendering fetched data.** Teach the loading, success and error pattern with `finally`. Use the Network tab to try Slow 4G and Offline.
5. **Build an app with a public API.** Launch the assignment. Learners choose an API, explore it in the browser first and plan before coding.

## End of sprint review

Tick each one when you have seen it.

- [ ] Every learner can explain an API and JSON in their own words.
- [ ] Every learner has used `JSON.parse` on text and read a nested value.
- [ ] Every learner can say why `await` is needed and why `fetch` needs two of them.
- [ ] Every learner's app shows a loading message and a friendly error message.
- [ ] Every learner's app checks `response.ok` and stops empty input before sending a request.
- [ ] Every learner's app shows at least three pieces of fetched data on the page and is live on GitHub Pages.
- [ ] Every learner has had feedback on the assignment.
