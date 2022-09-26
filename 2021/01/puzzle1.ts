import { readFileSync } from "fs";

let data: Array<number> = readFileSync("./2021/data/raw/01.txt")
	.toString()
	.split("\r\n")
	.map((x) => parseInt(x));

let incrementCounter = 0;
for (let i = 1; i < data.length; i++) {
	if (data[i] > data[i - 1]) {
		incrementCounter++;
	}
}

console.log(incrementCounter);
