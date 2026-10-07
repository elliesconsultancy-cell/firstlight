---
title: Styling with CSS
summary: Learn how CSS turns plain HTML into a page that looks the way you want, from colours and fonts to spacing.
---
Last week you built pages with HTML. HTML is the **structure** of a page, like the walls and rooms of a house. This week we decorate the house. **CSS** (Cascading Style Sheets) is the paint, the furniture and the lighting.

You will learn how to connect a stylesheet to your page. You will learn how to choose which elements to style. And you will see what the browser does when two rules disagree.

Then we look at colours, sizes and fonts. We also meet the "box model": every element on a page is a box with layers of space around it.

You will also meet a very useful tool: the **Styles panel in your browser's DevTools**. It lets you change CSS live and see the result at once. You cannot break anything, because a refresh brings the page back.

Take it slowly. CSS has many small rules, but you do not need to memorise them. Try things, look things up, and enjoy it.

## By the end of this week you will be able to

- Link an external stylesheet to an HTML page and write CSS rules
- Choose elements with element, class, id, descendant and `:hover` selectors
- Explain in plain words how the cascade and specificity decide which rule wins
- Use colours, units (`px`, `rem`, `%`, `vw`) and fonts to style text
- Describe the box model and control spacing with padding, border and margin
- Use the DevTools Styles panel to inspect and try out CSS

## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: What is CSS?
- [ ] Read: Selectors and the cascade
- [ ] Read: Colours, units and fonts
- [ ] Read: The box model and DevTools

**Do**
- [ ] Create a `styles.css` file, link it from your HTML and make a heading a new colour
- [ ] Open DevTools on a page and find a struck-out CSS rule
- [ ] Finish the assignment: Style your About Me page
- [ ] Check your page against the requirements list before you submit

**Share**
- [ ] Submit your work and read your instructor's feedback

<!-- instructor -->
## Day plan

### Learning objectives
- Learners can link an external stylesheet and write CSS rules.
- Learners can choose elements with element, class, id, descendant and `:hover` selectors.
- Learners can explain why one rule beats another (cascade and specificity).
- Learners can set colours, units and fonts, and spacing with padding, border and margin.
- Learners can use the DevTools Styles panel to inspect and test CSS.

### Purpose
Week 2 gave learners HTML structure. This week they make it look good, and meet DevTools, which they will use for the rest of the course. Next week builds on the box model to lay out whole pages.

### Agenda
1. **What is CSS?** Teach the parts of a rule and the three ways to add CSS. Learners link `styles.css` and style the Bolton Community Garden example.
2. **Selectors and the cascade.** Teach class, id and descendant selectors, then specificity. Learners guess which colour wins before you show it.
3. **Colours, units and fonts.** Teach a palette in `:root`, `rem` versus `vw`, and a font list with a fallback. Learners change the palette in the Spokes & Sprockets example.
4. **The box model and DevTools.** Teach the four layers, shorthand order and `border-box`. Learners inspect the Opening hours cards and edit values live.
5. **Style your About Me page.** Launch the assignment from their week 1 folder. Walk round and check the `<link>` works first, then look at the palette and spacing.

## End of sprint review

Tick each one when you have seen it.

- [ ] Every learner has a `styles.css` linked from their page, and it loads.
- [ ] Every learner can say what a selector, property and value are.
- [ ] Every learner has opened DevTools and found a struck-out rule.
- [ ] Every learner's page uses a custom property palette and `rem` font sizes.
- [ ] No learner's page has inline `style` attributes or a `<style>` element.
- [ ] Every learner's links have `:hover` and `:focus` styles.
- [ ] Every learner has submitted the assignment.
- [ ] Every learner has had feedback on the assignment.
