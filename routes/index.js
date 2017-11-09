var express = require('express');
var router = express.Router();
const fStructure = require('../packages/structure');
const fBrowser = require('../packages/folderBrowser');
var dm = require('../packages/directoryManager');
var path = require('path');

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


module.exports = router;
