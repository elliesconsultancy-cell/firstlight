---
title: Loading, errors and rendering fetched data
kind: lesson
minutes: 40
---
Think about tracking a parcel online. The site does not show a blank page while it checks. It says "Checking...". Then it says "Arriving Tuesday", or "We couldn't find that tracking number. Please check it and try again." You always know what is happening.

Good apps do the same. On a fast connection, a request takes a blink. On a slow phone signal, it can take several seconds. Sometimes it fails completely. In this lesson you handle the three moments of every request: waiting, success and failure.

## The three states of a request

Every time your app fetches data, it is in one of these situations:

1. **Loading.** The request is sent. We are waiting.
2. **Success.** The data arrived. We show it.
3. **Error.** Something went wrong. We explain it kindly.

Without these states, users see a blank page. Or nothing changes when they click. So they click again and again, or they give up.

## A pattern for every request

Here is a pattern you can reuse. It uses `try`, `catch` and also `finally`. Code in `finally` runs at the end **whether it worked or not**. That makes it perfect for "stop loading".

```html
<form id="country-form">
  <label for="country">Country</label>
  <input id="country" value="Ghana" />
  <button id="search-button" type="submit">Search</button>
</form>
<p id="status"></p>
<div id="result"></div>
```

```js
const form = document.querySelector("#country-form");
const input = document.querySelector("#country");
const searchButton = document.querySelector("#search-button");
const statusText = document.querySelector("#status");
const result = document.querySelector("#result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = input.value.trim();

  if (name === "") {
    statusText.textContent = "Please type a country name.";
    return;
  }

  // 1. LOADING
  statusText.textContent = "Loading...";
  result.textContent = "";
  searchButton.disabled = true;

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);

    if (response.status === 404) {
      throw new Error(`We couldn't find a country called "${name}".`);
    }
    if (!response.ok) {
      throw new Error("Something went wrong. Please try again later.");
    }

    const countries = await response.json();

    // 2. SUCCESS
    statusText.textContent = "";
    renderCountry(countries[0]);
  } catch (error) {
    // 3. ERROR
    statusText.textContent = error.message;
  } finally {
    searchButton.disabled = false;
  }
});

function renderCountry(country) {
  const heading = document.createElement("h2");
  heading.textContent = `${country.flag} ${country.name.common}`;

  const details = document.createElement("p");
  details.textContent = `Capital: ${country.capital[0]}. Population: ${country.population.toLocaleString()}.`;

  result.append(heading, details);
}
```

Paste both into the playground. Try these three searches:

- A real country, like `Japan`
- A made-up name, like `Wakanda`
- An empty box

### What the code does

- **Loading.** We show a message and clear the old result. We **disable the button**, so the user cannot send ten requests by clicking with impatience.
- **Our own errors.** We check the status. We `throw` a new `Error` with a friendly message. `throw` jumps straight to `catch`.
- **Network errors.** If the user is offline, `fetch` itself throws. That also lands in `catch`.
- **Finally.** The button is turned on again, whatever happened.

> 💡 **Tip:** Write error messages for people. "Error: 404" means nothing to most users. "We couldn't find a country called Wakanda" tells them what to do next.

> 💡 **Tip:** To see your loading state, open DevTools and go to the **Network** tab. Change "No throttling" to **Slow 4G** (or "3G"). Now every request is slow, like on a bad mobile signal.

## Rendering a list of results

Some APIs return many items. Here the state and render pattern from last week comes back. Store the fetched array in a variable (the state). Then render it.

The countries API returns an array of matches. For example, searching `guinea` returns Guinea, Guinea-Bissau, Equatorial Guinea and Papua New Guinea.

```html
<form id="search-form">
  <label for="query">Search countries</label>
  <input id="query" value="guinea" />
  <button type="submit">Search</button>
</form>
<p id="message"></p>
<ul id="country-list"></ul>
```

```js
const searchForm = document.querySelector("#search-form");
const queryInput = document.querySelector("#query");
const message = document.querySelector("#message");
const list = document.querySelector("#country-list");

let countries = []; // STATE

function render() {
  list.textContent = "";
  for (const country of countries) {
    const li = document.createElement("li");
    li.textContent = `${country.flag} ${country.name.common} – ${country.region}`;
    list.append(li);
  }
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "Loading...";

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${queryInput.value.trim()}`);
    if (!response.ok) {
      throw new Error("No countries found. Try another search.");
    }
    countries = await response.json(); // update state
    message.textContent = `Found ${countries.length} countries.`;
  } catch (error) {
    countries = [];
    message.textContent = error.message;
  }

  render(); // redraw from state
});
```

The fetch code changes only the **state** (`countries`) and the message. The `render` function draws the list. So you could add sorting or filtering without touching the fetch code.

## Loading data when the page opens

Sometimes you want data right away, with no click. Call your async function at the bottom of your script:

```html
<p id="joke">Loading a joke...</p>
```

```js
const jokeText = document.querySelector("#joke");

async function loadJoke() {
  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    if (!response.ok) {
      throw new Error("No joke today, sorry!");
    }
    const joke = await response.json();
    jokeText.textContent = `${joke.setup} ... ${joke.punchline}`;
  } catch (error) {
    jokeText.textContent = "Couldn't load a joke right now. Please refresh to try again.";
  }
}

loadJoke();
```

The loading message is already in the HTML. So the user sees it from the first moment.

> ⚠️ **Watch out:** Never trust that data has the shape you expect. Some countries have no capital. Then `country.capital` is missing, and `country.capital[0]` crashes. A safe way is `country.capital ? country.capital[0] : "None"`.

## Try it: your turn

Build a **GitHub profile card**:

```html
<form id="profile-form">
  <label for="user">GitHub username</label>
  <input id="user" />
  <button type="submit">Show profile</button>
</form>
<p id="profile-status"></p>
<div id="profile"></div>
```

In the JS pane:

1. When the form is submitted, show "Loading..." and disable the button.
2. Fetch `https://api.github.com/users/<username>`.
3. If the status is 404, show "No GitHub user with that name."
4. On success, create an `img` with the user's `avatar_url`. Add an `h2` with their `name` (or `login` if they have no name). Add a `p` with their number of `public_repos`.
5. Use `finally` to turn the button on again.
6. Test it with your own username, a fake one, and with the Network tab set to Slow 4G.

## Check your understanding

1. What are the three states every request can be in?
2. Why is it a good idea to disable the search button while loading?
3. When does code inside `finally` run?
4. In the list example, which variable is the state, and which function turns it into HTML?

<details><summary>Show answers</summary>

1. Loading, success and error.
2. It stops the user from sending many requests by clicking again and again while they wait. It also shows that something is happening.
3. Always. It runs after `try` (and `catch`, if there was an error) has finished, whether the request worked or not.
4. `countries` is the state, and `render()` turns it into HTML.

</details>

## Go deeper

- [try...catch...finally (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- [Error handling with promises (javascript.info)](https://javascript.info/promise-error-handling)
- [Fetching data from the server (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Network_requests)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
