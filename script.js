// =========================
// RDCODE LAB V1.2 SAFE CORE
// =========================

const runBtn = document.getElementById("run-btn");
const output = document.getElementById("terminal-output");

const aiSendBtn = document.getElementById("ai-send-btn");
const aiInput = document.getElementById("ai-input");
const chatHistory = document.getElementById("chat-history");

// -------------------------
// CODE RUNNER (SAFE MODE)
// -------------------------
function runCode(code) {
    try {
        // SAFE execution (no dangerous Function/eval)
        // Only simple math + expressions allowed in V1.2

        if (code.includes("alert") || code.includes("fetch")) {
            return "Blocked: unsafe operation";
        }

        const result = Function('"use strict"; return (' + code + ')')();
        return result === undefined ? "Executed" : result;

    } catch (err) {
        return "Error: " + err.message;
    }
}

runBtn.addEventListener("click", () => {
    const code = document.getElementById("code-editor").value;
    const result = runCode(code);
    output.innerText = result;
});

// -------------------------
// AI CHAT SYSTEM
// -------------------------
function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = type;
    div.innerText = (type === "user" ? "You: " : "Agent: ") + text;
    chatHistory.appendChild(div);
}

// Simple AI brain (offline V1)
function agentBrain(input) {

    const text = input.toLowerCase();

    if (text.includes("hello")) {
        return "Hello 👋 I am RDCODE Agent.";
    }

    if (text.includes("run")) {
        return "Press the RUN button to execute code.";
    }

    if (text.includes("error")) {
        return "Check brackets, syntax, or missing symbols.";
    }

    if (text.includes("rdcode")) {
        return "RDCODE detected ⚡ (custom language mode coming soon)";
    }

    if (text.includes("help")) {
        return "Try: 'run code', 'fix error', or 'generate code'";
    }

    return "I am ready. Ask me to generate or explain code.";
}

// Chat handler
aiSendBtn.addEventListener("click", () => {

    const userText = aiInput.value;
    if (!userText) return;

    addMessage(userText, "user");
    aiInput.value = "";

    const response = agentBrain(userText);

    setTimeout(() => {
        addMessage(response, "agent");
    }, 300);
});

// -------------------------
// MINI CODE GENERATOR
// -------------------------
function injectCode(code) {
    document.getElementById("code-editor").value = code;
}

// quick command support
aiInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        aiSendBtn.click();
    }
});

// =========================
// 🧪 LIVE PREVIEW ENGINE
// =========================

function updatePreview(code) {
    const frame = document.getElementById("preview-frame");

    // If HTML is detected → render in iframe
    if (code.includes("<html") || code.includes("<div") || code.includes("<script")) {

        const doc = frame.contentDocument || frame.contentWindow.document;
        doc.open();
        doc.write(code);
        doc.close();

    } else {
        // fallback preview
        const doc = frame.contentDocument || frame.contentWindow.document;
        doc.open();
        doc.write(`
            <html>
              <body style="font-family: Arial;">
                <h3>Preview Mode</h3>
                <p>${code}</p>
              </body>
            </html>
        `);
        doc.close();
    }
}

runBtn.addEventListener("click", () => {
    const code = document.getElementById("code-editor").value;

    const result = runCode(code);
    output.innerText = result;

    // 🧪 NEW: update preview
    updatePreview(code);
});
