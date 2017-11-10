
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var versionSchema = require("./version").schema;
var Version = require("./version").model;

var repositorySchema = new Schema({
    remote: String, // direction to the github repository

    gitHubVersion: versionSchema, // current version uploaded in github

    name: { // repository name
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    description: { // repository description
        type: String,
        required: true
    },

    versions: { // version array
        type: [versionSchema],
        required: true
    },

    tags: [String] // tags for searching
}, {timestamps: true});


// returns the latest version of the repo
repositorySchema.methods.getLatestVersion = function (callback) {
    this.model('Repository').aggregate([
        {$unwind: "$versions"},
        {$match: {"_id": this._id}}, // find for the repo
        {$sort: {'versions.major': -1, 'versions.minor': -1, 'versions.patch': -1}}, // order
        {$project: {'versions': 1}}, // project te stuff that we need
        {$limit: 1} // limit to only get one result
    ], function (err, res) {
        if (err) throw err;
        return callback(new Version(res[0].versions));
    });
};

// returns the latest version of repo with a major
repositorySchema.methods.getLatestVersionMajor = function (major, callback) {
    this.model('Repository').aggregate([
        {$unwind: "$versions"},
        {$match: {"_id": this._id, "versions.major": major}}, // find for the repo
        {$sort: {'versions.major': -1, 'versions.minor': -1, 'versions.patch': -1}}, // order
        {$project: {'versions': 1}}, // project te stuff that we need
        {$limit: 1} // limit to only get one result
    ], function (err, res) {
        if (err) throw err;
        return callback(new Version(res[0].versions));
    })
};

// returns the latest version of repo with major and minor
repositorySchema.methods.getLatestVersionMajorMinor = function (major, minor,  callback) {
    this.model('Repository').aggregate([
        {$unwind: "$versions"},
        {$match: {"_id": this._id, "versions.major": major, "versions.minor": minor}}, // find for the repo
        {$sort: {'versions.major': -1, 'versions.minor': -1, 'versions.patch': -1}}, // order
        {$project: {'versions': 1}}, // project te stuff that we need
        {$limit: 1} // limit to only get one result
    ], function (err, res) {
        if (err) throw err;
        return callback(new Version(res[0].versions));
    })
};

// returns a version by its id
repositorySchema.methods.getVersion = function (id, cb) {
    this.model('Repository').aggregate([
        {$unwind: "$versions"},
        {$match: {"_id": this._id, 'versions._id': mongoose.Types.ObjectId(id)}},
        {$project: {'versions': 1}}
    ], function (err, res) {
        return cb(err,  new Version(res[0].versions));
    });
};

// adds a version to the versions array of a given repo
repositorySchema.methods.addVersion = function (version, cb) {
    this.model('Repository').findByIdAndUpdate(
        {_id: this._id}, {$push: {versions: version}}, function (err, ver) {
            return cb(err, ver);
        }
    );
};


// deletes a version from the versions array given an id
repositorySchema.methods.deleteVersion = function (verId, cb) {
    this.model('Repository').findByIdAndUpdate(
        {_id: this._id}, {$pull: {versions: {_id: verId}}}, function (err, repo) {
            return cb(err, repo);
        }
    );
};

module.exports = {
    schema: repositorySchema,
    model: mongoose.model('Repository', repositorySchema)
};