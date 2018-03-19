var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Board = require('../app/models/board');
var List = require('../app/models/list');
var Card = require('../app/models/card');

router.route('/boards/:board_id')

    .put(function(req, res) {
        Board.findOneAndUpdate(
            {_id: req.params.board_id}, 
            {name: req.body.name},
            function(err, board) {
                if (err)
                    res.send(err);
            });

            res.json({ message: 'Board updated!' });
    })

    .delete(function(req, res) {
        Board.remove({
            _id: req.params.board_id
        }, function(err, board) {
            if (err) 
                res.send(err);
        });

        List.remove({
            idBoard: req.params.board_id
        }, function(err, lists) {
            if (err)
                res.send(err);
        });

        Card.remove({
            idBoard: req.params.board_id
        }, function(err, cards) {
            if (err)
                res.send(err);
        });

        res.json({ message: 'Successfully deleted! '});
    })

    .get(function(req, res) {
        Board.find({_id: req.params.board_id}, function(err, board) {
            if (err)
                res.send(err);

            res.json(board);
        });
    });

module.exports = router;