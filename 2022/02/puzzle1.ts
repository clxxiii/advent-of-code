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

function calculateRound(them: string, me: string): number {
  let score = 0;
  let shapeScore = { X: 1, Y: 2, Z: 3 };
  score += shapeScore[me];

  if (
    (me == "X" && them == "A") ||
    (me == "Y" && them == "B") ||
    (me == "Z" && them == "C")
  ) {
    score += 3;
  } else if (
    (me == "X" && them == "C") ||
    (me == "Y" && them == "A") ||
    (me == "Z" && them == "B")
  ) {
    score += 6;
  } else {
    score += 0;
  }
  return score;
}
