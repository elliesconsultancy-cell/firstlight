---
title: Embeddings, a map of meaning
kind: lesson
minutes: 25
---
Think of a library. Cooking books are on one shelf. Football books are on another shelf, far away. Books about baking sit right next to the cooking books. You do not need to read the titles to know that "bread" and "cake" belong close together.

Now imagine every piece of text had a **place on a map**, like GPS coordinates. Texts with similar meaning would be close to each other. Texts with different meaning would be far apart. That map is the idea of **embeddings**.

## What is an embedding?

An **embedding** is a list of numbers that stands for the meaning of a text. A special model makes it for you. You give the model a text. It gives back the numbers.

The key promise is this: **texts with similar meaning get similar numbers.** So "gluten-free" and "no wheat" land close together, even though they share no words.

## A toy map you can run

Real embeddings have hundreds or thousands of numbers. We cannot draw that. So let us make a tiny map with only two numbers, made by hand.

Our two directions are:

- First number: how **sweet** it is (0 = not sweet, 10 = very sweet).
- Second number: how much it is a **drink** (0 = solid food, 10 = a drink).

Each item gets a point `[sweet, drink]`. The question also gets a point. Then we find the nearest items. Press **Try it**:

```js
const items = [
  { name: "Chocolate brownie", point: [9, 1] },
  { name: "Carrot cake", point: [7, 1] },
  { name: "Sourdough loaf", point: [1, 0] },
  { name: "Baguette", point: [1, 0.5] },
  { name: "Hot chocolate", point: [8, 9] },
  { name: "Filter coffee", point: [2, 9] },
];

function distance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.sqrt(dx * dx + dy * dy);
}

function nearest(questionPoint, count = 2) {
  return items
    .map((item) => ({ name: item.name, far: distance(item.point, questionPoint) }))
    .sort((a, b) => a.far - b.far)
    .slice(0, count);
}

console.log("Something sweet to eat:", nearest([9, 1]));
console.log("A plain bread:", nearest([1, 0]));
console.log("A warm sweet drink:", nearest([8, 8]));
```

Read the code in pieces:

- `distance` uses the straight-line distance between two points on the map. A small distance means a close meaning.
- `nearest` measures the distance from the question to every item, sorts them from near to far, and keeps the closest ones.

Notice that nothing here compares words. The search compares **positions**.

### Try it

1. Add a new item: `{ name: "Iced tea", point: [5, 9] }`. Which question points make it the nearest item?
2. Add a point for "a snack that is not sweet" at `[1, 1]`. What is nearest?
3. What would happen if we only had one number (sweetness)? Could we tell a brownie from hot chocolate?

<details><summary>Show answers</summary>

1. A question point near `[5, 9]`, like `[5, 8]` ("a drink that is a bit sweet").
2. The bread items, because they are low in sweetness and low in "drink".
3. No. Both are sweet. The second number is what separates food from drink. More numbers mean more ways to tell things apart. This is why real embeddings use hundreds of numbers.

</details>

## How real embeddings work

In real life, nobody picks the numbers by hand. An **embedding model** learned from a huge amount of text. It turns any text into a long list of numbers. 

The steps for a real search are:

1. For each chunk of your document, ask the embedding model for its numbers. Do this once and **store** the results.
2. When a customer asks a question, get the numbers for the question.
3. Find the stored chunks whose numbers are closest to the question's numbers.
4. Put those chunks in the prompt, exactly as in the last lesson.

Only step 1 to 3 change. Step 4, the open-book exam, stays the same.

A tool that stores many embeddings and finds the nearest quickly is called a **vector database**. You do not need that name today. You will meet it in the docs.

## Where the picture stops being true

- **GPS has meaning in each number.** Latitude is north-south. In a real embedding, no single number means "sweetness". The meaning is spread over all the numbers, and we cannot read it.
- **Close does not mean correct.** The nearest chunk is only the most similar one. It may still not answer the question. Keep the rule "if the notes do not say, say you do not know".

## Keyword search or embeddings?

| | Keyword search | Embeddings |
| --- | --- | --- |
| Finds | Same words | Same meaning |
| Strong at | Exact names, codes, numbers | Different words, same idea |
| Checking mistakes | You can see the words | Harder, the numbers are hidden |

For BakeBuddy's small menu, keyword search is a good start. For a big document or a user who uses very different words, embeddings help.

Anthropic, the company behind Claude, does not offer its own embedding model. Other companies do, and the Claude docs have a page that points to one. We do not call an embedding service in this course.

## Check your understanding

1. In one sentence, what is an embedding?
2. In the toy map, which two things are being compared to find the best item?
3. Why can embeddings match "gluten-free" with "no wheat" but keyword search cannot?
4. Name one way the GPS picture is not true for real embeddings.

<details><summary>Show answers</summary>

1. A list of numbers that stands for the meaning of a text, so similar meanings get nearby numbers.
2. The position of the question and the position of each item. We pick the smallest distance.
3. Both texts get nearby numbers because they mean about the same. Keyword search needs the same words.
4. No single number has a meaning you can read. The meaning is spread across hundreds of numbers.

</details>

> 🧠 **Remember:**
> - An embedding gives a text a place on a map of meaning.
> - Nearby places mean similar things, even with different words.
> - Retrieval stays an open-book exam. Only the "find" step becomes smarter.

## Go deeper

- [Claude docs: Embeddings](https://platform.claude.com/docs/en/build-with-claude/embeddings)
- [MDN: Math.sqrt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt)
