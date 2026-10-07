---
title: Functions, decisions and debugging
summary: Package your code into reusable functions, teach your programs to make decisions, and learn calm, practical ways to find and fix bugs.
---
Last week, every program you wrote ran from top to bottom, once, in the same way each time. That is useful. But real programs need more. They must do the same job many times with different information. They must also choose what to do in different situations.

This week you learn two tools for this.

- **Functions** wrap up a job and give it a name. You can use it again and again. It is like a recipe card you pull out when you need it.
- **Conditions** (`if` and `else`) let your program make decisions. It is like a sat nav that picks a new route when a road is closed.

You also learn one of the most useful skills in programming: **debugging**. Your code will break. Everybody's code breaks, every day. An experienced developer does not make fewer mistakes than a beginner. They have a calm routine for finding them.

## By the end of this week you will be able to

- Write and call functions that take parameters and return values
- Explain the difference between `return` and `console.log`
- Compare values with `===`, `<`, `>` and friends, and combine conditions with `&&`, `||` and `!`
- Use `if`, `else if` and `else` to make your code choose between options
- Read an error message and say what type of error it is and which line caused it
- Debug code with `console.log` and breakpoints in Chrome DevTools

## Backlog

Tick each one as you finish it.

**Prep (read these first)**
- [ ] Read: Functions - reusable recipes
- [ ] Read: Return vs console.log, and scope
- [ ] Read: Making decisions with if and else
- [ ] Read: Reading errors and debugging

**Do**
- [ ] Fix the three broken functions in the Try it from the return and scope lesson
- [ ] Set a breakpoint in Chrome DevTools using `debug.html` and `debug.js`
- [ ] Finish the assignment: Useful functions
- [ ] Finish the assignment: Fix the bugs

**Share**
- [ ] Submit both assignments and read your instructor's feedback

<!-- instructor -->
## Day plan

### Learning objectives
- Learners can write and call functions with parameters and return values.
- Learners can explain `return` against `console.log`, and local against global scope.
- Learners can use `if`, `else if`, `else` and the logical operators.
- Learners can read an error message and debug with `console.log` and a breakpoint.

### Purpose
Week 6 gave learners variables and operators. This week they group code into functions and make it choose. Week 8 uses functions and decisions on arrays, loops and objects.

### Agenda
1. **Functions - reusable recipes.** Declare, call, parameters against arguments, and `return`. Learners write `minutesToSeconds` and `makeShout`.
2. **Return vs console.log, and scope.** Run `addLogged` and `addReturned`. Learners fix the three broken functions in the Try it, which are broken on purpose.
3. **Making decisions with if and else.** Teach `===`, `else if` order and `&&`, `||`, `!`. Learners complete `getWeatherAdvice`.
4. **Reading errors and debugging.** Read an error in three parts and show the three error types. Learners fix `applyDiscount` and try a breakpoint.
5. **Useful functions.** Launch the `check` helper and demonstrate `getGrade`. Learners build the functions and test edge cases.
6. **Fix the bugs.** Say the snippets are broken on purpose. Fix snippet 1 together, then learners do the rest and write explanations.

## End of sprint review

Tick each one when you have seen it.

- [ ] Every learner can write a function with a parameter and call it.
- [ ] Every learner can explain why a function with no `return` gives `undefined`.
- [ ] Every learner uses `===` and not `==` in their assignment.
- [ ] Every learner's `functions.js` runs with no errors and shows PASS or FAIL lines.
- [ ] Every learner has fixed all four snippets in `fixed.js`.
- [ ] Every learner has named the error type for each snippet that gives an error.
- [ ] Every learner has used `console.log` or a breakpoint to debug at least once.
- [ ] Every learner has had feedback on both assignments.
