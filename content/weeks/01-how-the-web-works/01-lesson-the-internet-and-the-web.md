---
title: The internet and the web
kind: lesson
minutes: 20
---
People often say "the internet" and "the web" as if they mean the same thing. They don't. Knowing the difference will help you understand everything else in this course.

## The internet: the roads

The **internet** is a huge network of computers all over the world, connected together. They are connected by cables (some even run under the ocean!), Wi-Fi, mobile phone masts and satellites.

Think of the internet as a **road system**. Roads connect every town and every house. On their own, roads do nothing. They just make it **possible** to travel and deliver things.

Lots of different services use the internet "roads":

- Email
- Video calls
- Online games
- Messaging apps
- And... the web

## The web: one kind of traffic

The **World Wide Web** (or just "the web") is a collection of **web pages** and **websites** that you look at in a **browser**. It travels on the internet, just like delivery vans travel on roads.

So:

- **Internet** = the roads (the network)
- **Web** = one type of service that uses those roads (web pages)

> 🧠 **Remember:** The web runs **on top of** the internet. When you send a WhatsApp message, you use the internet, but not the web. When you visit a website in Chrome, you use both.

## A tiny bit of history

The web was invented in 1989 by Tim Berners-Lee, a British scientist working at CERN in Switzerland. He wanted scientists to easily share documents and **link** them together. He created three key ideas that we still use today:

1. **HTML** – the language for writing web pages
2. **URLs** – addresses for finding pages
3. **HTTP** – the rules for sending pages from one computer to another

You will learn all three this week. The internet itself is older; it grew from research networks in the 1960s and 1970s.

## Clients and servers

Computers on the web play two main roles.

A **server** is a computer that **stores** websites and **serves** (sends) them when asked. Servers are usually in big buildings called data centres, switched on all day and night.

A **client** is the computer or phone that **asks** for a web page. Your laptop is a client. More specifically, your **browser** (Chrome, Firefox, Safari, Edge) is the client program.

A restaurant is a good analogy:

- You (the **client**) sit at a table and ask for food.
- The kitchen (the **server**) prepares the food and sends it out.
- The waiter carries your **request** to the kitchen and brings back the **response** (your food).

On the web, the "waiter" is a set of rules called **HTTP**. We will look at it in the next lesson.

### Try it

Write down your answer to each of these before checking:

1. You watch a video on a website in Chrome. Is that the internet, the web, or both?
2. You play an online game in an app on your phone. Is that the internet, the web, or both?
3. You open a web page on your laptop. Which is the client: your laptop, or the computer in the data centre?

<details><summary>Show answers</summary>

1. Both. A website in a browser is the web, and it travels on the internet.
2. The internet (the game app talks to its servers directly, without a browser or web pages).
3. Your laptop (more precisely, your browser) is the client. The computer in the data centre is the server.

</details>

## What is a web page made of?

A web page is mostly **text files**. These files are written in three languages, each with its own job. A house is a helpful analogy:

| Language | Job | House analogy |
| --- | --- | --- |
| **HTML** | Structure and content | The walls, rooms and furniture |
| **CSS** | Style and layout | The paint, wallpaper and decoration |
| **JavaScript** | Behaviour and interaction | The electricity: lights, doorbell, heating |

This week and next week we focus on **HTML**. Here is a very small piece:

```html
<h1>My first web page</h1>
<p>Hello from the web!</p>
```

The browser reads this text and turns it into a big heading and a paragraph. Press **Try in playground** to see it.

### Try it

In the playground, add a second paragraph under the first one with a fact about yourself. Use `<p>` at the start and `</p>` at the end.

## Peek behind any website

Every web page you visit is made from HTML. You can see it yourself!

1. Open any website in Chrome.
2. Right-click on an empty part of the page and choose **View page source** (or press `Ctrl + U`, `Cmd + Option + U` on Mac).
3. A new tab opens with lots of text. That's the HTML the server sent to your browser.

It probably looks scary and long. Don't worry. In a few weeks, many parts of it will look familiar.

> 💡 **Tip:** Try "View page source" on a very simple website, and then on a big one like a news site. Notice how much more code big websites use.

## Check your understanding

1. What is the difference between the internet and the web?
2. What does a server do?
3. What is the client when you visit a website?
4. Which language gives a web page its structure: HTML, CSS or JavaScript?

<details><summary>Show answers</summary>

1. The internet is the worldwide network of connected computers (the roads). The web is a collection of linked web pages that travels on the internet (one kind of traffic).
2. It stores websites and sends (serves) them to clients when they ask.
3. Your browser, running on your computer or phone.
4. HTML.

</details>

## Go deeper

- [MDN: How does the internet work?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work)
- [MDN: How the web works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)
- [MDN: What is a web server?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server)
