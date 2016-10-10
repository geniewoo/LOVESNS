$(function(){
	$header = $('#header');
	$header.load("html/header.html",function(){
		$('#logout').on('click',function(){
			console.log('logout');
			$.get('/logout',function(result){
				window.location.replace('/login');
			});
		});
		if($header.attr("class") === 'active_letter'){
			$('#active_letter').addClass('active');	
		}else if($header.attr("class") === 'picture_active'){
			$('#active_picture').addClass('active');
		}else{
		}
	});
	/*
	//0 = small, 1 = big
	var nowSize;
	//1 = make small, 2 = make big;
	var sizeToggle;


	if($(window).width() > 992){
		makeBigHeader($header)
		nowSize = 1;
		sizeToggle = 2;
	}else{
		makeSmallHeader($header)
		nowSize = 0;
		sizeToggle = 1;
	}

	$(window).on('resize', function(){
		sizeToggle = getSizeToggle(nowSize, $(window).width());
		console.log(sizeToggle);
		if(sizeToggle === 2){
			makeBigHeader($header)
			nowSize=1;
			sizeToggle = 0;
		}else if(sizeToggle === 1){
			makeSmallHeader($header)
			nowSize=0;
			sizeToggle = 0;
		}
	});
	*/
});
/*
var getSizeToggle = function(nowSize,window_width){
	console.log(nowSize,window_width)
	if(nowSize === 0 && window_width >= 992){
		return 2;
	}else if(nowSize ===1 && window_width < 992){
		return 1;
	}else{
		return 0;
	}
}

var makeSmallHeader = function($header){
	$header.load("html/header.html",function(){
		$('#logout').on('click',function(){
			console.log('logout');
			$.get('/logout',function(result){
				window.location.replace('/login');
			});
		});
	});
}

var makeBigHeader = function($header){
	$header.load("html/header.html",function(){
		$('#logout').on('click',function(){
			console.log('logout');
			$.get('/logout',function(result){
				window.location.replace('/login');
			});
		});
	});
}*/
