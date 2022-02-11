const fs = require("fs");
let data = fs.readFileSync("../data/raw/03.txt");

data =
	"00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010";

data = data.toString().split("\n");

for (i = 0; i < data[0].length; i++) {
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
	console.log(`Zeroes: ${zeroes}`);
	console.log(`Ones: ${ones}`);
	console.log(`Zero Indexes: ${zeroIndexes}`);
	console.log(`One Indexes: ${oneIndexes}`);
}
