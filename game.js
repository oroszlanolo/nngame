class Game {
    constructor() {
        this.player = new Player(100, 200, windowWidth / 2, windowHeight - 100);
        this.spawnQueue = [];
        this.tickets = [];
        this.failed = [];
    }
    logic(){
        this.move();
        this.draw();
    }
    move() {
        this.player.move();
        this.moveTickets();
    }
    draw(){
        this.player.draw();
        this.tickets.forEach(element => {
            element.draw();
        });
    }
    moveTickets() {
        for (var i = this.tickets.length - 1; i >= 0; i--) {
            this.tickets[i].move();
            if (this.player.hit(this.tickets[i]) ||
                this.tickets[i].y > windowHeight + this.tickets[i].h) {
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