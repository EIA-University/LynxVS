var express = require('express');
var router = express.Router();
const fStructure = require('../packages/structure');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', treeData: fStructure.readAll("/home/juandiego/Documents/")});
});

/* GET folder browser page */
router.get('/', function(req, res, next) {
    res.render('directorySelect');
});

module.exports = router;
