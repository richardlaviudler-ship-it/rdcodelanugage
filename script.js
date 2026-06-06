// 1. Define the Token Types for rdcodelanugage
const TokenType = {
  NUMBER: "NUMBER",
  IDENTIFIER: "IDENTIFIER",
  EQUALS: "EQUALS",
  PLUS: "PLUS",
  EOF: "EOF" // End of File
};

// 2. The Lexer Function
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
    throw new Error(`Unexpected character: ${char} at position ${current}`);
  }

  tokens.push({ type: TokenType.EOF, value: "EOF" });
  return tokens;
}

// 3. Test it out
const myCode = "score = 100 + 50";
console.log(tokenize(myCode));
