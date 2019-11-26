const Direction = {
    "none": 0,
    "left": -1,
    "right": 1
}

class Player {
    constructor(x = 0) {
        this.x = x;
        this.setYPos();
        this.v = 0;
        this.dir = Direction.none;
        this.maxV = PLAYER_MAXV;
        this.acc = PLAYER_ACC;
        this.friction = PLAYER_FRIC;
        this.paddleAngle = 0;
        this.paddleSpeed = 0.16;
    }
    setYPos() {
        this.y = windowHeight - PLAYER_H / 2;
    }
    draw() {
        stroke(0);
        fill(0, 0, 0, 100);
        //paddle
        push();
        translate(this.x - PLAYER_W / 2, this.y + PADDLE_H * 0.15);
        rotate(this.paddleAngle);
        image(paddleImg, -PADDLE_H / 2, -PADDLE_H / 2, PADDLE_H, PADDLE_H);
        pop();
        //body
        image(shipBodyImg, this.x - PLAYER_W / 2, this.y - PLAYER_H / 2 - 5, PLAYER_W, PLAYER_H);
    }
    addDir(val) {
        this.dir = clamp(this.dir + val, -1, 1);
    }
    accelerate() {
        this.v += this.acc * this.dir * deltaTime / 15;
        var friction = this.friction * deltaTime / 15;
        if (this.dir == 0) {
            if (this.v > friction) {
                this.v -= friction;
            } else if (this.v < -friction) {
                this.v += friction;
            } else {
                this.v = 0;
            }
        }
        this.v = clamp(this.v, -this.maxV, this.maxV);
    }
    move() {
        this.accelerate();
        this.x += this.v * deltaTime / 15;
        this.x = clamp(this.x, 0 + PLAYER_W / 2, windowWidth - PLAYER_W / 2);
        this.paddleAngle += this.dir * this.paddleSpeed;
    }
    hit(ticket) {
        return abs(this.x - ticket.x) < (PLAYER_W + TICKET_W) / 2 &&
            abs(this.y - ticket.y) < (PLAYER_H + TICKET_H) / 2;
    }
}

function clamp(value, minVal, maxVal) {
    return value > maxVal ? maxVal : value < minVal ? minVal : value;
}