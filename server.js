var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        

var router = express.Router();  

var mongoose   = require('mongoose');
mongoose.connect('mongodb://grochap:123Ch123@ds261138.mlab.com:61138/rest-database');
var db = mongoose.connection;

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

var routes = require('./routes/router');
app.use('/', routes);

app.listen(port);
console.log('Using port ' + port);