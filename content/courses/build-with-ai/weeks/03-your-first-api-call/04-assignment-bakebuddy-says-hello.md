---
title: BakeBuddy says hello
kind: assignment
submission: link
---
## What you'll build

BakeBuddy's first words. You will write a Node script that sends a customer message to the model, using the system prompt from your week 2 prompt notebook. The script prints the reply and the tokens it used.

You may build for Amina's bakery or for your own idea (a gym, a school, a shop). Pick one and keep it for the whole course.

## Requirements

- [ ] The project folder has a `package.json` with `"type": "module"`
- [ ] A `.gitignore` file lists `.env` and `node_modules`
- [ ] The key is in `.env` as `ANTHROPIC_API_KEY` and is NOT in any file you upload
- [ ] The file `bakebuddy.js` calls `https://api.anthropic.com/v1/messages` with `fetch`
- [ ] The request uses model `claude-haiku-4-5-20251001` and a small `max_tokens` (300 or less)
- [ ] A `system` prompt gives BakeBuddy a name, a job and a tone
- [ ] The customer message comes from the terminal: `node --env-file=.env bakebuddy.js "Do you sell bread?"`
- [ ] The script prints the reply text and the `input_tokens` and `output_tokens`
- [ ] The script checks `response.ok` and prints a clear message when there is an error
- [ ] You tried at least three different customer messages

## Steps/hints

1. Reuse the folder from the lessons. Check that `node --env-file=.env hello.js` still works.
2. Copy `hello.js` to `bakebuddy.js`. Keep the original for later.
3. Read the question from the command line. Node puts it in `process.argv[2]`:

   ```node
   const question = process.argv[2];
   if (!question) {
     console.log('Please add a question, for example: node --env-file=.env bakebuddy.js "Hi!"');
     process.exit(1);
   }
   ```

4. Put your question into the `messages` array in place of the fixed text.
5. Add the `system` field. Start from the best system prompt in your prompt notebook.
6. Print the answer, then print the numbers: `data.usage.input_tokens` and `data.usage.output_tokens`.
7. Break it on purpose. Use a wrong key and check you see a friendly error, not a crash.
8. Try three questions. One should be about something BakeBuddy cannot know yet, like today's special. Notice what it does.

> ⚠️ **Watch out:** Before you upload, open your repository files and check that `.env` is not there. If you pushed a key by mistake, delete the key in the Console right away and make a new one.

## How to submit

Put your project on GitHub, without `.env`, and paste the link to the repository in the link box. Add a `README.md` with the command to run the script, and write two or three lines about what BakeBuddy said when you asked something it could not know.

## Stretch goals

- Print `stop_reason` and warn if it is `max_tokens`.
- Read the system prompt from a separate file called `system-prompt.txt` using `readFile` from `node:fs/promises`.
- Add the cost estimate you made in week 1, using the token counts printed by your script.

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Build a Node script that calls the Messages API with a system prompt
- Take the customer message from the terminal
- Keep the key out of the uploaded repository

### Purpose
Learners prove they can make one safe, working API call. It is the base for the chatbot next week.

### Things to do
1. **Launch.** Ask learners to reuse the lesson folder and check `node --env-file=.env hello.js` still works. Then they copy it to `bakebuddy.js`.
2. **Demonstrate the input.** Show `process.argv[2]` and run `node --env-file=.env bakebuddy.js "Do you sell bread?"`. Show the friendly message when no question is given.
3. **Check the key is safe.** Open the learner's GitHub repository in the browser. Look at the file list: `.env` must NOT be there. Open `.gitignore` and check it lists `.env` and `node_modules`. Search the code for `sk-ant`.
4. **Fail it on purpose.** Use a wrong key and look for a clear error, not a crash. Ask what BakeBuddy said to a question it cannot know, such as today's special.

### What good work looks like
- `package.json` has `"type": "module"`, and `.gitignore` lists `.env` and `node_modules`.
- `bakebuddy.js` calls the Messages API with `fetch`, a small `max_tokens` (300 or less) and a `system` prompt with a name, a job and a tone.
- The question comes from the terminal, and the script prints the reply plus `input_tokens` and `output_tokens`.
- The script checks `response.ok` and prints a clear error message.
- The README has the run command and two or three lines about a question BakeBuddy could not know.

### Watch for
- A key in the repository or in a commit. Ask them to revoke it in the Console and make a new one, even if the file was deleted later.
- A hard-coded question or key in the code, or a missing `await`.
