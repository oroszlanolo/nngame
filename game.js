const GameState = {
    "mmenu" : 0,
    "ingame" : 1,
    "postgame" : 2,
    "instructions" : 3
}
class Game {
    constructor() {
        this.player = new Player(windowWidth / 2);
        this.spawnQueue = [];
        this.tickets = [];
        this.failed = [];
        this.spawnTime = BASE_SPAWNTIME;
        this.counterToSpawn = 0;
        this.visuals = new Visuals();
        this.gui = new GUI();
        this.points = 0;
        this.fails = 0;
        this.gameSt = GameState.mmenu;
        this.difficulty = BASE_DIFFICULTY;
    }
    newGame() {
        this.spawnQueue = [...ticketPool];
        this.points = 0;
        this.fails = 0;
        this.gameSt = GameState.ingame;
    }
    logic() {
        switch(this.gameSt){
            case GameState.mmenu:
                this.drawMMenu();
                break;
            case GameState.ingame:
                this.logicInGame();
                break;
            case GameState.postgame:
                this.drawPostGame();
                break;
        }
    }
    logicInGame(){
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
        switch(this.gameSt){
            case GameState.mmenu:
                this.drawMMenu();
                break;
            case GameState.ingame:
                this.drawIngame();
                break;
            case GameState.postgame:
                this.drawPostGame();
                break;
        }
    }
    drawMMenu(){
        this.gui.drawMMenu();
    }
    drawIngame(){
        this.visuals.drawBGWater();
        this.player.draw();
        this.tickets.forEach(element => {
            element.draw();
        });
        this.visuals.drawFGWater();
        this.gui.drawPoints(this.points);
        this.gui.drawFails(this.fails);
    }
    drawPostGame(){
        this.gui.drawPostScreen(true, this.failed);
    }
    spawnTickets() {
        if (this.spawnQueue.length == 0) {
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
        switch(this.gameSt){
            case GameState.mmenu:
                break;
            case GameState.ingame:
                switch (key) {
                    case LEFT_ARROW:
                        this.player.addDir(-1);
                        break;
                    case RIGHT_ARROW:
                        this.player.addDir(1);
                        break;
                }
                break;
            case GameState.postgame:
                break;
        }
    }
    keyReleased(key) {
        switch(this.gameSt){
            case GameState.mmenu:
                    switch (key) {
                        case LEFT_ARROW:
                            //this.gameSt = GameState.instructions;
                            this.gameSt = GameState.postgame;
                            break;
                        case RIGHT_ARROW:
                            this.newGame();
                            break;
                    }
                break;
            case GameState.ingame:
                switch (key) {
                    case LEFT_ARROW:
                        this.player.addDir(1);
                        break;
                    case RIGHT_ARROW:
                        this.player.addDir(-1);
                        break;
                }
                break;
            case GameState.postgame:
                break;
        }
    }
}