class Ticket {
    constructor(x, y, v, id, title, description, priority, duplicate) {
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
        rect(this.x - TICKET_W / 2, this.y - TICKET_H / 2, TICKET_W, TICKET_H);
        fill(100, 100, 180);
        textAlign(CENTER, CENTER);
        textSize(TICKET_H / 6);
        text("MAZDAG7", this.x - TICKET_W / 2, this.y - TICKET_H / 2, TICKET_W, TICKET_H / 2);
        textSize(TICKET_H / 4);
        text("-", this.x - TICKET_W / 2, this.y - TICKET_H / 2, TICKET_W, TICKET_H);
        text(this.id, this.x - TICKET_W / 2, this.y, TICKET_W, TICKET_H / 2);
    }
    prettyDraw(x, y, w, h) {
        push();
        stroke(100, 100, 180);
        fill(224, 241, 255);
        rect(x, y, w, h);
        textSize(floor(h / 4));
        stroke(0);
        fill(0);
        textAlign(CENTER, CENTER);
        text("MAZDAG7-" + this.id, x, y + 2, w / 3, h / 4);
        text(this.title, x + w / 3, y + 2, w / 3 * 2, h / 4);
        textAlign(LEFT, TOP);
        text("Description: " + this.description, x, y + h / 3, w, h / 3 * 2);
        pop();
    }
}