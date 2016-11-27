var express  = require('express');
var router   = express.Router();
var config = require('../config');
var cookieParser=require('cookie-parser');
var loremIpsum = require('lorem-ipsum');
var cartItems=0;
var carrello=[];


  output1 = loremIpsum();
  output2 = loremIpsum();
  output3 = loremIpsum();
  output4 = loremIpsum();
  output5 = loremIpsum();
  output6 = loremIpsum();
  output7 = loremIpsum();
  output8 = loremIpsum();
  
var ipso={
     ipso1:output1,
     ipso2:output2,
     ipso3:output3,
     ipso4:output4,
     ipso5:output5,
     ipso6:output6,
     ipso7:output7,
     ipso8:output8,
     ipso1:{
       title:"Un tappeto di boschi selvaggi",
       code: "code1",
       desc:output1,
       price: "€ 14,72"
     },
     ipso2:{
       title:"The Boss",
       code: "code2",
       desc:output1,
       price: "€ 24,32"
     },
     ipso3:{
       title:"Lo spazio fra le nuvole",
       code: "code3",
       desc:output1,
       price: "€ 12,28"
     },
     ipso4:{
       title:"Carlo Ancelotti",
       code: "code4",
       desc:output1,
       price: "€ 34,22"
     },
     ipso5:{
       title:"Free States of Jones",
       code: "code5",
       desc:output1,
       price: "€ 22,12"
     },
     ipso6:{
       title:"Lacrime",
       code: "code6",
       desc:output1,
       price: "€ 11,13"
     },
     ipso7:{
       title:"Nannini",
       code: "code7",
       desc:output1,
       price: "€ 23,43"
     },
     ipso8:{
       title:"Una pecora nera al potere",
       code: "code8",
       desc:output1,
       price: "€ 44,12"
     }
     
}





function checkCart(req)
{
    //var gino=cookieParser.signedCookie("Pacoote", config.secret);
    console.log(req.cookies.Pacoote);
    if (req.cookies.code1) {
      carrello=cookieParser.JSONCookie('Pacoote');
      console.log(carrello);
      cartItems=carrello.length;
    }
    var myobjectCart={ipso,cartItems};
    return myobjectCart;
}
router.get('/home', function(req, res) {
     var objectCart=checkCart(req);
     res.render('home', {title: 'Welcome',result:objectCart});
     //Controlla se c'e' un cookie, se si popola
});
router.get('/', function(req, res, next) {
    var objectCart=checkCart(req);
    res.render('home', {title: 'Welcome',result:objectCart});
    //next();
});

router.post('/', function(req, res){
// console.log(req.body.bookCode)
  var day = 24 * 60 * 60 * 1000;

  carrello.push(req.body.code1)
  if (req.body.code1) res.cookie('Pacoote', carrello, { maxAge: day });
  res.redirect('back');
});

router.post('/home', function(req, res){
  //  console.log(req.body.bookCode)
  var day = 24 * 60 * 60 * 1000;

  carrello.push(req.body.code1)
  if (req.body.code1) res.cookie('Pacoote', carrello, { maxAge: day });
  res.redirect('back');
});


module.exports = router;