var express = require('express');
var router = express.Router();
var mongoose   = require('mongoose');

var Board = require('../app/models/board');

router.route('/boards')

    .post(function(req, res) {

        var board = new Board();
        board.name = req.body.name;

        board.save(function(err) {
            if(err) 
                res.send(err);
            res.json({ message: 'Board created' });
        });
    })

    .get(function(req, res) {
        Board.find({}, function(err, boards) {
            if (err) 
                res.send(err);
            res.json(boards);
        });
    });

module.exports = router;