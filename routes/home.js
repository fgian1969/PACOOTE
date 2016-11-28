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

var ipso=new cartObject({
     ipso1:{
       title:"Un tappeto di boschi selvaggi",
       img:"/images/boschi.jpg",
       code: "code1",
       desc:output1,
       price: "€ 14,72",
       qta:0
     },
     ipso2:{
       title:"The Boss",
       img:"/images/boss.jpg",
       code: "code2",
       desc:output1,
       price: "€ 24,32",
       qta:0
     },
     ipso3:{
       title:"Lo spazio fra le nuvole",
       img:"/images/camilla.jpg",
       code: "code3",
       desc:output1,
       price: "€ 12,28",
       qta:0
     },
     ipso4:{
       title:"Carlo Ancelotti",
       img:"/images/celotti.jpg",
       code: "code4",
       desc:output1,
       price: "€ 34,22",
       qta:0
     },
     ipso5:{
       title:"Free States of Jones",
       img:"/images/jones.jpg",
       code: "code5",
       desc:output1,
       price: "€ 22,12",
       qta:0
     },
     ipso6:{
       title:"Lacrime",
       img:"/images/lacrime.jpg",
       code: "code6",
       desc:output1,
       price: "€ 11,13",
       qta:0
     },
     ipso7:{
       title:"Nannini",
       img:"/images/nannini.jpg",
       code: "code7",
       desc:output1,
       price: "€ 23,43",
       qta:0
     },
     ipso8:{
       title:"Una pecora nera al potere",
       img:"/images/pecora.jpg",
       code: "code8",
       desc:output1,
       price: "€ 44,12",
       qta:0
     },
     qtaTot:
     {
       qta:0
     }
});

  

router.get('/home', function(req, res) {
  if (req.cookies.Pacoote)
  {
    cartObject.checkCart(req,function(err,ipso){
      //console.log(ipso);
      res.render('home', {result:ipso});
    });
  }
  else
  {
    res.render('home', {result:ipso});
  }
});

router.get('/', function(req, res, next) {
  //console.log(req.cookies.Pacoote==undefined);
   if (req.cookies.Pacoote!=undefined)
  {
    cartObject.checkCart(req,function(err,ipso){
      //console.log(data.ipso.ipso1);
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
     for (var prop in ipso.data) {
       console.log(ipso.prop.code);
        if (ipso.prop.code==req.body.bookCode)
        {
        ipso.prop.qta+=1;
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