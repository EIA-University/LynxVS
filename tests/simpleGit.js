/* test the simple git library for cloning */
// until now I only have the phishing mongo configured

const Repository = require('../models/repository').model;
const Version = require('../models/version').model;
const GitAccount = require('../models/gitAccount').model;
const dm = require('../packages/directoryManager');
const path = require('path');
const fs = require('fs-extra');

/*
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/lynx');

// clone
/*
Repository.findOne({'name': "PhishingMongo"}, function (err, repo) {
    GitAccount.find({}, function (err, account) {
        const directory = '/home/juandiego/Desktop/hkl';
        const remote = `https://${account[0].username}:${account[0].password}@${repo.remote}`;
        console.log(remote);


        git().silent(true)
            .clone(remote, directory)
            .then(() => console.log('finished'))
            .catch((err) => console.error('failed: ', err));
        mongoose.disconnect();
    });
});
*/

/*
require('simple-git')('/home/juandiego/Desktop/testLynx')
    .add('./*')
    .commit("first commit!")
    //.addRemote('origin', 'https://juandiegotor:pass@github.com/juandiegotor/testLynx.git')
    .push('origin', 'master');
   */

const repo = '/home/juandiego/Desktop/test2'; // has an initialized git version, will be removed
const newRepo = '/home/juandiego/Desktop/test3'; // has no git initialized, if it has it will get removed
let fName = repo.split('/');
const temp = path.join('/tmp', fName[fName.length-1]);


// clone
require('simple-git/promise')('/tmp')
    .clone(repo)
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
                console.log("committed chances");
                dm.cleanDir(newRepo, function (err) {
                    if (err) throw err;
                    require('simple-git')(newRepo) // pull from the temporal
                        .init()
                        .raw(['pull', temp], (err, result) => {
                            console.log(result);
                        }).addRemote('origin', 'https://juandiegotor:pass@github.com/juandiegotor/testLynx.git')
                        .commit("new repo for git")
                        .push('origin', 'master');

                    // delete the .git folder on the previous version
                    dm.removeDir(path.join(repo, '.git'));
            });
        });
    });
