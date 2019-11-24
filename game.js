class Game {
    constructor() {
        this.player = new Player(windowWidth / 2);
        this.spawnQueue = [];
        this.tickets = [];
        this.failed = [];
        this.spawnTime = 5000;
        this.counterToSpawn = 0;
        this.visuals = new Visuals();
        this.gui = new GUI();
        this.points = 0;
        this.fails = 0;
    }
    newGame() {
        this.spawnQueue = [...ticketPool];
        this.points = 0;
        this.fails = 0;
    }
    logic() {
        this.counterToSpawn += deltaTime;
        if (this.counterToSpawn >= this.spawnTime) {
            this.counterToSpawn = 0;
            this.spawnTickets();
        }
        this.move();
        this.draw();
        this.visuals.update();
    }
    move() {
        this.player.move();
        this.moveTickets();
    }
    draw() {
        this.visuals.drawBGWater();
        this.player.draw();
        this.tickets.forEach(element => {
            element.draw();
        });
        this.visuals.drawFGWater();
        this.gui.drawPoints(this.points);
        this.gui.drawFails(this.fails);
    }
    spawnTickets() {
        if (this.spawnQueue.length == 0) {
            print("hello");
            this.spawnQueue = [...ticketPool];
        }
        var choseInd = floor(random(0, this.spawnQueue.length));
        var chosen = this.spawnQueue[choseInd];
        var x = random(chosen.w / 2, windowWidth - chosen.w / 2);
        var y = -chosen.h / 2;
        chosen.x = x;
        chosen.y = y;
        this.tickets.push(chosen);
        this.spawnQueue.splice(choseInd, 1);

    }
    moveTickets() {
        for (var i = this.tickets.length - 1; i >= 0; i--) {
            this.tickets[i].move();
            if (this.player.hit(this.tickets[i])) {
                this.tickets.splice(i, 1);
                this.points++;
            } else if (this.tickets[i].y > windowHeight + this.tickets[i].h) {
                this.fails += this.tickets[i].priority;
                this.tickets.splice(i, 1);
            }
        }
    }
    keyPressed(key) {
        switch (key) {
            case LEFT_ARROW:
                this.player.addDir(-1);
                break;
            case RIGHT_ARROW:
                this.player.addDir(1);
                break;
        }
    }
    keyReleased(key) {
        switch (key) {
            case LEFT_ARROW:
                this.player.addDir(1);
                break;
            case RIGHT_ARROW:
                this.player.addDir(-1);
                break;
        }
    }
}