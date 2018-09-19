var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.io.emit('arduino', 'noober');
  res.send('respond with a noober');
});

module.exports = router;
