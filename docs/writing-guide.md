# Writing guide for Firstlight lessons

Read this before you write or rewrite any lesson. The goal: a complete beginner, who may be
reading English as a second language, understands every lesson on the first read.
Think "Head First" books: learning through pictures-in-words, stories, conversation and doing.

## The 10 rules

1. **Talk to one person.** Use "you". Use "we" for things you do together. Write like a kind teacher sitting next to the learner.
2. **Short and plain.** Aim for sentences under 20 words. One idea per sentence. Use everyday words ("use", not "utilise"). Explain any new word the first time it appears, in bold, with a simple meaning. Never use jargon without explaining it.
3. **Start with a story or a real-life picture.** Before a new idea, give an everyday example: a restaurant, a library, a post office, a recipe, cooking, football, a school, a shop, a phone call. Then connect it to the technical idea, and say clearly where the picture stops being true.
4. **Show, don't just tell.** Prefer a small example over a paragraph of explanation. Put the code or the picture first, then explain it line by line in plain words.
5. **Make the reader think.** Add small activities where the reader does something before reading the answer. Use "Try it" and "Check your understanding" with answers hidden inside `<details>` (see format). Ask "what do you think will happen?" before showing a result.
6. **Break it up.** Short paragraphs (max 3 to 4 lines). Lots of headings that say what the section is about, in plain words. Lists and tables when they make things clearer. Never a wall of text.
7. **One new thing at a time.** If a lesson teaches three ideas, introduce them one by one, with an example for each, then put them together at the end.
8. **Say why it matters.** Tell the reader early what they will be able to do after the lesson and why it is useful in a real product.
9. **Be honest and warm.** Say when something is hard or confusing ("Most beginners find this tricky. That's normal."). Celebrate small wins. No jokes that need cultural knowledge. No sarcasm.
10. **Check the facts.** Code must be correct and runnable. Do not invent features, names or numbers. If you are unsure about a fact, leave it out or say it is an example.

## Format (the app renders this Markdown)

Each lesson or assignment is a `.md` file with frontmatter, then Markdown.

```
---
title: Short, plain title
kind: lesson            # or: assignment
minutes: 20             # honest reading and doing time
submission: any         # assignments only: any | link | file | text
---
Opening paragraphs here (no heading needed). Start with the story or the picture.

## A heading in plain words

...
```

- Start the body with 1 to 3 short paragraphs. Do NOT repeat the title as a heading.
- Use `##` for sections and `###` for sub-sections. Never use `#`.
- Code goes in fenced blocks with a language: ```html, ```css, ```js, ```node, ```bash, ```json, ```text.
  - `html`, `css` and `js` blocks get a "Try it" button that opens the in-browser playground. Only use them for code that really runs in a browser on its own (no secret keys, no Node-only features).
  - Use ```node for JavaScript that runs on a server with Node.js (it is highlighted as JavaScript but has no Try it button).
  - Use ```bash for terminal commands, ```json for JSON, ```text for plain output or anything else.
- Callout boxes use a blockquote that starts with ONE of these three markers. Nothing else works:
  - `> 💡 **Tip:** ...` a helpful trick
  - `> ⚠️ **Watch out:** ...` a common mistake or danger
  - `> 🧠 **Remember:** ...` the one thing to keep in your head
  These three emoji are converted to proper icons by the app. Do NOT use any other emoji anywhere.
- Hidden answers:

```
<details><summary>Show answers</summary>

1. First answer.
2. Second answer.

</details>
```
  (leave a blank line after `<summary>` and before `</details>`).
- Checklists in assignments: `- [ ] Requirement` (one per line).
- Lessons usually end with `## Check your understanding` (3 to 5 questions plus hidden answers), then `## Go deeper` (2 to 4 trustworthy links, e.g. MDN, web.dev, the official docs of the tool). Only link to pages you are confident exist.
- Assignments have these sections in order: `## What you'll build`, `## Requirements` (checklist), `## Steps/hints` (numbered, gentle), `## How to submit` (say what to hand in: a link, files or text). Make requirements specific and checkable.
- Keep tables small (3 columns max).

## Good patterns to use

- **The picture first.** "Imagine a restaurant..." then "Now the same thing on the web: ..."
- **A tiny story.** Meet "Amina", who runs a bakery and wants a website. Reuse characters across a week.
- **Say it three ways.** A one-line definition, a real-life picture, a small example.
- **"What would happen if...?"** questions with hidden answers.
- **Common mistakes.** Show the mistake and the fix side by side.
- **A summary box** at the end of long lessons: `> 🧠 **Remember:** ...` with 3 bullet points.

## Do not

- Do not start sentences with long clauses. Do not use idioms ("a piece of cake").
- Do not use "simply", "just", "obviously", "easy", "trivial". They make learners feel bad when it is not easy.
- Do not use emoji except the three callout markers.
- Do not paste long walls of theory. If a section is longer than about 150 words, split it or add an example.

## Instructor sections (every lesson, assignment and week)

Each sprint (week) has four parts: **Prep** (the lessons learners read), **Backlog**
(everything learners must do this week, as a checklist), **Day plan** (the instructor's agenda) and
**End of sprint review** (a checklist of what must be done). Students see Prep and Backlog.
Only instructors see the Day plan, the agendas and the review checklist.

Instructor content goes AFTER a line that contains exactly `<!-- instructor -->`. The app removes
everything after that line for students, so never put anything a student needs after it.

No timings, no breaks, no "10 minutes". Instructors run the session their own way. Give them what to
teach, in plain words, as notes for a volunteer who may not be an expert.

### In every lesson file

Add at the very END of the file (after "Go deeper" and after any source-credit line):

```
<!-- instructor -->
## Instructor agenda

### Learning objectives
- By the end, learners can ... (2 to 4 bullets, specific and checkable)

### Purpose
One or two sentences: why this matters in real work.

### Things to teach
1. **Short name of the idea.** What to explain or show, in 2 to 3 sentences. Name the example from the lesson to use.
2. **Another idea.** ...
(3 to 5 items. A few key things, NOT the whole lesson. Learners read the rest themselves.)

### Check understanding
- Ask: "A question." A good answer: ...
(2 to 3 questions)

### Watch for
- One or two common mistakes or misunderstandings, and what to say.
```

### In every assignment file

Same place, same marker, with these sections instead:

```
<!-- instructor -->
## Instructor agenda

### Learning objectives
### Purpose
### Things to do
1. How to launch the task and what to demonstrate (2 to 4 items).

### What good work looks like
- 3 to 5 checkable signs, matching the requirements checklist.

### Watch for
```

### In every week.md

The student part (before the marker) ends with a backlog. Put it after "By the end of this week you will be able to":

```
## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: <exact lesson title>
- [ ] Read: <exact lesson title>

**Do**
- [ ] <a concrete task, for example "Create a folder called about-me and add index.html">
- [ ] Finish the assignment: <exact assignment title>

**Share**
- [ ] Submit your work and read your instructor's feedback
```

(Use `- [ ]` checklists only. 6 to 12 items. Name every lesson and assignment of the week, in order, using the exact titles. Add 1 to 4 concrete practical tasks.)

Then the instructor part:

```
<!-- instructor -->
## Day plan

### Learning objectives
- (3 to 5 bullets for the whole week)

### Purpose
Why this week matters and how it connects to the weeks before and after.

### Agenda
1. **<Lesson title>.** The key things to teach from this lesson (2 sentences) and what learners should try.
2. ... (one item per lesson, in order)
3. **<Assignment title>.** How to launch it and what to look at.

## End of sprint review

Tick each one when you have seen it.

- [ ] (5 to 8 concrete checks specific to this week, for example "Every learner's page opens in a browser")
- [ ] Every learner has had feedback on the assignment.
```
