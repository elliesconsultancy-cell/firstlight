---
title: Setting up your tools
kind: lesson
minutes: 30
---
A carpenter needs a hammer and a saw before building a table. A web developer needs a browser and a code editor before building a web page. In this lesson you set up the same free tools that professionals use.

By the end, you will have a folder, a file, and your first page open in the browser.

## The three things you need

1. **A web browser.** We use **Google Chrome**. You look at your pages in it, and you can look inside them too.
2. **A code editor.** We use **Visual Studio Code**, called **VS Code**. It is a program for writing code.
3. **A folder for your work.** One tidy place on your computer for everything you make here.

> 💡 **Tip:** You can use Firefox or Edge instead. They have similar tools. But the lessons show Chrome, so Chrome is the best one to follow along with.

## Step 1: Install Google Chrome

If you do not have Chrome yet, download it from the official Google Chrome website. Install it like any other program.

### Meet DevTools

Chrome has a hidden toolbox called **DevTools** (short for Developer Tools). It lets you look behind the scenes of any web page.

Think of the bonnet (hood) of a car. Most drivers never open it. Mechanics open it all the time. With DevTools, you start to be the mechanic.

To open DevTools, use any one of these:

- Right-click on a page and choose **Inspect**
- Press `F12`
- Windows or Linux: press `Ctrl + Shift + I`
- Mac: press `Cmd + Option + I`

A panel opens at the side or the bottom. You will see tabs like **Elements** and **Console**. You do not need to understand them yet. Only learn how to open and close it.

### Try it

1. Open any website, for example a news site.
2. Open DevTools with `F12`.
3. Click the **Elements** tab. You are now looking at the code of that page.
4. Click the small arrow icon in the top-left corner of DevTools. Then click a heading on the page. DevTools jumps to the code of that heading.

> 🧠 **Remember:** If you change something in DevTools, only **your** copy of the page changes, and only until you refresh. You cannot break a real website this way. Experiment freely.

## Step 2: Install VS Code

Download VS Code from the official site, code.visualstudio.com. Install it.

The first time you open it, you see a **Welcome** tab. You can close it.

These are the main parts of the VS Code window:

- **Explorer** (left side, the icon of two pieces of paper): shows your files and folders.
- **Editor** (the big middle area): where you type your code.
- **Tabs** (along the top of the editor): each open file has a tab, like in a browser.

> ⚠️ **Watch out:** A white dot on a tab means the file has **unsaved changes**. Save with `Ctrl + S` (Windows/Linux) or `Cmd + S` (Mac). The browser only shows what you have saved.

## Step 3: Make a folder for your work

A tidy start saves you trouble later. Think of one folder as a school bag: everything for the course goes in it.

1. Open your **Documents** folder, or another place you can find easily.
2. Create a new folder called `firstlight`.
3. Inside it, create a folder called `week-00`.

Your folders should look like this:

```bash
Documents/
└── firstlight/
    └── week-00/
```

> 💡 **Tip:** Use **lowercase letters** and **dashes** in folder and file names, not spaces. Write `about-me.html`, not `About Me.html`. Spaces and capital letters can cause problems on the web.

## Step 4: Open your folder in VS Code

1. In VS Code, click **File → Open Folder...**
2. Choose your `firstlight` folder and click **Open**.
3. If VS Code asks "Do you trust the authors of the files in this folder?", click **Yes**. You are the author.

Your folders now show in the Explorer on the left.

## Step 5: Create your first file

1. In the Explorer, click `week-00`.
2. Click the **New File** icon (a page with a plus sign).
3. Name the file `hello.html` and press Enter.
4. Type this into the file:

```html
<h1>Hello! I am learning to code.</h1>
<p>Today I set up my tools.</p>
```

5. Save the file.

### Try it: open your file in the browser

1. Find `hello.html` in your file manager (Finder on Mac, File Explorer on Windows).
2. Double-click it, or drag it into a Chrome window.
3. You should see your heading and your paragraph.

Now change the text in VS Code. Save. Then **refresh** the browser (`F5`, or `Ctrl + R` / `Cmd + R`). What do you see?

This loop is: edit, save, refresh. You will do it thousands of times.

## Useful VS Code shortcuts

| What it does | Windows/Linux | Mac |
| --- | --- | --- |
| Save | `Ctrl + S` | `Cmd + S` |
| Undo | `Ctrl + Z` | `Cmd + Z` |
| Find in file | `Ctrl + F` | `Cmd + F` |
| Command palette | `Ctrl + Shift + P` | `Cmd + Shift + P` |

You do not need to memorise these. Save and Undo are the most important.

## Check your understanding

1. Name three ways to open Chrome DevTools.
2. What does a white dot on a VS Code tab mean?
3. Why should you avoid spaces in file names?
4. After you change your HTML file, what two things must you do to see the change in the browser?

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

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can open Chrome DevTools in at least two ways and find the Elements tab
- create the firstlight/week-00 folders and open firstlight in VS Code
- create, save and open hello.html in Chrome and repeat the edit, save, refresh loop

### Purpose
Every later week depends on a working browser, editor and folder. Learners who finish setup now will not lose time later.

### Things to teach
1. **DevTools as a mechanic's tool.** Use the bonnet picture. Have everyone open a news site, press F12, click Elements, and use the arrow icon to click a heading. Stress that changes in DevTools only affect their own copy and vanish on refresh.
2. **Folders and naming.** Show the `firstlight/week-00` structure from the lesson. Say lowercase letters and dashes, no spaces: `about-me.html`, not `About Me.html`.
3. **Open the folder, not just a file.** Show File, Open Folder in VS Code and the Explorer, editor and tabs. Say yes to the trust question.
4. **Edit, save, refresh.** Create `hello.html` with the lesson's two lines. Show the white dot for unsaved changes. Change the text, save, refresh. Say they will do this thousands of times.

### Check understanding
- Ask: "Name two ways to open DevTools." A good answer: right-click and Inspect, F12, or Ctrl+Shift+I (Cmd+Option+I on Mac).
- Ask: "You changed your file but the browser looks the same. What two things do you do?" A good answer: save in VS Code, then refresh the browser.
- Ask: "Why no spaces in file names?" A good answer: spaces and capitals can cause problems in web addresses and links.

### Watch for
- Learners who forget to save. Look for the white dot on the tab.
- Learners who open the file from a different place than the one they edit, for example a download copy. Check the file path in the address bar.
- Hidden file extensions, which can give a file such as `hello.html.txt`. Ask them to turn extensions on in the file manager.
