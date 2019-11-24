class GUI {
    constructor() {

    }
    draw() {

    }
    drawPoints(points) {
        fill(0);
        stroke(0);
        textSize(20);
        textAlign(LEFT);
        text("POINTS: " + points, 10, 30);
    }
    drawFails(fails) {
        fill(0);
        stroke(0);
        textSize(20);
        textAlign(LEFT);
        text("ERRORS: " + fails, 10, 60);
    }

}