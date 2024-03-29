import { readFileSync } from "fs";

const data: string[] = readFileSync("2022/data/raw/02.txt")
  .toString()
  .split("\n")
  .filter((x) => x != "");

let total: number = 0;
for (const line of data) {
  let moves: string[] = line.split(" ");
  let score: number = calculateRound(moves[0], moves[1]);
  console.log(`${line} Score: ${score}`);
  total += score;
}
console.log(`Total: ${total}`);

function calculateRound(them: string, me: string): number {
  let score: number = 0;
  let shapeScore: object = { X: 1, Y: 2, Z: 3 };
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
