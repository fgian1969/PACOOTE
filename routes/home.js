var express  = require('express');
var router   = express.Router();
var config = require('../config');
var cookieParser=require('cookie-parser');
var loremIpsum = require('lorem-ipsum');
var cartObject = require('../model/cartObject.js');


output1 = loremIpsum();
output2 = loremIpsum();
output3 = loremIpsum();
output4 = loremIpsum();
output5 = loremIpsum();
output6 = loremIpsum();
output7 = loremIpsum();
output8 = loremIpsum();

var ipso=new cartObject();


  

router.get('/home', function(req, res) {

  if (req.cookies.Pacoote)
  {
    cartObject.checkCart(req,function(err,ipso){
      //console.log(ipso);
       res.render('home', {result:ipso.data});
    });
  }
  else
  {
    res.render('home', {result:ipso.data});
  }
});

router.get('/', function(req, res, next) {
   if (req.cookies.Pacoote!=undefined)
  {
    cartObject.checkCart(req,function(err,ipso){
       res.render('home', {result:ipso.data});
    });
  }
  else
  {
     res.render('home', {result:ipso.data});
  }
});

router.post('/', function(req, res){
 
  var day = 24 * 60 * 60 * 1000;

  //carrello.push(req.body.bookCode)
  if (req.body.bookCode)
  {
    if (req.cookies.Pacoote)
    {
      ipso=req.cookies.Pacoote;
    }
     for (var prop in ipso.data.books)
     {
       //console.log(prop);
        if (ipso.data.books[prop].code==req.body.bookCode)
        {
          ipso.data.books[prop].qta+=1;
        } 
     }
  }
   res.cookie('Pacoote', ipso, { maxAge: day });
   res.redirect('back');
});

router.post('/home', function(req, res){
   var day = 24 * 60 * 60 * 1000;

  //carrello.push(req.body.bookCode)
  if (req.body.bookCode) res.cookie('Pacoote', carrello, { maxAge: day });
  res.redirect('back');
});


module.exports = router;