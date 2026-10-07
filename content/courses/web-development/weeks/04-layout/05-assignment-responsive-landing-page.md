---
title: Build a responsive landing page
kind: assignment
submission: any
---
## What you'll build

A **landing page** is the first page people see when they visit a business's website. Its job is to say quickly what the business does. It also helps people get in touch.

You will build a responsive landing page for a **fictional local business**. Pick one of these, or invent your own:

- **Crumbs**, a neighbourhood bakery
- **Spokes & Sprockets**, a bike repair shop
- **Green Thumb**, a plant shop and café
- **Snip & Style**, a barber and hair salon

Next week you will put this page on the internet with GitHub Pages. Make something you are happy to show people.

## The wireframe

A **wireframe** is a plain sketch of a page layout, without colours or real images. Here is the wireframe for your page, first on a **phone**, then on a **desktop**.

### Mobile (narrow screen)

```text
+---------------------------+
|  LOGO                     |
|  Home  Services  Contact  |   <- header: logo above nav links
+---------------------------+
|                           |
|   BIG HEADLINE            |   <- hero section
|   One-line description    |
|   [ Call to action ]      |   <- a button-style link
|                           |
+---------------------------+
|  +---------------------+  |
|  | [image]             |  |
|  | Service 1           |  |   <- services: cards stacked
|  | Short description   |  |      in ONE column
|  +---------------------+  |
|  +---------------------+  |
|  | [image]             |  |
|  | Service 2           |  |
|  +---------------------+  |
|  +---------------------+  |
|  | [image]             |  |
|  | Service 3           |  |
|  +---------------------+  |
+---------------------------+
|  About us                 |   <- about: image above text
|  [image]                  |
|  A short paragraph...     |
+---------------------------+
|  Opening hours | Address  |   <- footer: stacked on mobile
|  © 2026 Business name     |
+---------------------------+
```

### Desktop (wide screen)

```text
+---------------------------------------------------------------+
|  LOGO                              Home   Services   Contact  |
+---------------------------------------------------------------+
|                                                               |
|                  BIG HEADLINE                                 |
|                  One-line description                         |
|                  [ Call to action ]                           |
|                                                               |
+---------------------------------------------------------------+
|  +---------------+   +---------------+   +---------------+    |
|  | [image]       |   | [image]       |   | [image]       |    |
|  | Service 1     |   | Service 2     |   | Service 3     |    |
|  | Description   |   | Description   |   | Description   |    |
|  +---------------+   +---------------+   +---------------+    |
+---------------------------------------------------------------+
|  [ image ]               |  About us                          |
|                          |  A short paragraph...              |
+---------------------------------------------------------------+
|  Opening hours          Address            © 2026 Name        |
+---------------------------------------------------------------+
```

## Requirements

- [ ] One `index.html` and one external `styles.css` (no inline styles)
- [ ] The viewport meta tag is in the `<head>`
- [ ] Uses semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, and a list for the nav links
- [ ] The header uses **Flexbox** (logo and nav side by side on desktop)
- [ ] The services section uses **CSS Grid** (one column on mobile, three columns on desktop)
- [ ] The about section is stacked on mobile and side by side on desktop (Flexbox or Grid, your choice)
- [ ] At least one **media query**, written **mobile first** (`min-width`)
- [ ] All images have `max-width: 100%` and useful `alt` text
- [ ] No sideways scrolling at 320px wide
- [ ] Main content has a `max-width` so it does not stretch too wide on big screens
- [ ] A colour palette (3 to 4 colours) and a custom font, like last week
- [ ] Links and the call-to-action button have `:hover` and `:focus` styles

## Steps and hints

1. **Write the HTML first, with no CSS.** Follow the wireframe from top to bottom. Use real-looking text, not "lorem ipsum". Check that it reads well as a plain document.
2. **Add the basics** to `styles.css`: `box-sizing`, the `img` rule, body font and colours, and a `max-width` container.
3. **Style for mobile first.** Make your browser narrow, or use the DevTools device toolbar at about 375px. Most things stack by themselves. That is normal flow doing the work for you.
4. **Build the header with Flexbox.** Start with `flex-direction: column` for mobile.
5. **Build the services grid.** Start with one column (`display: grid; gap: ...`).
6. **Add one media query**, for example `@media (min-width: 768px)`. Inside it, change the header to a row with `space-between`. Change the services grid to `repeat(3, 1fr)`. Change the about section to two columns.
7. **Test** at 320px, 375px, 768px and 1200px. Fix anything that looks broken.
8. **Images:** use your own photos, free photos from [Unsplash](https://unsplash.com/) or [Pexels](https://www.pexels.com/), or placeholders from `https://picsum.photos/seed/anything/600/400`. Keep image files small (under 300KB each if you can).

> 💡 **Tip:** Build one section at a time. Check it on mobile *and* desktop before you move on. This is much better than fixing everything at the end.

> ⚠️ **Watch out:** Flexbox and Grid only affect **direct children**. If something does not line up, check in DevTools which element is the real parent.

## How to submit

Use the submit form to send:

- **Files:** upload your `index.html`, `styles.css` and any images (or a zip of the folder).
- **Screenshots:** one screenshot at a mobile width and one at a desktop width (the DevTools device toolbar is good for this).
- **Written answer:** which business you chose, and one layout problem you solved and how.

Next week you will publish this page on GitHub Pages and submit a live link.

## Stretch goals

- Add a "Find us" section with an embedded map or a small table of opening hours
- Make the call-to-action button grow or change colour smoothly on hover with `transition`
- Use `repeat(auto-fit, minmax(250px, 1fr))` for the services so you do not need a media query for them
- Add a contact form (from week 2) and style it to match
- Run your page through [PageSpeed Insights](https://pagespeed.web.dev/) and see what it suggests

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners have built a mobile-first landing page for a fictional business from a wireframe.
- Learners use Flexbox for the header and Grid for the services section.
- Learners test the page at several widths and fix what breaks.

### Purpose
This joins normal flow, Flexbox, Grid and responsive design in one real page. Next week they publish it, so it must be one they are happy to show.

### Things to do
1. **Launch.** Learners pick a business: Crumbs, Spokes & Sprockets, Green Thumb, Snip & Style, or their own. Walk through the two wireframes, mobile then desktop.
2. **Demonstrate HTML first.** Write the page with no CSS and show it reads well as a plain document.
3. **Demonstrate mobile first.** Open the DevTools device toolbar at about 375px. Style the header with `flex-direction: column` and the services as a one-column grid.
4. **Demonstrate one media query.** Add `@media (min-width: 768px)` and change the header to a row and the services to `repeat(3, 1fr)`.

### What good work looks like
- One `index.html` and one `styles.css`, no inline styles, viewport meta tag present.
- Semantic HTML: `header`, `nav`, `main`, `section`, `footer`, and a list for the nav links.
- Header uses Flexbox, services use Grid (one column on mobile, three on desktop), and at least one `min-width` media query.
- Images have `max-width: 100%` and useful `alt` text, with no sideways scrolling at 320px.
- Palette, custom font, and `:hover` and `:focus` on links and the call-to-action.

### Watch for
- Writing desktop CSS first, then fighting it on mobile. Send them back to the small layout.
- Flex or grid set on the wrong element. Check the real parent in DevTools.
- Large image files or placeholder-only content. Learners must also submit two screenshots and a written answer.
