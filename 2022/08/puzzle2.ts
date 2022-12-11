import { readFileSync } from "fs";

type tree = {
  num: number;
  view: number;
};

let data: tree[][] = readFileSync("2022/data/raw/08.txt")
  .toString()
  .split("\n")
  .filter((x) => x != "")
  .map((x) =>
    x.split("").map((x) => {
      return { num: parseInt(x), view: 0 };
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
    let topView = 0;
    for (let rowCheck = rowNum - 1; rowCheck >= 0; rowCheck--) {
      topView++;
      if (data[rowCheck][cell].num >= data[rowNum][cell].num) {
        break;
      }
    }

    // Check lower edge
    let bottomView = 0;
    for (let rowCheck = rowNum + 1; rowCheck <= data.length - 1; rowCheck++) {
      bottomView++;
      if (data[rowCheck][cell].num >= data[rowNum][cell].num) {
        break;
      }
    }
    // Check left edge
    let leftView = 0;
    for (let cellCheck = cell - 1; cellCheck >= 0; cellCheck--) {
      leftView++;
      if (data[rowNum][cellCheck].num >= data[rowNum][cell].num) {
        break;
      }
    }
    // Check right edge
    let rightView = 0;
    for (let cellCheck = cell + 1; cellCheck <= data.length - 1; cellCheck++) {
      rightView++;
      if (data[rowNum][cellCheck].num >= data[rowNum][cell].num) {
        break;
      }
    }
    data[rowNum][cell].view = topView * bottomView * leftView * rightView;
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
      rowString += `${cell.view} `;
    }
    string += rowString + "\n";
  }

  console.log(string);
}

function getAnswerFromMap(map: tree[][]): number {
  let highest = 0;
  for (const row of map) {
    for (const cell of row) {
      if (cell.view > highest) highest = cell.view;
    }
  }
  return highest;
}
