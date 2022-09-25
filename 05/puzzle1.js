import { readFileSync, writeFileSync } from "fs";
import { createCanvas, createImageData } from "canvas";
import decode from "./decoder.js";

let data = decode(readFileSync("./05/given.txt").toString());

// Only consider horizontal and vertical lines
data = data.filter((line) => {
	return line.from[0] == line.to[0] || line.from[1] == line.to[1];
});

// TODO: The rest of this :P
for (const line of data) {
}

writeFileSync("./05/img.png", canvas.toBuffer("image/png"));
