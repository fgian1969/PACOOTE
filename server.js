// Get the packages we need
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var couchbase = require('couchbase')
var config = require('./config');
var cluster = new couchbase.Cluster('couchbase://localhost/');
var bucket = cluster.openBucket('PACOOTE');

//var N1qlQuery = couchbase.N1qlQuery;
// Create our Express application
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Use environment defined port or 3000
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
//app.use('static/js', express.static(path.join(__dirname, 'static/js')));
//app.use('static/css', express.static(path.join(__dirname, 'static/css')));
// Create our Express router
var router = express.Router();
// view engine setup


// Initial dummy route for testing
// http://localhost:3000/api


router.get('/', function (req, res) {
  res.render('cart', {
    title: 'Welcome'
  });
});

// Register all our routes with /api
app.use('/', router);
app.use('/cart', router);

// Start the server
app.listen(port);
console.log('Insert PACOOTE on port ' + port);