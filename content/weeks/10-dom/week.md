---
title: Making pages interactive (the DOM)
summary: Use JavaScript to read and change your web page, react to clicks and typing, and build a small interactive app.
---
Until now, your HTML and your JavaScript have lived separate lives. The HTML made the page. The JavaScript did calculations and printed results in the console. This week, they finally meet.

The bridge between them is called the **DOM**. Through the DOM, JavaScript can find any element on your page, change its text, add new elements, remove old ones, and listen for things the user does, like clicking a button or typing in a box. This is how every interactive website works, from a simple "like" button to a full online shop.

We will build up step by step: first finding elements, then changing them, then reacting to events. In the last lesson you will learn a simple pattern, **state and render**, that keeps your code organised even as your app grows. You will use it in this week's assignment to build a small app of your own.

Most examples this week come in pairs: a small HTML snippet and a JavaScript snippet. Paste the HTML into the playground's HTML pane and the JavaScript into the JS pane, then play.

## By the end of this week you will be able to

- Explain what the DOM is and how it relates to your HTML
- Select elements with `querySelector`, `querySelectorAll` and `getElementById`
- Change text, attributes, classes and styles, and create or remove elements
- Respond to `click`, `input` and `submit` events with event listeners
- Render a list on the page from an array, using the state and render pattern
