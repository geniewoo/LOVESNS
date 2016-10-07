$(function(){
	$read_letter = $('#read_letter');
	console.log($read_letter.attr('num'));
	var url = '/main/read_letter?type='
	+ $read_letter.attr("type")
	+ '&num='
	+ $read_letter.attr("num");
	$.get(url, function(result){
		if(result.err_code===0){
			var letter = result.letter;
			var myGender = result.myGender;
			makeLetterForm(letter, $read_letter, myGender);
		}else{
			console.log(result.err_msg);
		}
	});
});

var makeLetterForm = function(letter, $read_letter, myGender){
	for(var i = 0 ; i < letter.length ; i++){
		var gender;
		console.log(letter[i].letter_gender);
		if(letter[i].letter_gender === true){
			gender = 'male';
		}else{
			gender = 'female';
		}

		var dom ='<div id = "'
		+ letter[i].letterID
		+ '" class = "letter_form '
		+ gender
		+ '">'
		+ '<p class = "letter_msg">'
		+ letter[i].letter_msg
		+ '</p>';

		if(myGender === letter[i].letter_gender){
			dom += '<a href="main/delete_letter?letterID='
			+ letter[i].letterID
			+ '">삭제</a>';
		}
		
		dom += '<p class = "letter_date">'
		+ letter[i].letter_date
		+ '</p>'
		+ '</div>';

		$read_letter.prepend(dom);
	}
}