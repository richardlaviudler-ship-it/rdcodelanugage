// ... (Your existing tokenize function remains here) ...

// --- AI Agent logic to inject code ---
function injectCodeIntoEditor(newCode) {
    const editor = document.getElementById("code-editor");
    editor.value = newCode; // This puts the code into your Editor
    console.log("Agent injected new code into editor.");
}

// In your AI send button logic:
aiSendBtn.addEventListener("click", () => {
    const userText = aiInput.value.toLowerCase();
    addMessage(userText, "user");
    aiInput.value = "";

    // If you ask the AI for code, it generates it and injects it!
    if (userText.includes("generate")) {
        const generatedCode = "score = 100 + 50\nsay score";
        injectCodeIntoEditor(generatedCode);
        addMessage("I have generated and injected the code into your editor!", "ai");
    }
});
