---
title: Choosing and planning your project
kind: lesson
minutes: 40
---
The most common reason beginner projects fail is not bad code. It is choosing something too big, and starting to code with no plan. In this lesson you will pick an idea that fits, and plan it the way professional teams do, so that you finish something you are proud of.

## Choose something small and real

A good final project is:

- **Small enough** to finish in two to three weeks of evenings.
- **Real enough** that someone (even just you) would actually use it.
- **Interesting to you.** You will spend many hours on it. Pick something you care about: your hobby, your community, your job, your family.

Here are some beginner-sized ideas. Each one uses an array of objects and DOM rendering:

1. **Recipe box** – a list of recipes with ingredients. Search by name, filter by "vegetarian" or "under 30 minutes".
2. **Habit tracker** – a list of daily habits. Tick them off and see a streak count.
3. **Budget helper** – add income and spending items, see totals by category.
4. **Event or church timetable** – a schedule of sessions with filters by day or room, and a "my plan" list.
5. **Flashcard quiz** – questions and answers on any topic. Flip cards, mark right or wrong, show a score.
6. **Local guide** – your favourite places in your town with photos, categories and a search.
7. **Weather and outfit helper** – fetch the weather and suggest what to wear from a list of clothes.
8. **Book or film shelf** – your collection, with ratings, sorting and a "want to read/watch" list.

You can also bring your own idea. Check it with your instructor first.

> 💡 **Tip:** Solve a problem for a real person you know. "A sign-up list for my football team" is a much better story to tell an employer than "a to-do app", even if the code is similar.

## User stories: who needs what, and why

Before deciding *how* to build it, describe *what* people need. Teams do this with **user stories**: short sentences in this shape:

```text
As a <type of user>, I want <something>, so that <reason>.
```

For a recipe box:

```text
As a busy parent, I want to filter recipes by cooking time,
so that I can find something quick on a weekday.

As a cook, I want to see the ingredients for a recipe,
so that I can check I have everything before I start.

As a user, I want to add my own recipe,
so that my family favourites are saved in one place.
```

User stories keep you focused on people, not features. If you cannot write a "so that" for a feature, you probably do not need it.

## MVP vs stretch goals

An **MVP** (minimum viable product) is the smallest version of your app that is still useful. Think of a bicycle versus a car. If someone needs to get to work, a bicycle is a working answer *today*. You can add the engine later. Do not spend all your time building half a car that cannot move.

Sort your user stories into two lists:

- **MVP (must have):** without these, the app does not do its job.
- **Stretch (nice to have):** only start these when the MVP is finished, deployed and working.

```text
MVP
- Show a list of recipes from an array
- Search recipes by name
- Show ingredients when a recipe is clicked

Stretch
- Add a new recipe with a form
- Filter by cooking time
- Save recipes in localStorage
- Fetch recipe photos from an API
```

> ⚠️ **Watch out:** Almost every project takes longer than you expect, even for experienced developers. If your MVP list has more than four or five items, cut it.

## Plan your data

Your project must use an array of objects, so design it now. Write one or two example objects:

```js
const recipes = [
  {
    name: "Jollof rice",
    minutes: 60,
    vegetarian: true,
    ingredients: ["rice", "tomatoes", "peppers", "onion", "stock"],
  },
  {
    name: "Beans on toast",
    minutes: 10,
    vegetarian: true,
    ingredients: ["bread", "baked beans", "butter"],
  },
];

console.log(recipes.filter((recipe) => recipe.minutes <= 30));
```

Look at your user stories and check that the data supports each one. "Filter by cooking time" needs a `minutes` property. If it is not in the data, you cannot build the feature.

## Sketch a wireframe

A **wireframe** is a simple drawing of your page layout: boxes and labels, no colours, no detail. It is like an architect's floor plan before anyone picks the wallpaper.

Draw it on paper with a pen. Seriously, paper is fine, and it is fast. Draw two versions:

- **Phone** (one narrow column)
- **Desktop** (wider, maybe two columns)

Label the parts: header, search box, list of cards, form, footer. Take a photo of it. You will put it in your README later, and it will help you write your HTML.

```text
+---------------------------+
|  Recipe Box   [ search  ] |
+---------------------------+
| [x] Veggie  [x] < 30 mins |
+---------------------------+
| +-------+  +-------+      |
| | Jollof|  | Beans |      |
| | 60min |  | 10min |      |
| +-------+  +-------+      |
+---------------------------+
```

### Try it

Make your project plan. Write it in a document or on paper:

1. Choose your idea and write one sentence describing it.
2. Write at least five user stories.
3. Split them into MVP and stretch.
4. Write two example objects for your main array of data.
5. Sketch a wireframe for phone and desktop, and take a photo.

Share your plan with your instructor or a classmate and ask: "Is this the right size for two to three weeks?"

## Check your understanding

1. What are the three parts of a user story?
2. What is an MVP, and why should you build it before anything else?
3. Why should you design your data before you start coding?
4. What is a wireframe, and why draw it on paper?

<details><summary>Show answers</summary>

1. Who the user is, what they want, and why they want it ("As a..., I want..., so that...").
2. The smallest version of the app that is still useful. Building it first means you always have something working to show, even if you run out of time.
3. Because every feature depends on the data. If the data does not have the right properties, you cannot build the feature, and changing it later means rewriting code.
4. A simple sketch of the page layout without colour or detail. Paper is quick and cheap to change, so you can try ideas before spending time on code.

</details>

## Go deeper

- [Responsive design basics (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)
- [Array.prototype.filter() (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
