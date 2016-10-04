var express = require('express');
var router = express.Router();

router.get('/*', function(req, res, next) {
  res.send('페이지가 없습니다. 확인바랍니다');
});

module.exports = router;