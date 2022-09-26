/**
 * Takes the array of commands and formats them into an array
 * of JSON objects separating the direction and the magnitude.
 */

type datapoint = {
	direction: String;
	magnitude: number;
};

function decodeData(data: Array<string>): Array<datapoint> {
	let list: Array<datapoint> = [];

	for (let i = 0; i < data.length; i++) {
		let command = data[i];
		let direction = command.substring(0, command.indexOf(" "));
		let magnitude = parseInt(command.substring(command.indexOf(" ")));

		list.push({ direction, magnitude });
	}

	return list;
}

export { decodeData, datapoint };
