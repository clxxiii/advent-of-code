const fs = require("fs");
// let data = fs.readFileSync("../data/raw/03.txt");

data = "00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010"

data = data.toString().split("\n")

console.log(data)

let gamma = "";
for (i = 0; i < data[0].length; i++) {
    let zeroes = 0;
    let ones = 0;
    for (v = 0; v < data.length; v++) {
        let character = data[v][i]
        if (character == "0") {
            zeroes++;
        }
        else if (character == "1") {
            ones++;
        }
    }
    if (zeroes > ones) {
        gamma += "0";
    }
    else {
        gamma += "1";
    }
}
let epsilon = gamma
    .split('')
    .map(x => x ^= 1)
    .join('')

console.log(epsilon)


console.log(parseInt(gamma, 2))
console.log(parseInt(epsilon, 2))

// 1000111001011
// 2^0 + 2^1 + 2^3 + 2^6 + 2^7 + 2^8 + 2^12
// Gamma rate = 4555

// 0111000110100
// 2^2 + 2^4 + 2^5 + 2^9 + 2^10 + 2^11
// Epsilon rate = 3636

// 4555 * 3636 = 16561980
