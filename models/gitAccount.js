var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var gitAccountSchema = new Schema({
    username: String,
    password: String
});

gitAccountSchema.statics.getAccount = function (cb) {
    const model = mongoose.model('GitAccount', gitAccountSchema);
    model.count({}, function (err, count) {
        if (count === 0) {
            return cb(count);
        } else {
            model.find({}, function (err, accounts) {
                return cb(accounts[0]);
            })
        }
    })
};

module.exports = {
    model: mongoose.model('GitAccount', gitAccountSchema),
    schema: gitAccountSchema
};