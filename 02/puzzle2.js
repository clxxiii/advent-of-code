let data = require("../data/parse").getData()[2];
let decoder = require("./decoder")

data = decoder.decodeData(data);

let hpos = 0;
let vpos = 0;

let aim = 0;

for (i = 0; i < data.length; i++) {
    let direction = data[i].direction;
    let magnitude = data[i].magnitude;


    if (direction === "forward") {
        hpos += magnitude;
        let newDepth = aim * magnitude;

        vpos += newDepth;
    }
    else if (direction === "up") {
        aim -= magnitude;
    }
    else if (direction === "down") {
        aim += magnitude;
    }
}


console.log("Position: " + [hpos, vpos]);
console.log("Answer Input: " + hpos * vpos);
