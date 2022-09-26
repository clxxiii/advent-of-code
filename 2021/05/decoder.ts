/**
 * Returns a nice object containing each line from an input
 *
 */
type line = {
	from: {
		x: number;
		y: number;
	};
	to: {
		x: number;
		y: number;
	};
};

function decode(str: string): line[] {
	let data: line[] = [];
	let lines = str.split("\r\n");
	for (const line of lines) {
		let regex = /(\d+),(\d+) -> (\d+),(\d+)/;
		let lineData = line.match(regex);
		if (lineData) {
			data.push({
				from: { x: parseInt(lineData[1]), y: parseInt(lineData[2]) },
				to: { x: parseInt(lineData[3]), y: parseInt(lineData[4]) },
			});
		}
	}

	return data;
}

export { decode, line };
