var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var gitAccountSchema = new Schema({
    username: String,
    password: String
});

module.exports = {
    model: mongoose.model('GitAccount', gitAccountSchema),
    schema: gitAccountSchema
};