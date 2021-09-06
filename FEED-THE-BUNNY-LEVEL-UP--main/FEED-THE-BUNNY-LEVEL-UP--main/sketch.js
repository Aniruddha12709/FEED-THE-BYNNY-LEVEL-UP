const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var ground;
var higherground;
var con;
var con2;
var rope;
var bubble,bubble_img;
var bg_img;
var food;
var rabbit;
var blink;
var sad;
var eat;
var star_img;
var fruit; 
var rope;
var rope2;
var button;
var button2;
var cut_btn;

function preload(){

  bubble_img = loadImage("./assets/bubble.png")
  bg_img = loadImage("./assets/background.png");
  food = loadImage("./assets/melon.png");
  rabbit = loadImage("./assets/Rabbit-01.png");
  cut_btn = loadImage("./assets/cut_btn.png");

  blink = loadAnimation("./assets/blink_1.png","./assets/blink_2.png ","./assets/blink_3.png");
  eat = loadAnimation("./assets/eat_0.png","./assets/eat_1.png","./assets/eat_2.png","./assets/eat_3.png","./assets/eat_4.png");                                           
  sad = loadAnimation("./assets/sad_1.png","./assets/sad_2.png","./assets/sad_3.png");
 

}
function setup() {
  createCanvas(500,800);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

   var fruit_options = {
    restitution: 1
  }

  ground = new Ground(250,height-10,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
   World.add(world,fruit);

   bubble = createSprite(320,430,20,20);
   bubble.addImage(bubble_img);
   bubble.scale = 0.1;

   blink.frameDelay = 20;
   eat.frameDelay = 20;
   bunny = createSprite(270,100,100,100);
   bunny.addImage(rabbit);
   bunny.scale = 0.2;
   higherground =new Ground(300,170,100,10);

   bunny.addAnimation('blinking',blink);
   bunny.addAnimation('eating',eat);
   bunny.addAnimation('crying',sad);
   bunny.changeAnimation('blinking');

   rope = new Rope(5,{x:230,y:330});
   rope2 = new Rope(4,{x:50,y:450});
   con = new Link(rope,fruit);
   con2 = new Link(rope2,fruit);

   button = createImg("./assets/cut_btn.png");
   button.position(200,280);
   button.size(70,70);
  

   button2 = createImg("./assets/cut_btn.png");
   button2.position(30,420);
   button2.size(70,70);
   button2.mouseClicked(drop);
 
   ellipseMode(RADIUS);



}

function draw() {
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  ground.show();
  higherground.show();
  rope.show();
  rope2.show();
 

if(collide(fruit,bunny,80)==true)
{
 remove_rope();
 bubble.visible = false;
  World.remove(engine.world,fruit);
  fruit = null;
  bunny.changeAnimation('eating');
}

if(collide(fruit,bubble,40) == true)
  {
    engine.world.gravity.y = -1;
    bubble.position.x = fruit.position.x;
    bubble.position.y = fruit.position.y;
  }

drawSprites();

}

function drop()
{
rope2.break();
con2.detach();
con2 = null; 
}

function remove_rope()
{
rope.break();
con.detach();
con = null; 
}

function collide(body,sprite,x)
{
if(body!=null)
      {
       var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
        if(d<=x)
          {
            
             return true; 
          }
          else{
            return false;
          }
       }
}
