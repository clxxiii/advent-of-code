import { createCanvas } from "canvas";
import { writeFileSync } from "fs";

function drawMap(data, size) {
	let imgFactor = 4;

	let canvas = createCanvas(size * imgFactor, size * imgFactor);
	let ctx = canvas.getContext("2d");

	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, size * imgFactor, size * imgFactor);

	for (const line of data) {
		ctx.strokeStyle = "#00000033";
		ctx.lineWidth = imgFactor / 4;

		ctx.beginPath();
		ctx.moveTo(line.from.x * imgFactor, line.from.y * imgFactor);
		ctx.lineTo(line.to.x * imgFactor, line.to.y * imgFactor);
		ctx.stroke();
	}

	let imgExport = canvas.toBuffer("image/png");
	writeFileSync("./05/map.png", imgExport);
}

export default drawMap;
