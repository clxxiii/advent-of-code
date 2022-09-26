import { readFileSync } from "fs";

// Lanternfish can be represented by a single number, which is how long until it produces another lantern fish.

let data: Array<number> = readFileSync("./2021/data/raw/06.txt")
	.toString()
	.split(",")
	.map((x) => parseInt(x));
