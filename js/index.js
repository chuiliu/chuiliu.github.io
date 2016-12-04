(function($) {

    var lastTop = 0;
    var scrollTop = $(window).scrollTop();
    var minScroll = 30;

    var $totop = $('#to-top');
    var $mainHeader = $('#header .main-header-wrap');
    var $subHeader = $('#header .sub-header-wrap');

    if (scrollTop < minScroll) {
        $mainHeader.removeClass('hide');
    }

    $totop.click(function() {
        $('body, html').animate({
            scrollTop:0
        },300);
        return false;
    });
    $('.icon-menu').on('click', function(e) {
        e.stopPropagation();
        $('.main-header-wrap .nav').show();
        $(document).on('click', function() {
            $('.main-header-wrap .nav').hide();
        });
    });
    $('.main-header-wrap .nav').on('click', function(e) {
        e.stopPropagation();
    });

    $(window).scroll(function(){

        var mobile = false;
        // 判断屏幕宽度
        if (window.matchMedia) {
            mobile = window.matchMedia('(max-width: 768px)').matches
        } else {
            mobile = $(window).width() <= 768 ? true : false;
        }


        scrollTop = $(this).scrollTop();

        if (mobile) {
            $('.main-header-wrap .nav').hide();
        }

        if (!mobile && lastTop < scrollTop && scrollTop > minScroll) {
            // 上滚
            $mainHeader.removeClass('main-header-show hide');
            $subHeader.removeClass('sub-header-show');
        } else if (!mobile && lastTop > scrollTop && scrollTop > minScroll) {
            // 下滚
            $subHeader.addClass('sub-header-show');
        } else if (!mobile) {
            $mainHeader.addClass('main-header-show');
            $subHeader.removeClass('sub-header-show');
        }

        lastTop = scrollTop;

        // 回顶部
        if (scrollTop > 200){
            $totop.stop().animate({right:'5px'});
        } else{
            $totop.stop().animate({right:'-50px'});
        }

    });


})(jQuery);
