let game;
let ticketPool;
//resources
let shipBodyImg, paddleImg, waterFrontImg, waterBackImg;

function preload() {
  ticketPool = loadJSON("tickets.json", loaded);
  shipBodyImg = loadImage("resources/ship.png");
  paddleImg = loadImage("resources/paddle.png");
  waterFrontImg = loadImage("resources/water_front.png");
  waterBackImg = loadImage("resources/water_back.png");
}

function loaded(theJson) {
  ticketPool = theJson.tickets;
  ticketPool.forEach((element, index, theArray) => {
    theArray[index] = new Ticket(TICKET_W, TICKET_H, 0, 0,
      TICKET_V, element.ID, element.title, element.description, element.priority, element.duplicate);
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setSizes();
  game = new Game();
  //game.newGame();
}

function draw() {
  background(244, 248, 252);
  game.logic();
}

function keyPressed() {
  game.keyPressed(keyCode);
}

function keyReleased() {
  game.keyReleased(keyCode);
}

function windowResized() {
  setSizes();
  resizeCanvas(windowWidth, windowHeight);
  game.player.setYPos();
}