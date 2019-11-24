class Ticket {
    constructor(w, h, x, y, v, id, title, description, priority, duplicate) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.v = v;
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.duplicate = duplicate;
    }
    move() {
        this.y += this.v * deltaTime / 15;
    }
    draw() {
        stroke(100, 100, 180);
        fill(224, 241, 255);
        rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        fill(100, 100, 180);
        textAlign(CENTER, CENTER);
        textSize(this.h / 6);
        text("MAZDAG7", this.x - this.w / 2, this.y - this.h / 2, this.w, this.h / 2);
        textSize(this.h / 4);
        text("-", this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        text(this.id, this.x - this.w / 2, this.y, this.w, this.h / 2);
    }
}