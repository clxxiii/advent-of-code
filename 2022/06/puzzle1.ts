import { readFileSync } from "fs";

let data = readFileSync("./2022/data/raw/06.txt").toString();

let startPosition;
for (let i = 4; i < data.length; i++) {
  let startCode = data.substring(i - 4, i);
  console.log(startCode);
  let uniqueCheck = new Set(startCode.split(""));
  if (uniqueCheck.size == startCode.length) {
    startPosition = i;
    break;
  }
}

console.log(startPosition);
