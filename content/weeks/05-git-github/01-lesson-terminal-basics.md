---
title: Terminal basics
kind: lesson
minutes: 25
---
The terminal can look scary: a black window, a blinking cursor, no buttons. But it is just another way to do things you already do every day, like opening folders and creating new ones, by typing instead of clicking.

## What is the terminal?

Normally you use your computer through a **graphical interface**: windows, icons and a mouse. The **terminal** (also called the command line or shell) lets you give the computer instructions as text.

Think of a restaurant. Using a graphical interface is like pointing at pictures on a menu. Using the terminal is like speaking to the waiter directly: "One tea, no sugar, please." It is faster and more precise once you know the words.

Developers use the terminal because many tools, including Git, work best there.

## Opening a terminal

- **macOS:** open the **Terminal** app (press `Cmd + Space`, type "Terminal", press Enter).
- **Windows:** use **Git Bash**, which you installed with Git in week 0. Open the Start menu and search for "Git Bash". Git Bash understands the same commands as the Mac terminal, so the examples in this course work on both.
- **VS Code (both):** open the menu **Terminal → New Terminal**. On Windows, you can choose Git Bash from the small dropdown arrow next to the `+` button.

You will see a **prompt**, something like this. It is waiting for you to type:

```bash
amina@laptop:~$
```

The `$` means "ready". In this course, when you see a command, type only the part after the `$`, then press **Enter**.

## Where am I? `pwd`

In the terminal, you are always "standing" inside one folder. Folders are also called **directories**. The command `pwd` (**p**rint **w**orking **d**irectory) tells you where you are:

```bash
pwd
```

You might see:

```bash
/Users/amina
```

or on Windows Git Bash:

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

Some useful shortcuts:

```bash
cd ..        # go up one level, to the parent folder
cd ~         # go back to your home folder
cd           # (with nothing after it) also goes home
```

The `#` and the text after it are **comments**, notes for you. You do not need to type them.

> 💡 **Tip:** Press the **Tab** key to auto-complete folder and file names. Type `cd Doc` and press Tab, and the terminal fills in `Documents/`. This saves time and avoids typos.

## Making a folder: `mkdir`

`mkdir` (**m**a**k**e **dir**ectory) creates a new folder:

```bash
mkdir firstlight-projects
ls
```

Now `firstlight-projects` appears in the list.

> ⚠️ **Watch out:** Spaces in names cause trouble in the terminal, because a space separates parts of a command. Use dashes instead: `my-website`, not `my website`. If a folder already has a space, wrap the name in quotes: `cd "My Documents"`.

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

The `.` means "this folder, right here". If that does not work, you can always open the folder from VS Code's **File → Open Folder** menu.

## A few more handy tricks

- Press the **Up arrow** to bring back the last command you typed. Keep pressing to go further back.
- Type `clear` to clean up a messy screen.
- If something seems stuck, press `Ctrl + C` to stop it. This is safe.
- If you are in a strange screen with lots of `~` symbols down the side, you are probably in a text viewer. Press `q` to quit.

> 🧠 **Remember:** The terminal does exactly what you tell it, so read commands carefully before pressing Enter. The commands in this lesson are all safe. They only look around and create things.

### Try it

Open your terminal and do the following. After each step, use `pwd` and `ls` to check where you are.

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

Now challenge yourself:

1. Make a folder called `projects` inside `firstlight-practice`.
2. Move into `projects` using one single `cd` command from your home folder.
3. Open your landing page folder from week 4 in the terminal, and run `ls` to see your files.

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
4. The terminal uses spaces to separate parts of a command, so a space in a name can be misunderstood. Use dashes instead, or wrap the name in quotes.
5. It auto-completes file and folder names.

</details>

## Go deeper

- [MDN: Command line crash course](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line)
- [freeCodeCamp: Command line for beginners](https://www.freecodecamp.org/news/command-line-for-beginners/)
- [The Odin Project: Command line basics](https://www.theodinproject.com/lessons/foundations-command-line-basics)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._
