---
title: Problem solving & testing
summary: Learn to break big problems into small steps, plan with pseudocode, and prove your code works with tests.
---
Imagine you cook a new dish for the first time. You do not do everything at once. You make a plan, cook in small steps, and taste as you go.

Code works the same way. You already know a lot of JavaScript: values, variables, functions, conditionals, arrays, loops and objects. That is a big toolbox. This week you learn **how to use it on a problem you have never seen before**.

You will learn two skills that professional developers use every day:

- **Problem solving.** Take a problem that feels too big. Break it into small pieces you already know how to solve.
- **Testing.** Write small checks that prove your code works. Then you can change the code later without fear.

We start in the browser with `console.assert`. It needs nothing new. Then we install **Node.js** and a testing tool called **Jest**. With Jest you run many tests with one command and see clear red and green results. Real companies use this kind of setup.

Testing may feel strange at first. That is normal. It is like tasting your food before you serve it. It takes a moment, and it saves you from serving something terrible.

## By the end of this week you will be able to

- Break a problem into smaller sub-problems and write the steps as pseudocode
- Turn acceptance criteria into test cases, including edge cases
- Check your functions with `console.assert` in the browser
- Install Node.js, set up a project with npm, and run tests with Jest
- Read Jest's output to find out which tests pass and which fail
- Improve (refactor) your code safely, using tests as a safety net

## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: Breaking problems down
- [ ] Read: From acceptance criteria to test cases
- [ ] Read: Testing with Node, npm and Jest
- [ ] Read: More Jest, and refactoring safely

**Do**
- [ ] Write pseudocode for `getInitials`, then turn it into working code
- [ ] Write the `isTeenager` assertions with `console.assert` before you write the function
- [ ] Install Node.js, create a project with `npm init -y`, install Jest and run `npm test`
- [ ] Finish the assignment: Test-first functions

**Share**
- [ ] Submit your work and read your instructor's feedback

<!-- instructor -->
## Day plan

### Learning objectives
- Learners can split a problem into steps and write pseudocode.
- Learners can turn acceptance criteria into test cases, including edge cases.
- Learners can set up Node, npm and Jest and run their tests.
- Learners can refactor in small steps while the tests stay green.

### Purpose
Until now learners wrote code that "looked right". This week they learn to plan and to prove that code works. It prepares them for the DOM weeks, where bugs are harder to see, and for the final project.

### Agenda
1. **Breaking problems down.** Teach decomposition, the three questions and pseudocode, using `countVowels`. Learners try `getInitials`.
2. **From acceptance criteria to test cases.** Teach test cases and edge cases, and use `console.assert` on `formatPrice`. Learners write assertions for `isTeenager` first.
3. **Testing with Node, npm and Jest.** Do the set-up together, step by step, and fix install problems before moving on. Change `sum` to a wrong version on purpose and read the red report.
4. **More Jest, and refactoring safely.** Teach `describe`, `toBe`, `toEqual` and `toThrow`. Refactor `getShippingCost` in small steps and run the tests each time.
5. **Test-first functions.** Launch the assignment. Demonstrate one failing test, then make it pass. Check that `npm test` works for everyone before they start alone.

## End of sprint review

Tick each one when you have seen it.

- [ ] Every learner has Node and npm working (`node --version` shows a number).
- [ ] Every learner has run `npm test` on a Jest project and seen both a green and a red result.
- [ ] Every learner can explain what a test case and an edge case are.
- [ ] Every learner wrote tests first for at least one function, as shown in their commits.
- [ ] Every learner's repository is public and has a `.gitignore` that ignores `node_modules`.
- [ ] Every learner's tests pass after `npm install` then `npm test`.
- [ ] Every learner has had feedback on the assignment.
