var express = require('express');
var router = express.Router();

var List = require('../app/models/list');

router.route('/boards/:board_id/lists')

    .post(function(req, res) {
        var list = new List();
        list.name = req.body.name;
        list.idBoard = req.params.board_id;

        list.save(function(err) {
            if (err) 
                res.send(err);

            res.json( {message: 'List created' });
        });
    })

    .get(function(req, res) {
        List.find({idBoard: req.params.board_id}, function(err, lists) {
            if(err) 
                res.send(err);

            res.json(lists);
        });
    })

module.exports = router;