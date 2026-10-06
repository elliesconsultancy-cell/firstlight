---
title: What is an agent?
kind: lesson
minutes: 25
---
Amina gives her intern a to-do list on a clipboard: "Find out if we can fill the Saturday order: 6 croissants, 2 sourdough loaves and 1 chocolate cake. Then write the customer a message."

The intern does not need Amina to say every step. The intern thinks, checks the croissants, looks at the result, checks the loaves, checks the cake, then writes the message. When every line is done, the intern stops.

That intern is the picture of an **agent**.

## What is an agent?

An **agent** is an AI that works in a loop towards a goal. It repeats this cycle:

1. **Think:** what do I still need to know?
2. **Act:** ask for a tool.
3. **Check:** read the result.
4. **Repeat** until the goal is done, or until it is stopped.

You already built this loop last lesson. The difference is who decides how many rounds it takes. In a simple chatbot, you decide. In an agent, **the model decides**, within the limits you set.

## Where the picture stops being true

A good intern has common sense. The model does not always have it. It can:

- ask for the same tool again and again with the same input
- call the wrong tool because the description was unclear
- trust a wrong result and carry on
- take many rounds, and every round costs money

So an agent is useful, but it needs a fence around it. The fence is your job.

## An example run

Customer: "Can I get 6 croissants, 2 sourdough loaves and a chocolate cake on Saturday?"

Here is what your terminal could show with a little logging:

```text
[agent] round 1: asked for check_stock {"item":"croissant"}
[agent] round 1: asked for check_stock {"item":"sourdough loaf"}
[agent] round 1: asked for check_stock {"item":"chocolate cake"}
[agent] round 2: final answer
```

The model asked for three tools in one round. Your loop ran all three. Then it wrote an answer such as "Yes to croissants and cake, but sourdough is sold out today." The sourdough count in our toy data is 0, so that makes sense.

## Four fences for every agent

| Fence | What it does |
| --- | --- |
| Loop cap | `MAX_LOOPS` stops endless rounds |
| Small `max_tokens` | Stops very long answers |
| Time limit | Stops slow runs |
| Safe tools | Only give tools that cannot do harm |

You have the first two already. Here is the time limit and a log, as two small helper functions. Paste them into `agent.js`, above `chatWithTools`:

```node
const MAX_SECONDS = 20;

export function withinTime(startedAt) {
  return Date.now() - startedAt < MAX_SECONDS * 1000;
}

export function logToolCall(loop, block) {
  console.log(`[agent] round ${loop}: asked for ${block.name}`, JSON.stringify(block.input));
}
```

In your loop, write `const startedAt = Date.now();` before the `for`. Then change the loop line to `for (let loop = 1; loop <= MAX_LOOPS && withinTime(startedAt); loop++)`. Call `logToolCall(loop, block)` for each tool block.

> 💡 **Tip:** Always log what the agent does. When something goes wrong, the log is the first place to look.

## Safe tools and risky tools

Not all tools are equal. Ask one question: **can this tool change something in the real world?**

- **Read-only tools** look but do not touch. `check_stock` is read-only. If it is called by mistake, nothing bad happens.
- **Action tools** change things: send an email, place an order, take a payment, delete a file.

Start with read-only tools. If you must give an action tool, let your code ask the human first. Here is a tool that only **prepares** an order:

```node
export function reserveItem(item, quantity) {
  return {
    status: "pending_confirmation",
    item,
    quantity,
    message: "Not placed yet. Ask the customer to confirm.",
  };
}
```

The real order is placed by a separate route, only after the customer clicks a Confirm button. The model can never press that button.

> ⚠️ **Watch out:** Never give an AI a tool that can spend money, delete data or contact people without a human saying yes. The model can be wrong, and as you will see next week, it can be tricked.

### Try it

You build a study helper agent with these tools: `search_notes`, `read_note`, `delete_note`, `send_email_to_teacher`. Which tools would you give it first, and which would need a human to confirm?

<details><summary>Show answers</summary>

Give `search_notes` and `read_note` first. They are read-only. `delete_note` and `send_email_to_teacher` change the real world, so they should wait for a human to confirm, or be left out.

</details>

## Check your understanding

1. In one sentence, what is an agent?
2. Name two things that can go wrong when a model decides how many rounds to take.
3. What is the difference between a read-only tool and an action tool?
4. Why do we log every tool call?

<details><summary>Show answers</summary>

1. An AI that loops (think, use a tool, check) until its goal is done or it is stopped.
2. It may repeat the same call, use the wrong tool, trust a wrong result, or cost a lot of money.
3. A read-only tool only looks. An action tool changes something in the real world.
4. So you can see what happened and fix problems.

</details>

> 🧠 **Remember:**
> - An agent is an intern with a to-do list: think, act, check, repeat.
> - The model decides the number of rounds, so you set the fences: loop cap, token cap, time limit.
> - Start with read-only tools and let a human confirm any action.

## Go deeper

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Claude docs: Tool use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
