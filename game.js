const GameState = {
    "mmenu": 0,
    "ingame": 1,
    "postgame": 2,
    "instructions": 3
}
class Game {
    constructor() {
        this.player = new Player(windowWidth / 2);
        this.spawnTime = BASE_SPAWNTIME;
        this.visuals = new Visuals();
        this.gui = new GUI();
        this.gameSt = GameState.mmenu;
        this.difficulty = BASE_DIFFICULTY;
        this.releaseTime = BASE_RELEASE_TIME;
        this.win = false;
    }
    newGame(nextLevel) {
        this.player.dir = Direction.none;
        this.player.x = windowWidth / 2;
        this.spawnQueue = [...ticketPool];
        this.tickets = [];
        this.failed = [];
        this.fails = 0;
        this.playTime = 0;
        this.counterToSpawn = 0;
        this.wbdAvailable = true;
        if (nextLevel) {
            this.rumpDiff();
        } else {
            this.points = 0;
        }
        this.gameSt = GameState.ingame;
    }
    rumpDiff() {
        this.difficulty *= RUMP_UP;
        this.spawnTime = BASE_SPAWNTIME / this.difficulty;
    }
    logic() {
        switch (this.gameSt) {
            case GameState.mmenu:
                this.gui.drawMMenu();
                break;
            case GameState.ingame:
                this.logicInGame();
                break;
            case GameState.postgame:
                this.gui.drawPostGame();
                break;
            case GameState.instructions:
                this.gui.drawInstruction();
                break;
        }
    }
    logicInGame() {
        this.counterToSpawn += deltaTime;
        this.playTime += deltaTime;
        if (this.playTime >= this.releaseTime) {
            this.win();
            return;
        }
        if (this.counterToSpawn >= this.spawnTime) {
            this.spawnTime *= SPEED_UP;
            this.counterToSpawn = 0;
            this.spawnTickets();
        }
        this.move();
        if (this.isLost()) {
            this.lose();
            return;
        }
        this.draw();
        this.visuals.update();
    }
    move() {
        this.player.move();
        this.moveTickets();
    }
    win() {
        this.points += WIN_POINTS;
        this.gameSt = GameState.postgame;
    }
    lose() {
        this.gameSt = GameState.postgame;
    }
    isLost() {
        return this.fails >= ERROR_TOLERANCE;
    }
    draw() {
        switch (this.gameSt) {
            case GameState.mmenu:
                this.gui.drawMMenu();
                break;
            case GameState.ingame:
                this.drawIngame();
                break;
            case GameState.postgame:
                this.gui.drawPostScreen(this);
                break;
            case GameState.instructions:
                this.gui.drawInstruction();
                break;
        }
    }
    drawIngame() {
        this.visuals.drawBGWater();
        this.player.draw();
        this.tickets.forEach(element => {
            element.draw();
        });
        this.visuals.drawFGWater();
        this.gui.drawInGame(this.points, this.fails, this.playTime, this.releaseTime);
    }
    spawnTickets() {
        if (this.spawnQueue.length == 0) {
            this.spawnQueue = [...ticketPool];
        }
        var choseInd = floor(random(0, this.spawnQueue.length));
        var chosen = this.spawnQueue[choseInd];
        var x = random(TICKET_W / 2, windowWidth - TICKET_W / 2);
        var y = -TICKET_H / 2;
        chosen.x = x;
        chosen.y = y;
        this.tickets.push(chosen);
        this.spawnQueue.splice(choseInd, 1);

    }
    moveTickets() {
        for (var i = this.tickets.length - 1; i >= 0; i--) {
            var curr = this.tickets[i];
            this.tickets[i].move();
            if (this.player.hit(curr)) {
                this.tickets.splice(i, 1);
                if (!curr.duplicate) {
                    this.points += curr.priority;
                }
            } else if (curr.y > windowHeight + TICKET_H / 2) {
                if (!curr.duplicate) {
                    this.fails += curr.priority;
                }
                this.failed.push(this.tickets[i]);
                this.tickets.splice(i, 1);
            }
        }
    }
    convince() {
        const succ = random() > (1 - SUCCESS_RATE);
        print(succ);
        if (succ) {
            this.win();
        }
        this.wbdAvailable = false;
    }
    keyPressed(key) {
        switch (key) {
            case LEFT_KEY:
                this.pressLeft();
                break;
            case RIGHT_KEY:
                this.pressRight();
                break;
        }
    }
    pressLeft() {
        switch (this.gameSt) {
            case GameState.mmenu:
                break;
            case GameState.ingame:
                this.player.addDir(-1);
                break;
            case GameState.postgame:
                break;
        }
    }
    pressRight() {
        switch (this.gameSt) {
            case GameState.mmenu:
                break;
            case GameState.ingame:
                this.player.addDir(1);
                break;
            case GameState.postgame:
                break;
        }
    }
    keyReleased(key) {
        switch (key) {
            case LEFT_KEY:
                this.releaseLeft();
                break;
            case RIGHT_KEY:
                this.releaseRight();
                break;
        }
    }
    releaseLeft() {
        switch (this.gameSt) {
            case GameState.mmenu:
                this.gameSt = GameState.instructions;
                break;
            case GameState.ingame:
                this.player.addDir(1);
                break;
            case GameState.postgame:
                if (this.wbdAvailable) {
                    this.convince();
                }
                break;
            case GameState.instructions:
                this.gameSt = GameState.mmenu;
                break;
        }
    }
    releaseRight() {
        switch (this.gameSt) {
            case GameState.mmenu:
                this.newGame(false);
                break;
            case GameState.ingame:
                this.player.addDir(-1);
                break;
            case GameState.postgame:
                if (this.win) {
                    this.newGame(this.win);
                } else {
                    this.gameSt = GameState.mmenu;
                }
                break;
        }
    }
}