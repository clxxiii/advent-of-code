import { readFileSync } from "fs";
import decodeData from "./decoder";

let data = readFileSync("./2021/data/raw/02.txt").toString().split("\r\n");

let hpos = 0;
let vpos = 0;

data = decodeData(data);

for (i = 0; i < data.length; i++) {
	let direction = data[i].direction;
	let magnitude = data[i].magnitude;

	if (direction === "forward") {
		hpos += magnitude;
	} else if (direction === "up") {
		vpos -= magnitude;
	} else if (direction === "down") {
		vpos += magnitude;
	}
}

console.log("Position: " + [hpos, vpos]);
console.log("Answer Input: " + hpos * vpos);
