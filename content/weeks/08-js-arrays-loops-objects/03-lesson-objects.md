---
title: Objects - grouping related information
kind: lesson
minutes: 30
---
Think of a contact in your phone. It's not just one value. It has a name, a phone number, an email, maybe a birthday. All those details belong together. In JavaScript, we keep related details together in an **object**.

## What is an object?

An **object** is a collection of labelled values. Each label is called a **key** (or property name), and each key has a **value**. Together, a key and its value are called a **property**.

You create an object with curly braces `{ }`:

```js
const contact = {
  name: "Ngozi Okafor",
  phone: "07700 900123",
  email: "ngozi@example.com",
  age: 34,
  isFavourite: true,
};

console.log(contact);
```

Notice the pattern: `key: value`, with a comma after each property. (A comma after the last one is allowed and often added, so it's easy to add more later.)

Arrays vs objects:

- An **array** is like a numbered list. You find things by **position**: `list[0]`.
- An **object** is like a form with labelled boxes. You find things by **name**: `contact.email`.

Use an array when you have **many of the same kind of thing** (lots of contacts). Use an object when you have **several different details about one thing** (one contact).

## Reading values: dot notation

The most common way to read a value is with a dot, then the key:

```js
const book = {
  title: "Things Fall Apart",
  author: "Chinua Achebe",
  year: 1958,
};

console.log(book.title);  // Things Fall Apart
console.log(book.author); // Chinua Achebe
console.log(`${book.title} was published in ${book.year}.`);
```

If you ask for a key that doesn't exist, you get `undefined`. For example, `book.pages` gives `undefined`, because our book has no `pages` key.

## Reading values: bracket notation

You can also use square brackets with the key as a string. `book["author"]` gives exactly the same result as `book.author`: `"Chinua Achebe"`.

Why have two ways? Bracket notation lets you use a key that's stored **in a variable**:

```js
const book = {
  title: "Things Fall Apart",
  author: "Chinua Achebe",
  year: 1958,
};

const detailWanted = "year";
console.log(book[detailWanted]); // 1958
console.log(book.detailWanted);  // undefined - looks for a key literally called "detailWanted"
```

> 🧠 **Remember:** Use dot notation normally. Use bracket notation when the key is in a variable, or when the key has spaces or dashes (like `item["delivery-date"]`).

## Changing, adding and removing properties

```js
const pet = {
  name: "Mango",
  type: "cat",
};

pet.name = "Mango the Great"; // change a value
pet.age = 4;                  // add a new property
delete pet.type;              // remove a property

console.log(pet); // { name: "Mango the Great", age: 4 }
```

Just like arrays, an object stored in a `const` can still have its properties changed.

## Nesting: objects and arrays inside objects

A property's value can be any type, including an array or another object. This lets us describe more complicated things.

```js
const student = {
  name: "Tolu",
  age: 29,
  address: {
    town: "Bolton",
    postcode: "BL1 1AA",
  },
  skills: ["HTML", "CSS", "JavaScript"],
};

console.log(student.address.town);  // Bolton
console.log(student.skills[0]);     // HTML
console.log(student.skills.length); // 3
```

Read `student.address.town` from left to right: "start with `student`, go into its `address`, then get the `town`". It's like following directions: building, then floor, then room.

## Arrays of objects

This is the big one. Most real data, from a list of products in a shop to messages in a chat app, is an **array of objects**: a list where each item is a record with the same keys.

```js
const books = [
  { title: "Purple Hibiscus", author: "Chimamanda Ngozi Adichie", year: 2003 },
  { title: "Small Island", author: "Andrea Levy", year: 2004 },
  { title: "Homegoing", author: "Yaa Gyasi", year: 2016 },
];

console.log(books.length);      // 3
console.log(books[1]);          // the whole Small Island object
console.log(books[1].author);   // Andrea Levy
console.log(books[2].title);    // Homegoing
```

Read `books[1].author` as: "the item at index 1 of `books`, and then its `author`".

You can loop through an array of objects with `for...of`, just like last lesson:

```js
const books = [
  { title: "Purple Hibiscus", author: "Chimamanda Ngozi Adichie", year: 2003 },
  { title: "Small Island", author: "Andrea Levy", year: 2004 },
  { title: "Homegoing", author: "Yaa Gyasi", year: 2016 },
];

for (const book of books) {
  console.log(`${book.title} by ${book.author} (${book.year})`);
}
```

And combine it with `if` to find what you need:

```js
const books = [
  { title: "Purple Hibiscus", author: "Chimamanda Ngozi Adichie", year: 2003 },
  { title: "Small Island", author: "Andrea Levy", year: 2004 },
  { title: "Homegoing", author: "Yaa Gyasi", year: 2016 },
];

for (const book of books) {
  if (book.year > 2003) {
    console.log(`Newer book: ${book.title}`);
  }
}
```

## Functions that use objects

Objects make great function inputs, because one parameter can carry lots of details:

```js
function describeBook(book) {
  return `"${book.title}" by ${book.author}`;
}

const favourite = { title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie" };
console.log(describeBook(favourite));
```

> 💡 **Tip:** `Object.keys(obj)` gives you an array of an object's keys, and `Object.values(obj)` gives an array of its values. Handy for looping over an object's properties.

### Try it

1. Run the code to see the list of recipes.
2. Add a fourth recipe object of your own to the array.
3. Inside the loop, log only the recipes that take 30 minutes or less.
4. Log the **first ingredient** of the jollof recipe. (Hint: you'll need both `[ ]` and `.`.)

```js
const recipes = [
  { name: "Jollof rice", minutes: 60, vegetarian: true, ingredients: ["rice", "tomatoes", "peppers"] },
  { name: "Omelette", minutes: 10, vegetarian: true, ingredients: ["eggs", "onion"] },
  { name: "Chicken curry", minutes: 45, vegetarian: false, ingredients: ["chicken", "spices", "onion"] },
];

for (const recipe of recipes) {
  console.log(`${recipe.name}: ${recipe.minutes} minutes`);
}

// your code here
```

## Check your understanding

1. When would you use an object instead of an array?
2. Given `const car = { make: "Toyota", year: 2019 }`, write two different ways to get the make.
3. Why does `car[key]` work when `const key = "year"`, but `car.key` doesn't?
4. Given the `student` object above, how do you get the postcode?
5. In `const people = [{ name: "Ali" }, { name: "Bea" }]`, how do you get `"Bea"`?

<details><summary>Show answers</summary>

1. When you're describing **one thing** with several labelled details (name, age, email). Use an array for a list of many similar things.
2. `car.make` and `car["make"]`.
3. Brackets use the **value** inside the variable `key` (`"year"`). The dot looks for a property literally named `key`, which doesn't exist.
4. `student.address.postcode`
5. `people[1].name`

</details>

## Go deeper

- [javascript.info: Objects](https://javascript.info/object)
- [MDN: JavaScript object basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics)
- [MDN: Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
