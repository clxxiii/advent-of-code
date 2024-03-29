import { readFileSync } from "fs";

let data: Array<number> = readFileSync("2021/data/raw/01.txt")
  .toString()
  .split("\r\n")
  .map((x) => parseInt(x));

let incrementCounter = 0;
for (let i = 3; i < data.length; i++) {
  let window1 = data[i - 3] + data[i - 2] + data[i - 1];
  let window2 = data[i - 2] + data[i - 1] + data[i];

  if (window2 > window1) {
    incrementCounter++;
  }
}

console.log(incrementCounter);
