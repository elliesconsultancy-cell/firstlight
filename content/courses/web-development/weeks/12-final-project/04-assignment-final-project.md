---
title: Final project
kind: assignment
submission: any
---
## What you'll build

This is your own cake, baked from start to finish. Your final project is a web app of your own choice, built with HTML, CSS and JavaScript.

It brings together everything from the course: semantic HTML, responsive layout, arrays of objects, DOM rendering, events, and (if you like) data from an API.

You will:

1. Plan it.
2. Build it in small steps.
3. Publish it.
4. Document it with a README.
5. Present it in a short demo.

Use the ideas and planning steps from this week's lessons. If your idea is not on the list in lesson 1, check it with your instructor before you start building.

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

Follow the "Try it" in the planning lesson: idea, user stories, MVP and stretch, example data, wireframe. Share your plan with your instructor before you start coding. Changing a plan is much cheaper than changing code.

### 2. Set up and deploy straight away

Create the repository. Add a basic `index.html` and a short README. Turn on GitHub Pages and check the live link. Create your issues.

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

Work through your MVP issues in order. Commit after each task. Push often. Close issues as you finish them. Check the live site often.

### 5. Ask for review

When your MVP works, ask for a code review using the template from lesson 2. Respond to the feedback with small commits.

### 6. Polish and stretch

Test on a real phone. Check the console for errors. Check that you can use the whole app with only the keyboard (press Tab to move around). Then, if you have time, pick one or two stretch goals.

### 7. README and demo

Write your README and add screenshots. Prepare your five-minute demo with the structure from lesson 3.

> ⚠️ **Watch out:** Stop adding features a few days before the deadline. Use the last days for testing, fixing bugs, your README and demo practice. A smaller app that works is better than a bigger app that is broken.

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

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can plan, build, publish and document a project of their own.
- Learners can use an array of objects with state and `render()`.
- Learners can request and respond to code review, and present their work.

### Purpose
The final project is the learner's proof of what they can do. It becomes the first item in their portfolio and the story they tell in interviews.

### Things to do
1. **Launch.** Approve each idea before building starts. Check the size against the MVP list. Learners follow the "Try it" in the planning lesson, then share their plan with you.
2. **Demonstrate set-up.** Show a new repo with a basic `index.html` and README, GitHub Pages turned on, and issues with checklists.
3. **Show the starter structure.** Point out the state, elements, `render` and events sections, and the empty-state message.
4. **Run the showcase.** Give each learner the same short slot, set by you. They use the five-part structure from the presenting lesson, on the live site. Say the order beforehand. After each demo, invite one question and one thing the audience liked. Keep the tone friendly. Collect the repo links so you can give feedback afterwards.

### What good work looks like
- A plan exists: at least five user stories split into MVP and stretch, a phone and desktop wireframe, and issues with task checklists.
- Separate `index.html`, `style.css` and `script.js` files, semantic HTML, labels, `alt` text and a responsive layout.
- An array of objects is drawn by a `render` function, with at least one interaction and friendly empty and error states.
- It is live on GitHub Pages with no console errors.
- The repo has at least 10 clear commits over several days, a full README with a screenshot and live link, and a code review that was answered.

### Watch for
- Learners adding features instead of finishing. Remind them to stop adding features before the end.
- A README with no screenshot or live link.
- Everything committed in one go. Ask them to talk about how the project grew.
- Nervous presenters. Let them go later in the order if they ask, and reassure them that the audience is friendly.
