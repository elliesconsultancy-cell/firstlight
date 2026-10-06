---
title: APIs and JSON
kind: lesson
minutes: 30
---
Think about the weather app on your phone. The app does not know the weather itself. It asks another computer, gets an answer, and shows it to you.

In this lesson you learn what that "asking" looks like. You also learn the language the answer comes in.

## What is an API?

**API** stands for **Application Programming Interface**. It is a way for one program to ask another program for something.

Imagine a restaurant. You are the customer. You want food. The kitchen has the food. But you do not walk into the kitchen and start cooking. Instead:

1. You read the **menu** to see what you can order.
2. You give your order to the **waiter**.
3. The waiter takes it to the **kitchen**.
4. The waiter comes back with your **food**. Or he says, "Sorry, we have run out."

Now the same story on the web:

- **You** are your web page. We call it the **client**.
- **The kitchen** is another company's computer with lots of data. We call it the **server**.
- **The waiter** is the **API**. It takes your request and brings back a response.
- **The menu** is the API's **documentation**. It tells you what you are allowed to ask for.

You never see how the kitchen works inside. You only need to know how to order.

Where the picture stops being true: a real waiter understands "something light, please". An API does not. You must order exactly as the menu says.

## Ordering with a URL

You order from most web APIs with a **URL**, like a web page address. Each URL is called an **endpoint**. Open this in a new browser tab:

```text
https://dog.ceo/api/breeds/image/random
```

You do not get a web page. You get text like this:

```json
{
  "message": "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
  "status": "success"
}
```

Refresh the tab. You get a different dog each time. The API chose a random photo and sent you its address.

Here are more to try in your browser:

```text
https://official-joke-api.appspot.com/random_joke
https://api.github.com/users/octocat
https://restcountries.com/v3.1/name/ghana
```

Some URLs include **your** information, like a username or a country name. Change `octocat` to your own GitHub username. Change `ghana` to another country. See what comes back.

### Query parameters

Some APIs take extra details after a `?`. These are **query parameters**. Each one is a `name=value` pair. Pairs are joined with `&`:

```text
https://api.open-meteo.com/v1/forecast?latitude=53.58&longitude=-2.43&current_weather=true
```

This asks a weather service for the current weather at latitude 53.58 and longitude -2.43. That place is Bolton in Greater Manchester.

> 💡 **Tip:** Chrome shows raw API data as plain text. If you see a **Pretty-print** box at the top of the page, tick it. The data becomes easier to read.

## What is JSON?

The text these APIs send back is in a format called **JSON** (say "JAY-son"). It stands for **JavaScript Object Notation**. It looks almost the same as JavaScript objects and arrays. Good news: you already know how to read it.

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

JSON can hold strings, numbers, booleans (`true` and `false`), `null`, arrays and objects. Objects can sit inside objects. Arrays can sit inside objects. It can go as deep as needed.

But JSON has stricter rules than JavaScript:

- Property names **must** be in double quotes: `"name"`, not `name`.
- Strings **must** use double quotes: `"Ama"`, not `'Ama'`.
- No comments, and no comma after the last item.
- No functions and no `undefined`.

> 🧠 **Remember:** JSON is only **text**. It looks like an object. But until you convert it, JavaScript sees one long string.

## JSON.parse and JSON.stringify

JavaScript has a built-in `JSON` helper with two methods. Think of packing and unpacking a parcel.

### JSON.parse: unpack

`JSON.parse` turns JSON text into a real JavaScript value that you can use.

```js
const text = '{"name": "Ama", "languages": ["English", "Twi"]}';

console.log(typeof text); // "string"

const person = JSON.parse(text);

console.log(typeof person); // "object"
console.log(person.name); // "Ama"
console.log(person.languages[1]); // "Twi"
```

### JSON.stringify: pack

`JSON.stringify` turns a JavaScript value into JSON text. The text is ready to send or save.

```js
const book = { title: "Americanah", pages: 588, read: false };

const packed = JSON.stringify(book);
console.log(packed); // {"title":"Americanah","pages":588,"read":false}
console.log(typeof packed); // "string"
```

You use `JSON.stringify` to save data in `localStorage`, or to send data to a server. In a later lesson, `fetch` does the `JSON.parse` step for you.

> ⚠️ **Watch out:** If the text is not valid JSON, `JSON.parse` throws an error, for example `Unexpected token`. One missing quote or one extra comma is enough to break it.

## Reading nested data

Real API data is often nested, with things inside things. Follow the path step by step, like directions: "Go into `current_weather`, then take `temperature`."

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

## Try it

Here is a small piece of JSON, like what a joke API returns:

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

Then open `https://restcountries.com/v3.1/name/nigeria` in your browser. Look at the data. It is an **array**, because it starts with `[`. How would you get the capital city? Write the path down, for example `data[0].something...`.

## Check your understanding

1. In the restaurant picture, what part does the API play?
2. What is an endpoint?
3. Name two ways JSON is stricter than a JavaScript object.
4. What does `JSON.parse` do? What does `JSON.stringify` do?
5. The data is `{"user": {"name": "Tunde", "repos": 12}}`. After you parse it into `data`, how do you get the number of repos?

<details><summary>Show answers</summary>

1. The waiter. It takes your request to the server (the kitchen) and brings back a response.
2. A specific URL you can send a request to, to get one kind of data from an API.
3. Any two of: property names must be in double quotes, strings must use double quotes, no trailing commas, no comments, no functions or `undefined`.
4. `JSON.parse` turns JSON text into a JavaScript value. `JSON.stringify` turns a JavaScript value into JSON text.
5. `data.user.repos`

</details>

## Go deeper

- [Working with JSON (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON)
- [JSON methods, toJSON (javascript.info)](https://javascript.info/json)
- [Introduction to web APIs (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
