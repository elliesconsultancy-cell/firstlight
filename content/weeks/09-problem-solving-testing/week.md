---
title: Problem solving & testing
summary: Learn to break big problems into small steps, plan with pseudocode, and prove your code works with tests.
---
You now know a lot of JavaScript: values, variables, functions, conditionals, arrays, loops and objects. That is a big toolbox. But knowing the tools is only half the job. The other half is knowing **how to use them on a problem you have never seen before**.

This week is about two skills that professional developers use every single day. The first is **problem solving**: taking a problem that feels too big, and breaking it into small pieces you already know how to solve. The second is **testing**: writing small checks that prove your code does what it should, so you can change it later without fear.

We start in the browser with `console.assert`, which needs nothing new. Then we install **Node.js** and a testing tool called **Jest**, so you can run lots of tests with one command and see clear red and green results. This is the same kind of setup you will find in real companies.

Do not worry if testing feels strange at first. It is a bit like checking a recipe by tasting the food: it takes a moment, but it saves you from serving something terrible.

## By the end of this week you will be able to

- Break a problem into smaller sub-problems and write the steps as pseudocode
- Turn acceptance criteria into test cases, including edge cases
- Check your functions with `console.assert` in the browser
- Install Node.js, set up a project with npm, and run tests with Jest
- Read Jest's output to find out which tests pass and which fail
- Improve (refactor) your code safely, using tests as a safety net
