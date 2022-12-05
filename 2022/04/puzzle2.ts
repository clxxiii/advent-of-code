import { readFileSync } from "fs";

const data: string[] = readFileSync("2022/data/raw/04.txt")
  .toString()
  .split("\n")
  .filter((x) => x != "");

let totalContained = 0;
for (const line of data) {
  let sections: number[][] = line.split(",").map((x) => sectionToArray(x));
  console.log(sections[0].toString());
  console.log(sections[1].toString());

  // Overlap check 1
  let overlaps1 = false;
  for (const area of sections[1]) {
    if (sections[0].includes(area)) {
      overlaps1 = true;
      break;
    }
  }

  console.log(overlaps1);
  if (overlaps1) {
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
