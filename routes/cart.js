var express  = require('express');
var router   = express.Router();
var config = require('../config');
var cookieParser=require('cookie-parser');
var loremIpsum = require('lorem-ipsum');
<<<<<<< HEAD
var cartItems=0;
var carrello=[];
=======
var cartObject = require('../model/cartObject.js');

>>>>>>> 645e3eb853208cfc97e99ad9bc64ed9ccb22510f

router.get('/cart', function(req, res) {
    if (req.cookies.Pacoote)
    {
        var tot=0;
        var ipso=new cartObject(req.cookies.Pacoote);
        for (var prop in ipso) {
            tot+=ipso[prop].qta;
        }  
        ipso[qta]=tot;
        res.render('cart', {result:ipso});
    }
     
});

module.exports = router;