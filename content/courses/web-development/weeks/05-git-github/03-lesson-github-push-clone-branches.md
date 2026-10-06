---
title: GitHub, pushing, branches and pull requests
kind: lesson
minutes: 35
---
Git keeps save points on *your* computer. But what if your laptop breaks? What if you want to share your work with a teammate? That is where GitHub helps.

After this lesson, your work is backed up online. You can also try ideas safely and share them for review.

## Git vs GitHub

These names sound alike, but they are different things:

- **Git** is the tool on your computer that makes save points (commits).
- **GitHub** is a website that stores copies of Git repositories online.

Git is like the camera on your phone. It takes the photos. GitHub is like a cloud photo album. You back up your photos there and share albums with other people.

The copy of your repository on GitHub is called a **remote**. The copy on your computer is called the **local** repository.

```text
   Your computer (local)                  GitHub (remote)
 ┌────────────────────────┐   git push   ┌────────────────────────┐
 │  my-landing-page       │ ───────────▶ │  my-landing-page       │
 │  (commits A, B, C)     │              │  (commits A, B, C)     │
 │                        │ ◀─────────── │                        │
 └────────────────────────┘   git pull   └────────────────────────┘
```

## Create a GitHub account

If you do not have one yet, sign up for free at [github.com](https://github.com). Choose a professional username. It appears in your website's address, and employers may see it. `aminayusuf` is better than `coolcat99`.

## Create a repository on GitHub

1. Sign in. Click the **+** in the top right corner, then **New repository**.
2. Give it a **name**, for example `git-practice`. Use dashes, not spaces.
3. Leave it **Public** (needed for free GitHub Pages later).
4. Do **not** tick "Add a README file" for now. We connect an existing project, so the repository must start empty.
5. Click **Create repository**.

GitHub then shows a page with some commands. Keep it open.

## Connect your local repo and push

In your terminal, go to your `git-practice` folder from the last lesson. Copy the repository's address from GitHub (it ends in `.git`). Then connect it:

```bash
git remote add origin https://github.com/your-username/git-practice.git
```

- `git remote add` means "add a remote copy".
- `origin` is the nickname for it. Almost everyone uses `origin`.
- The address tells Git where it lives.

Now **push** (upload) your commits:

```bash
git push -u origin main
```

`-u` tells Git to remember that your `main` branch goes to `origin`. After this first time, you can type `git push` alone.

Refresh the GitHub page. Your files and your commits are there!

> ⚠️ **Watch out:** The first time you push, GitHub must check who you are. On Windows, a window usually opens and asks you to sign in with your browser. If the terminal asks for a **password**, your normal GitHub password will not work. The best fix is to install the [GitHub CLI](https://cli.github.com/) and run `gh auth login`. Choose **HTTPS**, and say **yes** when it asks to log in Git. Then try `git push` again. Ask a volunteer if you get stuck. Everyone has trouble with this step the first time.

## The everyday loop, now with push

```bash
git status
git add .
git commit -m "Describe what you changed"
git push
```

Commit as often as you like. Push when you want to back up or share your work. Push at least at the end of every session.

## Clone: get a copy of a repository

**Cloning** downloads a whole repository, with all its history, to your computer. You clone when you start work on a project that already exists on GitHub. You also clone when you change computers.

On the repository's GitHub page, click the green **Code** button and copy the HTTPS address. Then:

```bash
cd ~/firstlight-practice
git clone https://github.com/your-username/git-practice.git git-practice-copy
cd git-practice-copy
ls
```

The last part, `git-practice-copy`, is optional. It is the name of the new folder. Without it, Git uses the repository's name.

Someone else (or you, on another computer) may push new commits. Download them with:

```bash
git pull
```

## Branches: a safe place to experiment

So far all your commits have gone on a **branch** called `main`. Think of `main` as the "official" version of your project.

A **new branch** is like a photocopy of a document. You can scribble on the copy and leave the original clean. If you like the result, you bring the changes back into `main`. If not, you throw the copy away.

```text
main:        A ─── B ─────────────── E   (merge)
                    \               /
new-footer:          C ─────── D ──
```

Commits C and D happen on the `new-footer` branch. Meanwhile `main` stays safe. When the footer is ready, it is **merged** back into `main` (E).

The picture stops being true in one way. Git does not copy all your files into a new folder. A branch is a light label that points to a commit.

Create a branch and switch to it in the terminal:

```bash
git switch -c new-footer   # create a branch and switch to it
# ...edit files, then:
git add .
git commit -m "Add footer with opening hours"
git push -u origin new-footer
```

To go back to `main`:

```bash
git switch main
```

> 🧠 **Remember:** `git status` always tells you which branch you are on. Check it before you start working.

## Pull requests: asking to merge

On a team, you do not usually merge your own branch into `main` directly. You open a **pull request** (PR) on GitHub. A PR says: "Here are my changes on this branch. Please review them and pull them into `main`."

It is like giving your essay to a friend to check before you hand it in. They read it, leave comments and suggest changes. When everyone is happy, someone clicks **Merge**.

The workflow:

```text
 1. git switch -c my-change      (make a branch)
 2. edit, add, commit            (do the work)
 3. git push -u origin my-change (upload the branch)
 4. Open a pull request on GitHub
 5. Someone reviews and comments
 6. Click "Merge pull request"   (changes join main)
 7. git switch main
    git pull                     (get the merged main locally)
```

After you push a new branch, GitHub usually shows a yellow banner with a **Compare & pull request** button. Click it. Write a short title and description of what you changed. Click **Create pull request**.

You will use pull requests more when you work in teams later in the course. For your own small projects, it is fine to commit directly to `main`.

## Try it

1. Create an empty repository called `git-practice` on GitHub and push your practice repo to it.
2. Make a branch called `add-about`. Add an `about.html` page, commit it, and push the branch.
3. On GitHub, open a pull request from `add-about` into `main`. Read the "Files changed" tab. Then merge it.
4. Back in the terminal, run `git switch main` and `git pull`. Run `ls`. Is `about.html` there?
5. Clone your repository into a new folder. Check that `git log --oneline` shows all your commits.

## Check your understanding

1. What is the difference between Git and GitHub?
2. What does `git push` do? What does `git pull` do?
3. When would you use `git clone`?
4. Why might you make a new branch instead of working on `main`?
5. What is a pull request?

<details><summary>Show answers</summary>

1. Git is a tool on your computer for making save points (commits). GitHub is a website that stores Git repositories online so you can back them up, share them and work with others.
2. `git push` uploads your local commits to the remote (GitHub). `git pull` downloads new commits from the remote to your computer.
3. When you want a copy of a repository that is on GitHub, for example a project you are joining, or your own project on a new computer.
4. To try out a change safely without affecting the working version. If it works, you merge it. If not, you can delete the branch.
5. A request on GitHub to merge the changes from one branch into another (usually `main`), so others can review and discuss them first.

</details>

## Go deeper

- [GitHub Docs: Hello World (branches and pull requests)](https://docs.github.com/en/get-started/start-your-journey/hello-world)
- [MDN: Git and GitHub](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/GitHub)
- [freeCodeCamp: Git and GitHub for beginners](https://www.freecodecamp.org/news/git-and-github-for-beginners/)
- [Learn Git Branching (interactive)](https://learngitbranching.js.org/)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
