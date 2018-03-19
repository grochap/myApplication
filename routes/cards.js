var express = require('express');
var router = express.Router();
var Card = require('../app/models/card');

router.route('/boards/:board_id/lists/:list_id/cards')

    .post(function(req, res) {
        var card = new Card();
        card.name = req.body.name;
        card.idBoard = req.params.board_id;
        card.idList = req.params.list_id;

        card.save(function(err) {
            if (err) 
                res.send(err);

            res.json( {message: 'Card created' });
        });
    })

    .get(function(req, res) {
        Card.find({idList: req.params.list_id}, function(err, cards) {
            if(err) 
                res.send(err);

            res.json(cards);
        });
    })

module.exports = router;