---
title: Join our club form
kind: assignment
submission: any
---
## What you'll build

A separate page with a sign-up form for an imaginary cooking club, so new members can join. The form should be clear, accessible, and use the browser's built-in validation. It will not send the data anywhere yet. That is fine.

## Requirements

- [ ] A separate HTML file (for example `join.html`) with the full boilerplate
- [ ] Semantic structure: `<header>`, `<main>` and `<footer>`, with one `<h1>`
- [ ] A `<form>` containing at least:
  - [ ] Full name (`type="text"`, required, `minlength="2"`)
  - [ ] Email (`type="email"`, required)
  - [ ] Phone number (`type="tel"`)
  - [ ] A `<fieldset>` with a `<legend>` and a group of **radio buttons** (for example "How often do you cook?")
  - [ ] A `<fieldset>` with a `<legend>` and at least two **checkboxes** (for example favourite cuisines)
  - [ ] A `<select>` dropdown (for example preferred meeting day)
  - [ ] A `<textarea>` (for example "Tell us about yourself")
  - [ ] A submit `<button>`
- [ ] **Every** input has a `<label>` connected with matching `for` and `id`
- [ ] Every input has a `name` attribute; radio buttons in the same group share a `name`
- [ ] Required fields say "(required)" in their label text
- [ ] You can complete and submit the whole form using **only the keyboard**
- [ ] The page passes the W3C validator with no errors

## Steps/hints

1. Create `join.html` next to your recipe page. If you like, link the two pages to each other.
2. Write the boilerplate and the page structure first. Then add the `<form>`.
3. Add one field at a time. Test each one in the browser before you add the next.
4. For every field, check this three-part pattern:

```html
<label for="fullname">Full name (required)</label>
<input type="text" id="fullname" name="fullname" required minlength="2">
```

`for` matches `id`, and there is a `name`.

5. Test validation. Click the submit button with empty fields. Then try an email without an `@`.
6. Test with the keyboard. Tab through every field. Use Space for checkboxes and arrow keys for radio buttons.
7. In DevTools, select a few inputs. Check that the **Accessibility** tab shows the right name.
8. Run the page through the validator and fix any errors.

> ⚠️ **Watch out:** When you send a form that has no `action`, the page reloads and the boxes empty. That means it **worked**. Look at the address bar after you send it. You will see your answers in the URL, like `?fullname=Ada&email=...`. That is the `name` attributes at work.

## How to submit

Use the submit form on this page:

- **Upload** your `join.html` file, **or** paste a **CodePen link**.
- In the **written answer** box: after you sent your form, what did you see in the address bar? In one or two sentences, explain why the `name` attribute matters.

## Stretch goals

- Add a date input for "Date of birth" or "Preferred start date", using `min` or `max`.
- Add a number input for "How many people in your household?" with `min="1"` and `max="20"`.
- Group related fields (like contact details) inside their own `<fieldset>` with a `<legend>`.
- Add a required checkbox: "I agree to the club rules". Make sure the form cannot be sent without it.
