var doraemon, doraemonImg, scared, scareImg;
var home, homeImg;
var score = 0;
var gr;
var food, foodImg, foodGrp;
var mouse, mouseImg, mouseGrp;
var play = 1;
var end = 0;
var gameState = play;
var gameOver, gameOverImg;
var restart, resetImg;
var song;
localStorage["HighestScore"] = 0;

function preload(){
  doraemonImg = loadImage("doraemon.png");
  homeImg = loadImage("home.png");
  foodImg = loadImage("doracake.png");
  mouseImg = loadImage("mouse.png");
  scareImg = loadImage("doraemon_scared.png");
  resetImg = loadImage("reset.png");
  gameOverImg = loadImage("gameOver.png");
  song = loadSound("song.mp3");
}

function setup(){
  createCanvas(600,400);
  song.loop();
  home = createSprite(300,200,20,20);
  home.addImage(homeImg);
  home.scale = 2.8;
  home.velocityX = -10;
  
  doraemon = createSprite(50,340,20,20);
  doraemon.addImage(doraemonImg);
  doraemon.scale = 0.1;
  
  gr = createSprite(300,390,1000,10);
  gr.visible = false;
  
  foodGrp = new Group();
  mouseGrp = new Group();
  
  scared = createSprite(50,340,20,20);
  scared.addImage(scareImg);
  scared.scale = 0.12;
  scared.visible = false;
  
  gameOver = createSprite(300,150,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.4;
  gameOver.visible = false;
  
  restart = createSprite(300,250,20,20);
  restart.addImage(resetImg);
  restart.scale = 0.06;
  restart.visible = false;
}

function draw(){
background("white");
  
  if (gameState === play){
  if (home.x < 0){
      home.x = home.width/2;
    }
  
  if(keyDown("space") && doraemon.y >= 250) {
      doraemon.velocityY = -12;
    }
    doraemon.velocityY = doraemon.velocityY + 0.8
  doraemon.collide(gr);
  
  if(doraemon.isTouching(foodGrp)){
  score = score+2;
    foodGrp.destroyEach();
  }
  
  spawnFoods();
  spawnMouse();
    
    if (doraemon.isTouching(mouseGrp)){
    gameState = end;
    }
  }
  else if (gameState === end) {
    scared.visible = true;
    restart.visible = true;
    gameOver.visible = true;
    doraemon.visible = false;
    
    //set velcity of each game object to 0
    home.velocityX = 0;
    doraemon.velocityY = 0;
    foodGrp.setVelocityXEach(0);
    mouseGrp.setVelocityXEach(0);
    
   
    mouseGrp.setLifetimeEach(-1);
    foodGrp.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  drawSprites();
  
  fill(0);
  textSize(20);
  stroke(0);
  text("Score: "+ score, 450,50);
  text(localStorage["HighestScore"],300,50)
  text("High Score: ",190,50) 
}

function spawnFoods() {
  //write code here to spawn the foods
  if (frameCount % 200 === 0) {
    food = createSprite(600,180,40,10);
    food.addImage(foodImg);
    food.scale = 0.05;
    food.velocityX = -12;
    
     //assign lifetime to the variable
    food.lifetime = 200;
    foodGrp.add(food);
  }
}

function spawnMouse() {
  if (frameCount % 100 === 0) {
    mouse = createSprite(600,360,40,10);
    mouse.addImage(mouseImg);
    mouse.scale = 0.05;
    mouse.velocityX = -10;
    
     //assign lifetime to the variable
    mouse.lifetime = 200;
    mouseGrp.add(mouse);
  }
}

function reset(){
  gameState = play;
  gameOver.visible = false;
  restart.visible = false;
  scared.visible = false;
  doraemon.visible = true;
  
  foodGrp.destroyEach();
  mouseGrp.destroyEach();
  
  home.velocityX = -7;
   if (home.x < 0){
      home.x = home.width/2;
    }
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}