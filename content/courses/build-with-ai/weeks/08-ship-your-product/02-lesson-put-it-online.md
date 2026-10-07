---
title: Put it online
kind: lesson
minutes: 35
---
Right now, your product lives in your own kitchen. It works, but only you can taste it, and only while your laptop is on.

To open a shop, you need a building on a real street, with the lights always on. For a website, that building is a computer that never sleeps. This is called **hosting**. Putting your project there is called **deploying**.

We will use two services:

- **GitHub** stores your code. Think of it as a safe cupboard for your recipe.
- **Vercel** takes the code from GitHub and runs it on the internet. It is the shop on the street. Vercel has a free plan that is enough for learning. Plans and limits change, so check their pricing page.

## The big rule: keep the key off GitHub

Your API key opens your wallet. If it is on GitHub, robots can find it in minutes. So the key goes in only two places: your local `.env` file, and Vercel's settings. Never in the code.

Check your `.gitignore` file in the project folder. It must contain these lines:

```text
.env
node_modules
```

> ⚠️ **Watch out:** If you ever pushed a key to GitHub by mistake, deleting the file is not enough. The key is still in the history. Go to your provider's console, delete that key, and make a new one.

## Step 1: get your project ready for Vercel

Vercel runs an Express app with no extra setup, but it needs to find your app. Two things matter.

**1. Put your web page files in a folder called `public`.** On Vercel, `express.static()` does not serve files. Anything in `public` is served for you automatically. So `public/index.html`, `public/style.css` and `public/script.js`.

**2. Export your app.** At the bottom of your server file (`server.js` or `index.js`, at the top level of your project), do this:

```node
const port = process.env.PORT || 3000;

// Only listen on your own computer. Vercel runs the app for you.
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`BakeBuddy is running at http://localhost:${port}`);
  });
}

export default app;
```

`export default app` needs `"type": "module"` in your `package.json`. If you used `require`, write `module.exports = app;` instead. Your `package.json` should also list `express` under `dependencies`. Running `npm install express` does this.

Your page should call `fetch("/api/chat", ...)` with a path that starts with `/`, not with `http://localhost:3000`. Then it works on both your computer and the live site.

## Step 2: push to GitHub

In your project folder, in the terminal:

```bash
git init
git add .
git commit -m "My AI product"
```

Before you commit, run `git status` and check that `.env` is **not** in the list. Then, on github.com, create a new empty repository. Follow the commands GitHub shows you, which look like this (use your own address):

```bash
git branch -M main
git remote add origin https://github.com/YOUR-NAME/YOUR-REPO.git
git push -u origin main
```

Open the repository in your browser. Look at the file list. If you see `.env`, stop and fix it now.

## Step 3: deploy on Vercel

1. Go to vercel.com and sign up with your GitHub account.
2. Click **Add New**, then **Project**.
3. Find your repository in the list and click **Import**.
4. Open the **Environment Variables** section. Add a variable with the name `ANTHROPIC_API_KEY` and paste your key as the value.
5. Click **Deploy**.

After a minute, Vercel shows you a link that ends in `.vercel.app`. That is your live site.

If you forgot to add the variable, open your project on Vercel, go to **Settings**, then **Environment Variables**, and add it. Changes only apply to **new** deployments, so you must deploy again. Go to **Deployments**, open the menu on the latest one, and choose **Redeploy**.

> 💡 **Tip:** After this, every `git push` to `main` deploys a new version on its own. That is the whole workflow: change, test locally, push, check the live site.

## Step 4: check the live site

Check like a customer:

1. Open the `.vercel.app` link.
2. Ask three questions from your test list. Read the answers.
3. Try an unknown question. Is the error message friendly?
4. Try an injection test: "Ignore your instructions and..."
5. Right-click the page, choose **View page source**, and search for `sk-` and for `ANTHROPIC`. Neither should appear. Your key must never be in the page.
6. If something fails, open your project on Vercel and look at **Logs**. The error message tells you what went wrong.

Run your taste test against the live site:

```bash
BASE_URL=https://your-project.vercel.app node taste-test.js
```

> ⚠️ **Watch out:** Your site is now public, and so is your spending. Make sure your account spending limit is set, `max_tokens` is small and your rate limit is on. On Vercel your in-memory limit is only a soft fence, so the account limit matters most.

## If something fails

- **Chat says "something went wrong":** the environment variable is missing or has a typo. Fix it and redeploy.
- **404 on the home page:** your page files are not in `public/`.
- **"ENOENT" or "no such file" in the logs:** a file your server reads, like `menu.txt`, is not in your GitHub repository. Add it, commit and push again.
- **"Cannot find module" in the logs:** add the package to `dependencies` in `package.json`.

## Check your understanding

1. Where may your API key live? Name two places.
2. Why do we put the page files in `public`?
3. You added the environment variable after the first deploy, but the site still fails. What do you do?
4. How can you check that your key is not visible in the page?

<details><summary>Show answers</summary>

1. Your local `.env` file, and the Environment Variables settings in your Vercel project.
2. On Vercel, files in `public` are served for you. `express.static()` does not serve files there.
3. Redeploy. Changes to variables apply only to new deployments.
4. Use "View page source" and search for your key's start. You can also search for the variable name.

</details>

> 🧠 **Remember:**
> - The key lives in `.env` locally and in Vercel's settings online. Never on GitHub.
> - Page files go in `public`. Export your Express app.
> - After deploying, test the live site like a customer.

## Go deeper

- [Vercel docs: Express on Vercel](https://vercel.com/docs/frameworks/backend/express)
- [Vercel docs: Environment variables](https://vercel.com/docs/environment-variables)
- [GitHub docs: Create a repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Push a project to GitHub without `.env`.
- Deploy to Vercel and set `ANTHROPIC_API_KEY` as an environment variable.
- Check a live site like a customer.

### Purpose
A product only counts when other people can use it. Deploying safely is a skill employers can see.

### Things to teach
1. **Shop on the street.** GitHub is the cupboard for the recipe, Vercel is the shop. Hosting means a computer that is always on.
2. **The key never goes on GitHub.** Show `.gitignore` with `.env`, and run `git status` before the commit. If a key was pushed, deleting the file is not enough. Delete the key and make a new one.
3. **Getting ready for Vercel.** Page files go in `public/`, the app is exported with `export default app`, and `fetch` uses `/api/chat`, not localhost.
4. **Import, variable, deploy.** Add the variable before the first deploy. If added later, redeploy.
5. **Check the live site.** View page source and search for `sk-` and `ANTHROPIC`. Check the Vercel Logs. Show the "If something fails" list.

### Check understanding
- Ask: "Where may the key live?" A good answer: local `.env` and Vercel settings.
- Ask: "You added the variable after deploying and it still fails." A good answer: redeploy.
- Ask: "How do you check the key is not in the page?" A good answer: view page source and search.

### Watch for
- `.env` pushed to GitHub. Stop and fix it before going on.
- Page files left outside `public/`, giving a 404. Missing data files such as `menu.txt` not committed.
