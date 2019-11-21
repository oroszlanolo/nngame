
let game;

function setup() {
    //slow down the frameRate to make it more visible
    createCanvas(windowWidth, windowHeight);
    game = new Game();
  }
  
  function draw() {
    background(244, 248, 252);
    game.move();
    game.draw();
  }

  function keyPressed(){
      game.keyPressed(keyCode);
  }
  function keyReleased(){
      game.keyReleased(keyCode);
  }