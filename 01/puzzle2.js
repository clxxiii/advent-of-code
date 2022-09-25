import { readFileSync } from "fs";

let data = readFileSync("./data/raw/01.txt")
	.toString()
	.split("\r\n")
	.map((x) => parseInt(x));

let incrementCounter = 0;
for (let i = 3; i < data.length; i++) {
	let window1 =
		parseInt(data[i - 3]) + parseInt(data[i - 2]) + parseInt(data[i - 1]);
	let window2 =
		parseInt(data[i - 2]) + parseInt(data[i - 1]) + parseInt(data[i]);

	if (window2 > window1) {
		incrementCounter++;
	}
}

console.log(incrementCounter);
