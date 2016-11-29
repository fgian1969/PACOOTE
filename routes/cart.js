var express  = require('express');
var router   = express.Router();
var config = require('../config');
var cookieParser=require('cookie-parser');
var loremIpsum = require('lorem-ipsum');
var cartItems=0;
var carrello=[];

router.get('/cart', function(req, res) {
     res.render('cart', {title: 'Carrello'});
});

module.exports = router;