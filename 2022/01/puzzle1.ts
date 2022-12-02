import { readFileSync } from "fs";

let data = readFileSync("2022/data/raw/01.txt").toString().split("\r\n\r\n");

// Sum all elves and put them in an array.
let sums = [];
for (const chunk of data) {
  let elf = chunk
    .split("\r\n")
    .filter((x) => x != "")
    .map((x) => parseInt(x));

  let sum = 0;
  for (const calorie of elf) {
    sum += calorie;
  }
  sums.push(sum);
}

console.log(sums);

let highestLimit = 3;
let highCount = sums.sort((a, b) => b - a);
highCount.splice(highestLimit, highCount.length - 1);
console.log(highCount);

let sum = 0;
for (const num of highCount) {
  sum += num;
}
console.log(sum);
