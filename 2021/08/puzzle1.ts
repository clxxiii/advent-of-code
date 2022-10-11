import { readFileSync } from "fs";
import { decode, dataType } from "./decoder";

// Lanternfish can be represented by a single number, which is how long until it produces another lantern fish.

let data: Array<string> = readFileSync("./2021/data/raw/08.txt")
	.toString()
	.split("\n");

let lines: dataType[] = decode(data);

let numCount = 0;
for (const line of lines) {
	for (const num of line.display) {
		if ([2, 4, 3, 7].includes(num.size)) {
			numCount++;
		}
	}
}

console.log(`Number of 1s, 4s, 7s, and 8s on display: ${numCount}`);
