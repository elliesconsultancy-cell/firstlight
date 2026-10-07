---
title: Forms and inputs
kind: lesson
minutes: 40
---
Think of a paper form at a doctor's office or a bank. It has questions, empty boxes to fill in, and a place to hand it in.

Websites have forms too. You use one every time you log in, search, sign up or buy something. Forms are how websites **listen** to people. In this lesson you build some.

## What is a form?

A paper form has three things:

- **Questions** (labels): "Full name", "Date of birth"
- **Boxes** to fill in (inputs)
- A **button** at the end, or a place to hand it in

Each box expects one kind of answer. A date box wants a date. A phone box wants a phone number. An HTML form works the same way. It gives the information a clear shape, so the website can use it.

## A first form

```html
<form>
  <label for="name">Your name</label>
  <input type="text" id="name" name="name">

  <button type="submit">Send</button>
</form>
```

The parts:

- `<form>` wraps all the questions and the button.
- `<label>` is the question text.
- `<input>` is the box where the user types. It is an empty element (no closing tag).
- `<button type="submit">` sends the form.

### Labels are not optional

See `for="name"` on the label and `id="name"` on the input. They **match**. This joins the label to the input. Why does it matter?

- **Screen readers** read the label when the user reaches the input. Without a label, they hear only "edit text". The user does not know what to type.
- **Clicking the label** puts the cursor in the box. This makes a bigger target. It helps everyone, especially on phones and for people with shaky hands.

> 🧠 **Remember:** Every input needs a `<label>`. The label's `for` must match the input's `id` exactly.

> ⚠️ **Watch out:** `placeholder` text (the grey hint inside a box) is **not** a label. It disappears when you start to type. It is often hard to read. Some screen readers ignore it.

### The `name` attribute

`name="name"` looks strange. The `name` is the **key** the form uses when it sends the data. Think of a label on a parcel. If someone types "Ada", the form sends `name=Ada`.

If an input has no `name`, its value is not sent at all.

## Input types

The `type` attribute changes the kind of input. On phones, it often changes the keyboard too.

```html
<form>
  <p>
    <label for="email">Email</label>
    <input type="email" id="email" name="email">
  </p>
  <p>
    <label for="phone">Phone</label>
    <input type="tel" id="phone" name="phone">
  </p>
  <p>
    <label for="age">Age</label>
    <input type="number" id="age" name="age" min="16" max="120">
  </p>
  <p>
    <label for="start">Start date</label>
    <input type="date" id="start" name="start">
  </p>
  <p>
    <label for="password">Password</label>
    <input type="password" id="password" name="password">
  </p>
</form>
```

| Type | Use it for |
| --- | --- |
| `text` | Short text, like a name |
| `email` | Email addresses (the browser checks for an `@`) |
| `tel` | Phone numbers (phones show a number keypad) |
| `number` | Numbers, with optional `min` and `max` |
| `date` | Dates, with a date picker |
| `password` | Hides what you type |

### Try it

Press **Try it** on the form above. Click into each box. What is different about the date box? Try to type letters in the number box. What do you think will happen?

## Choices: radio buttons, checkboxes and dropdowns

Think of a quiz paper. Some questions say "tick one". Others say "tick all that apply". HTML has both.

**Radio buttons** let the user pick **one** option. Give them all the same `name`. Use `<fieldset>` and `<legend>` to give the group a question:

```html
<form>
  <fieldset>
    <legend>How experienced are you?</legend>
    <input type="radio" id="new" name="level" value="beginner">
    <label for="new">Completely new</label>
    <input type="radio" id="some" name="level" value="some">
    <label for="some">I've tried a bit</label>
  </fieldset>

  <fieldset>
    <legend>What do you enjoy?</legend>
    <input type="checkbox" id="music" name="interests" value="music">
    <label for="music">Music</label>
    <input type="checkbox" id="sport" name="interests" value="sport">
    <label for="sport">Sport</label>
  </fieldset>

  <p>
    <label for="day">Best day to meet</label>
    <select id="day" name="day">
      <option value="sat">Saturday</option>
      <option value="sun">Sunday</option>
    </select>
  </p>

  <p>
    <label for="message">Anything else?</label>
    <textarea id="message" name="message" rows="4"></textarea>
  </p>
</form>
```

- **Radio** (`type="radio"`): pick one. The whole group shares one `name`.
- **Checkbox** (`type="checkbox"`): pick any number.
- `<select>` with `<option>` items: a dropdown list.
- `<textarea>`: longer text over several lines. Unlike `<input>`, it has a closing tag.
- `value`: what is sent when that option is chosen.

## Validation: let the browser check answers

You can add attributes that make the browser check answers **before** the form is sent. This is called **validation**.

```html
<form>
  <p>
    <label for="fullname">Full name (required)</label>
    <input type="text" id="fullname" name="fullname" required minlength="2">
  </p>
  <p>
    <label for="mail">Email (required)</label>
    <input type="email" id="mail" name="mail" required>
  </p>
  <p>
    <label for="postcode">Postcode</label>
    <input type="text" id="postcode" name="postcode" maxlength="8">
  </p>
  <button type="submit">Join</button>
</form>
```

| Attribute | What it checks |
| --- | --- |
| `required` | The field cannot be empty |
| `minlength` / `maxlength` | Fewest / most characters allowed |
| `min` / `max` | Smallest / largest number or date |
| `type="email"` | Looks like an email address |
| `pattern` | Matches a pattern (advanced, for later) |

### Try it

Press **Try it** on the form above. Click **Join** without filling anything in. What message do you see? Now type `ada` in the email box (no `@`) and try again.

> 💡 **Tip:** Say which fields are required **in the label**, for example "Email (required)". Do not rely only on colour or a small star.

> ⚠️ **Watch out:** Browser validation helps users, but it is not security. Anyone can get around it. Real websites also check the data on the server. You will learn about that later.

## Check your understanding

1. How do you connect a `<label>` to an `<input>`?
2. Why is `placeholder` not a replacement for a label?
3. What is the difference between radio buttons and checkboxes?
4. What does the `required` attribute do?
5. What happens to an input's value if it has no `name` attribute?

<details><summary>Show answers</summary>

1. Give the input an `id`. Give the label a `for` attribute with the same value.
2. It disappears when the user starts to type, it can be hard to read, and screen readers do not always read it.
3. Radio buttons let you choose only one option in a group. Checkboxes let you choose any number.
4. It stops the form from being sent if that field is empty. The browser shows a message.
5. It is not sent with the form.

</details>

## Go deeper

- [MDN: Your first form](https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form)
- [MDN: How to structure a web form](https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form)
- [web.dev: Learn HTML – Forms](https://web.dev/learn/html/forms)
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can build a form with `form`, `label`, `input` and a submit button
- connect each label to its input with `for` and `id`
- choose input types, radio buttons, checkboxes, `select` and `textarea`
- add `required`, `minlength` and `type="email"` validation

### Purpose
Forms are how a site listens to people. Labels and names are what make forms work for everyone and for the server.

### Things to teach
1. **A first form.** Show `label for="name"`, `input id="name" name="name"` and `button type="submit"`. The `for` and `id` must match exactly. Click the label to show the cursor jump into the box.
2. **Placeholder is not a label.** It disappears when you type. Screen readers may skip it.
3. **The `name` attribute.** It is the key that is sent, for example `name=Ada`. Without a `name`, the value is not sent.
4. **Input types and choices.** Use the table: `text`, `email`, `tel`, `number`, `date`, `password`. Radio buttons share one `name`; checkboxes allow many. Group them with `fieldset` and `legend`. Show `select` and `textarea`.
5. **Validation.** Press Try it on the Join form. Click Join empty, then type `ada` in email. Say it helps users but is not security.

### Check understanding
- Ask: "How do you link a label to an input?" A good answer: input has an `id`, label has a `for` with the same value.
- Ask: "Radio or checkbox: pick any number?" A good answer: checkboxes. Radios allow one.
- Ask: "What happens to a value with no `name`?" A good answer: it is not sent.

### Watch for
- Using `placeholder` instead of a label. Add a real label.
- Radio buttons that do not share a `name`, so more than one can be picked.
- A `for` and `id` that look the same but are spelled slightly differently.
