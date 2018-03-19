var express = require('express');
var router = express.Router();

var List = require('../app/models/list');
var Card = require('../app/models/card');

router.route('/boards/:board_id/lists/:list_id')

    .put(function(req, res) {
        List.findOneAndUpdate(
            {_id: req.params.list_id}, 
            {name: req.body.name},
            function(err, list) {
                if (err)
                    res.send(err);
            });
            res.json({ message: 'List updated!' });
    })

    .delete(function(req, res) {
        List.remove({
            _id: req.params.list_id
        }, function(err, list) {
            if (err) 
                res.send(err);   
        });

        Card.remove({
            idList: req.params.list_id
        }, function(err, lists) {
            if (err)
                res.send(err);
        });

        res.json({ message: 'Successfully deleted! '});
    })

    .get(function(req, res) {
        List.find({_id: req.params.list_id}, function(err, list) {
            if (err)
                res.send(err);

            res.json(list);
        });
    });

module.exports = router;