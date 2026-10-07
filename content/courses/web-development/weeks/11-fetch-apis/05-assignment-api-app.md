---
title: Build an app with a public API
kind: assignment
submission: any
---
## What you'll build

You are the waiter now. A customer tells you what they want. You go to the kitchen (an API), and you bring back the answer.

You build a small web app that gets live data from a real public API. The data depends on what the user types or chooses. The app must also handle waiting and problems well:

- a loading message while it fetches
- a friendly error message when something goes wrong

Pick **one** API from this list. All are free and need no key. If you want a different API, ask your instructor.

| API | Example URL | App idea |
| --- | ----------- | -------- |
| Dog CEO | `https://dog.ceo/api/breed/beagle/images/random` | Pick or type a breed, see a photo |
| GitHub users | `https://api.github.com/users/octocat` | Type a username, see a profile card |
| REST Countries | `https://restcountries.com/v3.1/name/ghana` | Search a country, see flag, capital, population |
| Open-Meteo | `https://api.open-meteo.com/v1/forecast?latitude=53.58&longitude=-2.43&current_weather=true` | Choose a city from a list, see the current weather |
| Official Joke API | `https://official-joke-api.appspot.com/jokes/programming/random` | Choose a joke type, reveal the punchline on click |

> 💡 **Tip:** For Dog CEO, `https://dog.ceo/api/breeds/list/all` gives you every breed name. You can use it to fill a `<select>` dropdown. For Open-Meteo, you can store a few cities with their latitude and longitude in an array of objects.

## Requirements

- [ ] The project has `index.html`, `style.css` and `script.js` (linked with `defer`)
- [ ] The user can type, choose or click something that changes what is fetched (a search box, a dropdown or buttons)
- [ ] Data is fetched with `fetch` using `async` and `await`
- [ ] The code checks `response.ok` (or the status code)
- [ ] A **loading** message or indicator is shown while waiting
- [ ] A friendly **error** message is shown for bad input (for example, an unknown name) and for network problems
- [ ] Empty input is validated before any request is sent
- [ ] Fetched data is rendered into the page with DOM methods (`createElement`, `textContent`, `append`), and not only logged in the console
- [ ] At least three pieces of information from the response are shown
- [ ] The page works on a phone-sized screen, and form fields have labels
- [ ] The app is published on GitHub Pages, and the code is in a public repository
- [ ] A short `README.md` says which API you used and what the app does

## Steps/hints

### 1. Explore the API first

Before you write any code, open your API's URL in the browser. Change the inputs and look at the answers.

Write down the path to every piece of data you want, for example `data[0].capital[0]`. Also try a bad input. Note what comes back, and the status code in the DevTools **Network** tab.

### 2. Plan with pseudocode

```text
when the form is submitted:
  stop the page reloading
  read and trim the input
  if empty, show an error and stop
  show "Loading...", clear old results, disable the button
  try:
    fetch the URL built from the input
    if not ok, throw a friendly error
    read the JSON
    render the result
  catch:
    show the error message
  finally:
    enable the button
```

### 3. Starter code

```html
<main>
  <h1>My API app</h1>
  <form id="search-form">
    <label for="search">Search</label>
    <input id="search" type="text" />
    <button id="search-button" type="submit">Go</button>
  </form>
  <p id="status" role="status"></p>
  <section id="results"></section>
</main>
```

```js
const form = document.querySelector("#search-form");
const input = document.querySelector("#search");
const button = document.querySelector("#search-button");
const statusText = document.querySelector("#status");
const results = document.querySelector("#results");

async function fetchData(query) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${query}`); // change to your API
  if (!response.ok) {
    throw new Error("Sorry, we couldn't find that. Please check the spelling.");
  }
  return await response.json();
}

function render(data) {
  results.textContent = "";
  // TODO: create elements from data and append them to results
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = input.value.trim();

  if (query === "") {
    statusText.textContent = "Please type something to search for.";
    return;
  }

  statusText.textContent = "Loading...";
  results.textContent = "";
  button.disabled = true;

  try {
    const data = await fetchData(query);
    statusText.textContent = "";
    render(data);
  } catch (error) {
    statusText.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});
```

The `role="status"` on the paragraph tells screen readers to announce changes to it. So loading and error messages are accessible too.

### 4. Test the unhappy paths

Check each of these. Make sure your app says something helpful:

- Empty input
- Input that does not exist (a misspelled name)
- Slow network: DevTools **Network** tab → **Slow 4G**
- No network: DevTools **Network** tab → **Offline**

### 5. Publish and test again

Push to GitHub and turn on GitHub Pages. Test the live site on your phone too.

## How to submit

Use the submit form to send:

- **Link**: your live GitHub Pages URL
- **Written answer**: your repository link, which API you chose, and two or three sentences about how you handled loading and errors
- **File upload** (optional): screenshots showing the loading state, a successful result and an error message

## Stretch goals

- Show a spinner animation (CSS only) instead of the word "Loading..."
- Keep a "recent searches" list in an array, rendered as buttons that search again when clicked
- Combine two endpoints, for example fill a dropdown of dog breeds from `breeds/list/all`, then fetch a photo of the chosen one
- Save the last search in `localStorage` and load it automatically when the page opens
- For Open-Meteo, turn the `weathercode` number into a word and an emoji (look up the codes in the Open-Meteo documentation)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can build an app that fetches live data from a public API.
- Learners can show loading and friendly error states, and validate empty input.
- Learners can render fetched data and publish the app.

### Purpose
This combines the DOM skills from last week with `fetch`. It also gives learners a real project with live data for their portfolios.

### Things to do
1. **Launch.** Learners choose one API from the table (Dog CEO, GitHub users, REST Countries, Open-Meteo or Official Joke API). Anything else needs your approval.
2. **Demonstrate exploring first.** Open the chosen URL in the browser and write down the path to each value, for example `data[0].capital[0]`. Look at a bad input and the status code in the Network tab.
3. **Walk through the starter code.** Point at `fetchData`, `render`, the loading message, `catch` and `finally`. Note `role="status"` on the message paragraph.
4. **Test unhappy paths together.** Empty input, a misspelled name, Slow 4G and Offline.

### What good work looks like
- The user chooses or types something that changes what is fetched, and the code uses `fetch`, `async` and `await`, and checks `response.ok`.
- A loading message appears while waiting, and friendly errors appear for bad input and for network problems. Empty input is stopped before any request.
- The data is shown on the page with DOM methods, with at least three pieces of information.
- Files are `index.html`, `style.css` and `script.js` (with `defer`), labels on form fields, and a phone-sized layout that works.
- It is live on GitHub Pages, the repo is public, and the README names the API used.

### Watch for
- Data that is only logged to the console.
- Apps that ignore `response.ok`, so a 404 shows "undefined".
- Testing only the happy path. Ask them to show you the error state.
