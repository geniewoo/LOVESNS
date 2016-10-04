var mongojs=require('mongojs');
var db=mongojs('YangGoon',['profiles']);

exports.confirm_coupleID = function(session){
	console.log('session : ' + session.nickname + ' ' + session.coupleID);
	if(!(typeof session.nickname === 'undefined')&&!(typeof session.coupleID === 'undefined')){
		db.profiles.find({nickname:session.nickname},function(error,data){
			console.log('data[0].coupleID : ' + data[0].coupleID);
			if(data[0].coupleID===session.coupleID){
				console.log('session : return 0');
				return 0;
			}else{
				return 1;
			}
		});
	}else{
		return 1;	
	}
};	