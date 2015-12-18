(function($) {
	$(window).scroll(function(){
		if ($(window).scrollTop() > 200){
			// $("#to-top").fadeIn(500);
			$("#to-top").animate({right:"30px"},"slow");
			console.log(">   "+$(window).scrollTop());
		}
		else{
			// $("#to-top").fadeOut(500);
			$("#to-top").animate({right:"0px"},"slow");
			console.log("<   "+$(window).scrollTop());
		}
	});
	$("#to-top").click(function(){
		$('body,html').animate({
			scrollTop:0
		},500);
		return false;
	});
})(jQuery);