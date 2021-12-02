var towerImg, tower;
var door,doorImg
var doorsGroup
var climberImg,climber,climbersGroup
var ghost,ghostjumpingImg,ghoststandingImg
var invisibleBlockGroup,invisibleBlock
var gameState="play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostjumpingImg = loadImage("ghost-jumping.png");
  ghoststandingImg = loadImage("ghost-standing.png")
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  
  tower.velocityY=2;

  ghost = createSprite(300,300,50,50);
  ghost.addAnimation("ghost",ghostjumpingImg);
  ghost.scale=0.5;
 
  doorsGroup =new Group();
  climbersGroup = new Group();
  invisibleBlockGroup =new Group();
  
  
}

function draw() {
  background(200);
  if(gameState==="play"){
  if(keyDown("left_arrow"))
  {

    ghost.x-=3

  }
  
  if(keyDown("right_arrow"))
  {

    ghost.x+=3

  }
 if(keyDown("space"))
 {
   ghost.velocityY=-10
 }
ghost.velocityY=ghost.velocityY+0.8

  if(tower.y>400)
  {
   tower.y=300
  }

  if(climbersGroup.isTouching(ghost))
  {
  
    ghost.velocityY=0
  
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600)
  {
    ghost.destroy()
    gameState="end"
  }

  spawnDoors()

  drawSprites()
}
 if(gameState==="end")
 {
   stroke("yellow")
   fill("yellow")
   textSize(30)
   text("gameOver",230,250)
 }
  
}

function spawnDoors()
{
   if(frameCount % 240 === 0)
   {
     door = createSprite(200,-50);
     climber = createSprite(200,10);
     door.velocityY=1;
     climber.velocityY=1;
     door.addImage(doorImg);
     door.x=Math.round(random(120,400))
     climber.x = door.x
     invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    invisibleBlock.x=door.x
    invisibleBlock.velocityY=1
     doorsGroup.add(door)
     climbersGroup.add(climber)
     invisibleBlockGroup.add(invisibleBlock)
    climber.height=10
     
    invisibleBlock.debug=true
    
    
   }



}