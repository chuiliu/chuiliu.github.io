(function($) {
	$(window).scroll(function(){
		if ($(window).scrollTop() > 200){
			$("#to-top").stop().animate({right:"5px"});
		}else{
			$("#to-top").stop().animate({right:"-50px"});
		}
	});
	$("#to-top").click(function(){
		$('body,html').animate({
			scrollTop:0
		},300);
		return false;
	});
})(jQuery);