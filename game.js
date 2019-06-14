// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width;
const height = canvas.height;

// 定义球拍参数
var paddleHeight = 10;
var paddleWidth = 75;
var padddleX = (width - paddleWidth) / 2;
// 初始化按键
var rightPressed = false;
var leftPressed = false;

// 随机函数
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// 生成随机颜色
function randomColor() {
    return 'rgb(' + random(0, 255) + ', ' + random(0, 255) + ', ' + random(0, 255) + ')';
}

// 小球构造函数
function Ball(x, y, velX, velY, size, color) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.color = color;
}

// 绘制小球
Ball.prototype.drawBall = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
}

// 更新小球状态
Ball.prototype.update = function () {
    // 是否超出左右边界
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
        this.velX = -(this.velX);
        this.color = randomColor();
    }

    // 是否超出上边界
    if ((this.y - this.size) <= 0) {
        this.velY = -(this).velY;
        this.color = randomColor();
    }

    // 超出下边界游戏结束
    if ((this.y + this.size) >= height) {
        if (this.x > padddleX && this.x < padddleX + paddleWidth) {
            this.velY = -(this).velY;
            this.color = randomColor();
        } else {
            lives--;
            if(!lives) {
                alert('Game Over, GG!');
                document.location.reload();
            } else {
                ball.x = width / 2;
                ball.y = height - 30;
                ball.velX = 3;
                ball.velY = -3;
                padddleX = (width - paddleWidth) / 2;
            }
        }
    }

    this.x += this.velX;
    this.y += this.velY;
}

// 绘制球拍
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(padddleX, height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// 按键处理函数
function keyDown(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUp(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

// 监听按键事件
document.addEventListener('keydown', keyDown, false);
document.addEventListener('keyup', keyUp, false);

// 鼠标处理函数
function mouseMove(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < width) {
        padddleX = relativeX - paddleWidth / 2;
    }
}

// 监听鼠标事件
canvas.addEventListener('mousemove', mouseMove, false);

// 绘制砖块
var brickRowCount = 5;
var brickColumnCount = Math.floor((width - 60) / 85);
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding) + brickOffsetLeft);
                var brickY = (r * (brickHeight + brickPadding) + brickOffsetTop);

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#0095dd';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// 小球与砖块的碰撞检测
function collipsionDetect() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
                    ball.velY = -(ball.velY);
                    ball.color = randomColor();
                    b.status = 0;
                    score++;

                    // 获胜时
                    if(score == brickColumnCount * brickRowCount) {
                        alert('You Win! GG!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// 计算分数
var score = 0;
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095dd';
    ctx.fillText('Score: ' + score, 8, 20);
}

// 生命
var lives = 3;
function drawLives() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095dd';
    ctx.fillText('Lives: ' + lives, width - 65, 20);
}

// 小球动作
var ball = new Ball(width / 2, height - 30, 3, -3, 10, '#0095dd');

function draw() {
    ctx.clearRect(0, 0, width, height);

    ball.drawBall();
    ball.update();

    drawPaddle();
    if (rightPressed && (padddleX + paddleWidth) < width) {
        padddleX += 7;
    } else if (leftPressed && padddleX > 0) {
        padddleX -= 7;
    }

    drawBricks();
    collipsionDetect();
    drawScore();
    drawLives();

    window.requestAnimationFrame(draw);
}
draw();