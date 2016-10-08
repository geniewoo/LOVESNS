module.exports = function(io){
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

			io.on('connection', function (socket) {
				socket.join(req.session.coupleID);
				console.log("방팜");
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
					io.sockets.in(req.session.coupleID).emit('newLetter',{'letter' : data, 'myGender' : req.session.gender});
					console.log("편지 룸 전송");
					res.json({'err_code':0,'err_msg':'글쓰기 완료'});
				}
			});
		}
	});

	router.get('/read_letter',function(req, res, next){
		if(session.confirm_coupleID(req.session)===1){
			res.json({'err_code':1, 'err_msg':'로그인 하지 않았거나 잘못 된 접근입니다.'});
		}else{
			if(req.query.type==='1'){
				var num = req.query.num;
				db.letter.find({"coupleID" : req.session.coupleID}).sort({"letter_date" : -1 }).limit(10, function(error,data){
					if(error){
						res.json({'err_code':2, 'err_msg':'데이터베이스 에러입니다'});
					}else{
						res.json({'err_code':0, 'letter' : data, 'myGender' : req.session.gender});
					}
				});
			}else if(req.query.type==='2'){
				console.log(' 왓더 ');
				db.letter.find({"coupleID" : req.session.coupleID, "letter_date" : { "$lt" : new Date(req.query.date)} }).sort({"letter_date" : -1 }).limit(10, function(error,data){
					if(error){
						console.log(' 왓더 퍽 '); 
						res.json({'err_code':2, 'err_msg':'데이터베이스 에러입니다'});
					}else{
						console.log(' 왓더 어'); 
						res.json({'err_code':0, 'letter' : data, 'myGender' : req.session.gender});
					}
				});
			}
		}
	});

	router.get('/delete_letter',function(req, res, next){
		if(session.confirm_coupleID(req.session)===1){
			res.redirect('login');
		}else{
			db.letter.remove({"letterID" : req.query.letterID, "coupleID" : req.session.coupleID},function(error, data){
				if(error){
					res.redirect('back');
					console.log('0', data);
				}else{
					res.redirect('back');
					console.log('1', data);
				}
			});
		}
	});

	return router;
}