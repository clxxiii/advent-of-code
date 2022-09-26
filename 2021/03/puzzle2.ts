import { readFileSync } from "fs";
let data: Array<string> = readFileSync("./2021/data/raw/03.txt")
	.toString()
	.split("\r\n");

// const data =
// 	"00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010";

let output = "";

let tempData = data.toString().split("\r\n");
let oxygen = dataChecker(tempData, true, 0);

tempData = data.toString().split("\n");
let CO2 = dataChecker(tempData, false, 0);

console.log(`Oxygen: ${oxygen} (${parseInt(oxygen, 2)})`);
console.log(`CO2: ${CO2} (${parseInt(CO2, 2)})`);

console.log(
	`${parseInt(CO2, 2)} * ${parseInt(oxygen, 2)} = ${
		parseInt(CO2, 2) * parseInt(oxygen, 2)
	}`
);

function dataChecker(arr, checkOxy, i) {
	let zeroes = 0;
	let ones = 0;
	let zeroIndexes: number[] = [];
	let oneIndexes: number[] = [];

	for (let v = 0; v < arr.length; v++) {
		let character = arr[v][i];
		if (character == "0") {
			zeroes++;
			zeroIndexes.push(v);
		} else if (character == "1") {
			ones++;
			oneIndexes.push(v);
		}
	}
	console.log(
		`Zeroes: ${zeroes} | Ones: ${ones} | Zero Indexes: ${zeroIndexes} | One Indexes: ${oneIndexes}`
	);
	if (checkOxy) {
		if (ones >= zeroes) {
			arr = removeIndexes(arr, zeroIndexes);
		} else {
			arr = removeIndexes(arr, oneIndexes);
		}
	} else {
		if (ones < zeroes) {
			arr = removeIndexes(arr, zeroIndexes);
		} else {
			arr = removeIndexes(arr, oneIndexes);
		}
	}
	console.log(arr);
	if (arr.length > 1) {
		dataChecker(arr, checkOxy, ++i);
	}
	return arr[0];
}

function removeIndexes(arr, indexes) {
	for (let i = indexes.length - 1; i >= 0; i--) {
		arr.splice(indexes[i], 1);
	}
	return arr;
}
