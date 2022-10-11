import { readFileSync } from "fs";
import { decode, dataType } from "./decoder";

// Lanternfish can be represented by a single number, which is how long until it produces another lantern fish.

let data: Array<string> = readFileSync("./2021/data/raw/08.txt")
	.toString()
	.split("\n");

// This string is for the first test.
data = [
	"acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
];

let lines: dataType[] = decode(data);

for (const line of lines) {
	console.log(findNumbers(line.testValues));
}

function findNumbers(input: Set<string>[]): Set<string>[] {
	let nums = new Array(10);

	let allNumbersFound = false;
	let fixedSegNumbersFound = false;
	let testNum = 0;
	while (!allNumbersFound) {
		let segments = input[testNum];

		if (!fixedSegNumbersFound) {
			if (segments.size == 2) {
				nums[1] = segments;
			}
			if (segments.size == 4) {
				nums[4] = segments;
			}
			if (segments.size == 3) {
				nums[7] = segments;
			}
			if (segments.size == 7) {
				nums[8] = segments;
			}

			if (nums[1] && nums[4] && nums[7] && nums[8]) {
				fixedSegNumbersFound = true;
			}
		}

		if (fixedSegNumbersFound) {
		}
		testNum = (testNum + 1) % 10;
	}
	// Get 1, 4, 7, and 8 based on set size

	return nums;
}
