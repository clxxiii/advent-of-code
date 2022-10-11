type dataType = {
	testValues: Array<Set<string>>;
	display: Array<Set<string>>;
};

function decode(data: Array<string>) {
	let array: Array<dataType> = [];
	for (const line of data) {
		if (line == "") {
			continue;
		}

		let split = line.split(" | ");

		let testValueStrings = split[0].split(" ");
		let testValues = [];
		for (const string of testValueStrings) {
			testValues.push(new Set(string.split("")));
		}

		let displayStrings = split[1].split(" ");
		let display = [];
		for (const string of displayStrings) {
			display.push(new Set(string.split("")));
		}

		let obj: dataType = {
			testValues,
			display,
		};
		array.push(obj);
	}
	return array;
}

export { decode, dataType };
