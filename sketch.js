var database;
var gameState = 0;
var playerCount = 0;
var distance = 0;
var enemyRank;

var form, player, game;
var blueRunnerImg, redRunnerImg, trackImg, waterBottleImg, potholeImg;
var track, players, player1, player2;
var allPlayers;
var podiumImg, bg0Img;

function preload(){
blueRunnerImg = loadImage("images/runnerblue.png");
redRunnerImg = loadImage("images/runnerred.png");
trackImg = loadImage("images/track.jpg");
waterBottleImg = loadImage("images/waterbottle.png");
potholeImg = loadImage("images/pothole.png");
podiumImg = loadImage("images/podium.jpg");
bg0Img = loadImage("images/runBg.png");
}

function setup(){
createCanvas(windowWidth,windowHeight);
database = firebase.database();
game = new Game;


game.getState();
game.start();
}

function draw(){
//background("white");
if(gameState === 0){
    //image(bg0Img,0,-100,displayWidth,displayHeight);
    background(bg0Img);
}
if(playerCount === 2){
    game.update(1);
}
if(gameState === 1){
    game.play();
}
if(gameState === 2){
    game.update(2);

    game.end();
    game.display();
    
}

}