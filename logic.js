const balls = [];

const canvas = document.getElementById("canvas");
const randomColor = () => "#" + ((1 << 24) * Math.random() | 0).toString(16);

canvas.addEventListener("click", createBall);

function createBall(event) {
    const ball = document.createElement('div');
    const xPos = event.clientX;
    const yPos = event.clientY;
    const color = randomColor();
    ball.setAttribute("class", "circle");
    ball.setAttribute("style", "left:" + xPos + "px;top:" + yPos + "px;background-color:" + color);

    balls.push({
        element: ball,
        color: color,
        x: xPos,
        xDirection: 1,
        y: yPos,
        yDirection: 1,
        speed: 1,
        height: -200,
    })
    canvas.appendChild(ball);
}

setInterval(render);

function render() {
    balls.forEach(ball => {
        if (ball.y >= screen.height) {
            ball.yDirection = ball.yDirection * -1;
            ball.height = ball.height + 200;
            ball.speed = ball.speed - 0.1;
            if (ball.speed <= 0) {
                ball.speed = 0;
            }

        } else if (ball.y <= ball.height) {
            ball.yDirection = ball.yDirection * -1;
            ball.speed = ball.speed - 0.1;

        } else if (ball.x >= screen.width || ball.x <= 0) {
            ball.xDirection = ball.xDirection * -1;
        }

        balls.filter(b => b !== ball).forEach(b => {
            if (ball.y >= (b.y - 100) && ball.y <= (b.y + 100) && ball.x >= (b.x - 100) && ball.x <= (b.x + 100)) {
                ball.xDirection = ball.xDirection * -1;
                ball.yDirection = ball.yDirection * -1;
            }

        })

        const newX = ball.x + (ball.speed * ball.xDirection);
        const newY = ball.y + (ball.speed * ball.yDirection);
        ball.element.setAttribute("style", "left:" + newX + "px;top:" + newY + "px;background-color:" + ball.color);
        ball.x = newX;
        ball.y = newY;
    });


}