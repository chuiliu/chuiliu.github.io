window.onload = function() {

    var conf = {
        // 游戏时间
        totalTime: 60,
        // 格子数量规则
        rule: [2, 3, 4, 5, 5, 6, 6, 6, 7, 7, 7, 8],
        // 色块难度，定义9种难度
        difficultyLevel: {
            1: [35, 45],
            2: [30, 40],
            3: [25, 35],
            4: [20, 30],
            5: [15, 25],
            6: [10, 20],
            7: [5, 15],
            8: [0, 10],
            9: [0, 5]
        }
    };

    var timer;
    var recentScore = 0;

    var btnStart = document.getElementById('start');
    var btnRestart = document.getElementById('restart');
    var beginPanel = document.querySelector('.game-begin');
    var gamePanel = document.querySelector('.game');
    var overPanel = document.querySelector('.game-over');
    var game = document.querySelector('.game-panel');
    var score = document.querySelector('.score');
    var time = document.querySelector('.time');

    var result = ['瞎子', '色弱', '色郎', '大色狼'];

    btnStart.addEventListener('click', gameStart, false);
    btnRestart.addEventListener('click', gameStart, false);


    /**
     * 初始化
     * @return {[type]} [description]
     */
    function init() {
        beginPanel.style.display = 'none';
        gamePanel.style.display = 'block';
        overPanel.style.display = 'none';
        game.style.height = game.clientWidth + 'px';
        time.innerHTML = conf.totalTime;
        time.style.backgroundColor = '#fbb928';
        score.innerHTML = '0';
    }

    /**
     * 生成格子
     * @param  {[type]} level [表示进阶到第几级，取大于等于1的数]
     * @return {[type]}       [description]
     */
    function initGrid(level) {
        game.innerHTML = '';

        var rule = conf.rule;
        // 根据规则取得行数
        var row = level > rule.length ? rule[rule.length - 1] : rule[level - 1];

        // 总格子数
        var total = row * row;
        var color = getRandomColor();
        var diffColor = generateSimilarColor(color, level);
        // 生成一个[1-total]之间的随机数
        var diffIndex = Math.floor(Math.random() * total) + 1;
        for (var j = 1; j <= total; j ++) {
            var span = document.createElement('span');
            var margin = 100 * 1 / game.clientWidth + '%';
            var width = 100 * ((game.clientWidth - (row - 1) * 1) / row) / game.clientWidth + '%';
            span.className = 'grid';
            // span.dataset['num'] = j;
            span.dataset ? span.dataset['num'] = j : span['data-num'] = j;
            span.style.backgroundColor = color;
            span.style.width = width;
            span.style.height = width;
            span.style.marginRight = margin;
            span.style.marginBottom = margin;
            if (j % row == 0) {
                span.style.marginRight = '0px';
            }
            if (j > (total - row)) {
                span.style.marginBottom = '0px';
            }
            // 不同的颜色块
            if (j == diffIndex) {
                span.style.backgroundColor = diffColor;
                span.addEventListener('click', function() {
                    initGrid(level + 1);
                    calcScore(level);
                }, false);
            }
            game.appendChild(span);
        }
    }

    /**
     * 游戏开始
     * @return {[type]} [description]
     */
    function gameStart() {
        init();
        // 游戏开始
        initGrid(1);
        // 开始计时
        var timeLeft = conf.totalTime;
        timer = setInterval(function() {
            timeLeft--;
            if (timeLeft < 10) {
                time.style.backgroundColor = '#ff6060';
            }
            time.innerHTML = timeLeft;
            if (timeLeft < 0) {
                clearInterval(timer);
                // 游戏结束
                gameOver();
            }
        }, 1000);
    }

    /**
     * 游戏结束
     * @return {[type]} [description]
     */
    function gameOver() {
        gamePanel.style.display = 'none';
        overPanel.style.display = 'block';
        var desc = '';
        if (recentScore >= 30) {
            desc = result[3];
        } else if (recentScore >= 20) {
            desc = result[2];
        } else if (recentScore >= 10) {
            desc = result[1];
        } else {
            desc = result[0];
        }
        overPanel.querySelector('.endScore').innerHTML = desc + ' lv:' + recentScore;
    }

    /**
     * 生成随机颜色
     * @return {String} [hsl颜色]
     */
    function getRandomColor() {
        // 色相 0 ~ 360
        var h = Math.floor(Math.random() * 361);
        // 饱和度 0% ~ 100%
        var s = Math.floor(Math.random() * 101) + '%';
        // 取20% ~ 80%的亮度，避免太暗和太亮
        var l = Math.floor(Math.random() * 41 + 20) + '%';
        return 'hsl(' + h + ',' + s + ',' + l + ')';
    }

    /**
     * 生成相似颜色
     * @param  {[type]} hsl   [根据的hsl颜色]
     * @param  {[type]} level [游戏进行到的级别，level >= 1]
     * @return {[type]}       [hsl颜色字符串]
     */
    function generateSimilarColor(hsl, level) {
        // 定义9种难度
        var difficultyLevel = conf.difficultyLevel;
        // 取出饱和度
        var tempS = hsl.split(',');
        var s = Number(/\d+/.exec(tempS[1].trim())[0]);
        var diffS;
        // 通过调整饱和度来控制颜色
        // 难度呈指数倍增加
        var dl = dl > 9 ? 9 : Math.ceil(Math.sqrt(level) + 1);
        console.log('难度', dl);

        var random = Math.random();
        diffS = (s >= 50) ? s - Math.floor(random * 10 + difficultyLevel[dl][1]) : s + Math.floor(random * 10 + difficultyLevel[dl][0]);
        tempS[1] = diffS + '%';
        var diffHsl = tempS.join(',');
        return diffHsl;
    }

    /**
     * 计算得分
     * @param  {[type]} level [description]
     * @return {[type]}       [description]
     */
    function calcScore(level) {
        // 每进阶一级得1分
        recentScore = level;
        score.innerHTML = recentScore;
    }

    window.onresize = function() {
        game.style.height = game.clientWidth + 'px';
    };

};
