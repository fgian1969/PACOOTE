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

router.post('/cart', function(req, res, next) {
  var day = 24 * 60 * 60 * 1000;
    if (req.cookies.Pacoote)
    {
      console.log("Esiste cookie!");
      ipso=req.cookies.Pacoote;
    }
    else
    {
       console.log("Non Esiste cookie!");
      var ipso=new cartObject();
    }
     for (var prop in ipso.data.books)
     {
        if (ipso.data.books[prop].code==req.body.code) 
        {
           console.log("Trovato codice");
           if (req.body.add)
              {
                console.log("Aumentato di 1");
                ipso.data.books[prop].qta+=1;
              }
            else if (req.body.add)
            {
              if (ipso.data.books[prop].qta>0)
              {
              console.log("Diminuito di 1");
              ipso.data.books[prop].qta-=1;
              }
            }
            else
            {
              console.log("Articolo Eliminato");
              ipso.data.books[prop].qta=0;
            }
        } 
     }
      res.cookie('Pacoote', ipso, { maxAge: day });
   res.redirect('back');
  });
 


module.exports = router;