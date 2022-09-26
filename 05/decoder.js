/**
 * Returns a nice object containing each line from an input
 *
 */
function decode(str) {
	let data = [];
	let lines = str.split("\r\n");
	for (const line of lines) {
		let regex = /(\d+),(\d+) -> (\d+),(\d+)/;
		let lineData = line.match(regex);
		if (lineData) {
			data.push({
				from: { x: lineData[1] * 1, y: lineData[2] * 1 },
				to: { x: lineData[3] * 1, y: lineData[4] * 1 },
			});
		}
	}

	return data;
}

export default decode;
