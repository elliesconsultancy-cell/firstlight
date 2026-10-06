---
title: Files, folders and file paths
kind: lesson
minutes: 25
---
Imagine a friend asks: "Where are the scissors?" You say: "Go into the kitchen. Open the top drawer. They are there." You gave your friend a path.

A web page finds its images and links in the same way. "Why is my image not showing?" is one of the most common beginner questions. Most often, the answer is the **file path**. After this lesson, you can fix it yourself.

## Files and folders

A **file** is one document: a photo, a song, a web page. A **folder** (also called a **directory**) is a container for files and other folders.

Think of your computer as a building:

- The **building** is your whole computer.
- The **floors and rooms** are folders.
- The **boxes** in a room are files.

A website is a folder of files. Here is a small one:

```bash
my-website/
├── index.html
├── about.html
├── images/
│   └── cat.jpg
└── recipes/
    └── jollof.html
```

- `my-website` is the main folder. It is the **root** of the website.
- `index.html` and `about.html` are directly inside it.
- `cat.jpg` is inside the `images` folder.
- `jollof.html` is inside the `recipes` folder.

> 💡 **Tip:** `index.html` is a special name. If a server is asked for a folder, with no file name, it usually sends `index.html`. This is why the home page of a site is normally `index.html`.

## File extensions

The letters after the dot in a file name are the **extension**. They tell the computer what kind of file it is:

- `.html`: a web page
- `.css`: a stylesheet (the look of the page)
- `.js`: a JavaScript file
- `.jpg`, `.png`, `.webp`, `.svg`: images

> ⚠️ **Watch out:** Windows and Mac often **hide** extensions. You may see `cat` when the real name is `cat.jpg`, or even `cat.jpg.png`. Turn on "show file extensions" in your file explorer settings. It saves a lot of confusion.

## What is a file path?

A **file path** is directions to a file, like the directions to the scissors. Each folder name is separated by a forward slash `/`:

```bash
images/cat.jpg
```

This means: "Go into the `images` folder. Find `cat.jpg`."

## Relative paths

In HTML we mostly use **relative paths**. "Relative" means the directions start **from where you are now**. Where you are is the folder of the HTML file you are writing.

We use the website above. You are writing code in `index.html`.

**Same folder:** write the file name.

```html
<a href="about.html">About me</a>
```

**Into a folder:** folder name, slash, file name.

```html
<img src="images/cat.jpg" alt="My cat asleep on a sofa">
```

**Up a folder:** use `..` (two dots). It means "the folder above this one".

Now you are writing in `recipes/jollof.html`. You want to show the cat picture. You must go **up** out of `recipes`. Then go **into** `images`:

```html
<img src="../images/cat.jpg" alt="My cat asleep on a sofa">
```

Read `../images/cat.jpg` like this: "Go up one folder. Go into `images`. Find `cat.jpg`."

> 🧠 **Remember:** `..` means "go up one level". `../..` means "go up two levels".

### Try it

Use the same website. Write the path you need in each case:

1. In `about.html`, link to `index.html`.
2. In `about.html`, show `cat.jpg`.
3. In `recipes/jollof.html`, link back to `index.html`.

<details><summary>Show answers</summary>

1. `index.html` (same folder)
2. `images/cat.jpg`
3. `../index.html` (up one level from `recipes`)

</details>

## Absolute URLs

An **absolute** URL is the full address, starting with the protocol. Use it to link to **other** websites:

```html
<a href="https://developer.mozilla.org">MDN Web Docs</a>
```

The rule is simple:

- Files in your own project: use a **relative path**.
- Other websites: use a **full URL**.

> ⚠️ **Watch out:** Never use paths like `C:\Users\ada\Desktop\cat.jpg` in your HTML. It may work on your computer. It breaks when anyone else opens your page, because their computer does not have your Desktop.

## Common path mistakes

When an image or link does not work, check this list:

1. **Spelling:** `image/cat.jpg` is not `images/cat.jpg`. One letter matters.
2. **Capital letters:** `Cat.JPG` and `cat.jpg` are different files on most web servers. Always use lowercase.
3. **Extension:** is it `.jpg`, `.jpeg` or `.png`?
4. **Spaces:** `my cat.jpg` causes trouble. Use `my-cat.jpg`.
5. **Wrong starting point:** the path starts from the folder of the HTML file you are editing.

### Try it

Inside your `firstlight` folder, make this structure:

```bash
firstlight/
└── week-01/
    ├── index.html
    └── images/
```

Save any photo in the `images` folder. Rename it to something short, like `photo.jpg`. Put this in `index.html` (change the file name if yours is different). Save it and open it in Chrome:

```html
<h1>Testing my paths</h1>
<img src="images/photo.jpg" alt="A test photo" width="300">
```

Do you see a broken image icon? Go through the "common path mistakes" list. Fixing it yourself is great practice.

## Check your understanding

1. What does `..` mean in a file path?
2. You are in `index.html`. The image is at `pictures/dog.png`. What do you write in `src`?
3. Why should you not use paths like `C:\Users\...` in your HTML?
4. When should you use a full URL like `https://...`?

<details><summary>Show answers</summary>

1. Go up one folder level.
2. `pictures/dog.png`
3. That path only exists on your computer. On another computer, or on a server, the file will not be found.
4. When you link to a file or page on another website.

</details>

## Go deeper

- [MDN: Dealing with files](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files)
- [MDN: Creating hyperlinks (see the section on URLs and paths)](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)
- [web.dev: Learn HTML – Links](https://web.dev/learn/html/links)
