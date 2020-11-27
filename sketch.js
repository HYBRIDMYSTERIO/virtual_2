//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImage;
var foodObj;
var fedTime,lastFed ;
var feed,addFood;

var foodCount = 20;


function preload()
{
  //load images here
  dogImage = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  createCanvas(1200,600);

  

  

  database = firebase.database();

  dog = createSprite(1000,400,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.2;


  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  feed = createButton("Feed the dog");
  feed.position(800,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add the food");
  addFood.position(900, 95);
  addFood.mousePressed(addFoods);
 
  foodObj = new Food();
  
}


function draw() {  
 
  background(46,139,87);

  /*fill(0);
  textSize(15)
  text("Note:Press UP_ARROW Key To Feed Drago Milk!",110,50);*/

  fill(0);
  textSize(15);
  text("Food remaining:"+ foodCount,180,150);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+ lastFed%12 +"PM", 230, 30);
  }else  if(lastFed === 0){
    text("Last Feed : 12 AM", 230, 30);
  }
  else{
    text("Last Feed : "+ lastFed + "AM", 230, 30);
  }
  
  foodObj.display();
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);

    foodCount = foodCount-1;

  }*/
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();

}

function writeStock(x){
  
  database.ref('/').update({
    food:x
  });
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

  foodCount = foodCount-1;

  
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  foodCount = foodCount+1

  dog.addImage(dogImage);
 
  
}