var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        

var router = express.Router();  

// var Board = require('./app/models/board');
var List = require('./app/models/board');




var mongoose   = require('mongoose');
mongoose.connect('mongodb://grochap:123Ch123@ds261138.mlab.com:61138/rest-database');
// var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var boardSchema   = new Schema({
    name: String
    }, 
    {collection: 'boards'}
);

var Board = mongoose.model('Board', boardSchema);




router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

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
        Board.remove({
            _id: req.params.board_id
        }, function(err, board) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

app.use('/api', router);

app.listen(port);
console.log('Using port ' + port);