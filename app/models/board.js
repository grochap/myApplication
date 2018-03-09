var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// var boardSchema   = new Schema({
//     name: String
//     }, 
//     {collection: 'boards'}
// );

// var Board = mongoose.model('Board', boardSchema);
// module.exports = mongoose.model('Board', boardSchema);

var listSchema   = new Schema({
    name: String,
    idBoard: String
});

var List = mongoose.model('List', listSchema);
module.exports = mongoose.model('List', listSchema);