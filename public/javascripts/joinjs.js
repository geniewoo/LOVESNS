$(function(){
	$("#birthday").datepicker({
		dateFormat:"yy-mm-dd",
		changeYear:true,
		changeMonth:true,
		maxDate:+0,
		minDate:"-100y",
		yearRange:'-100:+0'
	});
	var $id=$("#id");
	$id.next().hide();
	$id.keyup(function(){
		var test= $id.val();
		if( !(/^[a-zA-Z0-9]+$/).test(test) ){
			$id.next().text('영문자, 숫자만 사용가능합니다');
		}else if(test.length<6){
			$id.next().text('6자 이상 입력하세요');
		}else if(test.length>16){
			$id.next().text('최대길이는 16자 입니다');
		}else if(!(/^[a-zA-Z0-9]*(([a-zA-Z][0-9])|([0-9][a-zA-Z]))[a-zA-Z0-9]*$/).test(test)){
			$id.next().text('최소 하나의 영문자와 숫자가 포함되어야 합니다');
		}else{
			$id.next().text('');
		}
	});
	$id.blur(function(){
		$id.next().hide();
	});
	$id.focus(function(){
		$id.next().show();
	});

	var $password=$("#password");
	$password.next().hide();
	$password.keyup(function(){
		var test= $password.val();	
		if(test.length<6){
			$password.next().text('영문자, 숫자, !@#$%를 포함해 6자이상이어야 합니다.');
		}else if(!(/[a-zA-Z]/).test(test)){
			$password.next().text('영문자가 포함되어야 합니다.');
		}else if(!(/[0-9]/).test(test)){
			$password.next().text('숫자가 포함되어야 합니다.');
		}else if(test.length>16){
			$password.next().text('최대길이는 16자 입니다');
		}else if( !(/^[a-zA-Z0-9!@#$%]+$/).test(test) ){
			$password.next().text('문자, 숫자를 포함하고 !@#$%사용가능합니다');
		}else{
			$password.next().text('');
		}
	});
	$password.blur(function(){
		$password.next().hide();
	});
	$password.focus(function(){
		$password.next().show();
	});

	var $confirm_password=$("#confirm_password");
	$confirm_password.next().hide();
	$confirm_password.keyup(function(){
		var test=$confirm_password.val();
		var password=$password.val();
		if(test!=password){
			$confirm_password.next().text('입력한 비밀번호와 다릅니다');
		}else{
			$confirm_password.next().text('');
		}
	});

	$confirm_password.blur(function(){
		$confirm_password.next().hide();
	});

	$confirm_password.focus(function(){
		$confirm_password.next().show();
	});

	var $nickname=$("#nickname");
	$nickname.next().hide();
	$nickname.on('keyup',function(){
		var test=$nickname.val();
		if(test.length<2){
			$nickname.next().text('영문자, 숫자, 한글,"_"로 2글자 이상이어야 합니다.');
		}else if(test.length>10){
			$nickname.next().text('최대길이는 10자 입니다');
		}else if( !(/^[a-zA-Z0-9가-힣_]+$/).test(test) ){
			$nickname.next().text('영문자, 숫자, 한글, "_" 사용가능합니다');
		}else{
			$nickname.next().text('');
		}
	});

	$nickname.blur(function(){
		$nickname.next().hide();
	});

	$nickname.focus(function(){
		$nickname.next().show();
	});

	$("#joinBtn").on('click',function(){

		var idStr= $id.val();
		if( !(/^[a-zA-Z0-9]+$/).test(idStr) ){
			$id.focus();
			return;
		}else if(idStr.length<6){
			$id.focus();
			return;
		}else if(idStr.length>16){
			$id.focus();
			return;
		}else if(!(/^[a-zA-Z0-9]*(([a-zA-Z][0-9])|([0-9][a-zA-Z]))[a-zA-Z0-9]*$/).test(idStr)){
			$id.focus();
			return;
		}

		var passwordStr= $password.val();	
		if(passwordStr.length<6){
			$password.focus();
			return;
		}else if(!(/[a-zA-Z]/).test(passwordStr)){
			$password.focus();
			return;
		}else if(!(/[0-9]/).test(passwordStr)){
			$password.focus();
			return;
		}else if(passwordStr.length>16){
			$password.focus();
			return;
		}else if( !(/^[a-zA-Z0-9!@#$%]+$/).test(passwordStr) ){
			$password.focus();
			return;
		}
		
		var confirm_passwordStr=$confirm_password.val();
		password=$password.val();
		if(confirm_passwordStr!=password){
			$confirm_password.focus();
			return;
		}
		
		var nicknameStr=$nickname.val();
		if(nicknameStr.length<2){
			$nickname.focus();
			return;
		}else if(nicknameStr.length>10){
			$nickname.focus();
			return;
		}else if( !(/^[a-zA-Z0-9가-힣_]+$/).test(nicknameStr) ){
			$nickname.focus();
			return;
		}

		var birthdayStr=$('#birthday').val();
		if(!(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).test(birthdayStr)){
			$('#birthday').focus();
			return;
		}


		var genderStr;

		var $gender1 = $('#gender1');
		var $gender2 = $('#gender2');
		if($gender1.is(':checked')){
			genderStr=$gender1.val();
		}else if($gender2.is(':checked')){
			genderStr=$gender2.val();
		}else{
			return;
		}

		console.log('gender : ' + genderStr);

		$.post('/join',{id:idStr, password:passwordStr, nickname:nicknameStr, birthday:birthdayStr, gender:genderStr},function(result){
			switch(result.err_code){
				case 0:
				alert(result.err_msg);
				window.location.replace('login');
				break;
				case 1:
				$id.focus();
				alert(result.err_msg);
				break;
				case 2:
				$nickname.focus();
				case 3:
				alert(result.err_msg);
				break;
			}
		});
	});
});