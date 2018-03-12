var mongoose   = require('mongoose');

var Schema = mongoose.Schema;
var listSchema   = new Schema({
    name: String,
    idBoard: String
});

var List = mongoose.model('List', listSchema);
module.exports = List;