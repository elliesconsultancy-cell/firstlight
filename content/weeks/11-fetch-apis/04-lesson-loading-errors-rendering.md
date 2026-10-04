---
title: Loading, errors and rendering fetched data
kind: lesson
minutes: 40
---
On a fast connection, a request takes a blink. On a slow phone signal, it can take several seconds, and sometimes it fails completely. Good apps tell the user what is going on at every moment. In this lesson you will learn to handle the three moments of every request: waiting, success and failure.

## The three states of a request

Every time your app fetches data, it is in one of these situations:

1. **Loading** – the request has been sent, and we are waiting.
2. **Success** – the data arrived, so we show it.
3. **Error** – something went wrong, so we explain it kindly.

Think about tracking a parcel online. The site does not show a blank page while it checks. It says "Checking...", then either "Arriving Tuesday" or "We couldn't find that tracking number. Please check it and try again." You always know what is happening.

Without these states, users see a blank page or nothing changing when they click, and they click again and again, or give up.

## A pattern for every request

Here is a pattern you can reuse. It uses `try`, `catch` and also `finally`. Code in `finally` runs at the end **whether it worked or not**, which makes it perfect for "stop loading".

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

Paste both into the playground and try:

- A real country, like `Japan`
- A made-up name, like `Wakanda`
- An empty box

Let's look at the important parts:

- **Loading:** we show a message, clear the old result, and **disable the button** so the user cannot send ten requests by impatient clicking.
- **Our own errors:** we check the status and `throw` a new `Error` with a friendly message. `throw` jumps straight to `catch`.
- **Network errors:** if the user is offline, `fetch` itself throws, and that also lands in `catch`.
- **Finally:** the button is turned back on, no matter what happened.

> 💡 **Tip:** Write error messages for humans. "Error: 404" means nothing to most people. "We couldn't find a country called Wakanda" tells them exactly what to do next.

> 🧠 **Remember:** To see your loading state properly, open DevTools, go to the **Network** tab, and change "No throttling" to **Slow 4G** (or "3G"). Now every request is slow, just like on a bad mobile signal.

## Rendering a list of results

Some APIs return many items. This is where last week's state and render pattern comes back. Store the fetched array in a variable (the state), then render it.

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

The fetch code only changes the **state** (`countries`) and the message. The `render` function draws the list. You could now add sorting or filtering without touching the fetch code at all.

## Loading data when the page opens

Sometimes you want data straight away, without a click. Just call your async function at the bottom of your script:

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

Notice the loading message is already in the HTML, so the user sees it from the very first moment.

> ⚠️ **Watch out:** Never trust that data has the shape you expect. Some countries have no capital, so `country.capital` may be missing and `country.capital[0]` would crash. A safe way is `country.capital ? country.capital[0] : "None"`.

### Try it

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
4. On success, create an `img` with the user's `avatar_url`, an `h2` with their `name` (or `login` if they have no name), and a `p` with their number of `public_repos`.
5. Use `finally` to turn the button back on.
6. Test it with your own username, a fake one, and with the Network tab set to Slow 4G.

## Check your understanding

1. What are the three states every request can be in?
2. Why is it a good idea to disable the search button while loading?
3. When does code inside `finally` run?
4. In the list example, which variable is the state, and which function turns it into HTML?

<details><summary>Show answers</summary>

1. Loading, success and error.
2. To stop the user sending many requests by clicking again and again while they wait, and to show that something is happening.
3. Always, after `try` (and `catch` if there was an error) have finished, whether the request worked or not.
4. `countries` is the state, and `render()` turns it into HTML.

</details>

## Go deeper

- [try...catch...finally (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- [Error handling with promises (javascript.info)](https://javascript.info/promise-error-handling)
- [Fetching data from the server (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Network_requests)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
