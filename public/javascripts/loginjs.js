$(function(){
	$('#loginBtn').on('click',function(){
		var idStr=$('#id').val();
		var passwordStr=$('#password').val();
		console.log("send "+idStr+" "+passwordStr);
		$.post('/login',{id:idStr, password:passwordStr},function(result){
			switch(result.err_code){
				case 0:
				window.location.replace('main');
				break;
				case 1:
				window.location.replace('find_couple');
				break;
				case 2:
				case 3:
				alert(result.err_msg);
				break;
			}
		});
	});
});