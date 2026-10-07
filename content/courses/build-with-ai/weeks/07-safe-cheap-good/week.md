---
title: Safe, cheap and good
summary: Protect your AI from tricks, keep the bill small, and prove it still works every time you change it.
---
A product that works on your laptop is not ready for the public. Real visitors will try strange things. Some will try to trick your AI. Some will send a thousand messages. And every time you change a prompt, something that worked yesterday can quietly break.

This week we make BakeBuddy **safe**, **cheap** and **good**. We start with the sneaky note: a stranger slips a fake instruction into the pile of papers on the intern's desk. We also learn what must never go into a prompt.

Then we control costs with small limits, and we build a **taste test**: a list of questions and expected answers, run by a script before every change. These habits separate a toy from a product.

## By the end of this week you will be able to

- Explain prompt injection and name three ways to reduce the risk
- Decide what must never be sent to an AI (secrets and other people's private data)
- Control cost with `max_tokens`, a short history, a spending limit and rate limiting
- Write a small test list with expected keywords and run it with a script
- Run your tests before every change and read the results

## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: Prompt injection and privacy
- [ ] Read: Keep costs under control
- [ ] Read: Test your AI

**Do**
- [ ] Set a small monthly spending limit in your provider account
- [ ] Add the safety rules, the `<customer_message>` tags and `validateMessage` to BakeBuddy
- [ ] Add `rateLimit` to your chat route and check that the page shows the friendly error
- [ ] Finish the assignment: BakeBuddy taste test

**Share**
- [ ] Push your project to GitHub and submit the link
- [ ] Read your instructor's feedback

<!-- instructor -->
## Day plan

### Learning objectives
- Explain prompt injection with the sneaky note and name ways to reduce the risk.
- Say what must never go into a prompt.
- Set the limits that keep costs down, with the account spending limit as the hard wall.
- Write and run a taste test, and read its failures.

### Purpose
Week 6 gave BakeBuddy tools, so there is now more to protect. This week makes it ready for real visitors. Next week learners put it online, so the habits here must be in place first.

### Agenda
1. **Prompt injection and privacy.** Tell the sneaky note story. Teach direct versus indirect, the tags, least power and the postcard rule. Learners try the two injection messages from "Try it" on their own bot.
2. **Keep costs under control.** Use the open tap picture. Cover the spending limit, `max_tokens`, `trimHistory` and `rateLimit`, and why counters are a soft fence. Learners add the rate limit and test the 429 message.
3. **Test your AI.** Use the loaf tasting. Show `tests.js` and `taste-test.js`, then run `npm test`. Learners write three tests and damage the system prompt on purpose to see one fail.
4. **BakeBuddy taste test.** Launch it, set the spending limit together, run the tests live, then let learners build. Look at the test list and the README results.

## End of sprint review

Tick each one when you have seen it.

- [ ] Every learner has set a spending limit in their account (they have said "done").
- [ ] Every chat route validates input, and the page shows friendly errors for empty, too long and too many messages.
- [ ] Customer messages are wrapped in tags and the system prompt has the injection rules.
- [ ] `max_tokens` is 500 or less and the history is trimmed.
- [ ] Every learner has at least eight tests, including two injection attempts, and `npm test` works.
- [ ] No API key, password or private data is in any prompt or repository.
- [ ] Every README has test results and one failure explained.
- [ ] Every learner has had feedback on the assignment.
