(function($) {

    var lastTop = 0;
    var scrollTop = $(window).scrollTop();
    var minScroll = 30;

    var $totop = $('#to-top');
    var $mainHeader = $('#header .main-header-wrap');
    var $subHeader = $('#header .sub-header-wrap');
    var $mobileNav = $('#mobile-nav');


    // 回顶部
    $totop.click(function() {
        $('body, html').animate({
            scrollTop: 0
        }, 300);
        return false;
    });

    // 移动端菜单按钮
    $('.icon-menu').on('click', function(e) {
        e.stopPropagation();
        // $mobileNav.show();
        $mobileNav.addClass('mobile-nav-expand');
        $(document).on('click', function() {
            // $mobileNav.hide();
            $mobileNav.removeClass('mobile-nav-expand');
        });
    });

    $mobileNav.on('click', function(e) {
        e.stopPropagation();
    });

    $(window).scroll(function(){

        var mobile = isMatchMedia(768);

        scrollTop = $(this).scrollTop();

        if (!mobile && lastTop < scrollTop && scrollTop > minScroll) {
            // PC端，下滚，滚动条大于导航栏消失距离
            // $mainHeader.removeClass('main-header-show');
            $subHeader.removeClass('sub-header-show');
        } else if (!mobile && lastTop > scrollTop && scrollTop > minScroll) {
            // PC端，上滚，显示条小于导航栏消失距离
            $subHeader.addClass('sub-header-show');
        } else if (!mobile) {
            // $mainHeader.addClass('main-header-show');
            $subHeader.removeClass('sub-header-show');
        } else if (mobile) {
            $mobileNav.removeClass('mobile-nav-expand');
        }


        lastTop = scrollTop;
        // 回顶部
        if (scrollTop > 200){
            $totop.stop().animate({right:'5px'});
        } else{
            $totop.stop().animate({right:'-50px'});
        }

    });

    /**
     * 是否符合媒体查询
     * @param  {[type]}  maxWidth [description]
     * @return {Boolean}          [description]
     */
    function isMatchMedia(maxWidth) {
        var isMatch = false;
        // 判断屏幕宽度
        if (window.matchMedia) {
            isMatch = window.matchMedia('(max-width: '+ maxWidth +'px)').matches;
        } else {
            isMatch = $(window).width() <= maxWidth ? true : false;
        }
        return isMatch;
    }



})(jQuery);
