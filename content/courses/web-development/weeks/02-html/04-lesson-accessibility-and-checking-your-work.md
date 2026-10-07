---
title: Accessibility and checking your work
kind: lesson
minutes: 30
---
A ramp at the entrance of a building helps people in wheelchairs. It also helps parents with buggies, delivery workers with trolleys, and travellers with suitcases. A ramp helps everyone.

Accessible websites work the same way. In this lesson you learn what accessibility is, and how to check your own pages.

## What is accessibility?

**Accessibility** (often written **a11y**, because there are 11 letters between the "a" and the "y") means building websites that **everyone can use**, including people with disabilities.

People use the web in many ways:

- **Blind** people may use a **screen reader**. It reads the page out loud.
- People with **low vision** may zoom the page to 200% or more.
- People who cannot use a mouse may use only the **keyboard**, or voice control.
- **Deaf** people need captions on videos.
- People with **cognitive** differences (differences in how they think and learn) benefit from clear, plain language and layouts that stay the same.

Sometimes the "disability" is temporary or comes from the situation. Think of a broken arm, bright sun on a phone screen, a slow internet connection, or a baby in one arm.

> 🧠 **Remember:** Over one billion people in the world have a disability. Accessibility is not an extra for a few people. It is part of doing the job properly. In many countries, including the UK, it is also a legal requirement for many websites.

## Good HTML is most of the work

Here is the good news. If you write good semantic HTML, you have already done most of the work. You learned these things this week:

1. **Semantic elements** (`<header>`, `<nav>`, `<main>`, `<footer>`) let screen reader users jump to the part they want.
2. **A sensible heading order** works like a table of contents.
3. **Alt text** describes images.
4. **Link text that makes sense on its own.**
5. **Labels** on every form input.
6. **Real buttons** (`<button>`) for actions, and **real links** (`<a>`) for going somewhere.
7. **The `lang` attribute** on `<html>`, so screen readers use the right pronunciation.

## Buttons and links

Beginners often mix these up. Use this rule:

- A **link** (`<a href="...">`) **goes somewhere**: another page, or another part of the page.
- A **button** (`<button>`) **does something**: sends a form, opens a menu, plays a video.

```html
<a href="contact.html">Contact us</a>
<button type="button">Show more recipes</button>
```

Some people make a `<div>` that looks like a button. This causes problems. Keyboard users cannot reach it with the **Tab** key. Screen readers do not say "button". A real `<button>` does all of this for free.

## Test with your keyboard

The best first test needs no tools at all.

### Try it

Press **Try it** on this form. Then put your mouse away:

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

1. Click once on the page area. Press **Tab** to move forward through the page. Press **Shift + Tab** to move back.
2. Can you see where you are? Look for an outline around the focused element.
3. Press **Space** to tick the checkbox.
4. Press **Enter** on the button to send the form.

Could you do everything without a mouse? Try the same test on a real website you use. Many sites fail it.

> 💡 **Tip:** Never remove the focus outline with CSS, unless you replace it with an outline that is equally clear. Keyboard users need it, like a mouse pointer.

## Check your HTML with the validator

Browsers are forgiving. If you forget a closing tag, they usually guess what you meant. That is kind, but it hides mistakes that can cause problems later.

The **W3C Markup Validation Service** (at validator.w3.org) checks your HTML and lists the errors. It is like a spell checker for HTML.

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

Copy the code above into the validator (Direct Input). It will warn you that the full boilerplate is missing. That is expected, so look at the other messages. Can you find and fix:

1. The mismatched heading tags?
2. The image problem?
3. The list problem?

<details><summary>Show answers</summary>

1. `<h1>` is closed with `</h2>`. It should be `</h1>`.
2. The `<img>` has no `alt` attribute.
3. A `<p>` is directly inside the `<ul>`. Only `<li>` elements are allowed there. Change it to an `<li>`, or move it outside the list.

</details>

> ⚠️ **Watch out:** Fix errors **from the top down**. One early mistake, like a missing closing tag, can cause many errors further down. Fix the first one. Then check again.

## Look with DevTools

The **Elements** panel in Chrome DevTools shows how the browser **understood** your HTML. If you made a mistake, it may look different from what you wrote.

There is also an accessibility view:

1. Open DevTools (`F12`) and go to **Elements**.
2. Select an element, like an input or an image.
3. In the side panel, find the **Accessibility** tab. (If you cannot see it, click the `>>` arrows.)
4. Look at **Name** and **Role**. For a labelled input, the name should be your label text. For an image, it should be your alt text.

If the name is empty, a screen reader user will not know what the element is.

### Try it

Open your About Me page from last week in Chrome. Use the Accessibility tab to check the name of your image. Then run the page through the validator. Fix any errors you find.

## Lighthouse: an automatic check-up

Chrome also has a tool called **Lighthouse**. In DevTools, open the **Lighthouse** tab. Tick **Accessibility**. Click **Analyze page load**. You get a score out of 100 and a list of problems.

Automatic tools find only **some** problems (perhaps a third). They can tell you an image has alt text. They cannot tell you if the alt text is **good**. So human checks, like the keyboard test, are still important.

## Check your understanding

1. What does "a11y" mean, and why is it written that way?
2. Give two examples of temporary or situational disabilities.
3. When should you use a `<button>` instead of a link?
4. What does the HTML validator do?
5. Why can automatic tools like Lighthouse not find every accessibility problem?

<details><summary>Show answers</summary>

1. Accessibility. There are 11 letters between the first "a" and the last "y".
2. Any two of: a broken arm, bright sunlight on a screen, holding a baby, a noisy room, a slow connection.
3. When clicking it **does** something (like sending a form), and does not **go** somewhere.
4. It checks your HTML against the rules and lists errors with line numbers.
5. Some things need a human to judge, like whether alt text is a useful description, or whether link text makes sense.

</details>

## Go deeper

- [web.dev: Learn Accessibility](https://web.dev/learn/accessibility)
- [MDN: HTML – a good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
- [W3C Markup Validation Service](https://validator.w3.org/)
- [Chrome DevTools: Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can explain accessibility and give examples of who it helps
- choose between `button` and `a` correctly
- test a page with the keyboard only
- use the W3C validator, the DevTools Accessibility tab and Lighthouse

### Purpose
Professionals test accessibility and validate their HTML as a habit. Learners need these checks to finish both assignments this week.

### Things to teach
1. **Why accessibility.** Use the ramp picture: it helps everyone. Include temporary cases like a broken arm or bright sun. Good semantic HTML does most of the work.
2. **Button or link?** A link goes somewhere. A button does something. Say a `div` styled as a button is unreachable by Tab.
3. **Keyboard test.** Press Try it on the Newsletter form. Tab and Shift+Tab, look for the focus outline, Space for the checkbox, Enter on the button. Never remove the focus outline.
4. **The validator.** Use validator.w3.org with the broken sample: `<h1>` closed with `</h2>`, `<img>` with no `alt`, and a `<p>` directly inside `<ul>`. Fix errors from the top down.
5. **DevTools and Lighthouse.** In Elements, open the Accessibility tab and check Name and Role. Run Lighthouse. Tools find only some problems.

### Check understanding
- Ask: "When do you use a `<button>` instead of a link?" A good answer: when clicking does something, such as send a form.
- Ask: "What does the validator do?" A good answer: it checks the HTML and lists errors with line numbers.
- Ask: "Why is a high Lighthouse score not enough?" A good answer: it cannot judge if alt text or link text is actually good.

### Watch for
- Fixing errors from the bottom up. One early error can cause many later ones.
- Treating the full-boilerplate warning as a real bug when pasting small snippets. That is expected.
