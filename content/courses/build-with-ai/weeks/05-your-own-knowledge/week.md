---
title: Give the AI your knowledge
summary: Learn why an AI does not know your business, and how to let it look up your own information before it answers.
---
BakeBuddy can chat. But ask it "Do you have a gluten-free cake?" and it will guess. It has never seen Amina's menu. A confident guess about allergies is wrong, and it can be dangerous.

This week you fix that. First, you will see **why** an AI does not know your own information, and what the simplest fix is. Then you will learn **retrieval**: an open-book exam, where the app first finds the right pages and then lets the AI answer from them.

You will build a small search that works with plain JavaScript and plain word matching. No extra services are needed. Then you will meet **embeddings**, a cleverer way to search by meaning. You will learn the idea with a small toy example you can run yourself.

At the end, BakeBuddy knows Amina's menu and opening hours, and says "I do not know" when the menu does not say. You may use your own information instead: a class timetable, a gym price list, a shop catalogue.

## By the end of this week you will be able to

- Explain why an AI does not know your private or recent information
- Put a short document in the prompt, and say when that stops working
- Build a keyword search that finds the most useful lines of a text
- Add the found lines to the prompt so the AI answers from them (retrieval)
- Explain in plain words what an embedding is and why it finds meaning, not only words
