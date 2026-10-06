---
title: Style your About Me page
kind: assignment
submission: any
---
## What you'll build

In week 1 you built an "About Me" page with HTML. Right now it probably looks like a plain document. This week you give it a personality with an **external stylesheet**.

You will not change what the page *says*. You will change how it *looks*: colours, fonts and spacing. At the end, it should feel like a page that belongs to you.

## Requirements

- [ ] All your CSS is in a separate file called `styles.css`, linked from your HTML with `<link rel="stylesheet" href="styles.css">` inside `<head>`
- [ ] There are no `style="..."` attributes and no `<style>` element in your HTML
- [ ] You use at least one **custom font** (for example, from Google Fonts), with a fallback like `sans-serif`
- [ ] You use a **colour palette of 3 to 4 colours**, stored as custom properties in `:root` and used with `var(...)`
- [ ] Your text has good contrast with its background (check with the DevTools colour picker)
- [ ] Links have a **`:hover` state** that looks different from the normal state (add `:focus` too)
- [ ] You use the **box model** for spacing: at least one `padding`, one `margin` and one `border` somewhere on the page
- [ ] You use at least one **class selector** and one **descendant selector**
- [ ] Font sizes use `rem`
- [ ] Your stylesheet starts with the `box-sizing: border-box` rule

## Steps and hints

1. **Make a copy first.** Copy your week 1 project folder. Then you always have the original.
2. **Create `styles.css`** next to your `index.html`. Add the `<link>` in the `<head>`. Test it with something you can see, like `body { background-color: pink; }`. If the page turns pink, it works. Then remove it.
3. **Choose your palette.** Pick a background, a text colour, a main colour and an accent. Free tools like [Coolors](https://coolors.co/) can help. Put them in `:root`:

   ```css
   :root {
     --bg: #fffaf3;
     --text: #222222;
     --main: #3d5a80;
     --accent: #ee6c4d;
   }
   ```

4. **Choose a font.** Go to [Google Fonts](https://fonts.google.com/). Pick one or two fonts. Copy the `<link>` code into your `<head>`, *above* your `styles.css` link.
5. **Style the basics first:** `body` (background, text colour, font, line-height), then headings, then links.
6. **Add classes where you need them.** For example, wrap your main content in `<main class="page">`. Centre it with `max-width` and `margin: 0 auto`.
7. **Work on spacing.** Use padding and margin to give sections room. You could put your hobbies list or contact details in a "card" with a border and rounded corners.
8. **Try ideas in DevTools.** Then copy the changes you like into `styles.css`.
9. **Check the requirements** list one by one before you submit.

> 💡 **Tip:** Less is more. A page with two fonts, four colours and generous spacing almost always looks better than one with many effects.

> ⚠️ **Watch out:** If your styles do not appear, check the file name and path in your `<link>`. Make sure you saved both files.

## How to submit

Use the submit form to send:

- **Files:** upload both your `index.html` and `styles.css` (and any images your page uses).
- **Written answer:** a few sentences about what you are proud of, and one thing you found tricky.
- **A screenshot** of your styled page is welcome too (as a file upload).

Later in this course you will learn Git and GitHub. After that you can also share a live link to your pages.

## Stretch goals

- Style your page differently when a link is `:visited`
- Add a `:hover` effect to something that is not a link, such as a card that gets a shadow with `box-shadow`
- Use `vw` for a big heading that grows with the window, but make sure it is still readable on a small screen
- Style your contact form from week 2 so the inputs and button match your palette
- Validate your CSS with the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
