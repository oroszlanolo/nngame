const Direction = { "none": 0, "left": -1, "right": 1 }

class Player {
    constructor(w, h, x = 0, y = 0) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.v = 0;
        this.dir = Direction.none;
        this.maxV = 22;
        this.acc = 3;
        this.friction = 5;
    }
    draw() {
        stroke(0);
        fill(0, 0, 0, 100);
        rect(this.x - this.w / 2, this.y - this.h / 2 - 5, this.w, this.h);
    }
    addDir(val){
        this.dir = clamp(this.dir + val, -1, 1);
    }
    accelerate() {
        this.v += this.acc * this.dir * deltaTime / 15;
        var friction = this.friction  * deltaTime / 15;
        if (this.dir == 0) {
            if (this.v > friction) {
                this.v -= friction;
            } else if (this.v < - friction) {
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
        this.x = clamp(this.x, 0 + this.w / 2, windowWidth - this.w / 2);
    }
    hit(ticket){
        return abs(this.x - ticket.x) < (this.w + ticket.w) / 2 &&
               abs(this.y - ticket.y) < (this.h + ticket.h) / 2;
    }
}

function clamp(value, minVal, maxVal) {
    return value > maxVal ? maxVal : value < minVal ? minVal : value;
}