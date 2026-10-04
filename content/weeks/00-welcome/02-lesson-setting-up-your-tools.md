---
title: Setting up your tools
kind: lesson
minutes: 30
---
A carpenter needs a hammer and a saw. A web developer needs a browser and a code editor. In this lesson you will set up the same tools that professionals use, for free.

## The three things you need

1. **A web browser:** we will use **Google Chrome**. You will use it to look at your web pages and to inspect how they work.
2. **A code editor:** we will use **Visual Studio Code** (usually called **VS Code**). This is where you write your code.
3. **A folder for your work:** one tidy place on your computer to keep everything you make on this course.

> 💡 **Tip:** You can use other browsers (like Firefox or Edge) if you prefer. They all have similar tools. But the lessons show Chrome, so Chrome is easiest to follow.

## Step 1: Install Google Chrome

If you do not already have Chrome, download it from the official Google Chrome website and install it like any other program.

### Meet DevTools

Chrome has a hidden toolbox inside it called **DevTools** (short for Developer Tools). It lets you look "behind the scenes" of any web page.

To open DevTools, use one of these:

- Right-click anywhere on a web page and choose **Inspect**
- Press `F12`
- On Windows/Linux press `Ctrl + Shift + I`
- On Mac press `Cmd + Option + I`

A panel will open, usually on the right or at the bottom. You will see tabs like **Elements** and **Console**. Do not worry about understanding it all yet. For now, just know how to open and close it.

Think of DevTools like the bonnet (hood) of a car. Most drivers never open it. Mechanics open it all the time. You are becoming a mechanic.

### Try it

1. Open any website, for example a news site.
2. Open DevTools with `F12`.
3. Click the **Elements** tab. You are looking at the code of that page!
4. Click the small arrow icon in the top-left corner of DevTools, then click on a heading on the page. DevTools jumps to the code for that heading.

> 🧠 **Remember:** Anything you change in DevTools only changes **your** copy of the page, and only until you refresh. You cannot break a website this way. Experiment freely!

## Step 2: Install VS Code

Download VS Code from the official Visual Studio Code website (code.visualstudio.com) and install it.

When you open it for the first time, you will see a **Welcome** tab. You can close it.

Here are the most important parts of the VS Code window:

- **Explorer** (left side, the icon that looks like two pieces of paper): shows your files and folders.
- **Editor** (the big middle area): where you type your code.
- **Tabs** (along the top of the editor): each open file gets a tab, just like a browser.

> ⚠️ **Watch out:** A white dot on a tab means the file has **unsaved changes**. Save often with `Ctrl + S` (Windows/Linux) or `Cmd + S` (Mac). The browser can only show what you have saved.

## Step 3: Make a folder for your work

Being organised now will save you a lot of pain later. Let's make one main folder for the whole course.

1. Open your **Documents** folder (or another place you can easily find).
2. Create a new folder called `firstlight`.
3. Inside it, create a folder for this week called `week-00`.

Your folders should look like this:

```bash
Documents/
└── firstlight/
    └── week-00/
```

> 💡 **Tip:** Use **lowercase letters** and **dashes** instead of spaces in folder and file names. For example `about-me.html`, not `About Me.html`. Spaces and capital letters can cause problems on the web.

## Step 4: Open your folder in VS Code

1. In VS Code, click **File → Open Folder...**
2. Choose your `firstlight` folder and click **Open**.
3. If VS Code asks "Do you trust the authors of the files in this folder?", click **Yes**. (You are the author!)

Now your folders appear in the Explorer on the left.

## Step 5: Create your first file

1. In the Explorer, click on `week-00`.
2. Click the **New File** icon (a page with a plus sign).
3. Name it `hello.html` and press Enter.
4. Type this into the file:

```html
<h1>Hello! I am learning to code.</h1>
<p>Today I set up my tools.</p>
```

5. Save the file.

### Try it: open your file in the browser

1. Find `hello.html` in your normal file explorer (Finder on Mac, File Explorer on Windows).
2. Double-click it, or drag it into a Chrome window.
3. You should see your heading and paragraph!

Now try this: change the text in VS Code, save, then **refresh** the browser (`F5` or `Ctrl + R` / `Cmd + R`). This "edit, save, refresh" loop is something you will do thousands of times.

## Useful VS Code shortcuts

| What it does | Windows/Linux | Mac |
| --- | --- | --- |
| Save | `Ctrl + S` | `Cmd + S` |
| Undo | `Ctrl + Z` | `Cmd + Z` |
| Find in file | `Ctrl + F` | `Cmd + F` |
| Command palette | `Ctrl + Shift + P` | `Cmd + Shift + P` |

You do not need to memorise these now. Save and Undo are the most important.

## Check your understanding

1. Name three ways to open Chrome DevTools.
2. What does a white dot on a VS Code tab mean?
3. Why should you avoid spaces in file names?
4. After changing your HTML file, what two things must you do to see the change in the browser?

<details><summary>Show answers</summary>

1. Right-click and choose Inspect, press `F12`, or press `Ctrl + Shift + I` (`Cmd + Option + I` on Mac).
2. The file has unsaved changes.
3. Spaces (and sometimes capital letters) can cause problems in web addresses and links. Lowercase with dashes is safer.
4. Save the file in VS Code, then refresh the browser.

</details>

## Go deeper

- [MDN: Installing basic software](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Installing_basic_software)
- [MDN: What are browser developer tools?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools)
- [Chrome DevTools overview](https://developer.chrome.com/docs/devtools/overview)
- [VS Code documentation](https://code.visualstudio.com/docs)
