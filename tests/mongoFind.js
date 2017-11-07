var Repository = require('../models/repository').model;

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/lynx');


Repository.findOne({'name': 'HolaWorld'}, function (err, repo) {
    if (err) throw (err);
    repo.getLatestVersionMajor(1, function (ver) {
        console.log(ver.getFullVersion());
        repo.getLatestVersionMajorMinor(1, 0, function (ver) {
            console.log(ver.getFullVersion());
            mongoose.disconnect();
        });
    });
});