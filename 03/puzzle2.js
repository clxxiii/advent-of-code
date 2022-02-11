const fs = require("fs");
// let data = fs.readFileSync("../data/raw/03.txt");

data =
	"00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010";

data = data.toString().split("\n");

console.log(dataChecker(data, true));

function dataChecker(data, checkOxy, i) {
	console.log(data[0].length);
	let zeroes = 0;
	let ones = 0;
	let zeroIndexes = [];
	let oneIndexes = [];
	for (v = 0; v < data.length; v++) {
		let character = data[v][i];
		if (character == "0") {
			zeroes++;
			zeroIndexes.push(v);
		} else if (character == "1") {
			ones++;
			oneIndexes.push(v);
		}
	}
	console.log(
		`Zeroes: ${zeroes}\nOnes: ${ones}\nZero Indexes: ${zeroIndexes}\nOne Indexes: ${oneIndexes}`
	);
	if (checkOxy) {
		if (ones >= zeroes) {
			data = removeIndexes(data, zeroIndexes);
		} else {
			data = removeIndexes(data, oneIndexes);
		}
	}

	// return data;
}

function removeIndexes(arr, indexes) {
	for (i = 0; i < indexes.length; i++) {
		arr.splice(indexes[i], 1);
	}
	return arr;
}
