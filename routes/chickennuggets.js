var express = require('express');
var router  = express.Router();

router.get('/', function (req, res) {
	res.render('templates/chickennuggets')
});

router.post('/order', function(req, res) {
	console.log(req.body);
	res.send('Thanks for your order! It will take forever to make, and we\'ll probably get it wrong, too');
});

module.exports = router;