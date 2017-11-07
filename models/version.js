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


module.exports = {
    model: mongoose.model('Version', versionSchema),
    schema: versionSchema
};