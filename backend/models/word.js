const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    word: {type: String},
});

exports.Word = mongoose.model('Word',wordSchema,'words');