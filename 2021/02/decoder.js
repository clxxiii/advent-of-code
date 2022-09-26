/**
 * Takes the array of commands and formats them into an array
 * of JSON objects separating the direction and the magnitude.
 */
function decodeData(data) {
	let list = [];

	for (i = 0; i < data.length; i++) {
		let command = data[i];
		let direction = command.substring(0, command.indexOf(" "));
		let magnitude = parseInt(command.substring(command.indexOf(" ")));

		list.push({ direction, magnitude });
	}

	return list;
}

export default decodeData;
