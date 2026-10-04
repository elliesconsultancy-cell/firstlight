---
title: Final project
kind: assignment
submission: any
---
## What you'll build

Your final project is a web app of your own choice, built with HTML, CSS and JavaScript. It brings together everything from the course: semantic HTML, responsive layout, arrays of objects, DOM rendering, events, and (if you like) data from an API. You will plan it, build it in small steps, publish it, document it with a README, and present it in a short demo.

Use the ideas and planning steps from this week's lessons. If your idea is not on the list from lesson 1, check it with your instructor before you start building.

## Requirements

### Planning

- [ ] At least five user stories, split into MVP and stretch
- [ ] A wireframe for phone and desktop (a photo of a paper sketch is fine)
- [ ] GitHub issues for your MVP stories, with task checklists

### The app

- [ ] Built with HTML, CSS and JavaScript in separate files (`index.html`, `style.css`, `script.js`)
- [ ] Uses semantic HTML (`header`, `main`, `section`, `footer`, labels on every form field, `alt` text on images)
- [ ] Responsive: works and looks good on a phone and on a desktop screen
- [ ] Uses at least one **array of objects** as its main data
- [ ] Renders that data to the page with DOM methods (a `render` function following the state and render pattern)
- [ ] Has at least one interaction that changes what is shown (search, filter, form, toggle, and so on)
- [ ] Handles empty states and bad input with friendly messages (for example "No recipes found")
- [ ] No errors in the browser console
- [ ] Deployed and working on GitHub Pages

### The repository

- [ ] Public GitHub repository with regular, clear commit messages (at least 10 commits over several days)
- [ ] A `README.md` with: project name, one-sentence description, live link, at least one screenshot, features list, what it is built with, and what you would add next
- [ ] At least one code review requested (from your instructor or a classmate), with the feedback responded to

## Steps/hints

### 1. Plan (days 1 and 2)

Follow the "Try it" in the planning lesson: idea, user stories, MVP vs stretch, example data, wireframe. Share your plan with your instructor before you start coding. It is much easier to change a plan than to change code.

### 2. Set up and deploy straight away

Create the repository, add a basic `index.html` and a short README, turn on GitHub Pages and check the live link. Create your issues.

### 3. Starter structure

A starting point you can adapt:

```html
<header>
  <h1>My Project</h1>
  <p>A short tagline explaining what it does.</p>
</header>

<main>
  <section aria-label="Controls">
    <label for="search">Search</label>
    <input id="search" type="search" />
  </section>

  <p id="message"></p>
  <section id="items" class="grid"></section>
</main>

<footer>
  <p>Built by Your Name</p>
</footer>
```

```js
// STATE
const items = [
  { name: "Example one", category: "A" },
  { name: "Example two", category: "B" },
];
let searchText = "";

// ELEMENTS
const searchInput = document.querySelector("#search");
const itemsSection = document.querySelector("#items");
const message = document.querySelector("#message");

// RENDER
function render() {
  itemsSection.textContent = "";

  const visible = items.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  message.textContent = visible.length === 0 ? "Nothing matches your search." : "";

  for (const item of visible) {
    const card = document.createElement("article");
    card.className = "card";

    const title = document.createElement("h2");
    title.textContent = item.name;

    const category = document.createElement("p");
    category.textContent = `Category: ${item.category}`;

    card.append(title, category);
    itemsSection.append(card);
  }
}

// EVENTS
searchInput.addEventListener("input", (event) => {
  searchText = event.target.value;
  render();
});

render();
```

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
}
```

### 4. Build the MVP, one issue at a time

Work through your MVP issues in order. Commit after each task, push often, and close issues as you finish them. Check the live site regularly.

### 5. Ask for review

When your MVP works, ask for a code review using the template from lesson 2. Respond to the feedback with small commits.

### 6. Polish and stretch

Test on a real phone. Check the console for errors. Check that you can use the whole app with only the keyboard (press Tab to move around). Then, if you have time, pick one or two stretch goals.

### 7. README and demo

Write your README, add screenshots, and prepare your five-minute demo using the structure from lesson 3.

> ⚠️ **Watch out:** Stop adding features a few days before the deadline. Use the last days for testing, fixing bugs, your README and demo practice. A smaller app that works is always better than a bigger one that is broken.

## How to submit

Use the submit form to send:

- **Link**: your live GitHub Pages URL
- **Written answer**: your repository link, followed by a short reflection (about 200 to 300 words) answering:
  - What does your app do, and who is it for?
  - What are you most proud of?
  - What was the hardest part, and how did you get past it?
  - What feedback did you get in code review, and what did you change?
  - What would you add or do differently next time?
- **File upload**: a photo of your wireframe, and (optional) a short screen recording of your demo

## Stretch goals

- Fetch some of your data from a public API, with loading and error states
- Save the user's changes in `localStorage` so they survive a refresh
- Add tests with Jest for your helper functions (for example your filter or sort logic)
- Add a dark mode toggle using a CSS class
- Check your site with Lighthouse in Chrome DevTools and improve the accessibility score
- Add your project to a personal portfolio page

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
