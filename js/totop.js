(function($) {
	alert();
	$(window).scroll(function(){
		if ($(window).scrollTop()>100){
			$("#to-top").fadeIn(500);
		}
		else{
			$("#to-top").fadeOut(500);
		}
	});
	//当点击跳转链接后，回到页面顶部位置
	$("#to-top").click(function(){
		$('body,html').animate({
			scrollTop:0
		},1500);
		return false;
	});
})(jQuery);