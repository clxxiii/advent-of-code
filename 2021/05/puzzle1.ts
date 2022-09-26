import { readFileSync } from "fs";
import decode from "./decoder.js";
import drawMap from "./drawMap.js";

let data = decode(readFileSync("./2021/data/raw/05.txt").toString());

// Only consider horizontal and vertical lines
data = data.filter((line) => {
	return line.from.x == line.to.x || line.from.y == line.to.y;
});

// Fill an array with zeroes
let canvasSize = 1000;
let canvas: number[][] = [];
for (let x = 0; x < canvasSize; x++) {
	let row: number[] = [];
	for (let y = 0; y < canvasSize; y++) {
		row.push(0);
	}
	canvas.push(row);
}

for (const line of data) {
	// Single Point
	if (line.from == line.to) {
		canvas[line.from.y][line.from.x] += 1;
	}
	// Horizontal Line
	else if (line.from.y == line.to.y) {
		// Left to right
		if (line.from.x < line.to.x) {
			for (let i = line.from.x; i <= line.to.x; i++) {
				canvas[line.from.y][i] += 1;
			}
		}

		// Right to left
		else if (line.from.x > line.to.x) {
			for (let i = line.from.x; i >= line.to.x; i--) {
				canvas[line.from.y][i] += 1;
			}
		}
	}

	// Vertical Line
	else if (line.from.x == line.to.x) {
		// Top to bottom
		if (line.from.y < line.to.y) {
			for (let i = line.from.y; i <= line.to.y; i++) {
				canvas[i][line.from.x] += 1;
			}
		}

		// Bottom to top
		else if (line.from.y > line.to.y) {
			for (let i = line.from.y; i >= line.to.y; i--) {
				canvas[i][line.from.x] += 1;
			}
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
drawMap(canvas, canvasSize);
