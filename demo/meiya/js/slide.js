var Slider = function(slideContainer, buttonContainer, options) {

    if (!slideContainer || !buttonContainer) return;

    var options = options || {};

    var current = 0;  // 当前幻灯片下标
    var next = 0;  // 下一幻灯片下标
    var container = $(slideContainer);  // 幻灯片容器
    var slides = container.children();  // 幻灯片
    var items = $(buttonContainer);  // 按钮容器
    var num = slides.length;  // 幻灯片数量
    var width = container.width();  // 幻灯片容器宽度
    var totalWidth = width * num;  // 所有幻灯片总宽度
    var delay = options.delay || 3000;  // 计时器间隔时间
    var speed = options.speed || 1000;  // 图片速度
    var timer;  // 计时器
    var slideType = options.slideType || 'silde';

    container.css({'width' : totalWidth + 'px'});

    /*初始化*/
    var init = function() {
        container.on('mouseover', 'img', function() {
            stop();
        }).on('mouseout', 'img', function() {
            play();
        });

        items.on('mouseover', 'li', function() {
            var index = $(this).index();
            goTo(index);
        }).on('mouseout', 'li', function() {
            play();
        }).on('click', 'li', function() {
            var index = $(this).index();
            goTo(index);
        });
    };

    var run = function(index) {
        if(index >= 0) {
            next = index;
        } else {
            next = (current == num - 1) ? 0 : current + 1;
        }
        if (slideType == 'fade') {
            container.children().css({
                'position' : 'absolute',
                'left' : 0,
                'top' : 0
            }).eq(next).fadeIn(speed).siblings().fadeOut();
        } else {
            container.animate({left : '-' + next * width + 'px'}, speed);
        }
        items.children().eq(next).addClass('active').siblings().removeClass('active');
        current = next;
    };

    /*转到第i张*/
    var goTo = function(index) {
        stop();
        run(index);
    };

    /*清除计时器*/
    var stop = function() {
        container.stop(true);
        container.children().stop(true);
        window.clearInterval(timer);
    };

    /*开始计时*/
    var play = function(index) {
        run(index);
        timer = setInterval(run, delay);
    };

    /*上一张*/
    var prev = function() {
        stop();
        var index = (current == 0) ? num - 1 : current - 1;
        goTo(index);
    };

    /*下一张*/
    var next = function() {
        stop();
        var index = (current == num - 1) ? 0 : current + 1;
        goTo(index);
    };

    init();
    play(0);

};
