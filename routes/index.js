var express = require('express');
var router = express.Router();
var csurf = require('csurf');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Horse Racing Analysis' });
});

module.exports = router;
