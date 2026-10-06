---
title: Library data
kind: assignment
submission: any
---
Imagine a librarian who asks you for help. Her book list is stored on a computer. People ask her questions all day. How many books are on the shelf now? What do we have by this author? Which book has the best rating?

The list is an array of objects. You answer her questions with code. Use everything you learned this week.

## What you'll build

A file called `library.js`. It starts with the library's data. Then it has one function for each question below. Each function takes the `books` array as a parameter and **returns** its answer. At the bottom of the file, you call each function and log the result.

## Requirements

- [ ] Your file starts with the `books` data exactly as given (you may add more books for testing, but the expected answers below use the original 8)
- [ ] Each task is a separate function with the name given, and it **returns** its answer
- [ ] Your functions use the `books` parameter, not the global variable directly
- [ ] You use at least one `for...of` loop **and** at least three of these array methods: `map`, `filter`, `find`, `forEach`, `reduce`
- [ ] All results are logged with a clear label, e.g. `console.log("Available books:", countAvailable(books));`
- [ ] Your answers match the expected results given in the comments
- [ ] The code runs from top to bottom with no errors
- [ ] You write a short reflection (see How to submit)

## Steps and hints

Copy this starter code into `library.js`.

```js
const books = [
  { title: "Things Fall Apart", author: "Chinua Achebe", year: 1958, rating: 4.4, available: true },
  { title: "Arrow of God", author: "Chinua Achebe", year: 1964, rating: 4.1, available: false },
  { title: "Americanah", author: "Chimamanda Ngozi Adichie", year: 2013, rating: 4.3, available: true },
  { title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie", year: 2006, rating: 4.5, available: true },
  { title: "The Famished Road", author: "Ben Okri", year: 1991, rating: 3.9, available: false },
  { title: "Small Island", author: "Andrea Levy", year: 2004, rating: 4.0, available: true },
  { title: "The Girl with the Louding Voice", author: "Abi Daré", year: 2020, rating: 4.4, available: false },
  { title: "Girl, Woman, Other", author: "Bernardine Evaristo", year: 2019, rating: 4.2, available: true },
];

// Task 1: How many books are in the library in total?
// Expected: 8
function countBooks(books) {
  // your code here
}

// Task 2: How many books are available to borrow right now?
// Expected: 5
function countAvailable(books) {
  // your code here
}

// Task 3: Return an array of all the titles.
// Expected: ["Things Fall Apart", "Arrow of God", ... 8 titles in total]
function getAllTitles(books) {
  // your code here
}

// Task 4: Return an array of titles by a given author.
// getTitlesByAuthor(books, "Chinua Achebe") -> ["Things Fall Apart", "Arrow of God"]
// getTitlesByAuthor(books, "Zadie Smith") -> []
function getTitlesByAuthor(books, author) {
  // your code here
}

// Task 5: Return the average rating of all books, rounded to 1 decimal place.
// Expected: "4.2" (toFixed gives back a string, and that's fine here)
function getAverageRating(books) {
  // your code here
}

// Task 6: Return the title of the book with the longest title.
// Expected: "The Girl with the Louding Voice"
function getLongestTitle(books) {
  // your code here
}

// Task 7: Return the whole book object for the oldest book.
// Expected: the "Things Fall Apart" object (year 1958)
function getOldestBook(books) {
  // your code here
}

// Task 8: Find a book by its title and return it. Return undefined if not found.
// findBook(books, "Small Island") -> the Small Island object
// findBook(books, "Harry Potter") -> undefined
function findBook(books, title) {
  // your code here
}

// Task 9: Return a list of titles with a rating of 4.4 or more.
// Expected: ["Things Fall Apart", "Half of a Yellow Sun", "The Girl with the Louding Voice"]
function getTopRated(books) {
  // your code here
}

// Task 10: Check out a book. If it's available, set available to false
// and return "You have borrowed <title>". If it's already out, return
// "Sorry, <title> is not available". If it doesn't exist, return "Book not found".
// checkOutBook(books, "Americanah")   -> "You have borrowed Americanah"
// checkOutBook(books, "Americanah")   -> "Sorry, Americanah is not available"
// checkOutBook(books, "Harry Potter") -> "Book not found"
function checkOutBook(books, title) {
  // your code here (hint: you could reuse findBook!)
}

// ---- Call your functions and log the results below ----
console.log("Total books:", countBooks(books));
```

### Hints

- **Break each task into small steps.** For Task 5, first add up all the ratings. Then divide by the number of books. Then round.
- **Task 2 and Task 9**: use `filter`, and then `.length` or `.map(...)`.
- **Task 4**: use `filter` to pick the author. Then use `map` to get the titles. You can chain them.
- **Task 5**: use `reduce` with a starting value of `0`, or a loop with an accumulator. Then use `.toFixed(1)`.
- **Task 6 and Task 7**: these are "find the biggest or smallest" problems. Use a loop. Assume the first book is the winner. Compare each book. Replace the winner when you find a better one.

```js no-check
// A pattern for "find the biggest"
let winner = books[0];
for (const book of books) {
  if (/* this book beats the current winner */) {
    winner = book;
  }
}
```

- **Task 10**: you can change objects inside an array. If `findBook` gives you a book object, then `book.available = false` changes the book inside the array too.
- **Stuck?** Log things. `console.log(book)` inside your loop shows what each item looks like. Or set a breakpoint and look at the Scope panel.

> 💡 **Tip:** Do the tasks in order. The early ones are simpler. You can reuse their ideas, and even their functions, in later tasks.

## How to submit

Use the submit form on this page. Hand in two things.

1. **Link or file:** a link to `library.js` on GitHub or CodePen, or upload the file.
2. **Written answer:** paste the output from your console. Then answer in a few sentences:
   - For one task, explain why you chose a loop or a particular array method.
   - Which task was hardest? What helped you solve it?

## Stretch goals

- **Books per author:** return an object that counts books by each author, like `{ "Chinua Achebe": 2, "Ben Okri": 1, ... }`. (Hint: start with an empty object `{}` and use bracket notation.)
- **Return a book:** write `returnBook(books, title)`, the opposite of Task 10.
- **Sort by rating:** look up the `sort` method on MDN and return the titles from highest to lowest rating. Be careful: `sort` changes the original array. Can you avoid that?
- **Show it on a page:** create an HTML page with an empty `<ul>`, and use JavaScript to add an `<li>` for each available book. Look up `document.querySelector` and `createElement` on MDN.

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
