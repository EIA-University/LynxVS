var Repository = require('../models/repository').model;
var Version = require('../models/version').model;

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/lynx');


Repository.findOne({'name': 'HolaWorld'}, function (err, repo) {
    if (err) throw (err);
    repo.getLatestVersion(function (ver) {
        console.log(ver);
        mongoose.disconnect();
    });
});