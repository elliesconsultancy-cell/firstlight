---
title: URLs, requests and responses
kind: lesson
minutes: 25
---
Every time you visit a web page, your browser and a server have a very quick conversation. In this lesson you'll learn the language of that conversation: URLs, requests and responses.

## URLs: addresses for the web

To send a letter, you need an address. To get a web page, your browser needs an address too. On the web, an address is called a **URL** (Uniform Resource Locator).

Here is an example URL:

```bash
https://www.example.com/recipes/jollof-rice.html
```

Let's split it into parts:

| Part | Example | What it means |
| --- | --- | --- |
| **Protocol** | `https://` | The rules for the conversation. The "s" means **secure** (encrypted). |
| **Domain name** | `www.example.com` | Which server to talk to. Like the name of a building. |
| **Path** | `/recipes/jollof-rice.html` | Which file on that server. Like the room inside the building. |

So this URL says: "Using secure HTTP, go to the server called `www.example.com`, and ask for the file `jollof-rice.html` in the `recipes` folder."

> 💡 **Tip:** Look for the padlock icon or `https://` in your browser's address bar. It means your connection is encrypted, so other people on the network cannot read it. Never type a password on a site without it.

### Try it

Look at these URLs. For each one, name the protocol, the domain, and the path.

1. `https://developer.mozilla.org/en-US/docs/Web/HTML`
2. `https://www.bbc.co.uk/news`

<details><summary>Show answers</summary>

1. Protocol `https://`, domain `developer.mozilla.org`, path `/en-US/docs/Web/HTML`
2. Protocol `https://`, domain `www.bbc.co.uk`, path `/news`

</details>

## Domain names and IP addresses

Computers on the internet actually find each other using numbers called **IP addresses**, like `93.184.215.14`. Numbers are hard for humans to remember, so we use names instead, like `example.com`.

A system called **DNS** (Domain Name System) turns names into numbers. It works like the contacts app on your phone: you tap "Mum", and the phone looks up her number for you.

## The request–response cycle

Now let's follow what happens when you type a URL and press Enter.

1. **You type a URL** into the browser's address bar.
2. **DNS lookup:** the browser finds the IP address for the domain name.
3. **Request:** the browser sends a message to that server: "Please send me `/recipes/jollof-rice.html`."
4. **The server looks for the file.**
5. **Response:** the server sends back a message with a **status code** and (if all went well) the HTML file.
6. **The browser reads the HTML** and draws the page on your screen. If the HTML mentions other files (images, CSS, JavaScript), the browser sends **more requests** for each of them.

All of this usually happens in less than a second!

The rules for these request and response messages are called **HTTP** (HyperText Transfer Protocol). **HTTPS** is the same, but secure.

> 🧠 **Remember:** One page is often many requests. A page with 10 images needs at least 11 requests: one for the HTML, and one for each image.

## Status codes: the server's reply

Each response has a **status code**, a three-digit number that says how things went. You don't need to learn them all, but these are worth knowing:

| Code | Meaning | Restaurant analogy |
| --- | --- | --- |
| **200** OK | Here's what you asked for | Your food arrives |
| **301** Moved | It's somewhere else now; go there | "That dish is on the other menu now" |
| **404** Not Found | There's no such file | "We don't have that dish" |
| **500** Server Error | Something broke on the server | "Sorry, the kitchen is on fire" |

You've probably seen a "404 page not found" error before. Now you know what it means: the server exists, but the file at that path does not.

## Watch it happen in DevTools

You can watch the request–response cycle yourself in Chrome DevTools.

### Try it

1. Open Chrome and go to `https://developer.mozilla.org`.
2. Open DevTools (`F12`) and click the **Network** tab.
3. Refresh the page (`F5`).
4. Watch the list fill up. Each row is **one request**.
5. Click the first row. Look for **Request URL**, **Request Method** and **Status Code**.

How many requests did the page make? (Look at the bottom of the Network panel.) It's probably a lot more than you expected!

> ⚠️ **Watch out:** The Network panel only records while DevTools is open. If the list is empty, refresh the page with DevTools open.

## What about files on my own computer?

When you double-click an HTML file on your own computer, there's no server. The browser opens the file directly from your disk. The address bar will show something like:

```bash
file:///C:/Users/ada/Documents/firstlight/week-01/index.html
```

The `file://` protocol means "a file on this computer". That's perfectly fine while you're learning. Later in the course you'll put your pages on a real server so anyone in the world can see them.

## Check your understanding

1. What are the three main parts of `https://www.example.com/about.html`?
2. What does DNS do?
3. What is the difference between a request and a response?
4. What does a 404 status code mean?
5. Why might one web page cause many requests?

<details><summary>Show answers</summary>

1. Protocol `https://`, domain `www.example.com`, path `/about.html`.
2. It turns a domain name (like `example.com`) into an IP address, so computers can find each other.
3. A request is the message the browser sends to ask for something. A response is the server's reply, with a status code and usually some content.
4. Not found: the server has no file at that path.
5. The HTML can include other files, like images, CSS and JavaScript. The browser requests each one separately.

</details>

## Go deeper

- [MDN: What is a URL?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL)
- [MDN: An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [MDN: What is a domain name?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name)
