// The Lexer logic
function tokenize(sourceCode) {
  const tokens = [];
  let current = 0;

  while (current < sourceCode.length) {
    let char = sourceCode[current];

    if (/\s/.test(char)) { current++; continue; }
    if (char === "=") { tokens.push({ type: TokenType.EQUALS, value: "=" }); current++; continue; }
    if (char === "+") { tokens.push({ type: TokenType.PLUS, value: "+" }); current++; continue; }

    // Numbers
    if (/[0-9]/.test(char)) {
      let num = "";
      while (current < sourceCode.length && /[0-9]/.test(sourceCode[current])) {
        num += sourceCode[current];
        current++;
      }
      tokens.push({ type: TokenType.NUMBER, value: num });
      continue;
    }

    // Words (Identifiers or Keywords)
    if (/[a-zA-Z]/.test(char)) {
      let text = "";
      while (current < sourceCode.length && /[a-zA-Z0-9_]/.test(sourceCode[current])) {
        text += sourceCode[current];
        current++;
      }
      // Check for our new keyword "say"
      if (text === "say") {
        tokens.push({ type: TokenType.SAY, value: "say" });
      } else {
        tokens.push({ type: TokenType.IDENTIFIER, value: text });
      }
      continue;
    }

    throw new Error(`Unexpected character: '${char}'`);
  }

  tokens.push({ type: TokenType.EOF, value: "EOF" });
  return tokens;
}

// Event Listener for the Run Button
document.getElementById("run-btn").addEventListener("click", () => {
  const code = document.getElementById("code-editor").value;
  const output = document.getElementById("terminal-output");
  try {
    const tokens = tokenize(code);
    output.innerText = JSON.stringify(tokens, null, 2);
  } catch (e) {
    output.innerText = e.message;
  }
});
