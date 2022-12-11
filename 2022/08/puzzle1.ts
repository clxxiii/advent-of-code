import { readFileSync } from "fs";

type tree = {
  num: number;
  vis: boolean;
};

let data: tree[][] = readFileSync("2022/data/raw/08.txt")
  .toString()
  .split("\n")
  .filter((x) => x != "")
  .map((x) =>
    x.split("").map((x) => {
      return { num: parseInt(x), vis: true };
    })
  );

// Set borders to visible
for (let rowNum = 0; rowNum < data.length; rowNum++) {
  let row = data[rowNum];
  for (let cell = 0; cell < row.length; cell++) {
    // Tree is on the outer edge
    if (rowNum == 0 || rowNum == data.length - 1) {
      continue;
    }

    if (cell == 0 || cell == row.length - 1) {
      continue;
    }

    // Check upper edge
    let visible = true;
    for (let rowCheck = 0; rowCheck < rowNum; rowCheck++) {
      if (data[rowCheck][cell].num >= data[rowNum][cell].num) {
        visible = false;
        break;
      }
    }
    if (visible) {
      continue;
    }

    // Check lower edge
    visible = true;
    for (let rowCheck = data.length - 1; rowCheck > rowNum; rowCheck--) {
      if (data[rowCheck][cell].num >= data[rowNum][cell].num) {
        visible = false;
        break;
      }
    }
    if (visible) {
      continue;
    }
    // Check left edge
    visible = true;
    for (let cellCheck = 0; cellCheck < cell; cellCheck++) {
      if (data[rowNum][cellCheck].num >= data[rowNum][cell].num) {
        visible = false;
        break;
      }
    }
    if (visible) {
      continue;
    }
    // Check right edge
    visible = true;
    for (let cellCheck = row.length - 1; cellCheck > cell; cellCheck--) {
      if (data[rowNum][cellCheck].num >= data[rowNum][cell].num) {
        visible = false;
        break;
      }
    }
    if (visible) {
      continue;
    }

    data[rowNum][cell].vis = false;
  }
}

printMap(data);

let answer: number = getAnswerFromMap(data);
console.log(answer);

// Helper Functions
function printMap(map: tree[][]) {
  let string = "";
  for (const row of map) {
    let rowString = "";

    for (const cell of row) {
      rowString += cell.vis ? "X" : "O";
    }
    string += rowString + "\n";
  }

  console.log(string);
}

function getAnswerFromMap(map: tree[][]): number {
  let trueMap: (0 | 1)[][] = map.map((x) => x.map((j) => (j.vis ? 1 : 0)));
  let flatten: number[] = trueMap.map((x) => {
    let sum = 0;
    for (const num of x) sum += num;
    return sum;
  });
  let sum: number = 0;
  for (const num of flatten) sum += num;
  return sum;
}
