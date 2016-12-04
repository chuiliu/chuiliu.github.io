(function($) {
    var lastTop = 0;
    var scrollTop = $(window).scrollTop();
    var minScroll = 30;

    if (scrollTop < minScroll) {
        $("#header .main-header-wrap").removeClass('hide');
    }

    $(window).scroll(function(){

        scrollTop = $(this).scrollTop();

        if (lastTop < scrollTop && scrollTop > minScroll) {
            // $("#header .main-header-wrap").hide();
            // $("#header .sub-header-wrap").hide();
            // $("#header .main-header-wrap").removeClass('hide');
            $("#header .main-header-wrap").removeClass('main-header-show hide');
            $("#header .sub-header-wrap").removeClass('sub-header-show');
        } else if (lastTop > scrollTop && scrollTop > minScroll) {
            // $("#header .sub-header-wrap").show();
            $("#header .sub-header-wrap").addClass('sub-header-show');
        } else {
            // $("#header .main-header-wrap").show();
            // $("#header .sub-header-wrap").hide();
            $("#header .main-header-wrap").addClass('main-header-show');
            $("#header .sub-header-wrap").removeClass('sub-header-show');

        }

        lastTop = scrollTop;
    });
})(jQuery);
