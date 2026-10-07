---
title: Terminal basics
kind: lesson
minutes: 25
---
Imagine you are at a restaurant. You can point at pictures on the menu. Or you can talk to the waiter: "One tea, no sugar, please." Talking is faster, once you know the words.

The terminal is like talking to the waiter. It can look scary: a black window, a blinking cursor, no buttons. But it does things you already do every day, like opening folders and making new ones. You type instead of click.

## What is the terminal?

Normally you use your computer through a **graphical interface**: windows, icons and a mouse. The **terminal** (also called the command line or shell) lets you give the computer instructions as text.

Developers use the terminal because many tools, including Git, work best there.

## Opening a terminal

- **macOS:** open the **Terminal** app. Press `Cmd + Space`, type "Terminal", press Enter.
- **Windows:** use **Git Bash**, which you installed with Git in week 0. Open the Start menu and search for "Git Bash". It understands the same commands as the Mac terminal. So the examples in this course work on both.
- **VS Code (both):** open the menu **Terminal → New Terminal**. On Windows, you can choose Git Bash from the small dropdown arrow next to the `+` button.

You will see a **prompt**, like this. It waits for you to type:

```bash
amina@laptop:~$
```

The `$` means "ready". When you see a command in this course, type only the part after the `$`. Then press **Enter**.

## Where am I? `pwd`

In the terminal, you always "stand" inside one folder. Folders are also called **directories**. The command `pwd` (**p**rint **w**orking **d**irectory) tells you where you are:

```bash
pwd
```

You might see:

```bash
/Users/amina
```

Or on Windows Git Bash:

```bash
/c/Users/amina
```

This is your **home folder**. The `~` symbol is a shortcut for it.

## What is here? `ls`

`ls` (**l**i**s**t) shows the files and folders in the current folder:

```bash
ls
```

```bash
Desktop    Documents    Downloads    Music    Pictures
```

## Moving around: `cd`

`cd` (**c**hange **d**irectory) moves you into another folder. It is like double-clicking a folder:

```bash
cd Documents
pwd
```

```bash
/Users/amina/Documents
```

Some shortcuts:

```bash
cd ..        # go up one level, to the parent folder
cd ~         # go back to your home folder
cd           # (with nothing after it) also goes home
```

The `#` and the text after it are **comments**. They are notes for you. Do not type them.

> 💡 **Tip:** Press the **Tab** key to finish folder and file names for you. Type `cd Doc` and press Tab. The terminal fills in `Documents/`. This saves time and avoids typing mistakes.

## Making a folder: `mkdir`

`mkdir` (**m**a**k**e **dir**ectory) creates a new folder:

```bash
mkdir firstlight-projects
ls
```

Now `firstlight-projects` appears in the list.

> ⚠️ **Watch out:** Spaces in names cause trouble in the terminal. A space separates the parts of a command. Use dashes instead: `my-website`, not `my website`. If a folder already has a space, put the name in quotes: `cd "My Documents"`.

## Paths: addresses for files

A **path** is the address of a file or folder.

- An **absolute path** starts from the very top, like a full postal address: `/Users/amina/Documents/firstlight-projects`
- A **relative path** starts from where you are now, like saying "next door": `firstlight-projects` or `../Downloads`

You can `cd` through several folders at once:

```bash
cd ~/Documents/firstlight-projects
```

## Opening things from the terminal

If you set up VS Code's command line tool in week 0, you can open the current folder in VS Code:

```bash
code .
```

The `.` means "this folder, right here". If that does not work, open the folder from VS Code's **File → Open Folder** menu.

## A few more useful tricks

- Press the **Up arrow** to bring back the last command you typed. Press it again to go further back.
- Type `clear` to clean up a messy screen.
- If something seems stuck, press `Ctrl + C` to stop it. This is safe.
- If you see a strange screen with many `~` symbols down the side, you are probably in a text viewer. Press `q` to quit.

> 🧠 **Remember:** The terminal does exactly what you tell it. Read each command before you press Enter. The commands in this lesson are safe. They only look around and make new folders.

## Try it

Open your terminal. Type each command below. After each step, use `pwd` and `ls` to check where you are.

```bash
cd ~
mkdir firstlight-practice
cd firstlight-practice
mkdir week-5
ls
cd week-5
pwd
cd ..
cd ..
pwd
```

Before you run the last `pwd`, guess: which folder will it show?

Now challenge yourself:

1. Make a folder called `projects` inside `firstlight-practice`.
2. Move into `projects` with one `cd` command from your home folder.
3. Open your landing page folder from week 4 in the terminal. Run `ls` to see your files.

<details><summary>Show answers</summary>

The last `pwd` shows your home folder, for example `/Users/amina`. The first `cd ..` took you from `week-5` up to `firstlight-practice`. The second took you up to your home folder.

1. `cd ~/firstlight-practice` then `mkdir projects`.
2. `cd ~/firstlight-practice/projects`
3. Use `cd` with the path to your folder, then `ls`.

</details>

## Check your understanding

1. Which command tells you what folder you are in?
2. What does `cd ..` do?
3. How would you create a folder called `portfolio`?
4. Why should you avoid spaces in folder names?
5. What does the Tab key do in the terminal?

<details><summary>Show answers</summary>

1. `pwd`.
2. It moves you up one level, into the parent folder.
3. `mkdir portfolio`.
4. The terminal uses spaces to separate parts of a command, so a space in a name can be misunderstood. Use dashes instead, or put the name in quotes.
5. It finishes file and folder names for you.

</details>

## Go deeper

- [MDN: Command line crash course](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line)
- [freeCodeCamp: Command line for beginners](https://www.freecodecamp.org/news/command-line-for-beginners/)
- [The Odin Project: Command line basics](https://www.theodinproject.com/lessons/foundations-command-line-basics)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can open a terminal (Terminal, Git Bash or VS Code).
- Learners can use `pwd`, `ls`, `cd` and `mkdir` to move around and make folders.
- Learners can tell an absolute path from a relative path.

### Purpose
Git is used from the terminal, so learners must feel safe there first. Fear of the terminal is the main barrier this week.

### Things to teach
1. **What the terminal is.** Say it is just typing instead of clicking. Learners open their own (Git Bash on Windows). Say that the commands in this lesson only look around and make folders.
2. **Where am I and what is here.** Run `pwd` and `ls` from the home folder. Explain that `~` means home.
3. **Moving.** Use `cd Documents`, `cd ..` and `cd ~`. Show the Tab key finishing names.
4. **Making folders.** Run `mkdir firstlight-practice`. Explain why we use dashes, not spaces.
5. **Paths.** Compare an absolute path with a relative one such as `../Downloads`. Do the Try it sequence and ask learners to guess the last `pwd`.

### Check understanding
- Ask: "Which command shows what folder you are in?" A good answer: `pwd`.
- Ask: "What does `cd ..` do?" A good answer: moves up to the parent folder.
- Ask: "Why avoid spaces in folder names?" A good answer: a space separates parts of a command.

### Watch for
- Typing the `$` or the `#` comment text. Tell them to type only the command.
- Being lost in the wrong folder. Tell them to run `pwd` first, and `cd ~` to start again.
