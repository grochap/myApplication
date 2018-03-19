var express = require('express');
var router = express.Router();
var Card = require('../app/models/card');


router.route('/boards/:board_id/lists/:list_id/cards/:card_id')

    .put(function(req, res) {
        Card.findOneAndUpdate(
            {_id: req.params.card_id}, 
            {name: req.body.name},
            function(err, card) {
                if (err)
                    res.send(err);
            });
            res.json({ message: 'Card updated!' });
    })

    .delete(function(req, res) {
        Card.remove({
            _id: req.params.card_id
        }, function(err, card) {
            if (err) 
                res.send(err);

            res.json({ message: 'Successfully deleted! '});
        });
    })

    .get(function(req, res) {
        Card.find({_id: req.params.card_id}, function(err, card) {
            if (err)
                res.send(err);

            res.json(card);
        });
    });

module.exports = router;