import { readFileSync, writeFileSync } from "fs";
import decode from "./decoder.js";
import drawMap from "./drawMap.js";

let data = decode(readFileSync("./data/given/05.txt").toString());

// Only consider horizontal and vertical lines
data = data.filter((line) => {
	return line.from.x == line.to.x || line.from.y == line.to.y;
});

// Fill an array with zeroes
let canvasSize = 10;
let canvas = [];
for (let x = 0; x < canvasSize; x++) {
	let row = [];
	for (let y = 0; y < canvasSize; y++) {
		row.push(0);
	}
	canvas.push(row);
}

for (const line of data) {
	if (line.from.y == line.to.y) {
		if (line.from.x < line.to.x) {
			for (let i = line.from.x; i <= line.to.x; i++) {
				canvas[line.from.y][i] += 1;
			}
		}

		if (line.from.x > line.to.x) {
			for (let i = line.from.x; i >= line.to.x; i--) {
				canvas[line.from.y][i] += 1;
			}
		}

		if (line.from.x == line.to.x) {
			canvas[line.from.y][line.from.x] += 1;
		}
	}

	if (line.from.x == line.to.x) {
		if (line.from.y < line.to.y) {
			for (let i = line.from.y; i <= line.to.y; i++) {
				canvas[i][line.from.x] += 1;
			}
		}

		if (line.from.y > line.to.y) {
			for (let i = line.from.y; i >= line.to.y; i--) {
				canvas[i][line.from.x] += 1;
			}
		}

		if (line.from.y == line.to.y) {
			canvas[line.from.y][line.from.x] += 1;
		}
	}
}

// Count the cells higher than two
let overlaps = 0;
for (const line of canvas) {
	for (const cell of line) {
		if (cell >= 2) {
			overlaps++;
		}
	}
}

console.log("Number of overlaps: " + overlaps);
drawMap(data, canvasSize);
