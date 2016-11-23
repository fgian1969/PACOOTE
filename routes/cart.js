var express  = require('express');
var router   = express.Router();

router.get('/cart', function(req, res) {
     res.render('cart', {title: 'Welcome'});
});
router.get('/', function(req, res, next) {

    next();
});
module.exports = router;