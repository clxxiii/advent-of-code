import { readFileSync } from "fs";

let data = readFileSync("./2022/data/raw/05.txt").toString();

let [stack, directionsString] = data.split("\r\n\r\n");
let stacksString = stack.split("\r\n");

let stacks = [];
for (const row of stacksString) {
	let blocks = [];
	for (let i = 0; i < row.length; i += 4) {
		let block = row
			.substring(i, i + 4)
			.trim()
			.replace("[", "")
			.replace("]", "");
		blocks.push(block);
	}
	if (blocks[0] != "1") {
		stacks.push(blocks);
	}
}
console.log("Starting position:");
printStacks();
let directions = [];
for (const line of directionsString.split("\r\n")) {
	let test = line.match(/move (\d+) from (\d+) to (\d+)/);

	if (!test) continue;

	let object = {
		move: parseInt(test[1]),
		from: parseInt(test[2]),
		to: parseInt(test[3]),
	};
	directions.push(object);
}

for (const direction of directions) {
	let { move, from, to } = direction;
	for (let i = 0; i < move; i++) {
		console.log(`from ${from} to ${to}`);

		// Find top box in column
		let topbox = "";
		for (const row of stacks) {
			if (row[from - 1] != "") {
				topbox = row[from - 1];
				row[from - 1] = "";
				break;
			}
		}

		// Loop down each row until you find a place to put the box ( or make one)
		for (let i = 0; i < stacks.length; i++) {
			let row = stacks[i];

			if (i == 0 && row[to - 1] != "") {
				addRow();
				stacks[0][to - 1] = topbox;
				break;
			}

			if (row[to - 1] != "") {
				stacks[i - 1][to - 1] = topbox;
				break;
			}

			if (i == stacks.length - 1) {
				stacks[i][to - 1] = topbox;
				break;
			}
		}
		// printStacks();
		// console.log("");
	}
}
printStacks();

function printStacks() {
	for (const row of stacks) {
		let cell = "";
		for (const box of row) {
			if (box == "") {
				cell += "    ";
			} else {
				cell += `[${box}] `;
			}
		}
		console.log(cell);
	}
}

function addRow() {
	stacks.reverse();
	let row = [];
	for (const _ of stacks[0]) {
		row.push("");
	}
	stacks.push(row);
	stacks.reverse();
}
