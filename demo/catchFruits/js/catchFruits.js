// canvas画布
var canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 550;
var ctx = canvas.getContext('2d');

// 分数和计时
var score = 0;
var time = 0;

// 计时器
var calculateTime;  // 计算时间
var newFruit;  // 创建水果
var adjustMove;  // 调整
var showScore;  // 显示加分

// 判断左右移动
var left = false;
var right = false;

// 分数和计时的DOM元素
var scoreEle = document.getElementById('score').getElementsByTagName('span')[0];
var timeEle = document.getElementById('time').getElementsByTagName('span')[0];

/*初始化事件*/
var initEvent = function() {
    var self = this;
    var newGame = document.getElementById('newGame');
    if(window.addEventListener) {
        newGame.addEventListener('click', function() {
            startNewGame();
        }, false);
    } else {
        newGame.attachEvent('click', function() {
            startNewGame();
        }, false);
    }
};

initEvent();

/*新游戏*/
var startNewGame = function() {
    console.log('开始新游戏');
    cancelAnimationFrame(window.game);
    ctx.clearRect(0, 0, 400, 550);
    gameStart();
};


// 获取水果图片
var getFruitImg = function() {
    var fruitSrcArr = ['apple', 'orange', 'banana', 'watermelon','grape','papaya','pineapple','greenApple','strawberry'];
    var fruitIndex = Math.ceil(Math.random() * 8);
    // console.log(fruitSrcArr[fruitIndex]);
    var fruitImg = new Image();
    fruitImg.src = '../catchFruits/img/' + fruitSrcArr[fruitIndex] + '.png';
    return fruitImg;
};

// 获取兔子图片
var getRabbitImg = function() {
    var rabbitImg = new Image();
    rabbitImg.src = '../catchFruits/img/rabbit.png';
    // rabbitImg.style.zIndex = 999;
    return rabbitImg;
};

// 获取加分图片
var getScoreImg = function() {
    var scoreImg = new Image();
    scoreImg.src = '../catchFruits/img/10.png';
    return scoreImg;
};




// 水果对象
var Fruit = function(obj) {
    this.imgObj = obj;
    this.x = Math.random() * (400 - 50);
    this.y = 0;
    this.width = 60;
    this.height = 60;
    this.speed = 3;
    // 是否被接住
    this.isCatch = false;
    // 是否超出范围
    this.isOut = false;
};

// 水果出现
Fruit.prototype.draw = function() {
    ctx.drawImage(this.imgObj, this.x, this.y, this.width, this.height);
};

// 水果掉下的过程
Fruit.prototype.fall = function() {
    if(!this.isCatch && this.y < 550) {
        this.y += this.speed;
    } else {
        this.isOut = true;
    }
};

// 兔子对象
var Rabbit = function(obj) {
    this.imgObj = obj;
    this.width = 80;
    this.height = 80;
    this.x = (400 - this.width) / 2;  // 居中
    this.y = 440;
};

// 画出兔子
Rabbit.prototype.draw = function() {
    ctx.drawImage(this.imgObj, this.x, this.y, this.width, this.height);
};

// 兔子移动
Rabbit.prototype.move = function() {
    var self = this;
    document.onkeydown = function(e) {
        // console.log(e.keyCode,'>>>',self.x);
        // 左移
        if((self.x >= 0) && (e.keyCode == 37)) {
            left = true;
        }
        // 右移
        if((self.x < (400 - self.width)) && (e.keyCode == 39)) {
            right = true;
        }
    };
    document.onkeyup = function(e) {
        left = false;
        right = false;
    }
};


// 分数对象
/*var Score = function(obj) {
    this.imgObj = obj;
    this.width = 40;
    this.height = 40;
    this.x = 0;
    this.y = 400;
    this.speed = 10;
    // 是否消失
    this.isDisappear = false;
};*/

// 画出分数
/*Score.prototype.draw = function() {
    ctx.drawImage(this.imgObj, this.x, this.y, this.width, this.height);
};*/

// 分数上升
/*Score.prototype.up = function() {
    console.log('分数上升')
    if(!this.isDisappear && this.y > 0) {
        console.log('hahahahah')
        this.y -= this.speed;
    } else {
        this.isDisappear = true;
    }
};*/



// 是否接到水果
var isCatch = function(rabbit, fruit) {
    var rabbitX = rabbit.x;
    var rabbitY = rabbit.y;
    var fruitX = fruit.x;
    var fruitY = fruit.y;
    if(fruit.isCatch == false && rabbitY - fruitY < 0 && Math.abs(rabbitX - fruitX) < 40) {
        score += 10;
        scoreEle.innerHTML = score;
        fruit.isCatch = true;
    }
};



// 游戏开始
var gameStart = function(options) {
    console.log('游戏开始');
    score = 0;
    time = 60;

    // 清除计时器
    clearInterval(calculateTime);
    clearInterval(newFruit);
    clearInterval(adjustMove);

    result.style.display = 'none';

    // 计时开始
    calculateTime = setInterval(function() {
        timeEle.innerHTML = time--;
        if (time < 0) {
            cancelAnimationFrame(window.game);
            clearInterval(calculateTime);
            var result = document.getElementById('result');
            result.getElementsByTagName('span')[0].innerHTML = 'Game Over\nYour Score: ' + score;
            result.style.display = 'block';
        }
    }, 1000);

    var fruitArr = [];
    var rabbitImg = getRabbitImg();
    var rabbit = new Rabbit(rabbitImg);


    // 创建水果
    newFruit = setInterval(function() {
        var fruitImg = getFruitImg();
        var fruit = new Fruit(fruitImg);
        fruitArr.push(fruit);
    }, 1200);

    // 调整兔子平滑移动
    adjustMove = setInterval(function() {
        if((rabbit.x >= 0) && left) {
            rabbit.x -= 3;
        }
        if((rabbit.x < (400 - rabbit.width)) && right) {
            rabbit.x += 3;
        }
    }, 10);


    var start = function() {
        ctx.clearRect(0, 0, 400, 550);
        rabbit.draw();
        rabbit.move();

        var scoreArr = [];

        for (var i in fruitArr) {
            fruitArr[i].draw();
            fruitArr[i].fall();
            isCatch(rabbit, fruitArr[i]);

            if (fruitArr[i].isCatch || fruitArr[i].isOut) {
                // 删除水果
                // ctx.clearRect(0, 0, 400, 550);

                if (fruitArr[i].isCatch) {
                    var scoreImg = getScoreImg();
                    // var scoreObj = new Score(scoreImg);
                    // scoreObj.x = fruitArr[i].x;
                    // scoreArr.push(scoreObj);


                    fruitArr.splice(fruitArr[i], 1);

                }


            }
        }

        console.log('>>>>>>>>>>>>>>>>>>>>>', scoreArr)

        for (var i in scoreArr) {
            scoreArr[i].draw();
            scoreArr[i].up();
        }




        window.game = requestAnimationFrame(start);
    };

    start();

};

