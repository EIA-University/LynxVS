const fs = require("fs-extra");
const path = require('path');

// creates a directory <name> in path <src>
function createDir(src, name) {
    const dir = path.join(src, name);
    fs.ensureDirSync(dir);
}

// copies contents from directory <src> to directory <dest>
function copyDir(src, dest) {
    if (fs.pathExistsSync(src) && fs.pathExistsSync(dest)) {
        fs.copySync(src, dest);
    }
}

// cleans a directory, WARNING! it deletes everything
function cleanDir(src, cb) {
    fs.emptyDir(src, err => {
        console.log(src + " cleaned");
        return cb(err);
    });
}

// removes a directory, WARNING! it deletes everything
function removeDir(src) {
    fs.removeSync(src)
}

module.exports = {
    createDir: createDir,
    copyDir: copyDir,
    cleanDir: cleanDir,
    removeDir: removeDir
};