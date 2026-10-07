---
title: Layout & responsive design
summary: Arrange boxes on the page with Flexbox and Grid, and make your sites look good on phones and big screens alike.
---
Last week you learned that every element is a box. This week you learn how to **arrange** those boxes: side by side, in rows and columns, centred, spread out or stacked.

First we see how the browser lays things out on its own. This is called "normal flow". Then we meet two strong tools:

- **Flexbox** lines things up in one direction, like a navigation bar.
- **CSS Grid** arranges rows *and* columns, like a gallery of cards.

Last, we learn **responsive design**. More than half of all web visits happen on phones. So your pages must work on a small screen and on a large one. You will design for mobile first. Then you add changes for bigger screens with media queries.

This week has many "aha" moments. Keep DevTools open and resize your browser often. Play the two layout games linked in the lessons.

## By the end of this week you will be able to

- Explain normal flow and the difference between block and inline elements
- Use Flexbox to build a navigation bar and align items in a row or column
- Use CSS Grid to build a gallery of cards with `fr`, `repeat()` and `gap`
- Add the viewport meta tag and make images fit their containers
- Write mobile-first CSS with media queries
- Build a landing page that works on both mobile and desktop

## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: Normal flow, block and inline
- [ ] Read: Flexbox
- [ ] Read: CSS Grid
- [ ] Read: Responsive design

**Do**
- [ ] Build the Crumbs Bakery navigation bar with Flexbox in the playground
- [ ] Build the card gallery with `repeat(auto-fit, minmax(220px, 1fr))`
- [ ] Test a page at 320px and 1200px wide with the DevTools device toolbar
- [ ] Finish the assignment: Build a responsive landing page

**Share**
- [ ] Submit your work and read your instructor's feedback

<!-- instructor -->
## Day plan

### Learning objectives
- Learners can explain normal flow and the difference between block and inline elements.
- Learners can build a nav bar with Flexbox and a card gallery with Grid.
- Learners can add the viewport meta tag and make images fit their containers.
- Learners can write mobile-first CSS with a `min-width` media query.

### Purpose
Week 3 taught the box model and styling. This week learners arrange boxes and make pages work on phones. Next week they publish this landing page, so quality matters.

### Agenda
1. **Normal flow, block and inline.** Teach block versus inline and `display`. Learners try `inline-block` on the buttons and see that `width` does nothing on a span.
2. **Flexbox.** Teach container, items, `justify-content` and `align-items`. Learners build the Crumbs Bakery nav bar and try the flex overlay in DevTools.
3. **CSS Grid.** Teach `fr`, `repeat()` and the `auto-fit` rule. Learners build the bakery card gallery and resize to count columns.
4. **Responsive design.** Teach the viewport tag, the `img` rule and mobile first. Learners use the device toolbar on the Spokes & Sprockets page.
5. **Build a responsive landing page.** Launch it from the wireframes. Check mobile layout first, then the desktop media query.

## End of sprint review

Tick each one when you have seen it.

- [ ] Every learner has built a working nav bar with Flexbox.
- [ ] Every learner has used `display: grid` to make a gallery or services section.
- [ ] Every learner's page has the viewport meta tag.
- [ ] Every learner's page has no sideways scrolling at 320px.
- [ ] Every learner's page has at least one `min-width` media query.
- [ ] Every learner's images have `alt` text and `max-width: 100%`.
- [ ] Every learner has submitted two screenshots and a written answer.
- [ ] Every learner has had feedback on the assignment.
