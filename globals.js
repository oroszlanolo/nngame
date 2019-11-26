//player
let PLAYER_W = 150;
let PLAYER_H = 100;
const PLAYER_RATIO = 0.45;
const PADDLE_TO_SHIP = 0.86;
let PADDLE_H = 100;
let PLAYER_MAXV = 15;
let PLAYER_ACC = 1;
let PLAYER_FRIC = 1.4;

//water
let WATER_W = 200;
let WATER_H = 100;
const WATER_W_TO_SHIP_RATIO = 1.19;
const WATER_RATIO = 0.41;

//ticket
let TICKET_W = 100;
let TICKET_H = 100;
let TICKET_V = 5;

function setSizes() {
    PLAYER_W = windowWidth * 0.12;
    PLAYER_H = PLAYER_RATIO * PLAYER_W;
    PADDLE_H = PADDLE_TO_SHIP * PLAYER_H;
    WATER_W = WATER_W_TO_SHIP_RATIO * PLAYER_W;
    WATER_H = WATER_RATIO * WATER_W;
    TICKET_H = TICKET_W = windowWidth * 0.05;
}



//game
const BASE_DIFFICULTY = 1;
const BASE_SPAWNTIME = 3000;
const RUMP_UP = 1.2;
const SPEED_UP = 0.98;
const BASE_RELEASE_TIME = 60000;
const ERROR_TOLERANCE = 10;