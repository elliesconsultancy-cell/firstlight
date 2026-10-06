---
title: API keys and secrets
kind: lesson
minutes: 25
---
Amina has a key to her bakery. With it she opens the door, the till and the flour store. Would she tape a copy of that key to the shop window? Of course not. Anyone could take it and walk in.

An **API key** is like that key. But it is worse than a bakery key, because it also opens your **wallet**. Every time someone uses your key, you pay. In this lesson you will learn to keep your key safe from the first minute.

## What is an API key?

An **API key** is a long secret text. You send it with every request. The AI company reads it and knows two things: who is asking, and whom to charge.

A key often looks like a very long random word. Anthropic keys usually start with `sk-ant-`. Yours will be different from anyone else's.

> ⚠️ **Watch out:** If someone else gets your key, they can use the AI and you pay the bill. Treat it like a password and a bank card in one.

## Set up your account safely

Do these steps before you write any code.

1. Create an account in the **Claude Console** (the website of the API, at platform.claude.com).
2. Add a small amount of credit, if the Console asks for payment. Start small.
3. Find the billing or limits settings and set a **spend limit** (a maximum you allow yourself to spend each month). Menus change, so look around or check the docs. Choose a small number you are happy to lose.
4. Open the API keys page and create a key. Give it a clear name, like `learning-bakebuddy`.
5. Copy the key once and keep it somewhere private for now. You will put it in a file in a minute.

If you reach the limit you set, the API refuses your requests until you raise the limit. This is what you want. A wall is better than a surprise bill.

> 💡 **Tip:** Prices change over time. Check the pricing page of the provider before you build anything big.

## The three safe rules

1. **Never put the key in front-end code.** Anything sent to a browser can be read by anyone with DevTools.
2. **Never put the key in Git.** If you upload it to GitHub, automatic scanners often find it very fast.
3. **Never paste the key into a chat, a forum or a screenshot.**

Where does the key live, then? In an **environment variable**: a named value that belongs to your computer, not to your code. Your code asks for it by name and never contains it.

## The .env file

A `.env` file is a small text file that holds environment variables, one per line. It stays on your computer.

Create a folder for BakeBuddy, and make these files in it. In the terminal:

```bash
mkdir bakebuddy
cd bakebuddy
npm init -y
npm pkg set type=module
```

The last command tells Node that your files use modern `import` and `await` features.

Now make a file called `.env`. Put one line in it, with your real key in place of the example text:

```text
ANTHROPIC_API_KEY=paste-your-key-here
```

There are no quotes and no spaces around the `=`.

Next, make a file called `.gitignore`. It tells Git which files to never upload:

```text
node_modules
.env
```

Do this **before** your first `git add`. If Git has already seen your key, the key is no longer secret, even after you delete it.

## Use the key in code

Node 20 or newer can read a `.env` file for you. You do not need an extra package. You add one flag when you run your script:

```bash
node --env-file=.env check-key.js
```

Inside the script, the key is in `process.env.ANTHROPIC_API_KEY`. Here is a safe script that checks the key is loaded, without ever printing it:

```node
const key = process.env.ANTHROPIC_API_KEY;

if (!key) {
  console.log("No key found. Is your .env file in this folder?");
} else {
  console.log("Key found. It has", key.length, "characters.");
}
```

Run it. If you see "No key found", check three things: the file is named exactly `.env`, you are in the right folder, and you used `--env-file=.env`.

### Try it

1. Run the script once with the flag and once without. What is different?
2. Why does the script print the length of the key and not the key itself?

<details><summary>Show answers</summary>

1. With the flag, the key is found. Without it, the variable is empty, so you see the "No key found" message.
2. Printing the key would copy it into your terminal history and maybe into a screenshot. The length is enough to prove it loaded.

</details>

## If your key leaks

Mistakes happen. If you think someone has seen your key:

1. Open the Console and **delete (revoke) the key** right away.
2. Create a new key and put it in `.env`.
3. Look at your usage page for strange activity.

A deleted key is harmless.

## Check your understanding

1. Why is an API key more dangerous than a normal password?
2. Which file keeps the key, and which file keeps that file out of Git?
3. Can you put the key in a JavaScript file that runs in the browser? Why?
4. What does `node --env-file=.env script.js` do?

<details><summary>Show answers</summary>

1. It also spends your money. Anyone using it makes you pay.
2. `.env` holds the key. `.gitignore` lists `.env` so Git never uploads it.
3. No. Browser code can be read by anyone, so the key would be public.
4. It loads the lines of `.env` as environment variables, then runs your script. The script reads them from `process.env`.

</details>

> 🧠 **Remember:** Your key opens your wallet. Keep it in `.env`, list `.env` in `.gitignore`, set a spend limit, and delete the key at once if it leaks.

## Go deeper

- [Node.js: command-line options (--env-file)](https://nodejs.org/api/cli.html)
- [Claude docs: rate limits and spend limits](https://platform.claude.com/docs/en/api/rate-limits)
- [GitHub Docs: ignoring files](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files)
