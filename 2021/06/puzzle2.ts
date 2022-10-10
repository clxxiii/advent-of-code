import { readFileSync } from "fs";

// Lanternfish can be represented by a single number, which is how long until it produces another lantern fish.
// However if we were to do that with 256 days, we would hit the maximum length for a javascript array.
// To combat this, we will use an array with a fixed length of 9,
// which represents the number of fish at day X.
let data: Array<number> = readFileSync("./2021/data/raw/06.txt")
	.toString()
	.split(",")
	.map((x) => parseInt(x));

let fishList: Array<number> = new Array(9).fill(0);

// Initialize array with day 0;
for (const fish of data) {
	fishList[fish]++;
}

console.log(`Day 0 Total Fish: ${countTotalFish(fishList)}`);

let days = 256;
for (let i = 1; i <= days; i++) {
	fishList = runDay(fishList);
	console.log(`Day ${i} Total Fish: ${countTotalFish(fishList)}`);
}

function runDay(fishList: Array<number>): Array<number> {
	let newDayFish = new Array(9).fill(0);

	for (let day = 0; day < fishList.length; day++) {
		let fishOnDay = fishList[day];

		if (day == 0) {
			newDayFish[6] += fishOnDay;
			newDayFish[8] += fishOnDay;
			continue;
		}

		newDayFish[day - 1] += fishOnDay;
	}

	return newDayFish;
}

function countTotalFish(fishList: Array<number>): number {
	let total = 0;
	for (const day of fishList) {
		total += day;
	}
	return total;
}
