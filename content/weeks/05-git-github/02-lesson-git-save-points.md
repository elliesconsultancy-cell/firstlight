---
title: Git and save points
kind: lesson
minutes: 30
---
Have you ever had files called `essay-final.docx`, `essay-final-v2.docx` and `essay-final-REALLY-final.docx`? Git solves that problem properly, and it is one of the most important tools a developer learns.

## What is version control?

**Version control** is a system that remembers the history of your project. Every time you reach a good moment, you save a snapshot. Later you can look back at any snapshot, see what changed, and go back if you need to.

Think of a video game. Before a hard level, you reach a **save point**. If things go badly, you do not start the whole game again. You go back to your last save point. Git gives you save points for your code.

**Git** is the most popular version control tool in the world. It runs on your computer, in the terminal.

## Check Git is ready

You installed Git in week 0. Check it works:

```bash
git --version
```

You should see something like `git version 2.46.0`. The exact number does not matter.

If you have never used Git on this computer, tell it your name and email. Git adds these to every save point, so people know who made it. Use the same email you use (or will use) for GitHub:

```bash
git config --global user.name "Amina Yusuf"
git config --global user.email "amina@example.com"
git config --global init.defaultBranch main
```

You only need to do this once per computer.

## Step 1: `git init` – start tracking a folder

Move into your project folder and turn it into a Git **repository** (or "repo"). A repository is just a folder that Git is watching.

```bash
cd ~/firstlight-practice
mkdir git-practice
cd git-practice
git init
```

```bash
Initialized empty Git repository in /Users/amina/firstlight-practice/git-practice/.git/
```

Git creates a hidden folder called `.git`. This is where it keeps all the history. Do not edit or delete it.

> ⚠️ **Watch out:** Only run `git init` inside your project folder, never in your home folder. If you run it in the wrong place by accident, ask a volunteer for help.

## Step 2: `git status` – what is going on?

`git status` is the command you will use most. It tells you what Git can see:

```bash
git status
```

```bash
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

Now create a file. Open the folder in VS Code (`code .`) and make `index.html` with a heading inside, then save it. Run `git status` again:

```bash
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	index.html
```

"Untracked" means Git sees the file but is not saving its history yet.

## Step 3: `git add` – choose what to save

Saving in Git has two steps. First you **stage** the changes you want to include. It is like putting items into a box before you seal it.

```bash
git add index.html
```

To add every changed file in the folder at once, use a dot:

```bash
git add .
```

Run `git status` again. The file is now listed under "Changes to be committed", often in green.

## Step 4: `git commit` – make the save point

A **commit** is the save point itself. It seals the box and puts a label on it. The label is a **commit message** that describes what you did:

```bash
git commit -m "Add homepage with main heading"
```

```bash
[main (root-commit) 3f2a9c1] Add homepage with main heading
 1 file changed, 1 insertion(+)
 create mode 100644 index.html
```

Here is the whole cycle as a picture:

```text
  You edit files        git add            git commit
 ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
 │   Working    │ ─▶ │   Staging    │ ─▶ │   History    │
 │    folder    │    │    area      │    │  (commits)   │
 └──────────────┘    └──────────────┘    └──────────────┘
   "changed"         "in the box"        "saved forever"
```

## Writing good commit messages

Your commit messages are notes to your future self and to your teammates. A good message says **what** changed, in a short sentence.

| Not helpful | Helpful |
| --- | --- |
| `stuff` | `Add contact section with opening hours` |
| `fixed it` | `Fix nav links overlapping logo on mobile` |
| `asdf` | `Change colour palette to warmer tones` |

> 💡 **Tip:** A good habit is to write messages that finish the sentence "This commit will...", for example "Add services grid". Keep the first line under about 50 characters.

## How often should you commit?

Commit whenever you finish a small piece of work that makes sense on its own: you added a section, fixed a bug, or finished styling the header. Small, frequent commits are much better than one huge commit at the end of the day. If something breaks, small commits make it easy to find out when.

## Step 5: `git log` – see the history

```bash
git log --oneline
```

```bash
a81d4e2 (HEAD -> main) Style the header with flexbox
7c03b5f Add services section
3f2a9c1 Add homepage with main heading
```

Each line is one commit. The code at the start (like `3f2a9c1`) is that commit's unique ID. The newest commit is at the top. Without `--oneline`, `git log` shows more detail, including the author and date. Press `q` to exit if the log fills the screen.

> 🧠 **Remember:** The everyday loop is: **edit → `git status` → `git add .` → `git commit -m "message"`**. Run `git status` whenever you are unsure.

### Try it

In your `git-practice` folder:

1. Create `index.html` with a heading. Stage and commit it with a clear message.
2. Create `styles.css` with one rule. Link it from `index.html`. Commit both changes together.
3. Change the heading text. Run `git status` and then `git diff` to see exactly what changed. Commit it.
4. Run `git log --oneline`. You should see three commits.

```bash
git status
git add .
git commit -m "Add stylesheet and link it to homepage"
git log --oneline
```

## Check your understanding

1. In your own words, what is version control?
2. What does `git init` do?
3. What is the difference between `git add` and `git commit`?
4. Which command shows you which files have changed?
5. Write a good commit message for adding an "About us" section.

<details><summary>Show answers</summary>

1. A system that keeps a history of your project as a series of snapshots (save points), so you can see what changed and go back if needed.
2. It turns the current folder into a Git repository, so Git starts tracking it. It creates a hidden `.git` folder.
3. `git add` stages changes (puts them in the box). `git commit` saves the staged changes as a permanent snapshot with a message.
4. `git status`.
5. For example: `Add About us section with team photo`.

</details>

## Go deeper

- [MDN: Git and GitHub](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/GitHub)
- [Pro Git book (free online): Git basics](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
- [freeCodeCamp: Git and GitHub for beginners](https://www.freecodecamp.org/news/git-and-github-for-beginners/)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
