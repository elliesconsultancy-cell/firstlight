---
title: BakeBuddy knows the menu
kind: assignment
submission: link
---
## What you'll build

BakeBuddy learns Amina's menu and opening hours. When a customer asks a question, your server finds the best lines of the menu, adds them to the prompt, and BakeBuddy answers from them. When the menu does not say, it admits it does not know.

You may use your own information instead: a gym timetable, a school's rules, a shop's products. You need at least 12 lines of facts.

## Requirements

- [ ] `menu.txt` (or your own file) has at least 12 lines, one fact per line, including opening hours and at least one allergy note
- [ ] `knowledge.js` reads the file and splits it into chunks
- [ ] A `words` function lowercases text, removes punctuation and ignores stop words
- [ ] A `retrieve` function scores each chunk by shared words and returns the top three
- [ ] `server.js` searches with the last two customer messages and adds the found lines to the system prompt
- [ ] The prompt says to use only the notes, and to say "I do not know" otherwise
- [ ] `.env` is in `.gitignore`, and no key is in your repository
- [ ] You wrote a test list of at least six questions with the answer you expect (see step 6)
- [ ] BakeBuddy answered at least four of your six questions correctly, and your README says which ones failed and why

## Steps/hints

1. Create `menu.txt` with one fact per line. Put the product name at the start of each line, so the search finds it.
2. Copy the `knowledge.js` from the lesson. Run `console.log(retrieve("How much is a croissant?"))` in a small test file. Check the right line comes first.
3. Update `prompt.js` so it holds only the personality, and update `server.js` as shown in the lesson.
4. While testing, print what was found in the server terminal:

   ```node
   console.log("Found:", found.map((f) => f.text));
   ```

5. If a good line is not found, check the words. Is the customer's word the same as the word in your file? You can add alternative words to the line, like `Gluten-free almond cake: ... No wheat. Wheat-free.`
6. Write your test list in the README, like this table:

   ```text
   Question                          Expected answer                  Got it right?
   How much is the sourdough?        4.50                             yes
   Are you open on Sunday?           No, closed                       yes
   Do you sell pizza?                I do not know / ask in shop      ...
   ```

7. Include at least one question the menu cannot answer, and one with different words from the menu (like "without wheat"). Write what happened.

> ⚠️ **Watch out:** Never put real customers' private data in your notes file, and never paste secrets into it. Everything in the file can end up in a prompt.

## How to submit

Upload your project to GitHub without `.env`, and paste the link to the repository in the link box. Make sure your `README.md` has the test table and two or three sentences about what keyword search did badly.

## Stretch goals

- Add a toy "synonyms" list, like `"gluten-free": ["wheat-free", "no wheat"]`, and expand the question before searching.
- Give a bonus point to a chunk when two or more question words appear together.
- Show the found lines in the chat page in a small "Sources" box, so customers can check the answer.
