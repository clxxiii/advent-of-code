import { createCanvas } from "canvas";
import { writeFileSync } from "fs";

let colors = [
	"#0000FF",
	"#0084FF",
	"#00FF06",
	"#FFF000",
	"#FF5A00",
	"#FF0000",
	"#FF0072",
	"#9000FF",
];

function drawMap(data: number[][], size: number) {
	let imgFactor = 1;

	let canvas = createCanvas(size * imgFactor, size * imgFactor);
	let ctx = canvas.getContext("2d");

	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, size * imgFactor, size * imgFactor);

	ctx.fillStyle = "#000000";
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			ctx.fillStyle = colors[data[y][x]] || colors[colors.length - 1];

			ctx.fillRect(x * imgFactor, y * imgFactor, imgFactor, imgFactor);
		}
	}

	let imgExport = canvas.toBuffer("image/png");
	writeFileSync("./2021/05/map.png", imgExport);
}

export default drawMap;
