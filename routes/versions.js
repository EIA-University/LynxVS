var express = require('express');
var router = express.Router();
var Repository = require('../models/repository').model; // db definition
var Version = require('../models/version').model; // db definition
var path = require('path');
var getRandomImage = require('../packages/randomImage');
const fStructure = require('../packages/structure');

/* GET version details */
router.get('/details/:repoId/:verId', function (req, res, next) {
    Repository.findById(req.params.repoId, function (err, repo) {
        if (err) throw err;
        repo.getVersion(req.params.verId, function (err, ver) {
            if (err) throw err;
            repo.getLatestVersion(function (latestV) {
                res.render('versionDetails.ejs', {
                    title: repo.name + '-V' + ver.getFullVersion(),
                    repoName: repo.name,
                    repoId: repo._id,
                    version: ver,
                    treeData: fStructure.readAll(ver.path + '/'),
                    isGit: repo.gitHubVersion._id.toString() === ver._id.toString(),
                    isLatest: latestV._id.toString() === ver._id.toString()
                });
            });
        });
    });
});

module.exports = router;