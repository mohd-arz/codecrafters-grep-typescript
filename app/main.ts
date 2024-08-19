export {};

const args = process.argv;
const pattern = args[3];

const inputLine: string = await Bun.stdin.text();

function matchPattern(inputLine: string, pattern: string): boolean {
  if(pattern == "\\d"){
    let found = false;
    for(let i=0;i<inputLine.length;i++){
      let ascii = inputLine.charCodeAt(i);
      if(ascii >= 48 && ascii <=59){
        found = true;
        break;
      }
    }
    return found;
  }
  else if (pattern.length === 1) {
    return inputLine.includes(pattern);
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
  console.log('matched');
  process.exit(0);
} else {
  console.log('not matched');
  process.exit(1);
}