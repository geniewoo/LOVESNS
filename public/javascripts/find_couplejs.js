$(function(){
	$('#findBtn').on('click',function(){
		var nicknameStr = $('#nickname').val();
		console.log("send " + nicknameStr);

		var $show = $('#show');
		$show.html('');

		$.post('/find_couple',{nickname:nicknameStr},function(result){
			console.log(result);
			switch(result.err_code){
				case 0:
				makeList($show,result);
				break;
				case 1:
				case 2:
				case 3:
				$show.html('<p>' + result.err_msg + '</p>');
				break;
				case 4:
				window.location.href='login';
			}
		});
	});
});

var makeList=function($show,result){
	var id=result.id;
	var nickname=result.nickname;
	var gender=result.gender;
	var birthday=result.birthday;

	if(gender===true){
		gender='남성';
	}else{
		gender='여성';
	}

	var data='';
	data+='<p>아이디 : ' + id + '</p>';
	data+='<p>닉네임 : ' + nickname + '</p>';
	data+='<p>성별 : ' + gender + '</p>';
	data+='<p>생일 : ' + birthday + '</p>';
	data+='<input type="button" id="confirmBtn" class="form-control size-width100 center-block color1" value="커플맺기"/>';
	$show.html(data);

	$("#confirmBtn").on('click',function(){
		$.post('/find_couple/confirm',{couple_nickname:nickname},function(result){
			switch(result.err_code){
				case 0:
				window.location.href='main';
				break;
				case 1:
				alert(result.err_msg);
				window.location.href='find_couple';
				break;
			}
		})
	});
}