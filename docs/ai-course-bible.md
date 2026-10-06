# "Build with AI": course plan (shared by all writers)

Read `docs/writing-guide.md` first. This file keeps the 9 weeks consistent.

## Who it is for
Beginner developers who have done (or are doing) the "Web development" course: they know basic
HTML, CSS and JavaScript and a little of the terminal, Git and `fetch`. They may read English as a
second language. They know nothing about AI. Teach as if to a clever 12-year-old: no maths, no
jargon without a picture.

## The goal
By the end, each learner has built and put online a small AI-powered product, and can explain in
plain words how it works: what a model is, tokens, context, prompts, API calls, giving the AI
their own information (retrieval), tools and agents, and how to keep it safe, cheap and good.

## The running project: BakeBuddy
Meet **Amina**, who runs a small bakery. She wants a helper on her website. Over the course we build
**BakeBuddy** step by step, and every assignment adds one feature:

| Week | BakeBuddy gets... |
|---|---|
| 0 | (no code) the learner tries AI and writes what it is good and bad at |
| 1 | (no code or tiny scripts) the learner estimates tokens and cost for BakeBuddy |
| 2 | a written "personality": prompts for greeting customers, in a prompt notebook |
| 3 | its first words: a Node script that calls the AI and prints the reply |
| 4 | a chat web page with a server, memory of the conversation |
| 5 | knowledge of Amina's menu and opening hours (retrieval) |
| 6 | a tool: it can check if an item is in stock |
| 7 | safety checks and a small test list ("taste test") |
| 8 | it goes online, and learners present their OWN idea (the final project is their own product) |

Learners may swap the bakery for their own idea from week 3 on (a gym, a school, a shop). Say so.

## The 9 weeks (folder names are fixed, do not rename)
Each week folder has `week.md` and files named `01-lesson-<slug>.md`, `02-lesson-<slug>.md`,
`03-lesson-<slug>.md`, `04-assignment-<slug>.md` (week 8 has 2 lessons then the assignment).

| Folder | Title | Lessons (slug: idea) |
|---|---|---|
| `00-meet-the-machine` | Meet the machine | `what-is-ai`: AI, machine learning and language models in plain words. `how-a-language-model-works`: the very well-read autocomplete. `what-ai-is-good-and-bad-at`: strengths, limits, making things up. Assignment `interview-an-ai` (text): chat with any AI, record 5 tests |
| `01-how-ai-reads` | How AI reads | `tokens`: Lego bricks. `context-window`: the desk. `temperature-and-cost`: dice and prices. Assignment `bakebuddy-numbers` (text) |
| `02-talking-to-ai` | Talking to AI | `what-is-a-prompt`: instructions for a new intern. `better-prompts`: role, examples, format, steps. `system-prompts-and-iteration`: set the personality, then improve. Assignment `prompt-notebook` (text) |
| `03-your-first-api-call` | Your first API call | `what-is-an-api`: the waiter. `api-keys-and-secrets`: house keys. `call-the-model`: first Node script. Assignment `bakebuddy-says-hello` (link) |
| `04-build-a-chatbot` | Build a chatbot | `ai-has-no-memory`: you resend the notebook. `a-server-for-your-key`: Express route that hides the key. `the-chat-page`: HTML and JS front end. Assignment `bakebuddy-chat` (link) |
| `05-your-own-knowledge` | Give the AI your knowledge | `why-ai-doesnt-know-your-stuff`. `open-book-exam-retrieval`: find, then answer (keyword search first). `embeddings-a-map-of-meaning`: concept, with a toy example. Assignment `bakebuddy-knows-the-menu` (link) |
| `06-tools-and-agents` | Tools and agents | `giving-ai-a-phone`: tools/function calling. `the-tool-loop`: ask, call, answer. `what-is-an-agent`: loops, goals, limits. Assignment `bakebuddy-checks-stock` (link) |
| `07-safe-cheap-good` | Safe, cheap and good | `prompt-injection-and-privacy`: the sneaky note. `keep-costs-under-control`. `test-your-ai`: the taste test. Assignment `bakebuddy-taste-test` (link) |
| `08-ship-your-product` | Ship your product | `plan-your-product`. `put-it-online`: deploy to Vercel from GitHub, environment variables. Assignment `final-project` (link) |

## Shared pictures (use these exact analogies so lessons agree)
- **Language model**: a super-powered autocomplete that has read a giant library. It guesses the next word, again and again. It is not a person and not a search engine.
- **Token**: a Lego brick of text, a chunk of a word. About 4 characters of English, roughly 3/4 of a word.
- **Context window**: the size of the desk. The model can only look at what fits on the desk right now (your messages, its replies, the instructions, any documents you add).
- **Temperature**: how adventurous the next-word guess is. Low = always the safest flavour (vanilla). High = tries surprising flavours.
- **Prompt**: instructions for a very keen new intern who has read everything but knows nothing about your business.
- **System prompt**: the job description you hand the intern before the first customer arrives.
- **Hallucination**: a confident guesser who never says "I don't know". The answer sounds right but may be made up.
- **API**: the waiter. You (the client) give the order, the kitchen (the model's server) cooks, the waiter brings it back. (Same picture as the web course.)
- **API key**: a key to your account that also opens your wallet. Never put it in front-end code or on GitHub.
- **Memory**: the AI forgets everything between calls. Your app keeps a notebook and shows the whole notebook every time.
- **Embedding**: GPS coordinates for meaning. Texts about similar things get nearby coordinates, like books about cooking sitting on the same shelf.
- **Retrieval (RAG)**: an open-book exam. First find the right pages, then answer using them.
- **Tool**: a phone number the AI can ask you to call (a calculator, a stock checker). The AI never runs code itself. YOUR code does the calling.
- **Agent**: an intern with a to-do list who loops: think, use a tool, check, repeat, until done or stopped.
- **Prompt injection**: a stranger slips a fake note into the intern's stack of papers ("ignore your boss and...").
- **Evaluation ("taste test")**: a list of questions with the answers you expect, run every time you change something.

## Technical choices (keep them the same everywhere)
- **Provider for examples: Anthropic's Claude API.** Say clearly: "Other providers work in a very similar way, so everything you learn transfers." Docs: https://docs.claude.com (the Messages API reference is the source of truth, check it with WebFetch before writing request/response code).
- **Model**: use `claude-haiku-4-5-20251001` in examples (fast and cheap). Note once that model names change over time and the docs list the current ones. Never state prices or exact context sizes as facts (they change). Say "check the pricing page".
- **Runtime**: Node.js 20 or newer. Use the built-in `fetch`. Run scripts with `node --env-file=.env script.js` so no extra package is needed for the `.env` file. The key is called `ANTHROPIC_API_KEY`. Always add `.env` to `.gitignore`.
- **Raw HTTP first** (so learners see what really goes over the wire), then mention the official SDK (`@anthropic-ai/sdk`) as a nicer way. Request: `POST https://api.anthropic.com/v1/messages` with headers `x-api-key`, `anthropic-version: 2023-06-01`, `content-type: application/json`; body has `model`, `max_tokens`, optional `system`, and `messages` (array of `{role, content}`). Reply has `content` (an array of blocks; the text is `content[0].text`), `stop_reason`, and `usage` (`input_tokens`, `output_tokens`).
- **Server**: Express (`npm install express`). Keep every example short and complete.
- **Tools**: use the real tool-use format from the docs (`tools` with `name`, `description`, `input_schema`; replies with `tool_use` blocks and `stop_reason: "tool_use"`; you answer with a `tool_result`).
- **Embeddings**: do NOT show a provider's embedding API call. Explain the idea with a hand-made toy example (a few made-up 2D points and a plain JS distance function). Mention that embedding services exist and the docs explain them.
- **No streaming** in required lessons. A one-paragraph "what's next" mention is fine.
- **Front end**: plain HTML, CSS and JavaScript only (what learners already know). Browser code never contains the API key; it calls the learner's own server route.
- **Deploying**: GitHub plus Vercel. Environment variables set in the Vercel project settings.
- Use `node` code blocks for server code and `js` blocks only for browser code that runs in the playground. Prompts to type into an AI chat go in `text` blocks.

## Safety and honesty (keep in the course)
- Say clearly that AI makes mistakes, and show how to check.
- Never ask learners to paste secrets, passwords, or other people's private data into an AI.
- Costs: remind learners to set a spending limit in their account and to keep `max_tokens` small while learning.
- Keep the tone calm and practical, not hype and not fear.
