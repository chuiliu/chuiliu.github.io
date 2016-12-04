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
        $('.nav').show();
        $(document).on('click', function() {
            $('.nav').hide();
        });
    });
    $('.nav').on('click', function(e) {
        e.stopPropagation();
    });

    $(window).scroll(function(){
        $('.nav').hide();
        var mobile = window.matchMedia('(max-width: 768px)').matches;
        scrollTop = $(this).scrollTop();

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


    $(window).scroll(function() {

    });







})(jQuery);
