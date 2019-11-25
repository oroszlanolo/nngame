class GUI {
    constructor() {
        this.pointsSizeRatio = 0.05;
    }
    drawMMenu() {
        background(255);
        fill(146, 204, 227, 100);
        stroke(100);
        rect(0, 0, windowWidth / 2, windowHeight);
        fill(227, 169, 146, 100);
        stroke(100);
        rect(windowWidth / 2, 0, windowWidth / 2, windowHeight);
        textSize(windowHeight / 10);
        fill(0);
        stroke(0);
        textAlign(CENTER, CENTER);
        text("NNGAME", 0, 0, windowWidth, windowHeight / 2);
        textSize(windowHeight / 16);
        text("INSTRUCTIONS", 0, 0, windowWidth / 2, windowHeight);
        this.drawArrow(windowWidth / 4, windowHeight / 4 * 3, windowHeight / 12, 0, false);
        text("NEW GAME", windowWidth / 2, 0, windowWidth / 2, windowHeight);
        this.drawArrow(windowWidth / 4 * 3, windowHeight / 4 * 3, windowHeight / 12, PI, true);
    }
    drawArrow(x, y, size, angle, clickable) {
        push();
        stroke(0, 0, 0, clickable ? 255 : 50);
        fill(0, 0, 0, clickable ? 100 : 50);
        translate(x, y);
        rotate(angle);
        beginShape();
        vertex(0 - 0.75 * size, 0 - size / 2);
        vertex(0 + 1.75 * size, 0 - size / 2);
        vertex(0 + 1.75 * size, 0 + size / 2);
        vertex(0 - 0.75 * size, 0 + size / 2);
        vertex(0 - 0.75 * size, 0 + 1 * size);
        vertex(0 - 1.75 * size, 0);
        vertex(0 - 0.75 * size, 0 - size);
        vertex(0 - 0.75 * size, 0 - size / 2);
        endShape();
        pop();
    }
    drawInGame(points, fails) {
        this.drawPoints(points);
        this.drawFails(fails);
    }
    drawPoints(points) {
        push();
        fill(80);
        stroke(0);
        strokeWeight(3);
        textSize(this.pointsSizeRatio * windowHeight);
        textAlign(LEFT);
        text("POINTS: " + points, 10, 30);
        pop();
    }
    drawFails(fails) {
        push();
        fill(80);
        stroke(0);
        strokeWeight(3);
        textSize(this.pointsSizeRatio * windowHeight);
        textAlign(LEFT);
        text("ERRORS: " + fails, 10, 30 + this.pointsSizeRatio * windowHeight + 10);
        pop();
    }
    drawPostScreen(succ, tickets) {
        background(255);
        fill(146, 204, 227, 100);
        stroke(100);
        rect(0, 0, windowWidth / 2, windowHeight);
        fill(227, 169, 146, 100);
        stroke(100);
        rect(windowWidth / 2, 0, windowWidth / 2, windowHeight);
        textSize(windowHeight / 12);
        fill(0);
        stroke(0);
        textAlign(CENTER, CENTER);
        text(succ ? "Congratulation, the release was successful!" : "I'm sorry, the release was a failure!", 0, 0, windowWidth, windowHeight / 4);
        textSize(windowHeight / 30);
        text(succ ? "" : "Try to convince Pana, these tickets are WBD", 0, windowHeight / 3 * 2, windowWidth / 2, windowHeight / 3);
        this.drawArrow(windowWidth / 4, windowHeight / 12 * 11, windowHeight / 18, 0, !succ);
        text(succ ? "Next Release" : "Main Menu", windowWidth / 2, windowHeight / 3 * 2, windowWidth / 2, windowHeight / 3);
        this.drawArrow(windowWidth / 4 * 3, windowHeight / 12 * 11, windowHeight / 18, PI, true);
    }


}