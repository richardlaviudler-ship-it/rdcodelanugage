// =========================
// RDCODE LAB V1.5 CORE ENGINE
// =========================

// -------------------------
// UI ELEMENTS
// -------------------------
const runBtn = document.getElementById("run-btn");
const output = document.getElementById("terminal-output");
const editor = document.getElementById("code-editor");

// -------------------------
// SAFE JS RUNNER
// -------------------------
function runJS(code) {
    try {
        return Function('"use strict"; return (' + code + ')')();
    } catch (e) {
        return "JS Error: " + e.message;
    }
}

// -------------------------
// RDCODE ENGINE (V1.5)
// -------------------------
function runRDCODE(code) {
    const lines = code.split("\n");
    let memory = {};

    for (let line of lines) {
        line = line.trim();

        if (!line) continue;

        // let x = 10
        if (line.startsWith("let ")) {
            let [key, value] = line.replace("let ", "").split("=");
            memory[key.trim()] = eval(value);
        }

        // print(x)
        else if (line.startsWith("print(")) {
            let inside = line.slice(6, -1);
            let result = eval(inside);
            console.log(result);
            return result;
        }

        // direct assignment
        else if (line.includes("=")) {
            let [key, value] = line.split("=");
            memory[key.trim()] = eval(value);
        }
    }

    return memory;
}

// -------------------------
// CODE RUN CONTROLLER
// -------------------------
runBtn.addEventListener("click", () => {
    const code = editor.value;

    let result;

    // detect RDCODE
    if (code.includes("let ") || code.includes("print(")) {
        result = runRDCODE(code);
    } else {
        result = runJS(code);
    }

    output.innerText =
        typeof result === "object"
            ? JSON.stringify(result, null, 2)
            : result;

    updatePreview(code);
});

// -------------------------
// LIVE PREVIEW ENGINE
// -------------------------
function updatePreview(code) {
    const frame = document.getElementById("preview-frame");

    if (!frame) return;

    const doc = frame.contentDocument || frame.contentWindow.document;

    if (code.includes("<html") || code.includes("<body")) {
        doc.open();
        doc.write(code);
        doc.close();
    } else {
        doc.open();
        doc.write(`
            <html>
                <body style="font-family: Arial; padding: 10px;">
                    <h3>RDCODE Preview</h3>
                    <pre>${code}</pre>
                </body>
            </html>
        `);
        doc.close();
    }
}

// -------------------------
// SIMPLE AI AGENT (OFFLINE)
// -------------------------
const aiSendBtn = document.getElementById("ai-send-btn");
const aiInput = document.getElementById("ai-input");
const chatHistory = document.getElementById("chat-history");

function addMsg(text, who) {
    const div = document.createElement("div");
    div.textContent = (who === "user" ? "You: " : "Agent: ") + text;
    chatHistory.appendChild(div);
}

function agentBrain(input) {
    input = input.toLowerCase();

    if (input.includes("hello")) return "Hi 👋 I am RDCODE V1.5 Agent";
    if (input.includes("run")) return "Click RUN to execute code.";
    if (input.includes("rdcode")) return "RDCODE mode active ⚡";
    if (input.includes("help")) return "Try: write code, run code, or ask explanation";

    return "Ready. I can assist with your code.";
}

aiSendBtn.addEventListener("click", () => {
    const text = aiInput.value;
    if (!text) return;

    addMsg(text, "user");
    aiInput.value = "";

    setTimeout(() => {
        addMsg(agentBrain(text), "agent");
    }, 250);
});
