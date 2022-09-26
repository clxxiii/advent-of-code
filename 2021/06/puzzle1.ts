import { readFileSync } from "fs";

// Lanternfish can be represented by a single number, which is how long until it produces another lantern fish.

let fishList: Array<number> = readFileSync("./2021/data/raw/06.txt")
	.toString()
	.split(",")
	.map((x) => parseInt(x));

fishList = [3];

let daysToCalculate = 10;

console.log(`Initial State: ${fishList}`);
for (let day = 1; day <= daysToCalculate; day++) {
	for (let fish = 0; fish < fishList.length; fish++) {
		let fishDay = fishList[fish];
		fishDay--;
		if (fishDay < 0) {
			fishDay = 6;
			// We set it to 9 because the length just increased.
			// That means the fish we just pushed will be evaluated,
			// and if we push it as 8, it will end the day as 7.
			fishList.push(9);
		}

		fishList[fish] = fishDay;
	}

	console.log(`Day ${day}: ${fishList}`);
}

console.log(`\nNumber of lanternfish: ${fishList.length}`);
