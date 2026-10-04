---
title: APIs and JSON
kind: lesson
minutes: 30
---
Every time you check the weather on your phone, the app does not know the weather itself. It asks another computer, gets an answer, and shows it to you. In this lesson you will learn what that "asking" looks like, and the language the answer comes back in.

## What is an API?

**API** stands for **Application Programming Interface**. In simple words, it is a way for one program to ask another program for something.

Think of a restaurant. You (the customer) want food. The kitchen has the food. But you do not walk into the kitchen and start cooking. Instead:

1. You look at the **menu** to see what you can order.
2. You give your order to the **waiter**.
3. The waiter takes it to the **kitchen**.
4. The waiter comes back with your **food** (or tells you "sorry, we have run out").

In this story:

- **You** are your web page (the **client**).
- **The kitchen** is another company's computer (the **server**) with lots of data.
- **The waiter** is the **API**. It takes your request and brings back a response.
- **The menu** is the API's **documentation**, which tells you what you are allowed to ask for.

You never see how the kitchen works inside. You only need to know how to order.

## Ordering with a URL

Most web APIs are ordered using a **URL**, just like a web page address. Each URL is called an **endpoint**. Try opening this in a new browser tab:

```text
https://dog.ceo/api/breeds/image/random
```

Instead of a web page, you get some text like this:

```json
{
  "message": "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
  "status": "success"
}
```

Refresh the tab. You get a different dog each time! The API chose a random photo and sent you its address. Here are a few more to try in your browser:

```text
https://official-joke-api.appspot.com/random_joke
https://api.github.com/users/octocat
https://restcountries.com/v3.1/name/ghana
```

Some URLs include **your** information, like a username or country name. Change `octocat` to your own GitHub username, or `ghana` to another country, and see what comes back.

Some APIs take extra details after a `?`, called **query parameters**. Each one is a `name=value` pair, joined with `&`:

```text
https://api.open-meteo.com/v1/forecast?latitude=53.58&longitude=-2.43&current_weather=true
```

This asks a weather service for the current weather at latitude 53.58 and longitude -2.43, which is Bolton in Greater Manchester.

> 💡 **Tip:** Chrome shows raw API data as plain text. Tick the **Pretty-print** box at the top of the page (if you see one) to make it easier to read.

## What is JSON?

The text these APIs send back is in a format called **JSON** (say "JAY-son"), which stands for **JavaScript Object Notation**. It looks almost exactly like JavaScript objects and arrays, which is great news: you already know how to read it.

```json
{
  "name": "Ama",
  "age": 31,
  "isStudent": true,
  "languages": ["English", "Twi"],
  "address": {
    "town": "Bolton",
    "country": "UK"
  }
}
```

JSON can hold strings, numbers, booleans (`true`/`false`), `null`, arrays and objects. Objects can sit inside objects, and arrays inside objects, as deep as needed.

But JSON is stricter than JavaScript:

- Property names **must** be in double quotes: `"name"`, not `name`.
- Strings **must** use double quotes: `"Ama"`, not `'Ama'`.
- No comments, and no comma after the last item.
- No functions or `undefined`.

> 🧠 **Remember:** JSON is just **text**. It looks like an object, but until you convert it, JavaScript sees it as one long string.

## JSON.parse and JSON.stringify

JavaScript has a built-in `JSON` helper with two methods. Think of them as packing and unpacking a parcel.

**`JSON.parse`** unpacks: it turns JSON text into a real JavaScript value you can use.

```js
const text = '{"name": "Ama", "languages": ["English", "Twi"]}';

console.log(typeof text); // "string"

const person = JSON.parse(text);

console.log(typeof person); // "object"
console.log(person.name); // "Ama"
console.log(person.languages[1]); // "Twi"
```

**`JSON.stringify`** packs: it turns a JavaScript value into JSON text, ready to send or save.

```js
const book = { title: "Americanah", pages: 588, read: false };

const packed = JSON.stringify(book);
console.log(packed); // {"title":"Americanah","pages":588,"read":false}
console.log(typeof packed); // "string"
```

You will use `JSON.stringify` to save data in `localStorage` or to send data to a server. When you use `fetch` in a later lesson, it has its own way of doing the `JSON.parse` step for you.

> ⚠️ **Watch out:** If the text is not valid JSON, `JSON.parse` throws an error, for example `Unexpected token`. A missing quote or an extra comma is enough to break it.

## Reading nested data

Real API data is often nested. The skill is to follow the path step by step, like directions: "go into `current_weather`, then take `temperature`".

```js
const weatherText = `{
  "latitude": 53.58,
  "longitude": -2.43,
  "current_weather": {
    "temperature": 12.4,
    "windspeed": 18.2,
    "weathercode": 3
  }
}`;

const weather = JSON.parse(weatherText);

console.log(weather.current_weather.temperature); // 12.4
console.log(`Wind: ${weather.current_weather.windspeed} km/h`);
```

### Try it

Here is a small piece of JSON, similar to what a joke API returns:

```js
const jokeText = `{
  "type": "general",
  "setup": "Why did the scarecrow win an award?",
  "punchline": "Because he was outstanding in his field.",
  "id": 42
}`;

// 1. Use JSON.parse to turn jokeText into an object
// 2. console.log the setup, then the punchline
// 3. Create your own joke object, and use JSON.stringify to turn it into text
```

Then open `https://restcountries.com/v3.1/name/nigeria` in your browser. Look at the data carefully. Notice that it is an **array** (it starts with `[`). How would you get the capital city? Write the path down, for example `data[0].something...`.

## Check your understanding

1. In the restaurant analogy, what part does the API play?
2. What is an endpoint?
3. Name two ways JSON is stricter than a JavaScript object.
4. What does `JSON.parse` do? What does `JSON.stringify` do?
5. The data is `{"user": {"name": "Tunde", "repos": 12}}`. After parsing it into `data`, how do you get the number of repos?

<details><summary>Show answers</summary>

1. The waiter: it takes your request to the server (the kitchen) and brings back a response.
2. A specific URL you can send a request to, to get a particular kind of data from an API.
3. Any two of: property names must be in double quotes, strings must use double quotes, no trailing commas, no comments, no functions or `undefined`.
4. `JSON.parse` turns JSON text into a JavaScript value. `JSON.stringify` turns a JavaScript value into JSON text.
5. `data.user.repos`

</details>

## Go deeper

- [Working with JSON (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON)
- [JSON methods, toJSON (javascript.info)](https://javascript.info/json)
- [Introduction to web APIs (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
