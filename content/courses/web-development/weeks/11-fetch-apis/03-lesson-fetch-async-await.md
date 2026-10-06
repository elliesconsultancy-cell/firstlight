---
title: Fetching data with fetch
kind: lesson
minutes: 35
---
Imagine you order a pizza by phone. First, the shop answers: "Yes, we got your order." That is not the pizza yet. Later, the delivery person arrives. Then you open the box and see what is inside.

Getting data from an API has the same steps. You know what an API is, you can read JSON, and you understand promises and `await`. Now we put it all together and make your first real request from code. By the end of this lesson, a dog photo will appear on your page. You did not put it there yourself.

## Meet fetch

`fetch` is a function built into every modern browser. You give it a URL. It sends a request across the internet. It returns a **promise** of a **response**.

Getting data with `fetch` takes **two** waits:

1. **Wait for the response to arrive.** You get a `Response` object. It is like a pizza box at your door. You know it has arrived. You can read the label. You have not opened it yet.
2. **Wait for the body to be read as JSON.** Calling `response.json()` opens the box. It turns the JSON text inside into a JavaScript value. This also takes a moment, so it is also a promise.

```js
async function getDog() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await response.json();
  console.log(data);
}

getDog();
```

Run it. You should see something like this:

```text
{ message: "https://images.dog.ceo/breeds/...jpg", status: "success" }
```

`response.json()` did the `JSON.parse` step for you. So `data` is a normal object.

> ⚠️ **Watch out:** You need both `await`s. If you forget the second one, `data` is a pending promise and not your object.

## Showing the result on the page

Data in the console is nice. But users cannot see the console. We combine `fetch` with the DOM skills from last week.

```html
<button id="dog-button">Show me a dog</button>
<div>
  <img id="dog" alt="" width="300" />
</div>
```

```js
const button = document.querySelector("#dog-button");
const image = document.querySelector("#dog");

async function showDog() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await response.json();
  image.src = data.message;
  image.alt = "A random dog";
}

button.addEventListener("click", showDog);
```

Paste the HTML into the HTML pane and the JS into the JS pane. Click the button a few times. Every click is a new request to a server somewhere in the world. That is real web development.

An `async` function can be an event listener, like any other function.

## Reading the documentation

Every API has its own shape of data. Before you use one, open a real response in your browser. Read its documentation if it has some. Ask:

- Is the data an object or an array?
- Which property holds the thing I want?
- Is it nested?

For example, the joke API returns this:

```json
{
  "type": "general",
  "setup": "What do you call a fish wearing a bowtie?",
  "punchline": "Sofishticated.",
  "id": 123
}
```

So we need `data.setup` and `data.punchline`:

```html
<button id="joke-button">Tell me a joke</button>
<p id="setup"></p>
<p id="punchline"></p>
```

```js
const jokeButton = document.querySelector("#joke-button");
const setup = document.querySelector("#setup");
const punchline = document.querySelector("#punchline");

jokeButton.addEventListener("click", async () => {
  const response = await fetch("https://official-joke-api.appspot.com/random_joke");
  const joke = await response.json();
  setup.textContent = joke.setup;
  punchline.textContent = joke.punchline;
});
```

## Building the URL from user input

Many APIs let you put your own information in the URL. With a template literal, you build the URL from what the user typed.

```html
<form id="user-form">
  <label for="username">GitHub username</label>
  <input id="username" value="octocat" />
  <button type="submit">Look up</button>
</form>
<p id="result"></p>
```

```js
const form = document.querySelector("#user-form");
const input = document.querySelector("#username");
const result = document.querySelector("#result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = input.value.trim();
  const response = await fetch(`https://api.github.com/users/${username}`);
  const user = await response.json();
  result.textContent = `${user.name} has ${user.public_repos} public repositories.`;
});
```

### Try it

Try your own GitHub username. Then try a name that does not exist, like `this-user-does-not-exist-12345`. What do you think the page shows? Decide first.

<details><summary>Show answers</summary>

It shows "undefined has undefined public repositories". GitHub sends back an error message, and that message has no `name` or `public_repos`. This is not friendly. We fix it in the next lesson.

</details>

> 💡 **Tip:** The GitHub API allows about 60 requests per hour from one computer without logging in. If it suddenly stops working, you may have reached that limit. Wait a while and try again.

## Checking response.ok

This surprises everyone. `fetch` rejects (throws) only when the request could not happen at all, for example when you are offline. If the server answers "404 Not Found", that is still an answer. So `fetch` does **not** throw.

Every response has a **status code**:

- `200` means OK.
- `404` means "not found".
- `500` means the server had a problem.

`response.ok` is `true` for successful codes (200 to 299). It is `false` for all others. Always check it:

```js
async function getUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return await response.json();
}

async function main() {
  try {
    const user = await getUser("octocat");
    console.log(user.name);
    await getUser("this-user-does-not-exist-12345");
  } catch (error) {
    console.log(error.message); // "Request failed with status 404"
  }
}

main();
```

> 🧠 **Remember:** `fetch`, then a `response.ok` check, then `response.json()`. You will write this pattern again and again.

## Arrays of results

Some APIs return an **array**, even for one result. The countries API does this:

```js
async function getCountry(name) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const countries = await response.json();
  const country = countries[0];
  console.log(country.name.common); // "Ghana"
  console.log(country.capital[0]); // "Accra"
  console.log(country.population);
}

getCountry("ghana");
```

Look at `countries[0]`. It is the first item in the array. Look at `country.capital[0]`. The capital is also an array, because some countries have more than one.

## Try it: your turn

Use the Open-Meteo weather API to show the current temperature in Bolton.

```html
<button id="weather-button">What's the weather in Bolton?</button>
<p id="weather"></p>
```

```js
const weatherButton = document.querySelector("#weather-button");
const weatherText = document.querySelector("#weather");
const url =
  "https://api.open-meteo.com/v1/forecast?latitude=53.58&longitude=-2.43&current_weather=true";

weatherButton.addEventListener("click", async () => {
  // 1. fetch the url
  // 2. check response.ok
  // 3. read the JSON
  // 4. show the temperature and wind speed in #weather
  //    (open the url in your browser first to find the right properties!)
});
```

Bonus: change the latitude and longitude to a place you love. Search the web for "latitude and longitude of Lagos", for example.

## Check your understanding

1. Why does getting JSON with `fetch` need two `await`s?
2. A request returns a 404 status. Does `fetch` throw an error? What should you check?
3. How do you put a value the user typed into a URL?
4. The countries API returns an array. How do you get the first country?

<details><summary>Show answers</summary>

1. The first waits for the response to arrive. The second waits for the body to be read and converted from JSON with `response.json()`.
2. No. `fetch` throws only if the request could not be made at all. You should check `response.ok` (or `response.status`) and handle the problem yourself.
3. Build the URL with a template literal, for example `` `https://api.github.com/users/${username}` ``.
4. With index zero: `countries[0]`.

</details>

## Go deeper

- [Using the Fetch API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Fetch (javascript.info)](https://javascript.info/fetch)
- [HTTP response status codes (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
