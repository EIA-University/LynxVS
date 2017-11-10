var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var versionSchema = new Schema({

    major: { // major version, non backwards compatible
        type: Number,
        required: true
    },
    minor: { // minor version, features
        type: Number,
        required: true
    },
    patch: { // patch, for bugs fixed
        type: Number,
        required: true
    },

    path: { // directions to the src folder
        type: String,
        required: true
    },

    comment: String

}, {timestamps: true});

// print the version . separated
versionSchema.methods.getFullVersion = function () {
    return this.major + '.' + this.minor + '.' + this.patch;
};

versionSchema.methods.bumpPatch = function () {
    return {
        major: this.major,
        minor: this.minor,
        patch: this.patch+1
    };
};

versionSchema.methods.bumpMinor = function () {
    return {
        major: this.major,
        minor: this.minor+1,
        patch: 0
    };
};

versionSchema.methods.bumpMajor = function () {
    return {
        major: this.major+1,
        minor: 0,
        patch: 0
    };
};

module.exports = {
    model: mongoose.model('Version', versionSchema),
    schema: versionSchema
};