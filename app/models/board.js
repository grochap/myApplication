var mongoose   = require('mongoose');

var Schema = mongoose.Schema;
var boardSchema   = new Schema({
    name: String
});

var Board = mongoose.model('Board', boardSchema);
module.exports = Board;