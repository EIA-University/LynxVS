var fs = require("fs-extra");
var path = require('path');

// creates a directory <name> in path <src>
function createDir(src, name) {
    var dir = path.join(src, name);
    fs.ensureDirSync(dir);
}

// copies contents from directory <src> to directory <dest>
function copyDir(src, dest) {
    if (fs.pathExistsSync(src) && fs.pathExistsSync(dest)) {
        fs.copySync(src, dest);
    }
}

module.exports = {
    createDir: createDir,
    copyDir: copyDir
};