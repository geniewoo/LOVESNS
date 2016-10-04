var express = require('express');
var router = express.Router();
var fs=require('fs');
var mongojs=require('mongojs');
var db=mongojs('YangGoon',['profiles']);
var crypto=require('./crypto.js');
var session=require('./session.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(session.confirm_coupleID(req.session)===1){
		fs.readFile('views/login.html',function(error,data){
			res.send(data.toString());
		});
	}else{
		res.redirect('main');
	}
});

router.post('/',function(req,res,next){
	var id=req.body.id;
	var password=crypto.getCrypto(req.body.password);

	db.profiles.find({"id":id},function(error,data){
		if(data==''){
			res.json({'err_code':2,'err_msg':'존재하지 않는 아이디 입니다.'});
		}else{
			db.profiles.find({"password":password},function(error,data){
				console.log(data);
				console.log(data[0]);
				if(data==''){
					res.json({'err_code':3,'err_msg':'비밀번호가 맞지 않습니다.'});
				}else{
					req.session.nickname=(data[0].nickname);
					req.session.gender=(data[0].gender);
					console.log(data[0].couple);
					if(data[0].couple===true){
						req.session.coupleID=(data[0].coupleID);
						res.json({'err_code':0,'err_msg':'이미 커플이 잇습니다.'});
					}else{
						res.json({'err_code':1,'err_msg':'커플이 아직 없습니다.'});
					}
				}
			});
		}
	});
});

module.exports = router;