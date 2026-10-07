# 🌅 Firstlight

A free training platform for complete beginners. It covers web development from the first HTML tag to a deployed JavaScript app.

Students get a weekly reading list, can tick off lessons, try code in a built-in playground, and submit their work. You, the instructor, see everyone's progress, review submissions and approve them or ask for changes.

Built with **SvelteKit 2 + Svelte 5** and **SQLite**. There are no external services: the app, the database and the uploaded files all live in one folder.

---

## What's inside

**For students**
- Create an account (optionally with an invite code). Accounts wait for your approval before lessons unlock.
- A dashboard with an overall progress ring, an "Up next" card, each week's progress and recent feedback.
- Weekly lessons in a clean reader. Students tick each lesson off, and assignment checklists remember their ticks.
- **Try it ▸** buttons on every HTML/CSS/JS code example. They open the code in the **Playground**, which has a live preview and a console panel.
- Assignment submissions with a written answer, a link (GitHub, CodePen…) and up to 5 file uploads. Students can resubmit, and every version is kept with your feedback.

**For you (Instructor space at `/admin`)**
- **Overview:** stats, new sign-ups to approve, a class progress heat-map (student × week), the review queue and recent activity.
- **Reviews:** open a submission to see the answer, link, files and image previews, plus the assignment brief and earlier versions. Leave feedback, then **Approve** or **Request changes**. "Go to next" lets you work through the queue quickly.
- **Students:** approve, pause or reactivate students, reset passwords (generates a temporary one), make someone a co-instructor, and see each student's week-by-week progress.
- **Curriculum:** publish or unpublish weeks, reorder them, and add or edit weeks, lessons and assignments in a Markdown editor with live preview. Each week also has private **instructor notes** for session plans and reminders.
- **Settings:** course name, tagline, welcome message, invite code, and whether new students need approval.

**Courses (in `content/courses`)**

There are two courses. Students see both on their Learn page, with separate progress for each.

**1. Web development** (13 weeks)

| Week | Topic |
|---|---|
| 0 | Welcome & learning how to learn (tools, getting unstuck, using AI responsibly) |
| 1 | How the web works + your first HTML page |
| 2 | HTML in depth (semantics, forms, accessibility) |
| 3 | Styling with CSS |
| 4 | Layout & responsive design (Flexbox, Grid) |
| 5 | Git, GitHub & publishing with GitHub Pages |
| 6 | JavaScript first steps |
| 7 | Functions, decisions & debugging |
| 8 | Arrays, loops & objects |
| 9 | Problem solving & testing (Jest) |
| 10 | Making pages interactive (the DOM) |
| 11 | JSON, fetch & APIs |
| 12 | Final project & showcase |

**2. Build with AI** (9 weeks): what AI is and how it works in plain words, tokens, context and prompts, calling an AI from code, building a chatbot, giving it your own information, tools and agents, safety, cost and testing, and putting an AI product online. Students build one project, BakeBuddy, step by step, then ship their own idea.

Both courses are written for beginners and people learning in English as a second language, in a plain "Head First" style: a real-life picture first, short sentences, and things to try. Parts of the web course are adapted from the CodeYourFuture curriculum (see Licence below).

---

## Run it on your Mac

You need **Node.js 20 or newer** (`node -v` to check; install from https://nodejs.org).

```bash
cd ~/Documents/learning/firstlight
npm install
npm run dev
```

Open http://localhost:5173.

1. **Create the first account. It automatically becomes the instructor (you).**
2. Go to **Instructor → Settings** and set an invite code.
3. Go to **Curriculum** and publish the weeks you want students to see. Weeks 0 and 1 start out published.
4. Share the sign-up link from the Overview page with your students, then approve them as they join.

To run the production version locally:

```bash
npm run build
npm start          # http://localhost:3000
```

All data (the database plus uploaded files) is stored in `./data`. **To back up, copy that folder.**

---

## Put it online

The app needs a host that runs Node and keeps a **persistent disk**, because SQLite and the uploads live on disk. Static or "serverless" hosts like Vercel and Netlify won't work without changes.

Whichever host you choose, set these environment variables:

| Variable | Example | Why |
|---|---|---|
| `ORIGIN` | `https://learn.yourdomain.com` | Your public URL. Required, or form submissions will be rejected. |
| `DATA_DIR` | `/data` | Where the database and uploads are stored. Point it at the persistent disk. |
| `PORT` | `3000` | Port to listen on. Most hosts set this for you. |

**Option A: Render (simplest).** Push this folder to a GitHub repo. In Render choose **New → Blueprint** and pick the repo; it reads `render.yaml`, builds the `Dockerfile` and attaches a 1 GB disk at `/data`. Then set `ORIGIN` to the URL Render gives you.

**Option B: Railway or Fly.io.** Both deploy the included `Dockerfile`. Add a volume mounted at `/data` and set `ORIGIN`.

**Option C: Your own VPS** (e.g. a £4/month Hetzner or DigitalOcean box):

```bash
npm ci && npm run build
ORIGIN=https://learn.yourdomain.com DATA_DIR=/var/firstlight PORT=3000 node server.js
```

Keep it running with `pm2` or systemd, and put Caddy or Nginx in front for HTTPS.

---

## Editing the course

- **In the app (easiest):** go to Instructor → Curriculum, open a week, then click a lesson. You get Markdown on the left and a live preview on the right.
- **In files:** edit the Markdown in `content/courses/<course>/weeks/NN-topic/`, then click **Sync from content folder** on the Curriculum page (or run `npm run content:sync`). Syncing updates lessons by name and never touches student work.

Markdown tips: code blocks tagged `html`, `css` or `js` get **Copy** and **Try it** buttons (Try it opens the playground in a new tab). Use `node` for server-side JavaScript, which is highlighted but not runnable. Quotes starting with 💡, ⚠️ or 🧠 become coloured tip, warning and remember callouts with proper icons. `- [ ]` lists become tickable checklists.

**Sprints: prep, backlog, day plan and review.** Each week works like a sprint.
- **Prep:** the lessons students read.
- **Backlog:** a tickable checklist at the bottom of each week page with everything the student does that week.
- **Day plan:** for instructors only. Each week has a day plan (objectives, purpose and an agenda), and every lesson and assignment has an instructor agenda (objectives, purpose, a few key things to teach, questions to ask). No timings or breaks.
- **End of sprint review:** an instructor checklist on the week page, plus **Sprint review** (Admin, Curriculum, open a week) which shows a live table of which students have read each lesson and had each assignment approved.

In the Markdown, everything after a line containing exactly `<!-- instructor -->` is for instructors. The app never sends it to students. `docs/writing-guide.md` has the exact format and `npm run content:check` checks it.

**Adding a course:** create `content/courses/<name>/course.md` (title, summary, order) and a `weeks/` folder next to it, following the existing courses. Restart the app and the new course is imported with its first two weeks published. Run `npm run content:check` to catch formatting mistakes. `docs/writing-guide.md` explains the writing style.

## Project structure

```
content/courses/      one folder per course: course.md + weeks/NN-topic/ (week.md + lessons + assignments)
docs/                 writing guide and the plan for the AI course
src/lib/server/       database, auth, Markdown rendering, uploads
src/routes/learn/     student area
src/routes/admin/     instructor area
src/routes/playground the HTML/CSS/JS playground
server.js             production entry (allows uploads up to 25 MB per request)
```

## Licence

The parts of the curriculum adapted from the [CodeYourFuture curriculum](https://github.com/CodeYourFuture/curriculum) are under **CC BY-NC-SA 4.0**. You can share and adapt them for non-commercial use with attribution, under the same licence. Those files are marked at the bottom. Inside the app, the credit is shown to instructors (admin accounts) only.


## Hosting on Vercel

The app runs on Vercel with a hosted SQLite database ([Turso](https://turso.tech)).

1. Import the GitHub repo in Vercel (the SvelteKit preset is detected automatically).
2. In the project, open **Storage** and add **Turso** from the Marketplace. This sets `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` for you.
3. Redeploy. The first visit creates the tables and imports `content/courses`.
4. Open `/register` straight away: the first account created becomes the admin.

Notes: student uploads are stored in the database and limited to 4 MB per submission (Vercel's request limit). To re-import the markdown after editing `content/courses`, use Admin > Curriculum > Sync.
