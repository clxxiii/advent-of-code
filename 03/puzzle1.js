const fs = require("fs");
let data = fs.readFileSync("../data/raw/03.txt");

// data =
// 	"00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010";

data = data.toString().split("\n");

let gamma = "";
for (i = 0; i < data[0].length; i++) {
	let zeroes = 0;
	let ones = 0;
	for (v = 0; v < data.length; v++) {
		let character = data[v][i];
		if (character == "0") {
			zeroes++;
		} else if (character == "1") {
			ones++;
		}
	}
	if (zeroes > ones) {
		gamma += "0";
	} else {
		gamma += "1";
	}
}

console.log(`Gamma Rate: ${gamma} (${parseInt(gamma, 2)})`);

let epsilon = gamma
	.split("")
	.map((x) => (x ^= 1))
	.join("");

console.log(`Gamma Rate: ${epsilon} (${parseInt(epsilon, 2)})`);

console.log(
	`${parseInt(gamma, 2)} * ${parseInt(epsilon, 2)} = ${
		parseInt(gamma, 2) * parseInt(epsilon, 2)
	}`
);
