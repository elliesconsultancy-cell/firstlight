---
title: Files, folders and file paths
kind: lesson
minutes: 25
---
"Why isn't my image showing?" is one of the most common questions beginners ask. Nine times out of ten, the answer is the **file path**. Let's make sure that doesn't happen to you.

## Files and folders

A **file** is a single document: a photo, a song, a web page. A **folder** (also called a **directory**) is a container that holds files and other folders.

Think of your computer like a building:

- The **building** is your whole computer.
- **Floors** and **rooms** are folders.
- **Boxes** in a room are files.

A website is just a folder of files. Here's a small one:

```bash
my-website/
├── index.html
├── about.html
├── images/
│   └── cat.jpg
└── recipes/
    └── jollof.html
```

- `my-website` is the main folder (the **root** of the website).
- `index.html` and `about.html` are directly inside it.
- `cat.jpg` is inside the `images` folder.
- `jollof.html` is inside the `recipes` folder.

> 💡 **Tip:** `index.html` is a special name. When a server is asked for a folder without a file name, it usually sends back `index.html`. That's why the home page of a site is normally called `index.html`.

## File extensions

The letters after the dot in a file name are the **extension**. They tell the computer what kind of file it is:

- `.html` – a web page
- `.css` – a stylesheet
- `.js` – a JavaScript file
- `.jpg`, `.png`, `.webp`, `.svg` – images

> ⚠️ **Watch out:** On Windows and Mac, extensions are often **hidden** by default. You might see `cat` when the real name is `cat.jpg`, or even `cat.jpg.png`! Turn on "show file extensions" in your file explorer settings. It will save you a lot of confusion.

## What is a file path?

A **file path** is directions to a file. It's like telling a friend how to find something in your house: "Go into the kitchen, open the top drawer, and the scissors are there."

In a path, each folder is separated by a forward slash `/`:

```bash
images/cat.jpg
```

This means: "go into the `images` folder, and find `cat.jpg`".

## Relative paths

In HTML we mostly use **relative paths**. "Relative" means the directions start **from where you are now**: the folder of the HTML file you're writing in.

Let's use the website above. Imagine you're writing code in `index.html`.

**Same folder:** just use the name.

```html
<a href="about.html">About me</a>
```

**Into a folder:** folder name, slash, file name.

```html
<img src="images/cat.jpg" alt="My cat asleep on a sofa">
```

**Up a folder:** use `..` (two dots), which means "the folder above this one".

Now imagine you're writing in `recipes/jollof.html` and want to show the cat picture. You need to go **up** out of `recipes`, then **into** `images`:

```html
<img src="../images/cat.jpg" alt="My cat asleep on a sofa">
```

Read `../images/cat.jpg` as: "go up one folder, then into `images`, then find `cat.jpg`".

> 🧠 **Remember:** `..` means "go up one level". `../..` means "go up two levels".

### Try it

Using the same website, write the path you'd use in each case:

1. In `about.html`, link to `index.html`.
2. In `about.html`, show `cat.jpg`.
3. In `recipes/jollof.html`, link back to `index.html`.

<details><summary>Show answers</summary>

1. `index.html` (same folder)
2. `images/cat.jpg`
3. `../index.html` (up one level from `recipes`)

</details>

## Absolute paths and URLs

An **absolute** URL gives the full address, starting with the protocol. You use these to link to **other** websites:

```html
<a href="https://developer.mozilla.org">MDN Web Docs</a>
```

Use **relative paths** for files in your own project and **full URLs** for other websites.

> ⚠️ **Watch out:** Never use paths like `C:\Users\ada\Desktop\cat.jpg` in your HTML. It might work on your computer, but it will break as soon as anyone else opens your page, because their computer doesn't have your Desktop!

## Common path mistakes

When an image or link doesn't work, check these:

1. **Spelling:** `image/cat.jpg` vs `images/cat.jpg`. One letter matters.
2. **Capital letters:** `Cat.JPG` and `cat.jpg` are different files on most web servers. Use lowercase always.
3. **Extension:** is it really `.jpg`, or is it `.jpeg` or `.png`?
4. **Spaces:** `my cat.jpg` causes trouble. Use `my-cat.jpg`.
5. **Wrong starting point:** remember, the path starts from the folder of the HTML file you're editing.

### Try it

On your computer, inside your `firstlight` folder, create this structure:

```bash
firstlight/
└── week-01/
    ├── index.html
    └── images/
```

Save any photo into the `images` folder and rename it to something simple, like `photo.jpg`. Then put this in `index.html` (change the file name if yours is different), save, and open it in Chrome:

```html
<h1>Testing my paths</h1>
<img src="images/photo.jpg" alt="A test photo" width="300">
```

If you see a broken image icon, go through the "common path mistakes" list above. Fixing it yourself is great practice!

## Check your understanding

1. What does `..` mean in a file path?
2. You're in `index.html`. The image is at `pictures/dog.png`. What do you write in `src`?
3. Why shouldn't you use paths like `C:\Users\...` in your HTML?
4. When should you use a full URL like `https://...`?

<details><summary>Show answers</summary>

1. Go up one folder level.
2. `pictures/dog.png`
3. It only exists on your computer. On anyone else's computer, or on a server, the file won't be found.
4. When linking to a file or page on another website.

</details>

## Go deeper

- [MDN: Dealing with files](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files)
- [MDN: Creating hyperlinks (see the section on URLs and paths)](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)
- [web.dev: Learn HTML – Links](https://web.dev/learn/html/links)
