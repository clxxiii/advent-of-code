let data = require("../data/parse").getData()[2];
let decoder = require("./decoder")
let hpos = 0;
let vpos = 0;

data = decoder.decodeData(data);

for (i = 0; i < data.length; i++) {
    let direction = data[i].direction;
    let magnitude = data[i].magnitude;

    if (direction === "forward") {
        hpos += magnitude;
    }
    else if (direction === "up") {
        vpos -= magnitude;
    }
    else if (direction === "down") {
        vpos += magnitude;
    }
}

console.log("Position: " + [hpos, vpos]);
console.log("Answer Input: " + hpos * vpos);

