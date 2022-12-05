import { readFileSync } from "fs";

const data: string[] = readFileSync("2022/data/raw/04.txt")
  .toString()
  .split("\n")
  .filter((x) => x != "");

let totalContained = 0;
for (const line of data) {
  let sections: number[][] = line.split(",").map((x) => sectionToArray(x));

  // Overlap check 1
  let fullyContained1 = true;
  for (const area of sections[1]) {
    if (!sections[0].includes(area)) {
      fullyContained1 = false;
      break;
    }
  }
  // Overlap check 2
  let fullyContained2 = true;
  for (const area of sections[0]) {
    if (!sections[1].includes(area)) {
      fullyContained2 = false;
      break;
    }
  }

  if (fullyContained1 || fullyContained2) {
    totalContained++;
  }
}

console.log(totalContained);

function sectionToArray(section: string): number[] {
  let start = parseInt(section.substring(0, section.indexOf("-")));
  let end = parseInt(
    section.substring(section.indexOf("-") + 1, section.length)
  );

  let array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}
