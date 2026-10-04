---
title: Fetching data with fetch
kind: lesson
minutes: 35
---
You know what an API is, you can read JSON, and you understand promises and `await`. Now it is time to put it all together and make your first real request from code. By the end of this lesson, a dog photo will appear on your page that you did not put there yourself.

## Meet fetch

`fetch` is a function built into every modern browser. You give it a URL, and it sends a request across the internet. It returns a **promise** of a **response**.

Getting data with `fetch` takes **two** waits:

1. **Wait for the response to arrive.** This gives you a `Response` object: like a parcel arriving at your door. You know it has arrived, and you can read the label, but you have not opened it yet.
2. **Wait for the body to be read as JSON.** Calling `response.json()` opens the parcel and turns the JSON text inside into a JavaScript value. This also takes a moment, so it is also a promise.

```js
async function getDog() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await response.json();
  console.log(data);
}

getDog();
```

Run it. You should see something like:

```text
{ message: "https://images.dog.ceo/breeds/...jpg", status: "success" }
```

`response.json()` did the `JSON.parse` step for you, so `data` is a normal object.

> ⚠️ **Watch out:** The two `await`s are both needed. Forget the second one and `data` will be a pending promise, not your object.

## Showing the result on the page

Data in the console is nice, but users cannot see the console. Let's combine `fetch` with the DOM skills from last week.

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

Paste the HTML into the HTML pane and the JS into the JS pane. Click the button a few times. Every click is a brand new request to a server somewhere in the world. That is real web development!

Notice that an `async` function can be an event listener, just like any other function.

## Reading the documentation

Every API has its own shape of data. Before you use one, look at a real response (open the URL in your browser), and read its documentation if it has one. Ask:

- Is the data an object or an array?
- Which property holds the thing I want?
- Is it nested?

For example, the joke API returns:

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

Many APIs let you put your own information in the URL. With a template literal, you can build the URL from what the user typed:

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

Try your own GitHub username. Then try a name that does not exist, like `this-user-does-not-exist-12345`. What happens? You probably see "undefined has undefined public repositories". That is not very friendly. We will fix it in the next lesson.

> 💡 **Tip:** The GitHub API allows about 60 requests per hour from one computer without logging in. If it suddenly stops working, you may have hit that limit. Wait a while and try again.

## Checking response.ok

Here is something that surprises everyone: `fetch` only rejects (throws) when the request could not happen at all, for example if you are offline. If the server answers "404 Not Found", that still counts as a response, so `fetch` does **not** throw.

Every response has a **status code**:

- `200` means OK
- `404` means "not found"
- `500` means the server had a problem

`response.ok` is `true` for successful codes (200 to 299) and `false` otherwise. Always check it:

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

> 🧠 **Remember:** `fetch` + `response.ok` check + `response.json()` is the pattern you will write again and again.

## Arrays of results

Some APIs return an **array**, even for one result. The countries API is one of them:

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

Notice `countries[0]` (first item in the array) and `country.capital[0]` (capital is itself an array, because some countries have more than one).

### Try it

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

Bonus: change the latitude and longitude to a place you love. (Search the web for "latitude and longitude of Lagos", for example.)

## Check your understanding

1. Why does getting JSON with `fetch` need two `await`s?
2. A request returns a 404 status. Does `fetch` throw an error? What should you check?
3. How do you put a value the user typed into a URL?
4. The countries API returns an array. How do you get the first country?

<details><summary>Show answers</summary>

1. The first waits for the response to arrive. The second waits for the body to be read and converted from JSON with `response.json()`.
2. No. `fetch` only throws if the request could not be made at all. You should check `response.ok` (or `response.status`) and handle the problem yourself.
3. Build the URL with a template literal, for example `` `https://api.github.com/users/${username}` ``.
4. With index zero: `countries[0]`.

</details>

## Go deeper

- [Using the Fetch API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Fetch (javascript.info)](https://javascript.info/fetch)
- [HTTP response status codes (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
