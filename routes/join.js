var express = require('express');
var router = express.Router();
var fs=require('fs');
var mongojs=require('mongojs');
var crypto=require('./crypto.js');

var db=mongojs('YangGoon',['profiles']);

router.get('/', function(req, res, next) {
	fs.readFile('views/join.html',function(error,data){
		res.send(data.toString());
	});
});

router.post('/',function(req,res,next){

	var id=req.body.id;
	var password=req.body.password;
	var nickname=req.body.nickname;
	var gender=req.body.gender;
	var birthday=req.body.birthday;
	var isMale;

	console.log(id,password,nickname,gender,birthday,isMale);

	if(gender==="female"){
		isMale=false;
	}else if(gender==="male"){
		isMale=true;
	}else{
		return;
	}


	var test= id;
	if( !(/^[a-zA-Z0-9]+$/).test(test) ){
		return;
	}else if(test.length<6){
		return;
	}else if(test.length>16){
		return;
	}else if(!(/^[a-zA-Z0-9]*(([a-zA-Z][0-9])|([0-9][a-zA-Z]))[a-zA-Z0-9]*$/).test(test)){
		return;
	}

	test= password;
	if(test.length<6){
		return;
	}else if(!(/[a-zA-Z]/).test(test)){
		return;
	}else if(!(/[0-9]/).test(test)){
		return;
	}else if(test.length>16){
		return;
	}else if( !(/^[a-zA-Z0-9!@#$%]+$/).test(test) ){
		return;
	}


	test=nickname;
	if(test.length<2){
		return;
	}else if(test.length>10){
		return;
	}else if( !(/^[a-zA-Z0-9가-힣_]+$/).test(test) ){
		return;
	}

	birthdayStr=birthday;
	if(!(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).test(birthdayStr)){
		return;
	}

	var crypto_password=crypto.getCrypto(password);

	db.profiles.find({"id": id }, function(error, data) {
		console.log("log : ",data);
		if (data != '') {
			console.log("[-]");
			res.json({'err_code':1,'err_msg':'이미 사용중인 아이디 입니다.'});
			return;		
  		} else { // id not using -> check nickname
  			db.profiles.find({"nickname": nickname}, function(error, data) {
  				console.log("log : ",data);
  				if (data != '') {
  					console.log("[-]2");
  					res.json({'err_code':2,'err_msg':'이미 사용중인 닉네임 입니다.'});
  					return;
  				} else {
					db.profiles.save({ // save profit if condition all met
						"id": id,
						"password": crypto_password,
						"nickname": nickname,
						"gender": isMale,
						"couple": false,
						"coupleID": "",
						"birthday": birthday
					}, function(error, data) {
						if(error){
							res.json({'err_code':3,'err_msg':'회원가입에 실패하였습니다.'});
							return;
						}
						console.log(data);
						res.json({'err_code':0,'err_msg':'회원가입을 축하드립니다'});
					});
				}
			});
  		}
  	});
});

module.exports = router;