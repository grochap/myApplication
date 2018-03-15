var express = require('express');
var router = express.Router();
var mongoose   = require('mongoose');

var List = require('../app/models/list');
var Card = require('../app/models/card');
var Board = require('../app/models/board');
var User = require('../app/models/user');

router.post('/', function (req, res, next) {
    
    if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      res.send("passwords dont match");
      return next(err);
    }
  
    if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf) {
  
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
        boards: []
      }
  
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          req.session.boards = user.boards;
          return res.redirect('/boards');
        }
      });
  
    } else if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          req.session.boards = user.boards;
          return res.redirect('/boards');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
})

router.get('/', function (req, res, next) {
    User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized!');
                err.status = 400;
                return next(err);
            } else {
                return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br>')
            }
        }
    });
});


router.route('/boards')

    .post(function(req, res) {

        var board = new Board();      
        board.name = req.body.name; 

        board.save(function(err) {
            if (err)
                res.send(err);
            req.session.boards.push(board._id);

            req.    session.save(function(err) {
                if (err)
                    res.send(err);
            })

            res.json({ message: 'Board created!' });

        });  
    })

    .get(function(req, res) {
        Board.find({_id: req.session.boards }, function(err, boards) {
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
            for(i in req.session.boards) {
                if(req.session.boards[i] == req.params.board_id) {
                    req.session.boards.splice(i, 1);
                }
            }

            req.session.save(function(err) {
                if(err)
                    res.send(err);
            });

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

router.route('/logout')

    .get(function(req, res, next) {
        if (req.session) {
            // delete session object
            req.session.destroy(function (err) {
              if (err) {
                return next(err);
              } else {
                return res.redirect('/');
              }
            });
          }
    });

module.exports = router;