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
			makeLetterForm(letter, $read_letter, myGender, true);
		}else{
			console.log(result.err_msg);
		}
	});
	var socket = io.connect('127.0.0.1:3000');
	socket.on('newLetter', function (data) {
		console.log(data);
		var letter = data.letter;
		var myGender = data.myGender;
		makeLetterForm([letter], $read_letter, myGender, false);
	});
	$(window).on('scroll',function() {
		console.log(parseInt($(window).scrollTop()), $(document).height(), $(window).height());
		if ( parseInt($(window).scrollTop()) + 2 > ( $(document).height() - $(window).height()) ){
			var date = $('.letter_date').last().text();
			var url = '/main/read_letter?type=2&num=10&date=' + date;
			$.get(url, function(result){
				if(result.err_code === 0){
					var letter = result.letter;
					var myGender = result.myGender;
					makeLetterForm(letter, $read_letter, myGender, true);
				}else{
					console.log(result.err_msg);
				}
			});
		}
	});
});

var makeLetterForm = function(letter, $read_letter, myGender, isAppend){
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
		if(isAppend===true){
			$read_letter.append(dom);
		}else{
			$read_letter.prepend(dom);
		}
	}
}