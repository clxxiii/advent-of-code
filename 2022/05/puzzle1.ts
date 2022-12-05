import {readFileSync} from "fs";

let data = readFileSync("./2022/data/given/05.txt").toString()

let [stack, directionsString] = data.split("\r\n\r\n");
let stacksString = stack.split("\r\n");

let stacks = [];
for (const row of stacksString) {
  let blocks = [];
  for (let i = 0; i < row.length; i += 4) {
    let block =
        row.substring(i, i + 4).trim().replace("[", "").replace("]", "");
    blocks.push(block);
  }
  if (blocks[0] != '1') {
    stacks.push(blocks);
  }
}
console.log("Starting position:");
printStacks()
let directions = [];
for (const line of directionsString.split("\r\n")) {
  let test = line.match(/move (\d+) from (\d+) to (\d+)/);

  if (!test)
    continue;

  let object = {
    move : parseInt(test[1]),
    from : parseInt(test[2]),
    to : parseInt(test[3])
  };
  directions.push(object);
}

for (const direction of directions) {
  let {move, from, to} = direction;

  for (let i = 0; i < move; i++) {
  }
}

function printStacks() {
  for (const row of stacks) {
    let cell = ""
    for (const box of row) {
      if (box == "") {
        cell += "    "
      } else {
        cell += `[${box}] `
      }
    }
    console.log(cell);
  }
}
