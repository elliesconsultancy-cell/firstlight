---
title: URLs, requests and responses
kind: lesson
minutes: 25
---
Imagine you order food by phone. You say the address. The shop finds your house. A rider brings the food and tells you "here it is", or "sorry, we have no such dish".

Your browser does something very like this each time you visit a page. It has a quick conversation with a server. In this lesson you learn the words of that conversation: URLs, requests and responses.

## URLs: addresses for the web

To send a letter, you need an address. To get a web page, your browser needs an address too. On the web, an address is called a **URL** (Uniform Resource Locator).

Here is an example:

```bash
https://www.example.com/recipes/jollof-rice.html
```

We can split it into three parts:

| Part | Example | What it means |
| --- | --- | --- |
| **Protocol** | `https://` | The rules for the conversation. The "s" means **secure** (private). |
| **Domain name** | `www.example.com` | Which server to talk to. Like the name of a building. |
| **Path** | `/recipes/jollof-rice.html` | Which file on that server. Like the room inside the building. |

In plain words, this URL says: "Use secure HTTP. Go to the server called `www.example.com`. Ask for the file `jollof-rice.html` in the `recipes` folder."

> 💡 **Tip:** Look for a padlock icon or `https://` in the address bar. It means your connection is encrypted (scrambled), so other people on the network cannot read it. Never type a password on a site without it.

### Try it

For each URL, name the protocol, the domain and the path.

1. `https://developer.mozilla.org/en-US/docs/Web/HTML`
2. `https://www.bbc.co.uk/news`

<details><summary>Show answers</summary>

1. Protocol `https://`, domain `developer.mozilla.org`, path `/en-US/docs/Web/HTML`
2. Protocol `https://`, domain `www.bbc.co.uk`, path `/news`

</details>

## Domain names and IP addresses

Computers find each other with numbers called **IP addresses**, like `93.184.215.14`. People cannot remember numbers well. So we use names, like `example.com`.

A system called **DNS** (Domain Name System) turns names into numbers. It works like the contacts app on your phone. You tap "Mum", and the phone looks up her number for you.

## What happens when you press Enter

Let us follow one visit, step by step.

1. **You type a URL** in the address bar.
2. **DNS lookup:** the browser finds the IP address for the domain name.
3. **Request:** the browser sends a message to that server: "Please send me `/recipes/jollof-rice.html`."
4. **The server looks for the file.**
5. **Response:** the server sends back a message. It has a **status code** and, if all went well, the HTML file.
6. **The browser reads the HTML** and draws the page on your screen.

The HTML may mention other files, like images, CSS and JavaScript. Then the browser sends **more requests**, one for each file.

All of this usually takes less than a second.

The rules for these messages are called **HTTP** (HyperText Transfer Protocol). **HTTPS** is HTTP with security added.

> 🧠 **Remember:** One page is often many requests. A page with 10 images needs at least 11 requests: one for the HTML and one for each image.

## Status codes: the server's reply

Each response has a **status code**. It is a three-digit number that says how it went. You do not need to learn them all. These four are worth knowing:

| Code | Meaning | At a restaurant |
| --- | --- | --- |
| **200** OK | Here is what you asked for | Your food arrives |
| **301** Moved | It is somewhere else now | "That dish is on the other menu now" |
| **404** Not Found | There is no such file | "We do not have that dish" |
| **500** Server Error | Something broke on the server | "Sorry, the kitchen has a problem" |

You have probably seen a "404 page not found" message. Now you know what it means. The server exists, but it has no file at that path.

## Watch it happen in DevTools

You can see the requests and responses yourself in Chrome DevTools.

### Try it

1. Open Chrome and go to `https://developer.mozilla.org`.
2. Open DevTools (`F12`) and click the **Network** tab.
3. Refresh the page (`F5`).
4. Watch the list fill up. Each row is **one request**.
5. Click the first row. Find **Request URL**, **Request Method** and **Status Code**.

How many requests did the page make? Look at the bottom of the Network panel. Is it more than you expected?

> ⚠️ **Watch out:** The Network panel only records while DevTools is open. If the list is empty, refresh the page with DevTools open.

## What about files on my own computer?

When you double-click an HTML file on your own computer, there is no server. The browser opens the file straight from your disk. The address bar shows something like this:

```bash
file:///C:/Users/ada/Documents/firstlight/week-01/index.html
```

`file://` means "a file on this computer". That is fine while you learn. Later you will put your pages on a real server, so anyone in the world can see them.

## Check your understanding

1. What are the three main parts of `https://www.example.com/about.html`?
2. What does DNS do?
3. What is the difference between a request and a response?
4. What does a 404 status code mean?
5. Why can one web page cause many requests?

<details><summary>Show answers</summary>

1. Protocol `https://`, domain `www.example.com`, path `/about.html`.
2. It turns a domain name (like `example.com`) into an IP address, so computers can find each other.
3. A request is the message the browser sends to ask for something. A response is the server's reply, with a status code and usually some content.
4. Not found: the server has no file at that path.
5. The HTML can include other files, like images, CSS and JavaScript. The browser asks for each one separately.

</details>

## Go deeper

- [MDN: What is a URL?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL)
- [MDN: An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [MDN: What is a domain name?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can split a URL into protocol, domain and path
- explain what DNS does in one sentence
- describe the steps from typing a URL to seeing a page
- say what 200, 301, 404 and 500 mean
- see requests in the DevTools Network tab

### Purpose
Reading URLs and status codes is the first step in debugging. A learner who knows what a 404 means can fix a broken link instead of guessing.

### Things to teach
1. **Anatomy of a URL.** Use `https://www.example.com/recipes/jollof-rice.html`. Protocol is the rules, domain is the building, path is the room. Do the two Try it URLs (MDN and BBC) together.
2. **DNS is the contacts app.** Computers use IP numbers. DNS turns `example.com` into a number, like tapping Mum in your phone.
3. **One visit, step by step.** Walk the six steps: type, DNS lookup, request, server looks for the file, response with a status code, browser draws the page. Say one page is many requests.
4. **Status codes.** Teach 200, 301, 404, 500 with the restaurant table. A 404 means the server is there but has no file at that path.
5. **Watch it in DevTools.** Open `https://developer.mozilla.org`, open the Network tab, refresh with DevTools open, and click the first row to find Request URL, Method and Status Code.

### Check understanding
- Ask: "Split `https://www.example.com/about.html` into parts." A good answer: protocol `https://`, domain `www.example.com`, path `/about.html`.
- Ask: "What does a 404 mean?" A good answer: the server has no file at that path.
- Ask: "Why can one page make many requests?" A good answer: images, CSS and JavaScript are separate files, each asked for on its own.

### Watch for
- An empty Network list. DevTools must be open before the refresh.
- Learners who confuse the domain with the path. Point to the slash that starts the path.
- Confusion about `file://` addresses. Say that opening a file from disk uses no server yet.
