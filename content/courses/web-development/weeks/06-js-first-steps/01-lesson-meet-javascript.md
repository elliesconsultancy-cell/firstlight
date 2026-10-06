---
title: Meet JavaScript and the console
kind: lesson
minutes: 25
---
Think about the last time you clicked "Add to basket" on a shop website. The basket number went up. The page did not reload. Something made that happen. That something is JavaScript.

By the end of this lesson, you will write your own JavaScript and see it run. You will also learn the tool that shows you what your code is doing: the console.

## What is JavaScript?

JavaScript (we say **JS** for short) is a **programming language**. It is a way to give a computer a list of instructions. The computer follows them one by one.

Think about a recipe. It says: "Crack two eggs. Add sugar. Mix for one minute." A cook follows the steps in order.

A program is like a recipe. The cook is the computer. But the computer is very literal. If a recipe says "add salt" and gives no amount, a person guesses. A computer stops and shows an error.

## The three languages of the web

A web page uses three languages. Each has its own job.

| Language | Job | Picture |
| --- | --- | --- |
| HTML | Structure and content | The skeleton |
| CSS | How it looks | The clothes |
| JavaScript | What it does | The muscles |

> 💡 **Tip:** JavaScript and Java are different languages. The names are similar by accident of history. You do not need Java in this course.

## Where does JavaScript run?

JavaScript needs a program that can read it and run it. We call this an **environment**. Two common ones are:

1. **The web browser** (Chrome, Firefox, Safari, Edge). Every browser has a JavaScript engine inside. So you do not install anything.
2. **Node.js**. This program runs JavaScript on your computer, outside a browser. Developers use it to build servers and tools.

We start in the browser, because you already have one.

## Open the console

The **console** is a part of Chrome DevTools. You type JavaScript there, and the answer appears straight away. It works like a calculator that understands JavaScript.

1. Open Chrome and go to any page. A blank tab is fine.
2. Right-click the page and choose **Inspect**. You can also press `F12`. On Windows, press `Ctrl + Shift + J`. On Mac, press `Cmd + Option + J`.
3. Click the **Console** tab.
4. Click next to the `>` symbol. Type `2 + 3` and press **Enter**.

You should see `5`. You ran your first JavaScript. Well done!

> ⚠️ **Watch out:** Chrome may ask you to type "allow pasting" before you can paste code into the console. This is a safety feature. Never paste code from people you do not trust.

## Make the computer say something: console.log

The console shows one answer at a time. But a real program has many lines. We need a way to ask the computer to show us a value. That is what `console.log` does.

```js
console.log("Hello, Firstlight!");
console.log(10 * 4);
console.log("I am learning JavaScript");
```

Each `console.log(...)` prints what is inside the brackets. Picture asking a friend to read something out loud.

What do you think the second line prints? Think first. It prints `40`.

Three things to notice:

- Spell it exactly like this: `console.log`. Lower case, with a dot in the middle.
- Text goes inside quote marks: `"like this"`. Numbers do not need quotes.
- Each instruction usually ends with a semicolon `;`. It works like a full stop. JavaScript often lets you forget it, but it is a good habit.

### Try it

Click **Try it** on the code below, or type it in the Chrome console. Then change the messages so they are about you.

```js
console.log("My name is Ada");
console.log("I live in Bolton");
console.log(7 * 52);
```

What do you think `7 * 52` is? Hint: it is about the number of days in a year.

## Comments: notes for humans

Sometimes you want to leave a note in your code. The computer should skip it. This kind of note is a **comment**.

```js
// This is a comment. The computer skips this line.
console.log("This line runs"); // A comment can also go at the end of a line
```

A comment starts with `//`. Use comments to explain why you did something. Your future self will be glad.

## Other places to run JavaScript

### The course playground

Many code examples have a **Try it** button. It runs the code and shows the `console.log` output. Use it for most exercises this week.

### An HTML page

You can also put JavaScript inside a web page with a `<script>` tag.

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>My first script</h1>
    <script>
      console.log("Hello from inside the page!");
    </script>
  </body>
</html>
```

Open this file in Chrome. Then open the console. The message appears there, not on the page. Later in the course you will keep JavaScript in its own file. You will link it with `<script src="script.js"></script>`.

## Optional: install Node.js

You do **not** need Node.js this week. If you are curious, here is how to run a `.js` file on your own computer.

1. Go to the Node.js website (nodejs.org). Download the **LTS** version. LTS means "long-term support". It is the stable version.
2. Install it like any other program.
3. Open the terminal in VS Code (**View → Terminal**). Check that it worked:

```bash
node --version
```

You should see a version number, for example `v22.x.x`.

4. Make a file called `hello.js` with one line: `console.log("Hello from Node!");`
5. In the terminal, in the same folder, run:

```bash
node hello.js
```

You should see `Hello from Node!` in the terminal.

> 🧠 **Remember:** In the browser, `console.log` output appears in the DevTools console. In Node.js, it appears in the terminal. It is the same JavaScript in a different place.

## Check your understanding

1. What is the job of JavaScript, compared to HTML and CSS?
2. Name two environments where JavaScript can run.
3. What does `console.log("hi")` do?
4. Why does `console.log(Hello)` cause a problem, but `console.log("Hello")` works?
5. What does a line that starts with `//` do?

<details><summary>Show answers</summary>

1. HTML gives the page its structure. CSS styles it. JavaScript makes it do things, such as react to clicks, change content and calculate.
2. The web browser and Node.js.
3. It prints `hi` in the console so you can see it.
4. Without quotes, JavaScript thinks `Hello` is a name it should already know. It does not know it, so it shows an error. Quotes tell JavaScript "this is text".
5. It is a comment. The computer ignores it. It is a note for humans.

</details>

## Go deeper

- [MDN: What is JavaScript?](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript)
- [javascript.info: An Introduction to JavaScript](https://javascript.info/intro)
- [MDN: console.log()](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static)
