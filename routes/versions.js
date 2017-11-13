var express = require('express');
var router = express.Router();
var Repository = require('../models/repository').model; // db definition
var Version = require('../models/version').model; // db definition
var path = require('path');
const fStructure = require('../packages/structure');
const GitAccount = require('../models/gitAccount').model;
const gitUploader = require('../packages/gitUploader');

/* GET version details */
router.get('/details/:repoId/:verId', function (req, res, next) {
    Repository.findById(req.params.repoId, function (err, repo) {
        if (err) throw err;
        repo.getVersion(req.params.verId, function (err, ver) {
            if (err) throw err;
            repo.getLatestVersion(function (latestV) { // gets the highest major
                repo.getLatestVersionMajor(ver.major, function (latestM) { // gets the highest minor
                    repo.getLatestVersionMajorMinor(ver.major, ver.minor, function (latestP) { // gets the highest patch
                        var isGit = false;
                        if (repo.gitHubVersion) {
                            if (repo.gitHubVersion._id.toString() === ver._id.toString()) {
                                isGit = true;
                            }
                        }

                        res.render('versionDetails.ejs', {
                            title: repo.name + '-V' + ver.getFullVersion(),
                            repoName: repo.name,
                            repoId: repo._id,
                            version: ver,
                            treeData: fStructure.readAll(ver.path + '/'),
                            isGit: isGit,
                            isLatest: latestV._id.toString() === ver._id.toString(),
                            bumpedPatch: latestP.bumpPatch(),
                            bumpedMinor: latestM.bumpMinor(),
                            bumpedMajor: latestV.bumpMajor()
                        });
                    });
                });
            });
        });
    });
});

/* GET Bump version page */
router.get('/bump/:type/:repoId/:verId', function (req, res, next) {
    Repository.findById(req.params.repoId, function (err, repo) {
       if (err) throw err;
       repo.getVersion(req.params.verId, function (err, ver) {
           if (err) throw err;
           if (req.params.type === 'patch') { // bump patch
               repo.getLatestVersionMajorMinor(ver.major, ver.minor, function (latestP) {
                   res.render('versionBump.ejs', {
                       title: "bump patch" + repo.name,
                       repoId: repo._id,
                       verId: ver.id,
                       repoName: repo.name,
                       bumpType: "Patch",
                       bumped: latestP.bumpPatch()
                   });
               });
           } else if (req.params.type === 'minor') { // bump minor
               repo.getLatestVersionMajor(ver.major, function (latestM) {
                   res.render('versionBump.ejs', {
                       title: "bump minor" + repo.name,
                       repoId: repo._id,
                       verId: ver.id,
                       repoName: repo.name,
                       bumpType: "Minor",
                       bumped: latestM.bumpMinor()
                   });
               });
           } else if (req.params.type === 'major') { // bump major
               repo.getLatestVersion(function (latestV) {
                   res.render('versionBump.ejs', {
                       title: "bump major" + repo.name,
                       repoId: repo._id,
                       verId: ver.id,
                       repoName: repo.name,
                       bumpType: "Major",
                       bumped: latestV.bumpMajor()
                   });
               });
           } else { // rick roll if necessary
               res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
           }
       });
    });
});

/* POST bump version, copy contents not implemented yet */
router.post('/bump', function (req, res, next) {
    Repository.findById(req.body.repoId, function (err, repo) {
        repo.addVersion(new Version({
            major: req.body.major,
            minor: req.body.minor,
            patch: req.body.patch,
            path:  path.join("/home/", req.body.path),
            comment: req.body.comment
        }), function (err, repo) {
            if (err) throw err;
            console.log(repo.name + "version added successfully!");
            res.redirect("/repos/details/"+req.body.repoId);
        });
    });
});

/* GET delete version */
router.get('/delete/:repoId/:verId', function (req, res, next) {
    Repository.findById(req.params.repoId, function (err, repo) {
        if (err) throw err;
        repo.deleteVersion(req.params.verId, function (err, repo) {
            if (err) throw err;
            console.log("removed version form " + repo.name);
            res.redirect("/repos/details/"+req.params.repoId);
        });
    });
});

/* GET upload to git */
router.get('/uploadToGit/:repoId/:verId', function (req, res, next) {
    Repository.findById(req.params.repoId, function (err, repo) {
        if (err) throw err;
        repo.getVersion(req.params.verId, function (err, ver) {
            if (err) throw err;
            GitAccount.getAccount(function (account) {
                if (account === 0) {
                    res.redirect('/gitSettings');
                } else {
                    gitUploader(account.username, account.password, repo.remote, repo.gitHubVersion.path, ver.path);
                    repo.gitHubVersion = ver;
                    repo.save(function () {
                        console.log("Changed github repo");
                        res.redirect("/repos/details/"+req.params.repoId);
                    });
                }
            });
        });
    });
});

module.exports = router;