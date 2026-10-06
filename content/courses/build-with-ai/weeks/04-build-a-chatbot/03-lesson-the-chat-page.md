---
title: The chat page
kind: lesson
minutes: 30
---
Think of a restaurant order slip. The customer writes the order on a small piece of paper, and gives it to the waiter. The waiter brings back food. The customer never sees the kitchen. All the customer needs is paper, a pen and a table.

Your chat page is that table. It has a place to write (a form), a place to read the replies (a message list), and a notebook (the history list). Everything else happens on your server. You only need HTML, CSS and JavaScript, which you already know.

## What the page does

1. The customer types a message and presses **Send**.
2. The page adds the message to the screen and to the **history** list.
3. The page sends the whole history to `POST /api/chat`.
4. The server answers with `{ "reply": "..." }`.
5. The page adds the reply to the screen and to the history.

The history list lives in the page. It is the notebook from lesson 1.

> 💡 **Tip:** The page and the server run from the same address (`http://localhost:3000`). So the page can call `/api/chat` with no full address, and there are no cross-site problems.

## The three files

Put these in your `public` folder. First `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>BakeBuddy</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main>
      <h1>BakeBuddy</h1>
      <div id="messages" aria-live="polite"></div>
      <form id="chat-form">
        <input id="chat-input" type="text" placeholder="Ask about our bread..." autocomplete="off" required />
        <button id="send-button" type="submit">Send</button>
      </form>
    </main>
    <script src="script.js"></script>
  </body>
</html>
```

You can press **Try it** on this block to see how the page looks. The playground has no server, so sending a message will not work there. That is expected. It only works when you run your own server.

Next `public/style.css`:

```css
body {
  font-family: system-ui, sans-serif;
  background: #fff8f0;
  margin: 0;
}
main {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}
#messages {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 300px;
  margin-bottom: 12px;
}
.message {
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 12px;
  white-space: pre-wrap;
}
.user {
  align-self: flex-end;
  background: #ffd9a8;
}
.assistant {
  align-self: flex-start;
  background: #ffffff;
  border: 1px solid #e5d5c0;
}
.error {
  align-self: center;
  color: #a00000;
}
form {
  display: flex;
  gap: 8px;
}
input {
  flex: 1;
  padding: 8px;
}
```

Finally `public/script.js`. This file calls your own server, so it only works with the server running. We show it as plain text so the playground does not try to run it:

```text
const form = document.querySelector("#chat-form");
const input = document.querySelector("#chat-input");
const button = document.querySelector("#send-button");
const messagesBox = document.querySelector("#messages");

const history = [];

function addMessage(text, kind) {
  const div = document.createElement("div");
  div.className = "message " + kind;
  div.textContent = text;
  messagesBox.appendChild(div);
  messagesBox.scrollTop = messagesBox.scrollHeight;
  return div;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  input.value = "";
  button.disabled = true;
  addMessage(text, "user");
  history.push({ role: "user", content: text });
  const waiting = addMessage("BakeBuddy is thinking...", "assistant");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    waiting.textContent = data.reply;
    history.push({ role: "assistant", content: data.reply });
  } catch (error) {
    waiting.remove();
    history.pop();
    addMessage(error.message, "error");
  } finally {
    button.disabled = false;
    input.focus();
  }
});
```

## Read the script

- **`addMessage`** makes a new `div`, fills it with text, adds it to the page and scrolls down. It returns the `div`, so we can change it later.
- **`event.preventDefault()`** stops the browser from reloading the page when the form is sent.
- **`history`** is the notebook. We push the customer's message before the call. We push the reply after it works.
- **"BakeBuddy is thinking..."** is a placeholder. When the reply arrives, we replace its text. The customer always knows something is happening.
- **`button.disabled = true`** stops double sends while we wait.
- **`catch`** shows the error on the page. We also remove the failed message from `history`, so the notebook stays correct.
- **`finally`** runs after success or failure. It turns the button back on.

> ⚠️ **Watch out:** We use `textContent`, not `innerHTML`. If the AI (or a customer) wrote some HTML like `<img src=x onerror=...>`, `innerHTML` would run it. `textContent` shows it as harmless text.

## Run the whole product

Make sure the server from lesson 2 is running:

```bash
node --env-file=.env server.js
```

Open `http://localhost:3000` in your browser. Ask: "Hi, I'm Tolu. Do you sell bread?" Then ask: "What is my name?" If BakeBuddy knows, your notebook works.

### Try it

1. Stop the server and send a message. What does the page show?
2. Open DevTools, go to the **Network** tab, and send a message. Click the `chat` request. What is in the **Payload** tab?

<details><summary>Show answers</summary>

1. The "thinking" text disappears and a red error message shows, because the `fetch` could not connect. Your `catch` block did its job.
2. A JSON body with a `messages` list: every message so far, alternating `user` and `assistant`. You can see the notebook travel to the server.

</details>

## Check your understanding

1. Why does the page keep a `history` list?
2. Why do we write `history.pop()` in the `catch` block?
3. What is the difference between `textContent` and `innerHTML`, and why does it matter?
4. Why can the page call `/api/chat` without a full address?

<details><summary>Show answers</summary>

1. The AI has no memory. The page sends the whole list each time so the server can pass it on.
2. The customer's message was added before the call. If the call fails, we remove it so the list stays in step with what the AI has really answered.
3. `textContent` shows text as text. `innerHTML` reads it as HTML and may run harmful code. Use `textContent` for anything a user or the AI wrote.
4. The page and the server come from the same address, so a short path works.

</details>

> 🧠 **Remember:** The page is a table with paper and a pen. It keeps the notebook, sends all of it to your server, and shows what comes back. The key never touches the page.

## Go deeper

- [MDN: Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
- [MDN: FormData and form submit event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)
- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
