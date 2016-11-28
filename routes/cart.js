var express  = require('express');
var router   = express.Router();
var config = require('../config');
var cookieParser=require('cookie-parser');
var loremIpsum = require('lorem-ipsum');
var cartObject = require('../model/cartObject.js');


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