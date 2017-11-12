var express = require('express');
var router = express.Router();
const fStructure = require('../packages/structure');
const fBrowser = require('../packages/folderBrowser');
var dm = require('../packages/directoryManager');
var path = require('path');
var GitAccount = require('../models/gitAccount').model;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'Home', treeData: fStructure.readAll("/home/juandiego/Documents/")});
});

/* GET folder browser page */
router.get(/pepe/, function(req, res, next) {
    var oPath = '/home/';
    var nPath = req.originalUrl.substr(5, req.originalUrl.length);
    var path = fBrowser.addPath(oPath, nPath + '/');
    console.log(path);
    var folders = fBrowser.readDir(path);
    console.log(folders.length);
    res.render('directorySelect', {title: "Folder Select", folders: folders});
});

/* POST folder browser page */
router.post(/pepe/, function(req, res, next) {
    dm.createDir(path.join('/home', req.body.src), req.body.folderName);
    res.redirect('/pepe/' + req.body.src);
});

/* GET github settings page */
router.get('/gitSettings', function (req, res, next) {
    GitAccount.find({}, function (err, gitAccounts) {
        if (err) throw err;
        res.render('gitSettings', {title: "gitHubSettings", gitAccount: gitAccounts[0]});
    });
});

/* POST addGithub Account */
router.post('/addGitAccount', function (req, res, next) {
    // valido que solo se pueda tener una cuenta
    GitAccount.count({}, function (err, count) {
        if (err) throw err;
        if (count > 0) {
            res.redirect('/');
        } else {
            var gitAccount = new GitAccount({
                username: req.body.username,
                password: req.body.password
            });
            gitAccount.save(function () {
                console.log(gitAccount.username + " saved!");
            });
            res.redirect('/gitSettings');
        }
    });
});

/* GET delete github account */
router.get('/gitAccount/delete/:id', function (req, res, next) {
    GitAccount.findByIdAndRemove({_id: req.params.id}, function (err, gitAccount) {
        if (err) throw err;
        console.log(gitAccount.username + " deleted!");
        res.redirect('/gitSettings');
    });
});

module.exports = router;
