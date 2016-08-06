window.onload = function() {

    var obj = {
        init : function() {
            var self = this;
            self.initBanner();
            self.bindEvents();
        },

        /*初始化轮播器*/
        initBanner : function() {
            var options = {
                container : '.banner',
                delay: 5000,
                speed: 800,
                slideType: 'fade', /*fade或slide*/
            };
            var s = new Slider('.slides', '.options', options);
        },

        /*绑定事件*/
        bindEvents : function() {
            /*多程提示面板*/
            var ele = document.getElementById('multiple-trip-info');
            var info = document.getElementById('multiple-trip-panel');
            addEvent(ele, 'mouseover', function() {
                // console.log(0);
                info.style.display = 'block';
            });
            addEvent(ele, 'mouseout', function(e) {
                var event = e || window.event;
                event.returnValue = false;
                info.style.display = 'none';
            });

            /*高级搜索*/
            var superSearch = document.getElementById('super-search');
            var toggle = 0;
            addEvent(superSearch, 'click', function() {
                var superSearch = document.getElementById('super-search-panel');
                var searchPanel = document.getElementById('search-panel');
                var listIcon = document.getElementById('icon-list');
                if(toggle === 0) {
                    // console.log(superSearch.innerHTML);
                    superSearch.style.display = 'block';
                    searchPanel.style.cssText = 'border-right:2px solid #eee;border-bottom:2px solid #eee;';
                    removeClass(listIcon, 'icon-list-down');
                    addClass(listIcon, 'icon-list-up');
                    toggle = 1;
                } else {
                    superSearch.style.display = 'none';
                    searchPanel.style.border = 'none';
                    removeClass(listIcon, 'icon-list-up');
                    addClass(listIcon, 'icon-list-down');
                    toggle = 0;
                }
            });

            /*交换*/
            var exchange = document.getElementById('exchange');
            addEvent(exchange, 'click', function() {
                var departure = document.getElementById('departure-city');
                var destination = document.getElementById('destination-city');
                var temp = departure.value;
                departure.value = destination.value;
                destination.value = temp;
            });
        }
    };

    obj.init();
};



/*根据id选择*/
/*function $(selector) {
    return document.getElementById(selector);
}*/

/*添加事件*/
function addEvent(ele, evt, fn) {
    if(!ele) {
        return;
    }
    if(ele.addEventListener) {
        ele.addEventListener(evt, fn, false);
    } else if(ele.attachEvent) {
        ele.attachEvent('on' + evt, fn, false);
    } else {
        ele['on' + evt] = fn;
    }
}

/*通过类名查询，传入class名称*/
function getElementsByClassName(parent, className) {
    if(!parent) {
        return;
    }
    if(document.querySelector) {
        return parent.querySelector('.' + className);
    } else {
        var arr = [];
        var eleArr = parent.getElementsByTagName('*');
        for (var i = 0, len = eleArr.length; i < len; i++) {
            if(eleArr[i].className == className) {
                arr.push(eleArr[i]);
            }
        }
        // console.log(arr);
        return arr;
    }
}

function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += ' ' + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}