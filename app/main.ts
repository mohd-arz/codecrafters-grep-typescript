export {};

const args = process.argv;
const pattern = args[3];

const inputLine: string = await Bun.stdin.text();

function getW(ascii: number): boolean {
  if (
    (ascii >= 48 && ascii <= 59) ||
    (ascii >= 65 && ascii <= 90) ||
    (ascii >= 97 && ascii <= 122) ||
    ascii == 95
  ) {
    return true;
  }
  return false;
}

function getD(ascii: number): boolean {
  if (ascii >= 48 && ascii <= 59) {
    return true;
  }
  return false;
}

function matchPattern(inputLine: string, pattern: string): boolean {
  if (pattern == "\\d") {
    let found = false;
    for (let i = 0; i < inputLine.length; i++) {
      let ascii = inputLine.charCodeAt(i);
      if (getD(ascii)) {
        found = true;
        break;
      }
    }
    return found;
  } else if (pattern == "\\w") {
    let found = false;
    for (let i = 0; i < inputLine.length; i++) {
      let ascii = inputLine.charCodeAt(i);
      if (getW(ascii)) {
        found = true;
        break;
      }
    }
    return found;
  } else if (
    pattern[0] == "[" &&
    pattern[pattern.length - 1] == "]" &&
    pattern[1] == "^"
  ) {
    let values = new Map();
    for (let i = 2; i < pattern.length - 1; i++) {
      values.set(pattern[i], i);
    }
    for (let x = 0; x < inputLine.length; x++) {
      if (values.has(inputLine[x])) {
        return false;
      }
    }
    return true;
  } else if (pattern[0] == "[" && pattern[pattern.length - 1] == "]") {
    let values = new Map();
    for (let i = 1; i < pattern.length - 1; i++) {
      values.set(pattern[i], i);
    }
    for (let x = 0; x < inputLine.length; x++) {
      if (values.has(inputLine[x])) {
        return true;
      }
    }
    return false;
  } else if (pattern.length === 1) {
    return inputLine.includes(pattern);
  } else if (pattern.length > 1 && pattern[0] == "^") {
    const compare = [];
    for (let i = 1; i < pattern.length; i++) {
      compare.push(pattern[i]);
    }
    for (let i = 0; i < compare.length; i++) {

      if (inputLine[i] != compare[i]) {
        return false;
      }
    }
    return true;
  } else if (pattern.length > 1) {
    let compare = [];
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] == "\\") {
        if (pattern[i + 1] == "d") {
          compare.push("\\d");
        } else if (pattern[i + 1] == "w") {
          compare.push("\\w");
        }
        i += 1;
        continue;
      } else {
        compare.push(pattern[i]);
      }
    }
    let compareCount = 0;
    for (let i = 0; i < inputLine.length; i++) {
      // console.log('comparing ',compare[compareCount],' = ',inputLine[i])
      if (compareCount == compare.length) {
        break;
      }
      if (compare[compareCount] == "\\w") {
        const ascii = inputLine.charCodeAt(i);
        if (getW(ascii)) {
          compareCount++;
        } else {
          if ("\\w" != compare[0]) i -= 1;
          compareCount = 0;
          continue;
        }
      } else if (compare[compareCount] == "\\d") {
        const ascii = inputLine.charCodeAt(i);
        if (getD(ascii)) {
          compareCount++;
        } else {
          if ("\\d" != compare[0]) i -= 1;
          compareCount = 0;
          continue;
        }
      } else if (inputLine[i] == compare[compareCount]) {
        compareCount++;
      } else {
        compareCount = 0;
      }
    }
    if (compareCount == compare.length) return true;
    return false;
  } else {
    throw new Error(`Unhandled pattern: ${pattern}`);
  }
}

if (args[2] !== "-E") {
  console.log("Expected first argument to be '-E'");
  process.exit(1);
}

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
if (matchPattern(inputLine, pattern)) {
  console.log("matched");
  process.exit(0);
} else {
  console.log("not matched");
  process.exit(1);
}
