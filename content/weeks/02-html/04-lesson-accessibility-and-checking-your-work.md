---
title: Accessibility and checking your work
kind: lesson
minutes: 30
---
A ramp at the entrance of a building helps wheelchair users, but it also helps parents with buggies, delivery drivers and travellers with suitcases. Accessible websites work the same way: they help everyone.

## What is accessibility?

**Accessibility** (often written **a11y**, because there are 11 letters between the "a" and the "y") means making websites that **everyone can use**, including people with disabilities.

People use the web in many different ways:

- **Blind** people may use a **screen reader**, which reads the page out loud.
- People with **low vision** may zoom the page to 200% or more.
- People who can't use a mouse may use only the **keyboard**, or voice control.
- **Deaf** people need captions on videos.
- People with **cognitive** differences benefit from clear, simple language and consistent layouts.

And sometimes the "disability" is temporary or situational: a broken arm, bright sunlight on a phone screen, a slow internet connection, or holding a baby in one arm.

> 🧠 **Remember:** Over one billion people in the world have a disability. Accessibility isn't an extra feature for a few people. It's part of doing the job properly. In many countries, including the UK, it's also a legal requirement for many websites.

## Good HTML is most of the work

Here's the good news: if you write good semantic HTML, you've already done most of the accessibility work. You've learned these this week:

1. **Semantic elements** (`<header>`, `<nav>`, `<main>`, `<footer>`) let screen reader users jump straight to the part they want.
2. **A sensible heading order** works like a table of contents.
3. **Alt text** describes images.
4. **Link text that makes sense on its own.**
5. **Labels** on every form input.
6. **Real buttons** (`<button>`) for actions, and **real links** (`<a>`) for going somewhere.
7. **The `lang` attribute** on `<html>`, so screen readers use the right pronunciation.

## Buttons vs. links

This is a common mistake, so it's worth a closer look.

- A **link** (`<a href="...">`) **goes somewhere**: another page, or another part of the page.
- A **button** (`<button>`) **does something**: submits a form, opens a menu, plays a video.

```html
<a href="contact.html">Contact us</a>
<button type="button">Show more recipes</button>
```

Using a `<div>` that looks like a button is a problem: keyboard users can't reach it with the **Tab** key, and screen readers don't announce it as a button. The real `<button>` element does all of that for free.

## Test with your keyboard

The simplest accessibility test needs no tools at all.

### Try it

Press **Try in playground** on this form, then put your mouse away:

```html
<h2>Newsletter</h2>
<form>
  <label for="em">Email address</label>
  <input type="email" id="em" name="email" required>
  <input type="checkbox" id="agree" name="agree">
  <label for="agree">Send me weekly recipes</label>
  <button type="submit">Subscribe</button>
  <p><a href="#privacy">Read our privacy policy</a></p>
</form>
```

1. Click once on the page area, then press **Tab** to move forward through the page. Press **Shift + Tab** to move back.
2. Can you see where you are? (Look for an outline around the focused element.)
3. Press **Space** to tick the checkbox.
4. Press **Enter** on the button to submit.

Could you do everything without a mouse? Try the same test on a real website you use. You might be surprised how many fail!

> 💡 **Tip:** Never remove the focus outline with CSS unless you replace it with something just as visible. Keyboard users rely on it like a mouse pointer.

## Checking your HTML with the validator

Browsers are very forgiving. If you forget a closing tag, they usually guess what you meant. That's kind, but it hides mistakes that might cause problems later.

The **W3C Markup Validation Service** (at validator.w3.org) checks your HTML and lists the errors. It's like a spell checker for HTML.

How to use it:

1. Go to `https://validator.w3.org`.
2. Choose the **Validate by File Upload** tab and upload your HTML file. Or choose **Validate by Direct Input** and paste your code.
3. Click **Check**.
4. Read each message. It gives a **line number** and a description.

Here is some HTML with mistakes:

```html
<h1>My page</h2>
<img src="https://picsum.photos/200">
<ul>
  <p>Not a list item</p>
  <li>A list item</li>
</ul>
```

### Try it

Copy the code above into the validator (Direct Input). It will warn you that the full boilerplate is missing; that's expected, so focus on the other messages. Can you find and fix:

1. The mismatched heading tags?
2. The image problem?
3. The list problem?

<details><summary>Show answers</summary>

1. `<h1>` is closed with `</h2>`. It should be `</h1>`.
2. The `<img>` has no `alt` attribute.
3. A `<p>` is directly inside the `<ul>`. Only `<li>` elements are allowed there. Change it to an `<li>`, or move it outside the list.

</details>

> ⚠️ **Watch out:** Fix errors **from the top down**. One early mistake (like a missing closing tag) can cause many errors further down. Fix the first one, then check again.

## Inspecting with DevTools

The **Elements** panel in Chrome DevTools shows how the browser **understood** your HTML. If you made a mistake, it may look different from what you wrote.

There's also a built-in accessibility view:

1. Open DevTools (`F12`) and go to **Elements**.
2. Select an element, like an input or image.
3. In the side panel, find the **Accessibility** tab. (If you can't see it, click the `>>` arrows.)
4. Look at **Name** and **Role**. For a labelled input, the name should be your label text. For an image, it should be your alt text.

If the name is empty, a screen reader user won't know what that element is.

### Try it

Open your About Me page from last week in Chrome. Use the Accessibility tab to check the name of your image. Then run the page through the validator. Fix any errors you find.

## Lighthouse: an automatic check-up

Chrome also has a tool called **Lighthouse**. In DevTools, open the **Lighthouse** tab, tick **Accessibility**, and click **Analyze page load**. It gives a score out of 100 and a list of problems to fix.

Automatic tools can only find **some** problems (perhaps a third of them). They can tell you an image has alt text, but not whether the alt text is **good**. Human checks, like the keyboard test, are still important.

## Check your understanding

1. What does "a11y" mean, and why is it written that way?
2. Give two examples of situational or temporary disabilities.
3. When should you use a `<button>` instead of a link?
4. What does the HTML validator do?
5. Why can't automatic tools like Lighthouse find every accessibility problem?

<details><summary>Show answers</summary>

1. Accessibility. There are 11 letters between the first "a" and the last "y".
2. Any two of: a broken arm, bright sunlight on a screen, holding a baby, a noisy room, a slow connection.
3. When clicking it **does** something (like submitting a form), rather than **going** somewhere.
4. It checks your HTML against the rules and lists errors with line numbers.
5. Some things need human judgement, like whether alt text is a useful description or whether link text makes sense.

</details>

## Go deeper

- [web.dev: Learn Accessibility](https://web.dev/learn/accessibility)
- [MDN: HTML – a good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
- [W3C Markup Validation Service](https://validator.w3.org/)
- [Chrome DevTools: Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview)
