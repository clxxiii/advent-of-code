import { readFileSync } from "fs";
import decodeData from "./decoder";

let data = readFileSync("./2021/data/raw/02.txt").toString().split("\r\n");

data = decodeData(data);

let hpos = 0;
let vpos = 0;

let aim = 0;

for (i = 0; i < data.length; i++) {
	let direction = data[i].direction;
	let magnitude = data[i].magnitude;

	if (direction === "forward") {
		hpos += magnitude;
		let newDepth = aim * magnitude;

		vpos += newDepth;
	} else if (direction === "up") {
		aim -= magnitude;
	} else if (direction === "down") {
		aim += magnitude;
	}
}

console.log("Position: " + [hpos, vpos]);
console.log("Answer Input: " + hpos * vpos);
