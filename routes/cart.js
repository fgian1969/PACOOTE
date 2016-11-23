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
}
router.get('/cart', function(req, res) {
     res.render('cart', {title: 'Welcome',result:ipso});
});
router.get('/', function(req, res, next) {

    next();
});
module.exports = router;