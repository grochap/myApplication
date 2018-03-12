var express = require('express');
var router = express.Router();
var mongoose   = require('mongoose');

router.get('/', function(req, res) {
    res.json({ message: 'Welcome' });   
});

var List = require('../app/models/list');
var Card = require('../app/models/card');
var Board = require('../app/models/board');

router.route('/boards')

    .post(function(req, res) {

        var board = new Board();      
        board.name = req.body.name;  

        board.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Board created!' });
        });
    })

    .get(function(req, res) {
        Board.find(function(err, boards) {
            if (err)
                res.send(err);

            res.json(boards);
        });
    });

router.route('/boards/:board_id')

    .post(function(req, res) {

        var list = new List();      
        list.name = req.body.name;  
        list.idBoard = req.params.board_id;

        list.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'List created!' });
        });

    })

    .get(function(req, res) {
        List.find({idBoard: req.params.board_id}, function(err, lists) {
            if (err)    
                res.send(err);

            res.json(lists);
        });

    })

    .put(function(req, res) {

        Board.findById(req.params.board_id, function(err, board) {

            if (err)
                res.send(err);

            board.name = req.body.name; 

            board.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Board updated!' });
            });

        });
    })

    .delete(function(req, res) {

        List.find({idBoard: req.params.board_id}, function(err, lists) {
            for(j in lists) {
                selectedListId = lists[j]._id;
                Card.find({idList: selectedListId}, function(err, cards) {
                    for(i in cards) {
                        selectedCardId = cards[i]._id;
                        Card.remove({
                            _id: selectedCardId
                        }, function(err, card) {
                            if (err)
                                res.send(err);
                        });
                    };
                });

                List.remove({
                    _id: selectedListId
                }, function(err, list) {
                    if (err)
                        res.send(err);
                });
            };
        });
        
        Board.remove({
            _id: req.params.board_id
        }, function(err, board) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/lists/:list_id')

    .post(function(req, res) {

        var card = new Card();      
        card.name = req.body.name; 
        card.description = req.body.description; 
        card.idList = req.params.list_id;


        card.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Card created!' });
        });

    })

    .get(function(req, res) {
        Card.find({idList: req.params.list_id}, function(err, cards) {
            if (err)    
                res.send(err);

            res.json(cards);
        });

    })

    .put(function(req, res) {

        List.findById(req.params.list_id, function(err, list) {

            if (err)
                res.send(err);

            list.name = req.body.name; 

            list.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'List updated!' });
            });

        });
    })

    .delete(function(req, res) {

        Card.find({idList: req.params.list_id}, function(err, cards) {
            for(i in cards) {
                selectedCardId = cards[i]._id;
                Card.remove({
                    _id: selectedCardId
                }, function(err, card) {
                    if (err)
                        res.send(err);
                });
            };
        });

        List.remove({
            _id: req.params.list_id
        }, function(err, list) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/cards/:card_id')

    .put(function(req, res) {

        Card.findById(req.params.card_id, function(err, list) {

            if (err)
                res.send(err);

            card.name = req.body.name; 

            card.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Card updated!' });
            });

        });
    })

    .delete(function(req, res) {
        Card.remove({
            _id: req.params.card_id
        }, function(err, card) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;