var express = require('express');
var moment = require('moment');

var router = express.Router();

router.get('/', function (req, res) {
  var collection = global.db.collection('chickenNuggets');

  collection.find().toArray(function (err, orders) {
    var formattedOrders = orders.map(function (order) {
      return {
        name:      order.name,
        flavor:    order.style,
        qty:       order.qty,
        createdAt: moment(order._id.getTimestamp()).fromNow()
      };
    });

    res.render('templates/chicken-index', {orders: formattedOrders});
  });
});

router.get('/order', function (req, res) {
  res.render('templates/chicken-new');
});

router.post('/order', function (req, res) {
  var collection = global.db.collection('chickenNuggets');

  collection.save(req.body, function () {
    res.redirect('/')
  });

});

module.exports = router;