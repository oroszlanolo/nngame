class GUI {
    constructor() {
        this.pointsSizeRatio = 0.05;
    }
    drawMMenu() {
        background(255);
        fill(146, 204, 227, 100);
        stroke(100);
        rect(0, 0, windowWidth, windowHeight);
        textSize(windowHeight / 10);
        fill(0);
        stroke(0);
        textAlign(CENTER, CENTER);
        text("NNGAME", 0, 0, windowWidth, windowHeight / 2);
        textSize(windowHeight / 16);
        text("INSTRUCTIONS", 0, 0, windowWidth / 2, windowHeight);
        this.drawArrow(windowWidth / 4, windowHeight / 4 * 3, windowHeight / 12, 0, true);
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
    drawInGame(points, fails, currTime, maxTime) {
        this.drawPoints(points);
        this.drawFails(fails);
        this.drawTime(currTime, maxTime);
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
    drawTime(currTime, maxTime) {
        push();
        var x = windowWidth * 5 / 6;
        var y = 10;
        var percent = currTime / maxTime;
        fill(141, 40, 215, 200);
        stroke(141, 40, 215, 200);
        rect(x, y, percent * windowWidth / 10, windowHeight / 24);
        noFill();
        stroke(55, 16, 84);
        rect(x, y, windowWidth / 10, windowHeight / 24)
        fill(55, 16, 84);
        textAlign(CENTER, CENTER);
        textSize(windowHeight * 0.02);
        text("Release date", x, y + windowHeight / 18 + 5, windowWidth / 5, windowHeight * 0.03);
        strokeWeight(3);
        line(x + windowWidth / 10, y, x + windowWidth / 10, y + windowHeight / 18);
        ellipse(x + windowWidth / 10, y + windowHeight / 18, windowHeight / 100);
        pop();

    }
    drawPostScreen(game) {
        background(255);
        fill(146, 204, 227, 100);
        stroke(100);
        rect(0, 0, windowWidth / 2, windowHeight);
        textSize(windowHeight / 12);
        fill(0);
        stroke(0);
        textAlign(CENTER, CENTER);
        var leftText = "";
        var leftTrue = false;
        if (game.win) {
            if (game.wbdAvailable) {
                text(WIN_TEXT, 0, 0, windowWidth, windowHeight / 5);
            } else {
                text(WIN_WITH_CONVINCE_TEXT, 0, 0, windowWidth, windowHeight / 5);
            }
        } else {
            this.drawFailedTickets(game.failed);
            if (game.wbdAvailable) {
                leftTrue = true;
                leftText = CONVINCE_WBD_TEXT;
                text(FAIL_TEXT, 0, 0, windowWidth, windowHeight / 5);
            } else {
                text(FAIL_WITH_CONVINCE_TEXT, 0, 0, windowWidth, windowHeight / 5);
            }
        }
        textSize(windowHeight / 30);
        text(leftText, 0, windowHeight / 3 * 2, windowWidth / 2, windowHeight / 3);
        this.drawArrow(windowWidth / 4, windowHeight / 12 * 11, windowHeight / 18, 0, leftTrue);
        text(game.win ? NEXT_RELEASE_TEXT : TO_MAIN_MENU_TEXT, windowWidth / 2, windowHeight / 3 * 2, windowWidth / 2, windowHeight / 3);
        this.drawArrow(windowWidth / 4 * 3, windowHeight / 12 * 11, windowHeight / 18, PI, true);
    }
    drawFailedTickets(failed) {
        push();
        textSize(windowHeight / 30);
        text(TICKET_LIST_TEXT, 0, windowHeight / 5, windowWidth, windowHeight / 30);
        var padding = windowHeight / 10 + 8;
        for (var i = 0; i < min(failed.length, 4); i++) {
            failed[i].prettyDraw(windowWidth / 10, windowHeight / 3 + i * padding, windowWidth / 5 * 4, windowHeight / 10);
        }
        pop();
    }

    drawInstruction() {
        print("valami");
        push();
        background(255);
        textAlign(CENTER, CENTER);
        textSize(windowHeight / 30);
        fill(0);
        stroke(0);
        text(INSTRUCTION_TEXT, 10, 10, windowWidth - 20, windowHeight - 20);
        pop();
        this.drawArrow(windowWidth / 4, windowHeight / 5 * 4, windowHeight / 12, 0, true);
        this.drawArrow(windowWidth / 4 * 3, windowHeight / 5 * 4, windowHeight / 12, PI, false);
    }

}