class Ticket{
    constructor(w, h, x, y, v, name = "MAZDAG7 -22222"){
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.v = v;
        this.name = name;
    }
    move(){
        this.y += this.v * deltaTime / 15;
    }
    draw(){
        stroke(100, 100, 180);
        fill(224, 241, 255);
        rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        fill(100, 100, 180);
        textSize(this.h / 6);
        textAlign(CENTER, CENTER);
        text(this.name, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }
}