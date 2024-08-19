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
  }else if(pattern == "\\w"){
    let found = false;
    for(let i=0;i<inputLine.length;i++){
      let ascii = inputLine.charCodeAt(i);
      if((ascii >= 48 && ascii <=59)||(ascii>=65&&ascii<=90)||(ascii>=97&&ascii<=122)||ascii==95){
        found = true;
        break;
      }
    }
    return found;
  }
  else if(pattern[0]=="[" && pattern[pattern.length-1]=="]"){
    let values = new Map;
    for(let i=1;i<pattern.length-1;i++){
      values.set(pattern[i],i);
    }
    for(let x=0;x<inputLine.length;x++){
      if(values.has(inputLine[x])){
        return true;
      }
    }
    return false;
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