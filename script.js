// ==========================================
// 1. RDCODELANUGAGE LEXER ENGINE
// ==========================================

const TokenType = {
  NUMBER: "NUMBER",
  IDENTIFIER: "IDENTIFIER",
  EQUALS: "EQUALS",
  PLUS: "PLUS",
  EOF: "EOF"
};

function tokenize(sourceCode) {
  const tokens = [];
  let current = 0;

  while (current < sourceCode.length) {
    let char = sourceCode[current];

    // Skip whitespace
    if (/\s/.test(char)) {
      current++;
      continue;
    }

    // Match Operators
    if (char === "=") {
      tokens.push({ type: TokenType.EQUALS, value: "=" });
      current++;
      continue;
    }
    if (char === "+") {
      tokens.push({ type: TokenType.PLUS, value: "+" });
      current++;
      continue;
    }

    // Match Numbers
    if (/[0-9]/.test(char)) {
      let num = "";
      while (current < sourceCode.length && /[0-9]/.test(sourceCode[current])) {
        num += sourceCode[current];
        current++;
      }
      tokens.push({ type: TokenType.NUMBER, value: num });
      continue;
    }

    // Match Identifiers (Variables or Keywords)
    if (/[a-zA-Z]/.test(char)) {
      let text = "";
      while (current < sourceCode.length && /[a-zA-Z0-9_]/.test(sourceCode[current])) {
        text += sourceCode[current];
        current++;
      }
      tokens.push({ type: TokenType.IDENTIFIER, value: text });
      continue;
    }

    // If we hit an unknown character, throw an error
    throw new Error(`Unexpected character: '${char}' at position ${current}`);
  }

  tokens.push({ type: TokenType.EOF, value: "EOF" });
  return tokens;
}

// ==========================================
// 2. IDE INTERFACE CONNECTION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const runBtn = document.getElementById("run-btn");
  const codeEditor = document.getElementById("code-editor");
  const terminalOutput = document.getElementById("terminal-output");

  // Make the tab show your new extension
  document.querySelector('.tab').innerText = "main.rdc";

  runBtn.addEventListener("click", () => {
    const rawCode = codeEditor.value;
    
    // Clear terminal and start
    terminalOutput.innerHTML = "> Compiling main.rdc...\n\n";

    if (rawCode.trim() === "") {
      terminalOutput.innerHTML += "Error: No code to run.\n";
      return;
    }

    try {
      // Run the code through your Lexer
      const tokens = tokenize(rawCode);
      
      // Print the Tokens to the terminal so you can see it working!
      tokens.forEach(token => {
        terminalOutput.innerHTML += `[${token.type.padEnd(10)}] : ${token.value}\n`;
      });
      
      terminalOutput.innerHTML += "\n> Lexing successful.\n";

    } catch (error) {
      // If the Lexer crashes (e.g. unknown character), print it in red
      terminalOutput.innerHTML += `<span style="color: #ff5555;">Syntax Error: ${error.message}</span>\n`;
    }
  });
});
