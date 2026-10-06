---
title: The internet and the web
kind: lesson
minutes: 20
---
Think about a road system. Roads join every town and every house. On their own, roads do nothing. But vans, buses and bikes use them to carry things.

The internet and the web are like this. People often use the two words as if they mean the same thing. They do not. In this lesson you learn the difference, and you meet the two computers in every web visit: the client and the server.

## The internet: the roads

The **internet** is a huge network of computers all over the world, joined together. The links are cables (some run under the ocean), Wi-Fi, phone masts and satellites.

The internet is the **roads**. It does not do much alone. It makes it **possible** to send things from one place to another.

Many services use these roads:

- Email
- Video calls
- Online games
- Messaging apps
- The web

## The web: one kind of traffic

The **World Wide Web** (called "the web") is a large collection of **web pages** and **websites**. You look at them in a **browser** (a program like Chrome or Firefox).

The web travels on the internet, like delivery vans travel on roads.

- **Internet** = the roads (the network)
- **Web** = one kind of traffic on those roads (web pages)

> 🧠 **Remember:** The web runs **on top of** the internet. A WhatsApp message uses the internet, but not the web. A website in Chrome uses both.

## A little history

The web was invented in 1989 by Tim Berners-Lee, a British scientist at CERN in Switzerland. Scientists needed to share documents and **link** them together. He created three ideas that we still use:

1. **HTML:** the language for writing web pages
2. **URLs:** addresses for finding pages
3. **HTTP:** the rules for sending pages from one computer to another

You will learn all three this week. The internet is older. It grew from research networks in the 1960s and 1970s.

## Clients and servers: a restaurant

Picture a restaurant.

- You sit at a table and ask for food. You are the **client**.
- The kitchen makes the food. The kitchen is the **server**.
- The waiter carries your **request** to the kitchen. Then the waiter brings back the **response**: your food.

Now the same story on the web:

- A **server** is a computer that **stores** websites and sends them when someone asks. Servers sit in big buildings called data centres. They stay on day and night.
- A **client** is the computer or phone that **asks** for a page. More exactly, the client is your **browser**.
- The "waiter" is a set of rules called **HTTP**. The next lesson explains it.

Where the picture stops being true: a real server can serve thousands of people at the same time. A kitchen cannot.

### Try it

Write your answer to each question before you open the answers.

1. You watch a video on a website in Chrome. Is that the internet, the web, or both?
2. You play an online game in an app on your phone. Is that the internet, the web, or both?
3. You open a web page on your laptop. Which one is the client: your laptop, or the computer in the data centre?

<details><summary>Show answers</summary>

1. Both. A website in a browser is the web, and it travels on the internet.
2. The internet. The game app talks to its servers directly, without a browser or web pages.
3. Your laptop (more exactly, your browser) is the client. The computer in the data centre is the server.

</details>

## What is a web page made of?

A web page is mostly **text files**. They use three languages. Each language has its own job. Think of a house:

| Language | Job | In a house |
| --- | --- | --- |
| **HTML** | Structure and content | The walls, rooms and furniture |
| **CSS** | Style and layout | The paint, wallpaper and decoration |
| **JavaScript** | Behaviour and interaction | The electricity: lights, doorbell, heating |

This week and next week we focus on **HTML**. Here is a very small piece:

```html
<h1>My first web page</h1>
<p>Hello from the web!</p>
```

The browser reads this text. It shows a big heading and a paragraph. Press **Try it** to see it.

### Try it

In the playground, add a second paragraph under the first one. Write a fact about yourself. Start with `<p>` and end with `</p>`.

## Look inside any website

Every web page is made from HTML. You can see it yourself.

1. Open any website in Chrome.
2. Right-click on an empty part of the page. Choose **View page source**. (Or press `Ctrl + U`, or `Cmd + Option + U` on Mac.)
3. A new tab opens with a lot of text. This is the HTML the server sent to your browser.

It looks long and scary. That is normal. In a few weeks, much of it will look familiar.

> 💡 **Tip:** Try "View page source" on a very small website. Then try it on a big news site. See how much more code the big site has.

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
