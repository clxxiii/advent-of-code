const fs = require("fs")

module.exports.getData = (index) => {
    let folder = fs.readdirSync("../data/raw")
    return fs.readFileSync("../data/raw/" + folder[index])
}