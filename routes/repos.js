var express = require('express');
var router = express.Router();
var Repository = require('../models/repository').model; // db definition
var Version = require('../models/version').model; // db definition
var path = require('path');
var getRandomImage = require('../packages/randomImage');
const fStructure = require('../packages/structure');

/* GET Add Repo */
router.get('/add', function(req, res, next) {
    res.render('repositoryAdd.ejs', {title: "Add Repository"});
});

/* POST Add Repo */
router.post('/add', function(req, res, next) {

    var name = req.body.name;
    var description = req.body.description;
    var remote = req.body.remote;
    var sem = req.body.version.split('.');
    var src = path.join('/home/', req.body.path);
    var tags = JSON.parse(req.body.tags);

    var version = new Version({
        major: sem[0],
        minor: sem[1],
        patch: sem[2],
        path: src,
        comment: "First added version - LynxVS Auto"
    });

    if (req.body.isUpdated === "on") {
        repository = new Repository({
            remote: remote,
            gitHubVersion: version,
            name: name,
            description: description,
            versions: [version],
            tags: tags
        });
        repository.save(function () {
            console.log(repository.name + "guardado!")
        });
        res.redirect('/repos/manage');
    } else {
        repository = new Repository({
            remote: remote,
            name: name,
            description: description,
            versions: [version],
            tags: tags
        });
        repository.save(function () {
            console.log(repository.name + "guardado!")
        });
        res.redirect('/repos/manage');
    }
});

/* GET Manage Repo */
router.get('/manage', function (req, res, next) {
    Repository.find(function (err, repos) {
        var pp = [];
        function getLVersion(repos, i, pp, callback) {
            repos[i].getLatestVersion(function (ver) {
                return callback(ver.getFullVersion(), i, pp);
            });
        }
        var j = 0;
        for (var i = 0; i < repos.length; i++) {
            getLVersion(repos, i, pp, function (ver, i, pp) {
                console.log(ver);
                if(j === repos.length-1) {
                    pp.push({
                        id: repos[i]._id,
                        name: repos[i].name,
                        description: repos[i].description,
                        gitHubVersion: repos[i].gitHubVersion,
                        latestVersion: ver,
                        image: getRandomImage()
                    });

                    var repoChunks = [], chunkSize = 3;
                    for (var o = 0; o < pp.length; o+=chunkSize) {
                        repoChunks.push(pp.slice(o, o+chunkSize));
                    }

                    res.render('repositoryManage.ejs', {title: "Manage Repositories", repoChunks: repoChunks, image: getRandomImage()});
                } else {
                    pp.push({
                        id: repos[i]._id,
                        name: repos[i].name,
                        description: repos[i].description,
                        gitHubVersion: repos[i].gitHubVersion,
                        latestVersion: ver,
                        image: getRandomImage()
                    });
                }
                j++;
            });

        }
    });
});

/* GET Repo Details */

router.get('/details/:id', function (req, res, next) {
   Repository.findOne({_id: req.params.id}, function (err, repo) {
       if (err) throw err;
       repo.getLatestVersion(function (ver) {
           res.render('repositoryDetails.ejs', {
               title: repo.name,
               repo: repo,
               treeData: fStructure.readAll(ver.path + '/'),
               lVersion: ver.getFullVersion()
           });
       });
   });
});
module.exports = router;