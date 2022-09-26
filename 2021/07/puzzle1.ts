import { readFileSync } from "fs";

let data: number[] = readFileSync("./2021/data/raw/07.txt")
	.toString()
	.split(",")
	.map((x) => parseInt(x));

let largest = getLargest(data);

let lowestFuel = { position: 0, fuel: NaN };
for (let i = 0; i <= largest; i++) {
	let fuel = 0;
	for (const num of data) {
		fuel += getDistance(i, num);
	}

	console.log(`Fuel consumption for ${i}: ${fuel}`);

	if (fuel < lowestFuel.fuel || !lowestFuel.fuel) {
		lowestFuel = {
			position: i,
			fuel,
		};
	}
}
console.log(
	`\nLowest Fuel Consumption: ${lowestFuel.fuel} (position ${lowestFuel.position})`
);

// --- Helper Functions

function getLargest(arr: Array<number>): number {
	let largest = 0;
	for (const num of arr) {
		if (num > largest) {
			largest = num;
		}
	}
	return largest;
}

function getDistance(a: number, b: number): number {
	return Math.abs(a - b);
}
