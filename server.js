// Get the packages we need
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');

var requireDir = require('require-dir');
//var couchbase = require('couchbase')
var config = require('./config');
//var cluster = new couchbase.Cluster('couchbase://localhost/');
//var bucket = cluster.openBucket('PACOOTE');

//var N1qlQuery = couchbase.N1qlQuery;
// Create our Express application
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//Uso Morgan
//app.use(logger('dev'));
//Uso Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cookieParser(config.secret));
// Use environment defined port or 3000
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
//app.use('/js', express.static(__dirname + '/node_modules/five-star-rating/js')); 
//app.use('/css', express.static(__dirname + '/node_modules/five-star-rating/css')); 
//app.use('/images', express.static(__dirname + '/node_modules/five-star-rating/img')); 
//app.use('/fonts', express.static(__dirname + '/node_modules/five-star-rating/fonts')); 
//app.use('static/js', express.static(path.join(__dirname, 'static/js')));
//app.use('static/css', express.static(path.join(__dirname, 'static/css')));
// Create our Express router
var router = express.Router();
// view engine setup

var routes =  requireDir('./routes'); // https://www.npmjs.org/package/require-dir


for (var i in routes) app.use('/', routes[i]);

// Initial dummy route for testing
// http://localhost:3000/api




// Start the server
app.listen(port);
console.log('Insert PACOOTE on port ' + port);