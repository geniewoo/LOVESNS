$(function(){
	$write_letter = $('#write_letter');
	$write_letter.load("html/write-letter.html",function(){

		$("textarea.autosize").keyup(function () {
			$(this).css("height","1px").css("height",(20+$(this).prop("scrollHeight"))+"px");
		});

		$('#letter_up_btn').on('click', function(){
			var msg = $('#letter_upload').val();
			$('#letter_upload').val('');
			$.post('/main/write_letter', { letter_msg : msg }, function(result){
				console.log(result);
			});
		});
	});
});