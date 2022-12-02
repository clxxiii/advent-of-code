import { readFileSync } from "fs";

const data = readFileSync("2022/data/raw/02.txt")
  .toString()
  .split("\n")
  .filter((x) => x != "");

let total = 0;
for (const line of data) {
  let moves = line.split(" ");
  let score = calculateRound(moves[0], moves[1]);
  console.log(`${line} Score: ${score}`);
  total += score;
}
console.log(`Total: ${total}`);

function calculateRound(them: string, outcome: string): number {
  let score = 0;
  let outcomeScore = { X: 0, Y: 3, Z: 6 };
  score += outcomeScore[outcome];

  // Find Rock from outcome
  if (
    (outcome == "Y" && them == "A") ||
    (outcome == "X" && them == "B") ||
    (outcome == "Z" && them == "C")
  ) {
    score += 1;
    // Find Paper from outcome
  } else if (
    (outcome == "Z" && them == "A") ||
    (outcome == "Y" && them == "B") ||
    (outcome == "X" && them == "C")
  ) {
    score += 2;
  } else {
    score += 3;
  }
  return score;
}
