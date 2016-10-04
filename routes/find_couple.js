var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongojs = require('mongojs');
var crypto = require('./crypto.js');
var db = mongojs('YangGoon',['profiles']);

/* GET home page. */
router.get('/', function(req, res, next) {
	var gender = req.session.gender;
	var mynickname = req.session.nickname;
	console.log('getLogin : '+gender+' : '+mynickname);
	if(typeof gender==='undefined'||typeof mynickname==='undefined'){
		res.redirect('/login');
	}else{
		fs.readFile('views/find_couple.html',function(error,data){
			res.send(data.toString());
		});
	}
});

router.post('/',function(req,res,next){
	var nickname = req.body.nickname;
	var gender = req.session.gender;
	var mynickname = req.session.nickname;

	console.log(nickname,gender,mynickname);
	if(typeof gender==='undefined'||typeof mynickname==='undefined'){
		res.json({'err_code':4,'err_msg':'로그인 해주세요'});
	}

	if(gender===true){
		gender=false;
	}else{
		gender=true;
	}


	if(nickname===mynickname){
		res.json({'err_code':3,'err_msg':'자신은 검색할 수 없습니다'});
	}else{
		console.log('다음을 찾습니다 : ' + nickname + ' ' + gender);
		db.profiles.find({"nickname":nickname,"gender":gender},function(error,data){
			console.log('찾기 : '+data);
			if(data==''){
				res.json({'err_code':1,'err_msg':'존재하지 않는 유저입니다'});
			}else{
				if(data[0].couple===true){
					res.json({'err_code':2,'err_msg':'이미 커플인 유저입니다'});
				}
				res.json({'err_code':0,'id':data[0].id,'nickname':nickname,'gender':data[0].gender,'birthday':data[0].birthday});
			}
		});
	}
});

router.post('/confirm',function(req,res,next){
	var couple_nicknameStr = req.body.couple_nickname;
	var nicknameStr = req.session.nickname;
	var gender = req.session.gender;

	if(typeof gender==='undefined'||typeof nicknameStr==='undefined'){
		res.json({'err_code':1,'err_msg':'오류가 발생했습니다'});

	}else{
		db.profiles.find({nickname:nicknameStr},function(error,data){
			if(data!=''){
				db.profiles.find({nickname:couple_nicknameStr},function(error,data){
					if(data!=''){
						var couple_ID = crypto.getCrypto(nicknameStr + couple_nicknameStr);
						db.profiles.update({nickname:nicknameStr},{$set:{couple:true,coupleID:couple_ID}},function(error,data){
							if(error){
								res.json({'err_code':1,'err_msg':'오류가 발생했습니다'});
							}else{
								db.profiles.update({nickname:couple_nicknameStr},{$set:{couple:true,coupleID:couple_ID}},function(error,data){
									if(error){
										res.json({'err_code':1,'err_msg':'오류가 발생했습니다'});
									}else{
										req.session.coupleID=couple_ID;
										res.json({'err_code':0,'err_msg':'커플이 탄생하였습니다!'});
									}
								});
							}
						});
					}else{
						res.json({'err_code':1,'err_msg':'오류가 발생했습니다'});
					}
				});
			}else{
				res.json({'err_code':1,'err_msg':'오류가 발생했습니다'});
			}
		});
	}
});
module.exports = router;