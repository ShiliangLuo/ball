// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}

// 小球构造函数
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

// 绘制小球
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

// 更新小球状态
Ball.prototype.update = function () {
    // 是否超出右边界
    if((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    // 是否超出左边界
    if((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    // 是否超出下边界
    if((this.y + this.size) >= height) {
        this.velY = -(this).velY;
    }

    // 是否超出上边界
    if((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

// 碰撞检测
Ball.prototype.collisionDetect = function() {
    // for循环遍历所有小球
    for(let i = 0; i < balls.length; i++) {
        // 小球不能与自己相撞
        if(!(this === balls[i])) {
            // 小球横向距离
            var dx = this.x - balls[i].x;
            // 小球纵向距离
            var dy = this.y - balls[i].y;
            // 小球实际距离
            var distance = Math.sqrt(dx * dx + dy * dy);

            // 小球相撞后，变色
            if(distance < this.size + balls[i].size) {
                balls[i].color = this.color = randomColor();
                this.velX = -(this.velX);
                this.velY = -(this.velY);
                balls[i].velX = -(balls[i].velX);
                balls[i].velY = -(balls[i].velY);
            }
        }
    }
}

// 开辟小球存储空间
var balls = [];

function loop() {
    // 绘制背景
    ctx.fillStyle = 'rgba(0, 0, 0, .25)';
    ctx.fillRect(0, 0, width, height);

    // 取得25个随机的小球
    while(balls.length < 25) {
        var ball = new Ball(
            random(0, width),
            random(0, height),
            random(-7, 7),
            random(-7, 7),
            randomColor(),
            random(10, 20)
        );

        balls.push(ball)
    }

    // 调用函数，开始绘制小球和动作
    for(let i = 0; i < balls.length; i ++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

// loop();