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

## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: What is the DOM?
- [ ] Read: Changing the page
- [ ] Read: Events and event listeners
- [ ] Read: State and render

**Do**
- [ ] Do the "Corner Shop" exercise: select elements with `getElementById`, `querySelectorAll` and `querySelector`
- [ ] Make a click counter and a form that adds items to a list
- [ ] Build the reading list with a `books` array and a `render()` function
- [ ] Finish the assignment: Reading list or quote app

**Share**
- [ ] Submit your work and read your instructor's feedback

<!-- instructor -->
## Day plan

### Learning objectives
- Learners can find elements and change text, classes, attributes and styles.
- Learners can create and remove elements.
- Learners can respond to `click`, `input` and `submit` events.
- Learners can render a list from an array using state and `render()`.

### Purpose
This is where pages become interactive. It builds on the arrays, objects and functions from earlier weeks, and next week's fetch work reuses the same state and render pattern.

### Agenda
1. **What is the DOM?** Teach the family tree, `defer` and the three ways to find elements. Misspell a selector on purpose and read the null error.
2. **Changing the page.** Teach `textContent`, `classList`, and create, fill and attach. Learners do the "your turn" exercise.
3. **Events and event listeners.** Teach `addEventListener`, the click counter and the form with `preventDefault`. Pay attention to `sayHello` versus `sayHello()`.
4. **State and render.** Teach the `books` array and `render()`. Repeat the rule: change the state, then call `render()`.
5. **Reading list or quote app.** Launch the assignment. Get learners to plan on paper first, then build in small steps and commit after each one.

## End of sprint review

Tick each one when you have seen it.

- [ ] Every learner can explain the DOM as a tree built from the HTML.
- [ ] Every learner has seen and understood the "Cannot read properties of null" error.
- [ ] Every learner's form adds an item without reloading the page.
- [ ] Every learner's app draws its list from an array with a `render()` function.
- [ ] Every learner's app has validation, a toggle button and a correct count.
- [ ] Every learner's app is live on GitHub Pages and works on a phone-sized screen.
- [ ] Every learner has had feedback on the assignment.
