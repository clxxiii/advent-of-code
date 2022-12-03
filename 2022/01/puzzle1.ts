import { readFileSync } from "fs";

let data = readFileSync("2022/data/raw/01.txt").toString().split("\r\n\r\n");

let highest = 0;
for (const chunk of data) {
	let elf = chunk
		.split("\r\n")
		.filter((x) => x != "")
		.map((x) => parseInt(x));

	let sum = 0;
	for (const calorie of elf) {
		sum += calorie;
	}
	console.log(sum);
	if (sum >= highest) {
		highest = sum;
	}
	console.log(elf);
}

console.log(highest);
