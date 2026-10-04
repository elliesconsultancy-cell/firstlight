---
title: Publish your landing page
kind: assignment
submission: any
---
## What you'll build

Last week you built a responsive landing page for a fictional local business. This week you will put it under version control with Git, store it on GitHub, and publish it on GitHub Pages so anyone can visit it.

When you finish, you will have two links to share: one to your **code** and one to your **live website**. These are the first pieces of your developer portfolio.

## Requirements

- [ ] Your landing page project folder is a Git repository (`git init`)
- [ ] The repository is on GitHub, is **public**, and has a clear name (for example `bakery-landing-page`)
- [ ] There are **at least 5 meaningful commits**, each with a clear message that describes the change
- [ ] `index.html` is at the top level of the repository, and all paths to CSS and images are relative
- [ ] GitHub Pages is turned on and the live site works, including styles and images
- [ ] The live site works on a phone (open the link on your own phone, or check with the DevTools device toolbar)
- [ ] The live link is added to the repository's **About** section
- [ ] No real personal details (home address, personal phone number) are in the site or code

## Steps and hints

### Getting at least 5 meaningful commits

You probably have a finished page already. That is fine. Here are two honest ways to build up a good history:

**Option A – commit as you improve.** Commit what you have now as your first commit, then keep improving the page in small steps, committing each one:

```bash
git init
git add .
git commit -m "Add landing page from week 4"
```

Then, for example:

1. `Add alt text to all images`
2. `Fix sideways scrolling on small screens`
3. `Add hover and focus styles to call-to-action button`
4. `Add opening hours to footer`
5. `Add README with project description`

**Option B – rebuild in stages.** Start a new folder and copy your work in section by section (HTML structure, header, services, about, footer, styles), committing after each one.

> 💡 **Tip:** A meaningful commit does one clear thing, and its message says what. "Update" or "changes" is not meaningful. "Add services grid with three cards" is.

### Pushing to GitHub

1. Create a new, empty, public repository on GitHub (do not add a README there).
2. Connect it and push:

```bash
git remote add origin https://github.com/your-username/bakery-landing-page.git
git push -u origin main
```

3. Refresh GitHub and check your files and commits are there.

### Adding a README

A `README.md` file appears on your repository's front page. Create one with a few lines:

```text
# Crumbs Bakery landing page

A responsive landing page for a fictional bakery, built with HTML and CSS
(Flexbox and Grid) during the Firstlight web development course.

Live site: https://your-username.github.io/bakery-landing-page/
```

Commit and push it. That can be one of your 5 commits.

### Publishing

1. Go to **Settings → Pages**.
2. Choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and click **Save**.
3. Wait for the green tick in the **Actions** tab, then open your live link.
4. Check every section, every image and every link. Test on a phone.

> ⚠️ **Watch out:** If styles or images are missing on the live site but work on your computer, check capital letters in file names and paths. GitHub Pages treats `Logo.png` and `logo.png` as different files.

## How to submit

In the submit form:

- **Link:** paste your **live GitHub Pages link** (for example `https://your-username.github.io/bakery-landing-page/`).
- **Written answer:** paste your **repository link** (for example `https://github.com/your-username/bakery-landing-page`), and in one or two sentences tell us which part of using Git or GitHub was most confusing, and how you got past it.

Before you submit, open both links in a private/incognito browser window to make sure they work for other people, not just for you.

## Stretch goals

- Make one improvement on a **branch**, open a **pull request** on GitHub, and merge it yourself
- Ask a classmate to review your pull request and leave a comment
- Publish your styled "About Me" page from week 3 in a second repository, and link to it from your landing page
- Add a custom social preview image in **Settings → General → Social preview**
- Clone your repository onto another computer (or another folder), make a change, push it, then `git pull` in your original folder

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
