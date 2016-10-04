var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	delete req.session.nickname;
	delete req.session.coupleID;
	delete req.gender;
	res.redirect('/login');
});

module.exports = router;