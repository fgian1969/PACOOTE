var express  = require('express');
var router   = express.Router();
var config = require('../config');
var cookieParser=require('cookie-parser');
var loremIpsum = require('lorem-ipsum');
var cartObject = require('../model/cartObject.js');


router.get('/cart', function(req, res, next) {
   if (req.cookies.Pacoote!=undefined)
  {
    cartObject.checkCart(req,function(err,ipso){
       res.render('cart', {result:ipso.data});
    });
  }
  else
  {
     var ipso=new cartObject();
     res.render('cart', {result:ipso.data});
  }
});


module.exports = router;