---
title: Meet JavaScript and the console
kind: lesson
minutes: 25
---
Every time a website shows you a pop-up, updates a basket total, or hides a menu when you click a button, there is JavaScript working behind the scenes. Today you will write some yourself.

## What is JavaScript?

JavaScript (often shortened to **JS**) is a programming language. A programming language is a way to give a computer a list of instructions that it follows exactly, one after another.

Think about a recipe. A recipe says: "Crack two eggs. Add sugar. Mix for one minute." A cook follows the steps in order. A program is the same idea, but the cook is a computer, and the computer is very, very literal. If the recipe says "add salt" but forgets to say how much, a human guesses. A computer stops and complains.

Let's compare the three languages of the web:

| Language | Job | Analogy |
| --- | --- | --- |
| HTML | Structure and content | The skeleton |
| CSS | How it looks | The clothes |
| JavaScript | What it does | The muscles |

> 💡 **Tip:** JavaScript and Java are completely different languages. The similar name is an old marketing decision. You can ignore Java for this course.

## Where does JavaScript run?

JavaScript needs a program that can read and run it. We call this an **environment**. The two most common environments are:

1. **The web browser** (Chrome, Firefox, Safari, Edge). Every browser has a JavaScript engine built in. This is why websites can use JS without you installing anything.
2. **Node.js**. This is a program that lets you run JavaScript on your computer, outside a browser. Developers use it to build servers and tools.

In this course we will start in the browser, because you already have Chrome.

## Opening the console

The **console** is a place inside Chrome DevTools where you can type JavaScript and see the answer straight away. It is like a calculator that understands JavaScript.

1. Open Chrome and go to any page (a blank tab is fine).
2. Right-click on the page and choose **Inspect**. You can also press `F12`, or `Ctrl + Shift + J` on Windows, or `Cmd + Option + J` on Mac.
3. Click the **Console** tab.
4. Click next to the `>` symbol and type `2 + 3`, then press **Enter**.

You should see `5`. Congratulations, you just ran JavaScript!

> ⚠️ **Watch out:** Chrome sometimes asks you to type "allow pasting" before it lets you paste code into the console. This is a safety feature. Never paste code from people you don't trust into the console.

## Saying something with console.log

Typing into the console shows the answer to one line. But in a real program, with many lines, we need a way to *ask* the computer to show us something. That is what `console.log` does.

```js
console.log("Hello, Firstlight!");
console.log(10 * 4);
console.log("I am learning JavaScript");
```

Each `console.log(...)` prints whatever is inside the brackets. Think of it like asking a friend to read something out loud.

Some details to notice:

- `console.log` is spelled exactly like that. Lower case, with a dot in the middle.
- Text must go inside quote marks: `"like this"`. Numbers do not need quotes.
- Each instruction usually ends with a semicolon `;`. It's like a full stop at the end of a sentence. JavaScript is often forgiving if you forget it, but it's a good habit.

### Try it

Click **Try in playground** on the code below, or type it into the Chrome console. Then change the messages to say something about you.

```js
console.log("My name is Ada");
console.log("I live in Bolton");
console.log(7 * 52);
```

What do you think `7 * 52` means? (Hint: days in a year, roughly.)

## Comments: notes for humans

Sometimes you want to write a note in your code that the computer should ignore. These are called **comments**.

```js
// This is a comment. The computer skips this line.
console.log("This line runs"); // A comment can also go at the end of a line
```

Comments start with `//`. Use them to explain *why* you did something. Your future self will thank you.

## Where else can I run JavaScript?

**The course playground.** On many code examples in these lessons you will see a **Try in playground** button. It runs the code and shows you the `console.log` output. This is the easiest option, and it's fine to use it for most exercises this week.

**An HTML page.** You can also put JavaScript inside a web page with a `<script>` tag:

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

Open this file in Chrome, then open the console. You will see the message there, not on the page itself. Later in the course you will put JavaScript in its own file and link it with `<script src="script.js"></script>`.

## Optional: installing Node.js

You do **not** need Node.js this week. But if you are curious, here is how to run a `.js` file on your own computer.

1. Go to the official Node.js website (nodejs.org) and download the **LTS** version. LTS means "long-term support". It's the stable one.
2. Install it like any other program.
3. Open the terminal in VS Code (**View → Terminal**) and check it worked:

```bash
node --version
```

If you see a version number like `v22.x.x`, it worked.

4. Create a file called `hello.js` with one line: `console.log("Hello from Node!");`
5. In the terminal, in the same folder, run:

```bash
node hello.js
```

You should see `Hello from Node!` printed in the terminal.

> 🧠 **Remember:** In the browser, `console.log` output appears in the DevTools console. In Node.js, it appears in the terminal. Same JavaScript, different place.

## Check your understanding

1. What is the job of JavaScript, compared to HTML and CSS?
2. Name two environments where JavaScript can run.
3. What does `console.log("hi")` do?
4. Why does `console.log(Hello)` (with no quotes) cause a problem, but `console.log("Hello")` works?
5. What does a line starting with `//` do?

<details><summary>Show answers</summary>

1. HTML gives the page its structure, CSS styles it, and JavaScript makes it do things (respond to clicks, change content, calculate).
2. The web browser and Node.js.
3. It prints `hi` in the console so you can see it.
4. Without quotes, JavaScript thinks `Hello` is the name of something it should already know about. It doesn't know it, so it gives an error. Quotes tell JavaScript "this is text".
5. It is a comment. The computer ignores it; it's a note for humans.

</details>

## Go deeper

- [MDN: What is JavaScript?](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript)
- [javascript.info: An Introduction to JavaScript](https://javascript.info/intro)
- [MDN: console.log()](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static)
