import { readFileSync } from "fs";
let data: string[] = readFileSync("2022/data/raw/07.txt")
  .toString()
  .split("\n")
  .filter((x) => x != "");

let root: object = {};
let cwd: string = "";

for (const line of data) {
  // if (line == "$ ls") listFolder(root);
  if (line == "$ ls") continue;
  else if (line.startsWith("$ cd")) {
    let directory = line.split(" ")[2];
    if (directory == "/") {
      cwd = "/";
    } else if (directory == "..") {
      let dirs = cwd.split("/");
      dirs.pop();
      dirs[dirs.length - 1] = "";
      cwd = dirs.join("/");
    } else {
      cwd += `${directory}/`;
    }
  } else if (line.startsWith("dir ")) {
    let dirName = line.split(" ")[1];

    // This is apparently a reference because we're copying an object
    // https://www.geeksforgeeks.org/reference-and-copy-variables-in-javascript/
    let cwdObject = root;
    let path = cwd.split("/").filter((x) => x != "");

    for (const dir of path) {
      cwdObject = cwdObject[dir];
    }
    cwdObject[dirName] = [];
  } else {
    let [size, file] = line.split(" ");
    let cwdObject = root;
    let path = cwd.split("/").filter((x) => x != "");

    for (const dir of path) {
      cwdObject = cwdObject[dir];
    }

    cwdObject[file] = size;
  }
}
let directorySizes = {};
getSizeOfDirectory(root, "/");
console.log(directorySizes);
listFolder(root);

let dirSum = 0;
for (const dir in directorySizes) {
  directorySizes[dir] <= 100000 ? (dirSum += directorySizes[dir]) : "";
}
console.log(dirSum);

function getSizeOfDirectory(dir: object, name: string) {
  let size = 0;
  for (const fileName in dir) {
    let file = dir[fileName];
    if (typeof file == "object") {
      size += getSizeOfDirectory(file, fileName);
    } else {
      size += parseInt(file);
    }
  }
  directorySizes[name] = size;
  return size;
}

function listFolder(dir: object, indent?: number, dirName?: string) {
  indent = indent ?? 0;
  dirName = dirName ?? "/";

  let indentLine = "";
  for (let i = 0; i < indent; i++) {
    indentLine += " ";
  }

  console.log(indentLine + "- " + dirName + " (dir)");
  for (const fileName in dir) {
    let file = dir[fileName];
    if (typeof file == "object") listFolder(file, indent + 2, fileName);
    else {
      console.log(`${indentLine}  - ${fileName} (file, size=${file})`);
    }
  }

  if (dirName == "/") console.log("");
}
