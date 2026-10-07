---
title: The open-book exam (retrieval)
kind: lesson
minutes: 35
---
Imagine an exam with a big textbook that you may open. You do not read the whole book during the exam. That would take hours. You look at the question, find the two or three pages that matter, read them, and write your answer.

This is exactly how an AI can answer from a big document. The app does three steps: **find** the right pages, **put** them on the desk, and **answer** from them. We call this **retrieval**. The full name is **retrieval-augmented generation**, or **RAG**. The name is long. The idea is an open-book exam.

## The three steps

1. **Find.** Search your document for the few lines that match the customer's question.
2. **Stuff.** Add those lines to the prompt, with a rule: "answer only from these notes".
3. **Answer.** The model reads the notes and writes the reply.

The AI is not searching. **Your code** searches. The model only reads what you give it.

## Step 1: split the document into chunks

A **chunk** is a small piece of the document that makes sense by itself. Our menu is already in chunks: one fact per line. For a longer document, you could use one paragraph per chunk.

## Step 2: score each chunk by shared words

Our first search is simple. We count how many important words the question and the chunk share. More shared words means a better match. This is called **keyword search**.

Two small details help:

- We ignore **stop words**, tiny words like "the" and "is" that carry little meaning.
- We make words lowercase and cut a final "s", so "croissants" matches "croissant".

Here is the whole search in plain JavaScript. It does not need Node, so you can press **Try it** and change it:

```js
const menuText = `Opening hours: Monday to Friday 7:00 to 18:00.
Opening hours: Saturday 8:00 to 16:00. Sunday closed.
Sourdough loaf: 4.50. Contains wheat. Vegan. Baked every morning.
Butter croissant: 2.00. Contains wheat, milk and eggs.
Gluten-free almond cake: 3.50. No wheat. Contains almonds and eggs.
Hot chocolate: 3.00. Contains milk.
Delivery: free within 5 km for orders over 20. Otherwise the fee is 3.00.`;

const chunks = menuText.split("\n");

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "do", "does", "you", "your", "i", "we",
  "to", "of", "and", "or", "for", "in", "on", "at", "it", "have", "has",
  "any", "can", "what", "when", "how", "much", "me", "my", "with", "there",
]);

function words(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w !== "" && !STOP_WORDS.has(w))
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w));
}

function score(question, chunk) {
  const chunkWords = new Set(words(chunk));
  let points = 0;
  for (const w of new Set(words(question))) {
    if (chunkWords.has(w)) points++;
  }
  return points;
}

function retrieve(question, count = 2) {
  return chunks
    .map((text) => ({ text, points: score(question, text) }))
    .filter((c) => c.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, count);
}

console.log(retrieve("Do you have a gluten-free cake?"));
console.log(retrieve("How much is a croissant?"));
console.log(retrieve("What time do you open on Saturday?"));
```

Read it in pieces:

- `words()` cleans a text into a list of useful lowercase words.
- `score()` counts the question's words that also appear in the chunk.
- `retrieve()` scores every chunk, drops the ones with zero points, sorts the best first, and keeps the top `count`.

Run it. For the gluten-free question, the cake comes first with 3 points. The delivery line also shows up, because it contains the word "free". Keyword search is simple, so it sometimes brings a little noise. That is fine, because the model can ignore lines that do not help.

### Try it

Before you run the code: what do you think `retrieve("Is the sourdough vegan?")` finds first? Then run it. After that, try `retrieve("Do you have anything without wheat?")`. Is the result what a customer would want?

<details><summary>Show answers</summary>

The first question finds the sourdough line, because "sourdough" and "vegan" both appear in it. The second question finds the lines that **contain** the word "wheat", including the croissant and the sourdough. The best answer is the gluten-free cake, which says "No wheat". With only two results, it may not even appear. The search only counts words. It does not understand "without". This is the weakness of keyword search.

</details>

## Step 3: put the lines on the desk

Now we build the prompt for each question. Make a new file called `knowledge.js` in your project. It holds the same search as above, but loads the real `menu.txt`. The part `new URL("./menu.txt", import.meta.url)` means "the file `menu.txt` that sits next to this file". It works from any folder, and it keeps working when the project is online.

```node
import { readFile } from "node:fs/promises";

const menuText = await readFile(new URL("./menu.txt", import.meta.url), "utf8");
const chunks = menuText
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line !== "");

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "do", "does", "you", "your", "i", "we",
  "to", "of", "and", "or", "for", "in", "on", "at", "it", "have", "has",
  "any", "can", "what", "when", "how", "much", "me", "my", "with", "there",
]);

function words(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w !== "" && !STOP_WORDS.has(w))
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w));
}

function score(question, chunk) {
  const chunkWords = new Set(words(chunk));
  let points = 0;
  for (const w of new Set(words(question))) {
    if (chunkWords.has(w)) points++;
  }
  return points;
}

export function retrieve(question, count = 3) {
  return chunks
    .map((text) => ({ text, points: score(question, text) }))
    .filter((c) => c.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, count);
}

export function buildSystemPrompt(basePrompt, found) {
  const notes =
    found.length > 0
      ? found.map((f) => "- " + f.text).join("\n")
      : "(no matching notes were found)";

  return (
    basePrompt +
    "\n\nNOTES FROM THE MENU:\n" +
    notes +
    "\n\nUse only these notes for facts about products, prices, allergies and hours. " +
    "If the notes do not answer the question, say you do not know and suggest asking in the shop. " +
    "Never invent prices, ingredients or hours."
  );
}
```

Because the notes are now added for each question, go back to `prompt.js` and make it small again. Remove the menu reading and keep only the personality:

```node
export const SYSTEM_PROMPT =
  "You are BakeBuddy, the friendly helper of Amina's Bakery. " +
  "Answer in at most three short sentences.";
```

Finally, change the route in `server.js`. Add this `import` at the top:

```node
import { retrieve, buildSystemPrompt } from "./knowledge.js";
```

Then, inside the `try` block of the route, replace the old lines that call `askClaude` and send the reply with these:

```node
const recentQuestions = messages
  .filter((m) => m.role === "user")
  .slice(-2)
  .map((m) => m.content)
  .join(" ");

const found = retrieve(recentQuestions);
const system = buildSystemPrompt(SYSTEM_PROMPT, found);

const reply = await askClaude({ system, messages });
res.json({ reply });
```

We search with the last **two** customer messages. A follow-up like "And how much is it?" has no product name. The earlier message gives the search something to find.

> 💡 **Tip:** Print `found` with `console.log` in the server while you test. When an answer is wrong, first look at what was retrieved. Most mistakes in retrieval come from the **find** step, not from the AI.

## Where the picture stops being true

In an exam, you understand the question. Our search only counts shared words. "Gluten-free" and "without wheat" mean the same to you, but share no word. Keyword search misses it. The next lesson shows a smarter way.

## Check your understanding

1. Name the three steps of retrieval.
2. Who does the searching: the AI or your code?
3. Why do we ignore stop words?
4. Why do we search with the last two customer messages and not only the last?

<details><summary>Show answers</summary>

1. Find the right lines, put them in the prompt, let the AI answer from them.
2. Your code. The AI only reads the lines you give it.
3. They appear everywhere, so they would give points to chunks that are not really related.
4. A follow-up question may have no keywords by itself. The earlier question adds the missing words.

</details>

> 🧠 **Remember:**
> - Retrieval is an open-book exam: find, stuff, answer.
> - Your code finds the lines. The model only reads them.
> - Add a rule: "answer only from the notes, otherwise say you do not know".

## Go deeper

- [Claude docs: Messages API (system prompt)](https://platform.claude.com/docs/en/api/messages)
- [MDN: Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Describe retrieval as find, stuff, answer
- Explain how keyword scoring finds chunks, and why stop words are ignored
- Add `retrieve` and `buildSystemPrompt` to the server

### Purpose
Retrieval is how real products answer from large documents. Seeing the plain-code version removes the mystery.

### Things to teach
1. **The open-book exam.** Say: "You do not read the whole textbook. You find the right pages, read them and answer." Three steps: find, stuff, answer.
2. **Your code searches, not the AI.** The model only reads what the code puts on the desk. Say this twice.
3. **Run the playground search.** Show `words`, `score` and `retrieve`. Run the three questions and change them. Note the noise from the word "free".
4. **Wire it in.** Show `knowledge.js`, the small `prompt.js`, and the server change using the last two user messages.
5. **Where the picture stops.** Keyword search counts words, not meaning. "Without wheat" misses "No wheat".

### Check understanding
- Ask: "Who does the searching?" A good answer: our code, not the AI.
- Ask: "Why use the last two user messages?" A good answer: a follow-up like "And how much is it?" has no product name.
- Ask: "A wrong answer. What do you check first?" A good answer: what was retrieved, using `console.log(found)`.

### Watch for
- Forgetting to remove the old `askClaude` lines in the route, or an `import` typo for `knowledge.js`. Check the server terminal for errors.
- Blaming the AI when the right line was never found. Print `found` first.
