var express  = require('express');
var router   = express.Router();

router.get('/cart', function(req, res) {
     res.render('cart', {title: 'Carrello'});
});

module.exports = router;