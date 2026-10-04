---
title: Forms and inputs
kind: lesson
minutes: 40
---
Every time you log in, search, sign up for a newsletter or buy something online, you use a form. Forms are how websites **listen** to their users. Let's build some.

## What is a form?

Think of a paper form at a doctor's surgery or a bank. It has:

- **Questions** (labels): "Full name", "Date of birth"
- **Boxes** to fill in (inputs)
- A **button** at the end, or a place to hand it in

Each box expects a certain **shape** of answer: a date box wants a date, a phone box wants a phone number. An HTML form works the same way. It shapes the information so the website can use it.

## A first form

```html
<form>
  <label for="name">Your name</label>
  <input type="text" id="name" name="name">

  <button type="submit">Send</button>
</form>
```

The parts:

- `<form>` – wraps all the questions and the button.
- `<label>` – the question text.
- `<input>` – the box where the user types. It's an empty element (no closing tag).
- `<button type="submit">` – sends the form.

### Labels are not optional

Look at `for="name"` on the label and `id="name"` on the input. They **match**. This connects the label to the input. Why does it matter?

- **Screen readers** read the label when the user reaches the input. Without it, they just hear "edit text", with no idea what to type.
- **Clicking the label** puts the cursor in the box. This gives a bigger target, which helps everyone, especially on phones and for people with shaky hands.

> 🧠 **Remember:** Every input needs a `<label>`. The label's `for` must match the input's `id` exactly.

> ⚠️ **Watch out:** `placeholder` text (the grey hint inside a box) is **not** a label. It disappears when you start typing, it's often hard to read, and some screen readers ignore it.

### The `name` attribute

`name="name"` might look strange. The `name` is the **key** the form uses when it sends the data. If someone types "Ada", the form sends `name=Ada`. Without a `name`, the input's value isn't sent at all.

## Input types

The `type` attribute changes what kind of input you get. On phones, it often changes the keyboard too!

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

Press **Try in playground** on the form above. Click into each box. What's different about the date box? Try typing letters in the number box.

## Choices: radio buttons, checkboxes and dropdowns

**Radio buttons** let the user pick **one** option. Group them with the same `name`. Use `<fieldset>` and `<legend>` to give the group a question:

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

- **Radio** (`type="radio"`) – pick one. Same `name` for the whole group.
- **Checkbox** (`type="checkbox"`) – pick any number.
- `<select>` with `<option>`s – a dropdown list.
- `<textarea>` – for longer text, over several lines. Unlike `<input>`, it has a closing tag.
- `value` – what actually gets sent when that option is chosen.

## Validation: let the browser check answers

You can add attributes that make the browser check the answers **before** the form is sent. This is called **validation**.

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
| `required` | The field can't be empty |
| `minlength` / `maxlength` | Minimum / maximum number of characters |
| `min` / `max` | Smallest / largest number or date |
| `type="email"` | Looks like an email address |
| `pattern` | Matches a pattern (advanced, for later) |

### Try it

Press **Try in playground** on the form above. Click **Join** without filling anything in. What message do you see? Now type `ada` in the email box (no `@`) and try again.

> 💡 **Tip:** Tell users which fields are required **in the label**, for example "Email (required)". Don't rely only on colour or a little star.

> ⚠️ **Watch out:** Browser validation is helpful for users, but it is not security. Anyone can get around it. Real websites also check data on the server. You'll learn about that later.

## Check your understanding

1. How do you connect a `<label>` to an `<input>`?
2. Why isn't `placeholder` a replacement for a label?
3. What's the difference between radio buttons and checkboxes?
4. What does the `required` attribute do?
5. What happens to an input's value if it has no `name` attribute?

<details><summary>Show answers</summary>

1. Give the input an `id`, and give the label a `for` attribute with the same value.
2. It disappears when the user starts typing, can be hard to read, and isn't reliably read by screen readers.
3. Radio buttons let you choose only one option in a group. Checkboxes let you choose any number.
4. It stops the form from being sent if that field is empty, and the browser shows a message.
5. It isn't sent with the form.

</details>

## Go deeper

- [MDN: Your first form](https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form)
- [MDN: How to structure a web form](https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form)
- [web.dev: Learn HTML – Forms](https://web.dev/learn/html/forms)
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
