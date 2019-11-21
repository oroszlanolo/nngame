class Ticket{
    constructor(w, h, x, y, v){
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.v = v;
    }
    move(){
        this.y += this.v;
    }
    draw(){
        stroke(100, 100, 180);
        fill(224, 241, 255);
        rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }
}