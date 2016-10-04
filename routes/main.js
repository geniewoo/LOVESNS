var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongojs = require('mongojs');
var db = mongojs('YangGoon',['profiles']);
var crypto = require('./crypto.js');
var session = require('./session.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(session.confirm_coupleID(req.session)===1){
		res.redirect('login');
	}else{
		fs.readFile('views/main.html',function(error,data){
			res.send(data.toString());
		});
	}
});

router.post('/',function(req,res,next){
});

module.exports = router;