var mongoose   = require('mongoose');

var Schema = mongoose.Schema;
var cardSchema = new Schema({
    name: String,
    description: String,
    creationDate: { type: Date, default: Date.now },
    idBoard: String,
    idList: String,
});

var Card = mongoose.model('Card', cardSchema);
module.exports = Card;
