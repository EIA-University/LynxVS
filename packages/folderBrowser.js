const fs = require("fs");
const path = require("path");

function readDir(p) {
    var dirs = [];
    // Read everything in directory
    fs.readdirSync(p).forEach(function (item) {
        // Select the folders
        if (fs.lstatSync(p + item.toString()).isDirectory()) {
            dirs.push(item.toString()); // add to arr
        }
    });

    return dirs;
}

function addPath(curentPath, newPath) {
    return path.join(curentPath, newPath);
}

module.exports = {
    readDir: readDir,
    addPath: addPath
};