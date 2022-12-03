import { readFileSync } from "fs";

const data: string[] = readFileSync("2022/data/raw/03.txt")
  .toString()
  .split("\n")
  .filter((x) => x != "");

const priority = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

let priosum = 0;
for (const line of data) {
  console.log(line);
  let segments = [];
  segments[0] = line.substring(0, line.length / 2);
  segments[1] = line.substring(line.length / 2, line.length);

  let search = segments[0].split("");
  let reference = segments[1].split("");

  let commonLetter = "";
  for (const letter of search) {
    if (reference.includes(letter)) {
      commonLetter = letter;
    }
  }
  let letterPrio = priority[commonLetter];
  console.log(`${commonLetter} (${letterPrio})`);
  priosum += letterPrio;
}

console.log(priosum);
