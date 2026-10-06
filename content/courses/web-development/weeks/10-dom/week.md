---
title: Making pages interactive (the DOM)
summary: Use JavaScript to read and change your web page, react to clicks and typing, and build a small interactive app.
---
Think of a toy robot with a remote control. The robot is your web page. The remote is JavaScript. Until now, you wrote the robot (HTML) and a separate remote (JavaScript) that only printed messages in the console. This week, the remote finally controls the robot.

The link between them is called the **DOM**. With the DOM, JavaScript can find any element on your page. It can change text, add new elements, remove old ones, and listen for what the user does, like clicking a button or typing in a box. Every interactive website works this way, from a "like" button to a full online shop.

We build step by step. First we find elements. Then we change them. Then we react to events. In the last lesson you learn a pattern called **state and render**. It keeps your code tidy as your app grows. You use it in this week's assignment to build a small app of your own.

Most examples this week come in pairs: a small HTML snippet and a JavaScript snippet. Paste the HTML into the playground's HTML pane and the JavaScript into the JS pane. Then play.

## By the end of this week you will be able to

- Explain what the DOM is and how it relates to your HTML
- Select elements with `querySelector`, `querySelectorAll` and `getElementById`
- Change text, attributes, classes and styles, and create or remove elements
- Respond to `click`, `input` and `submit` events with event listeners
- Render a list on the page from an array, using the state and render pattern
