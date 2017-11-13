const dm = require('../packages/directoryManager');
const path = require('path');

function upload (username, password, dir, oldRepo, newRepo) {

    let fName = oldRepo.split('/');
    const temp = path.join('/tmp', fName[fName.length-1]);
    const remote = `https://${username}:${password}@${dir}`;

    require('simple-git/promise')('/tmp') // create folder on tmp
    .clone(oldRepo) // oldRepo
    .then(() => {
        console.log("Cloned repo!");
        require('simple-git')(temp)
        .raw(['rm', '-r', '*'], (err, result) => {
            console.log(result);
            dm.copyDir(newRepo + '/', temp);
            console.log("copied contents from " + newRepo);
        }).raw(['add', '*'], (err, result) => {
            console.log(result);
        }).raw(['status'], (err, result) => {
            console.log(result);
        }).raw(['commit', '-a', '-m', '\'deleting stuff\''], (err, result) => {
            console.log(result);
            console.log("committed changes");
            dm.cleanDir(newRepo, function (err) {
                if (err) throw err;
                require('simple-git')(newRepo) // pull from the temporal
                    .init()
                    .raw(['pull', temp], (err, result) => {
                        console.log(result);
                    }).addRemote('origin', remote)
                    .commit("new repo for git")
                    .push('origin', 'master');

                // delete the .git folder on the previous version
                dm.removeDir(path.join(oldRepo, '.git'));
            });
        });
    });
}

module.exports = upload;