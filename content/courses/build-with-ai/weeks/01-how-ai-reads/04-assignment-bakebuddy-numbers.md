---
title: BakeBuddy numbers
kind: assignment
submission: text
---
## What you'll build

A one-page **numbers sheet** for BakeBuddy. You will estimate how many tokens a typical conversation uses, and what a month of customers might cost. No real account is needed. You will use example prices and say clearly that they are examples.

You can swap the bakery for your own idea (a gym, a school, a shop). Keep it small and realistic.

## Requirements

- [ ] You write a short BakeBuddy "instruction" text (3 to 5 lines) and estimate its tokens
- [ ] You write one customer message and one BakeBuddy reply, and estimate the tokens of each
- [ ] You show your sums: characters divided by 4, or words times 4/3
- [ ] You describe one full conversation of 5 customer messages and 5 replies, and estimate the total input tokens sent, remembering that the earlier messages are sent again each time
- [ ] You write down two example prices (input and output, per million tokens) and say they are made-up examples or copied from a pricing page, with the date
- [ ] You calculate the cost of one conversation
- [ ] You guess how many conversations BakeBuddy has per month and calculate the monthly cost
- [ ] You choose a temperature (low or high) for BakeBuddy answering opening hours, and for naming a new cake, and give one reason for each
- [ ] You write two ideas to keep the cost lower

## Steps/hints

1. Write the instruction text, for example: "You are BakeBuddy, a friendly helper for Amina's bakery. Answer in short, kind sentences."
2. Use the estimator from Lesson 1 in the playground, or count by hand. Write the result next to each text.
3. For the 5-message chat, remember the desk picture. Message 1 sends instructions plus message 1. Message 2 sends instructions, message 1, reply 1 and message 2. Add them up one by one.
4. Output tokens are the replies only. Input tokens are everything you send each time.
5. Use the cost calculator from Lesson 3. Replace the example prices if you looked at the real pricing page.
6. Show a small table of your numbers. A table of 3 columns is enough.

> 💡 **Tip:** Round your numbers. This is an estimate, so "about 120 tokens" is better than a false exact number.

> ⚠️ **Watch out:** Prices change. Do not present any price as a fact unless you read it from the pricing page and wrote down the date.

## How to submit

Paste your numbers sheet into the text box on this page. Include your texts, your sums, the table, and your answers about temperature and saving cost. Write in plain words. About 300 to 500 words is plenty.

## Stretch goals

- Estimate the cost if the chat has 20 messages instead of 5. How does the cost grow?
- Show how cost changes if the reply is limited to half as long.
- Write one sentence on how summarising old messages could save money.

<!-- instructor -->
## Instructor agenda

### Learning objectives
- Estimate tokens for instructions, a message and a reply.
- Add up the input tokens in a 5-message chat, with earlier messages resent each time.
- Estimate cost for one conversation and a month, using clearly labelled example prices.

### Purpose
Estimating size and cost is a normal first step before building any AI product. It also proves the learner understands tokens, the desk and output pricing together.

### Things to do
1. Launch it: tell learners this is a numbers sheet and no account is needed. They may swap the bakery for their own idea.
2. Demonstrate the chat sum on a board: message 1 sends instructions plus message 1; message 2 sends instructions, message 1, reply 1 and message 2. Add one line at a time.
3. Show how to use the estimator and cost calculator from the lessons, and show a small 3-column table.
4. Remind them to round numbers and to label prices as examples or as copied with a date.

### What good work looks like
- Instruction text (3 to 5 lines), one customer message and one reply each have a token estimate with the sum shown.
- The 5-message chat total counts earlier messages again each time, not just once.
- Prices are written down and labelled as made-up or copied with a date.
- Cost of one conversation and a monthly cost are both calculated.
- Temperature is chosen for opening hours and for naming a cake, each with a reason, plus two cost-saving ideas.

### Watch for
- Learners add each message only once and miss the resending. Point back to the desk picture.
- Learners mix up input and output tokens. Output is the replies only.
- Learners state prices as facts with no date or label.
