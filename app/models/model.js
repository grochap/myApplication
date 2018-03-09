var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// var boardSchema   = new Schema({
//     name: String,
// });

// module.exports = mongoose.model('Board', boardSchema);

var listSchema   = new Schema({
    name: String,
    idBoard: String
});

module.exports = mongoose.model('List', listSchema);

var cardSchema = new Schema({
    name: String,
    description: String,
    creationDate: { type: Date, default: Date.now },
    idBoard: String,
    idList: String,
});

module.exports = mongoose.model('Card', cardSchema);