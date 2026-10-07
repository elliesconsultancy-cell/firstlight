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

## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: Why AI doesn't know your stuff
- [ ] Read: The open-book exam (retrieval)
- [ ] Read: Embeddings, a map of meaning

**Do**
- [ ] Write `menu.txt` with at least 12 lines of facts
- [ ] Add `knowledge.js` and update `prompt.js` and `server.js`
- [ ] Run the toy embeddings map and add the "Iced tea" item
- [ ] Finish the assignment: BakeBuddy knows the menu

**Share**
- [ ] Submit your work and read your instructor's feedback

<!-- instructor -->
## Day plan

### Learning objectives
- Explain why a model does not know private or new facts
- Paste a short document into the prompt, and say when that stops working
- Build keyword retrieval and add the found lines to the prompt
- Explain an embedding as a map of meaning

### Purpose
A chatbot that guesses is a risk. This week gives BakeBuddy real facts and the habit of saying "I do not know". It builds on the week 4 server. Later weeks assume learners can feed their own information to the model.

### Agenda
1. **Why AI doesn't know your stuff.** Teach the keen intern and the desk. Learners see the failure, then put `menu.txt` in the prompt.
2. **The open-book exam (retrieval).** Teach find, stuff, answer, and that the code does the search. Learners run the playground search and wire `knowledge.js` into the server.
3. **Embeddings, a map of meaning.** Teach the map and the toy example. Learners run the toy code and try the changes.
4. **BakeBuddy knows the menu.** Launch it, show how to print `found`, then check each test table and the repository for keys.

## End of sprint review

Tick each one when you have seen it.

- [ ] Every learner has seen BakeBuddy fail without the menu and answer correctly with it.
- [ ] Every learner's `menu.txt` has 12 or more lines, including hours and an allergy note.
- [ ] Every learner can run `retrieve` and show the right line for a menu question.
- [ ] BakeBuddy says it does not know for a question the menu cannot answer, for example pizza.
- [ ] Every README has a test table with six or more questions and notes on what failed.
- [ ] No key or private customer data is in any repository.
- [ ] Every learner can explain the open-book exam and the map of meaning in their own words.
- [ ] Every learner has had feedback on the assignment.
