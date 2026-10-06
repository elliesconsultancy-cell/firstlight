---
title: What is an API?
kind: lesson
minutes: 20
---
Imagine you sit down in a restaurant. You do not walk into the kitchen. You do not know how the cooks work or where the food is stored. You tell the **waiter** what you want. The waiter takes your order to the kitchen, and later brings your food back.

This is how you will talk to an AI model from your code. The model lives on a big computer far away. You cannot touch it. You send your order through a waiter, and the waiter is called an **API**.

## The restaurant picture

An **API** (Application Programming Interface) is a set of rules that lets one program ask another program to do something. The asking program sends a **request**. The other program sends back a **response**.

| In the restaurant | In your code |
| --- | --- |
| You, the customer | Your program (the **client**) |
| The waiter | The API |
| The kitchen | The **server** that runs the model |
| Your order | The request |
| Your food | The response |

You may remember this picture from the web course. An API is a waiter for programs instead of for people.

## Where the picture stops being true

A real waiter is a person who understands "a bit less salt, please". An API is stricter. It accepts only orders written in exactly the right shape. If your order has a spelling mistake in a field name, the waiter does not guess. The waiter sends back an error.

Also, the waiter checks who you are. Most AI APIs ask for a secret key, like a membership card. We will meet it in the next lesson.

## The four parts of an order

Every web API request has the same parts. You already know most of them from the web course.

1. **URL**: the address of the kitchen's door, for example `https://api.example.com/orders`.
2. **Method**: what you want to do. `GET` means "give me something". `POST` means "here is something, please work on it".
3. **Headers**: small notes about the order, like "I speak JSON" or "here is my membership card".
4. **Body**: the order itself. Most APIs use **JSON**, a text format with `{ "name": "value" }` pairs.

The response has a **status code** too. `200` means "all good". `401` means "I do not know who you are". `429` means "too many orders, slow down". `500` means "the kitchen has a problem".

## Try a real API

Here is a small public API that needs no key. It sends back a short piece of advice. Press **Try it** and run it.

```js
const response = await fetch("https://api.github.com/zen");
console.log("Status:", response.status);
const text = await response.text();
console.log("Reply:", text);
```

Read the code line by line:

- `fetch(...)` sends a `GET` request to the URL. It is the waiter walking to the kitchen.
- `await` means "wait here until the food comes back".
- `response.status` is the status code.
- `response.text()` reads the body as plain text.

Now a second one. This API sends back JSON:

```js
const response = await fetch("https://api.github.com/users/octocat");
const data = await response.json();
console.log(data.login);
console.log(data.public_repos);
```

`response.json()` turns the JSON text into a JavaScript object. Then you can read fields with a dot, like `data.login`.

### Try it

Change the second example to print `data.name` and `data.location` too. What do you think will happen if you ask for a field that does not exist, like `data.banana`?

<details><summary>Show answers</summary>

You see the name and location of the account. For `data.banana` you get `undefined`. JavaScript does not stop. It only tells you there is nothing there.

</details>

## What an AI API request looks like

The AI API we use in this course is the **Messages API** from Anthropic, the company that makes the Claude models. Other providers work in a very similar way, so everything you learn here transfers.

The request is a `POST` to one URL. The body is JSON. This is what the body looks like:

```json
{
  "model": "claude-haiku-4-5-20251001",
  "max_tokens": 200,
  "messages": [
    { "role": "user", "content": "Say hello to a customer of a bakery." }
  ]
}
```

- `model` is which model cooks the answer.
- `max_tokens` is the longest answer you accept. It also protects your wallet.
- `messages` is the list of what was said. Each message has a `role` (`user` is you) and `content` (the words).

> ⚠️ **Watch out:** Do not run the AI request in the browser playground. It needs a secret key, and browser code can be read by anyone. You will run it from Node in lesson 3.

## Check your understanding

1. In the restaurant picture, what is the API?
2. What is the difference between `GET` and `POST`?
3. You get a status code `401`. What does it probably mean?
4. In the AI request body, what does `max_tokens` control?

<details><summary>Show answers</summary>

1. The waiter. It carries your request to the kitchen (the server) and brings back the response.
2. `GET` asks for something. `POST` sends something (like your question) for the server to work on.
3. The server does not know who you are, so your key is missing or wrong.
4. The longest answer you will accept, counted in tokens. It also limits what you pay.

</details>

> 🧠 **Remember:** An API is a waiter for programs. You send a request with a URL, a method, headers and a body. You get back a status code and a body. Always use the exact shape the menu asks for.

## Go deeper

- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Claude docs: Messages API](https://platform.claude.com/docs/en/api/messages)
