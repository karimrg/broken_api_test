var express = require('express');
var router = express.Router();
var esrever = require('esrever');

function isNumber(str) {
  return typeof parseInt(str) === 'NaN';
}

router.get('/', function(req, res, next) {
    var reversed = esrever.reverse(req.query.str);

  res.send({
  	reversed: (isNumber(req.query.str)) ?  parseInt(reversed) : reversed
  });
});

module.exports = router;
