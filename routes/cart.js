var express  = require('express');
var router   = express.Router();
var loremIpsum = require('lorem-ipsum');
  output1     = loremIpsum();
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
       code: "cod1",
       desc:output1,
       price: "€ 14,72"
     },
     ipso2:{
       code: "cod2",
       desc:output1,
       price: "€ 24,32"
     },
     ipso3:{
       code: "cod3",
       desc:output1,
       price: "€ 12,28"
     },
     ipso4:{
       code: "cod4",
       desc:output1,
       price: "€ 34,22"
     },
     ipso5:{
       code: "cod5",
       desc:output1,
       price: "€ 22,12"
     },
     ipso6:{
       code: "cod6",
       desc:output1,
       price: "€ 11,13"
     },
     ipso7:{
       code: "cod7",
       desc:output1,
       price: "€ 23,43"
     },
     ipso8:{
       code: "cod8",
       desc:output1,
       price: "€ 44,12"
     }
     
}
router.get('/cart', function(req, res) {
     res.render('cart', {title: 'Welcome',result:ipso});
});
router.get('/', function(req, res, next) {

    next();
});
module.exports = router;