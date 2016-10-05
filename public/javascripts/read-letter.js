$(function(){
	$read_letter = $('#read_letter');
	console.log($read_letter.attr('num'));
	var url = '/main/read_letter?type='
			+ $read_letter.attr("type")
			+ '&num='
			+ $read_letter.attr("num");
	$.get(url, function(result){
		console.log(result);
	});
});