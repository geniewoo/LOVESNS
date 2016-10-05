var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongojs = require('mongojs');
var db = mongojs('YangGoon',['letter']);
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

router.post('/write_letter', function(req, res, next){
	var letter_msg = req.body.letter_msg;
	var letter_gender = req.session.gender;
	var coupleID = req.session.coupleID;
	var letterID = crypto.getCrypto(req.session.nickname + Date.now());
	var letter_date = new Date();

	console.log(letterID + ' ' + letter_date);
	if(session.confirm_coupleID(req.session)===1){
		res.json({'err_code':1,'err_msg':'로그인 하지 않았거나 잘못 된 접근입니다.'});
	}else{
		db.letter.save({
			"letter_msg" : letter_msg,
			"letter_gender" : letter_gender,
			"letterID" : letterID,
			"coupleID" : coupleID,
			"letter_date" : letter_date
		},function(error,data){
			if(error){
				res.json({'err_code':2,'err_msg':'데이터베이스 에러입니다'});
			}else{
				res.json({'err_code':0,'err_msg':'글쓰기 완료'});
			}
		});
	}
});

router.get('/read_letter',function(req, res, next){
	if(req.query.type==='1'){
		var num=req.query.num;
	}
	res.json({"test":"test"});
});

module.exports = router;