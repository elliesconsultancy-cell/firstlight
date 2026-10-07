---
title: Objects - grouping related information
kind: lesson
minutes: 30
---
Open a contact in your phone. It is not one value. It has a name, a phone number, an email, maybe a birthday. All these details belong together on one card.

In JavaScript, we keep related details together in an **object**. An object is a contact card for your data.

## What is an object?

An **object** is a collection of labelled values. Each label is a **key** (also called a property name). Each key has a **value**. A key and its value together are a **property**.

You make an object with curly braces `{ }`.

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

Look at the pattern: `key: value`, then a comma. A comma after the last property is allowed. Many developers add it, so it is simple to add more later.

### Arrays and objects

- An **array** is a numbered shelf. You find things by **position**: `list[0]`.
- An **object** is a form with labelled boxes. You find things by **name**: `contact.email`.

Use an array for **many things of the same kind**, such as a lot of contacts. Use an object for **several details about one thing**, such as one contact.

## Read a value: dot notation

The usual way to read a value is a dot and then the key.

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

Ask for a key that does not exist, and you get `undefined`. For example, `book.pages` gives `undefined`. Our book has no `pages` key.

## Read a value: bracket notation

You can also use square brackets with the key as a string. `book["author"]` gives the same result as `book.author`: `"Chinua Achebe"`.

Why have two ways? Brackets let you use a key that is stored **in a variable**.

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

> 🧠 **Remember:** Use dot notation most of the time. Use brackets when the key is in a variable. Also use brackets when the key has spaces or dashes, such as `item["delivery-date"]`.

## Change, add and remove properties

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

As with arrays, an object in a `const` can still have its properties changed.

## Nesting: objects and arrays inside objects

A property's value can be any type. It can be an array or another object. This lets us describe more complex things.

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

Read `student.address.town` from left to right: "start with `student`, go into its `address`, then get the `town`". It is like directions: building, then floor, then room.

## Arrays of objects

This is the big one. Most real data is an **array of objects**. Think of a shop's products or the messages in a chat app. It is a list where each item is a record with the same keys.

Picture a box of contact cards. The box is the array. Each card is an object.

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

Loop through an array of objects with `for...of`, as in the last lesson.

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

Add an `if` to find what you need.

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

Which books do you think this prints? Check your guess by running it.

## Functions that use objects

Objects are good function inputs. One parameter can carry many details.

```js
function describeBook(book) {
  return `"${book.title}" by ${book.author}`;
}

const favourite = { title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie" };
console.log(describeBook(favourite));
```

> 💡 **Tip:** `Object.keys(obj)` gives an array of the keys of an object. `Object.values(obj)` gives an array of its values. They help when you loop over the properties of an object.

### Try it

1. Run the code to see the list of recipes.
2. Add a fourth recipe object of your own to the array.
3. Inside the loop, log only the recipes that take 30 minutes or less.
4. Log the **first ingredient** of the jollof recipe. Hint: you need both `[ ]` and `.`.

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

1. When do you use an object instead of an array?
2. Say `const car = { make: "Toyota", year: 2019 }`. Write two ways to get the make.
3. Why does `car[key]` work when `const key = "year"`, but `car.key` does not?
4. Look at the `student` object above. How do you get the postcode?
5. In `const people = [{ name: "Ali" }, { name: "Bea" }]`, how do you get `"Bea"`?

<details><summary>Show answers</summary>

1. When you describe **one thing** with several labelled details, such as name, age and email. Use an array for a list of many similar things.
2. `car.make` and `car["make"]`.
3. Brackets use the **value** inside the variable `key`, which is `"year"`. The dot looks for a property named `key`. It does not exist.
4. `student.address.postcode`
5. `people[1].name`

</details>

## Go deeper

- [javascript.info: Objects](https://javascript.info/object)
- [MDN: JavaScript object basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics)
- [MDN: Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Learners can create an object and read, change, add and delete properties.
- Learners can use dot and bracket notation.
- Learners can read data from nested objects and arrays of objects.

### Purpose
Most real data is a list of records. Arrays of objects are what the assignment, and later projects, use.

### Things to teach
1. **Object against array.** Use the `contact` card and `contact.email`. An array is found by position, an object by name. Use an array for many similar things, an object for details of one thing.
2. **Dot and bracket notation.** Use `book.author` and `book[detailWanted]`. Show that `book.detailWanted` gives `undefined`.
3. **Change, add, delete.** Run the `pet` example. A `const` object can still change.
4. **Nesting.** Use `student.address.town` and `student.skills[0]`. Read it left to right like directions.
5. **Array of objects.** Use `books[1].author`, then a `for...of` loop with `if (book.year > 2003)`. Then let learners do the `recipes` Try it.

### Check understanding
- Ask: "When do you use an object instead of an array?" A good answer: for several labelled details about one thing.
- Ask: "Why does `car[key]` work but `car.key` not, when `key` is `"year"`?" A good answer: brackets use the value in the variable. The dot looks for a property called `key`.
- Ask: "How do you get `"Bea"` from `[{ name: "Ali" }, { name: "Bea" }]`?" A good answer: `people[1].name`.

### Watch for
- Using a dot with a variable key.
- Mixing up `[ ]` and `{ }`. Say which is the list and which is the record.
