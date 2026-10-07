---
title: Publishing with GitHub Pages
kind: lesson
minutes: 25
---
Think of a shop. Your goods sit in a stockroom at the back. Nobody can buy them until you open the front door.

Your GitHub repository is the stockroom. GitHub Pages opens the front door, so anyone can walk in and look. Many students remember this moment: you send someone a link, and your own website opens on their phone.

## What is GitHub Pages?

When you open a website, your browser asks a computer somewhere in the world for the files. That computer is a **server**. It sends back HTML, CSS and image files.

For people to see your site, your files must be on a server that is always on and connected to the internet. This is called **hosting**.

GitHub Pages is free hosting for **static websites**. A static site is made of HTML, CSS, JavaScript and images, exactly what you have been building. GitHub already has your files, so it can serve them to visitors too.

## Before you start: check your files

GitHub Pages looks for a file called `index.html` to use as the homepage. Check that:

- Your homepage is called exactly `index.html` (all lowercase).
- It is in the **top level** of the repository, not inside another folder.
- Your links to other files are **relative paths**, like `styles.css` or `images/bread.jpg`. They are not paths on your own computer, like `C:/Users/amina/Desktop/styles.css`.

```text
my-landing-page/
├── index.html      <- the homepage, at the top level
├── styles.css
└── images/
    ├── hero.jpg
    └── bread.jpg
```

> ⚠️ **Watch out:** On your computer, `Hero.jpg` and `hero.jpg` may count as the same file. On GitHub Pages they are **different**. If an image works on your laptop but not online, check the capital letters in the file name and in your HTML. Use only lowercase file names to avoid this problem.

## Step by step: publish your site

### 1. Make sure your latest work is pushed

In your project folder:

```bash
git status
git add .
git commit -m "Prepare site for publishing"
git push
```

Check on GitHub that your newest changes are there.

### 2. Open the Pages settings

1. On GitHub, open your repository.
2. Click the **Settings** tab (near the top, with a cog icon).
3. In the left menu, click **Pages**.

### 3. Choose where your site comes from

1. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
2. Under **Branch**, choose `main` and leave the folder as `/ (root)`.
3. Click **Save**.

### 4. Wait a minute

GitHub now builds your site. This usually takes one or two minutes. You can watch progress in the **Actions** tab of your repository. A green tick means it is done.

### 5. Visit your site

Go back to **Settings → Pages**. At the top you see "Your site is live at" and an address like this:

```text
https://your-username.github.io/my-landing-page/
```

Click it. Your website is on the internet!

> 💡 **Tip:** Copy the live address into the **About** section of your repository. Click the cog icon next to "About" on the main repository page, then fill in "Website". Then anyone who finds your code can find the live site too.

## Updating your live site

You do not need to do anything special to update your site. Every time you push to `main`, GitHub Pages rebuilds it:

```bash
git add .
git commit -m "Update opening hours"
git push
```

Wait a minute, then refresh your live site.

> 💡 **Tip:** If you do not see your change, your browser may show an old copy. Do a hard refresh: `Ctrl + Shift + R` on Windows, `Cmd + Shift + R` on Mac.

## Troubleshooting

| Problem | Likely cause |
| --- | --- |
| "404 – File not found" | No `index.html` at the top level, or the name is not all lowercase. Or the site is still building: wait a minute. |
| Page shows but has no styles | The `<link>` path to `styles.css` is wrong, or has the wrong capitals. |
| Images are missing | Image paths or capital letters do not match, or the images were never added and committed. Run `git status`. |
| Changes do not appear | You did not push, the build is still running, or your browser is showing an old copy. |

DevTools can help here too. Open the **Console** or **Network** panel. Look for red errors about files that could not be found.

## A word about what you publish

Your GitHub Pages site and repository are **public**. Anyone can see them. Do not include personal details you would not put on a poster, like your home address or phone number. For your fictional business, invent the address and phone number.

## Try it

Publish your `git-practice` repository from the last lesson:

1. Make sure it has an `index.html` at the top level and that it is pushed.
2. Turn on GitHub Pages in **Settings → Pages**, using the `main` branch and `/ (root)`.
3. Wait for the green tick in the **Actions** tab, then open your live site.
4. Change the heading in `index.html`, then commit and push. Check that the live site updates.
5. Send the link to a friend or open it on your phone.

## Check your understanding

1. What kind of websites can GitHub Pages host?
2. What must your homepage file be called, and where must it be?
3. Where in GitHub do you turn on Pages?
4. How do you update your live site after making changes?
5. Your site works on your laptop, but online the images are missing. Name two things to check.

<details><summary>Show answers</summary>

1. Static websites: HTML, CSS, JavaScript and image files.
2. `index.html`, in the top level (root) of the repository.
3. In the repository's **Settings** tab, then **Pages** in the left menu.
4. Commit and push to the `main` branch. GitHub Pages rebuilds automatically.
5. That the image paths in your HTML are correct and relative, that the capital letters match exactly, and that the image files were added, committed and pushed.

</details>

## Go deeper

- [GitHub Docs: Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [GitHub Docs: Quickstart for GitHub Pages](https://docs.github.com/en/pages/quickstart)
- [MDN: Upload files to a web server](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/Upload_files_to_a_web_server)

_Adapted in part from the CodeYourFuture curriculum (CC BY-NC-SA 4.0)._

<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can say what hosting and a static site are.
- Learners can turn on GitHub Pages from the `main` branch and open the live link.
- Learners can update the live site by pushing, and fix missing files.

### Purpose
This is the moment learners get a real web address. It turns practice work into something they can show people.

### Things to teach
1. **Hosting.** Use the shop idea: the repository is the stockroom, Pages opens the front door. Say that Pages hosts static sites.
2. **Check the files first.** `index.html` must be lowercase and at the top level, and paths must be relative. Show the `my-landing-page` folder picture.
3. **Turn on Pages.** Show Settings, Pages, Deploy from a branch, `main`, `/ (root)`, Save. Wait for the green tick in Actions.
4. **Updating.** Every push to `main` rebuilds the site. Show a hard refresh with `Ctrl + Shift + R` or `Cmd + Shift + R`.
5. **Troubleshooting.** Use the table of 404, no styles, missing images. Explain that `Hero.jpg` and `hero.jpg` are different on GitHub Pages.

### Check understanding
- Ask: "What must the homepage be called and where?" A good answer: `index.html`, at the top level.
- Ask: "Where do you turn on Pages?" A good answer: repository Settings, then Pages.
- Ask: "Images work on your laptop but not online. What do you check?" A good answer: capital letters, relative paths, and that files were committed and pushed.

### Watch for
- Expecting the site instantly. It can take a minute or two, so wait for the green tick.
- Personal details on a public site. Remind them the site is public and to use made-up details.
