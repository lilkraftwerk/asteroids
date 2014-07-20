var canvas = document.getElementById('tutorial')
var context = canvas.getContext('2d')
// context.fillStyle = "#000000"
var x, y, width, height;
var rotateLeft = false
var rotateRight = false
var moveForward = false
var missileCooldown = 0
var spaceShip = {
  xCoord: canvas.height/2,
  yCoord: canvas.width/2,
  transxOffset: 13,
  transyOffset: 13,
  radius: 12,
  rotation: 180
}


x = 0;
y = 0;
width = 100;
height = 100;

var asteroids = [];

function drawRectangle(xCoord, yCoord, width, height){
  context.beginPath()
  context.fillStyle = "#0000FF"
  context.fillRect(xCoord, yCoord, width, height)
  context.closePath()
}

function drawMissile(missile){
  context.beginPath()
  context.fillStyle = "#00FF00"
  context.arc(missile.xCoord, missile.yCoord, 5, 0, Math.PI * 2)
  context.fill()
  context.closePath()
}

function drawAsteroid(asteroid) {
  context.beginPath()
  context.fillStyle = "#000000"
  context.arc(asteroid.xCoord, asteroid.yCoord, asteroid.radius, 0, Math.PI * 2)
  context.fill()
  context.closePath()
}

function drawShip(xCoord, yCoord, rotation) {
  context.save()
  var shipHeight = 26
  var shipWidth = 35
  var transx = xCoord + 13
  var transy = yCoord + 13
  context.translate(transx, transy)
  context.rotate((Math.PI / 180) * rotation)
  context.translate(-transx, -transy)
  context.beginPath()
  context.fillStyle = "#FF0000"
  context.moveTo(xCoord, yCoord)
  context.lineTo(xCoord, yCoord + shipHeight)
  context.lineTo(xCoord + shipWidth, yCoord + (shipHeight / 2))
  context.fill()
  context.closePath()
  context.restore()
}

var moveRect = function(){
  if(x < canvas.width){
  x += 1;
  y += 1;
  } else
  { x = -width;
    y = -height;}
}

function collisionDetection(test1, test2) {
  var dx = test1.xCoord - test2.xCoord;
  var dy = test1.yCoord - test2.yCoord;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < test1.radius + test2.radius) {
    return true;
  }
}

function asteroidLoop() {
  checkAsteroids();
  for (var k = 0; k < asteroids.length; k++) {
    drawAsteroid(asteroids[k]);
  }
}

function checkAsteroids() {
  // for (var i = 0; i < asteroids.length; i++) {
  //   console.log('asteroidsCount: ' + asteroidsCount + '\nlength: ' + asteroids.length);
  //   for(var j = 0; j < missiles.length; j++) {
  //     if (collisionDetection(asteroids[i], missiles[i])) {
  //       console.log('made it here');
  //       newAsteroidX = asteroids[i].xCoord;
  //       newAsteroidY = asteroids[i].yCoord;
  //       newAsteroidR = asteroids[i].radius;
  //       asteroids.splice(i, 1);

  //     }
  //   }
}


function drawInterval(){
  setInterval(function(){
    context.clearRect ( 0 , 0 , canvas.width , canvas.height );
    // drawAsteroid(370, 370, 23);
    // drawAsteroid(400, 400, 46);
    // loop through each asteroid and see if it has been hit, will know index of asteroid to be deleted, call split asteroid on that object, remove other object
    asteroidLoop();
    // collisionDetection(asteroid1, asteroid2);
    // drawAsteroid(asteroid1.xCoord, asteroid1.yCoord, asteroid1.radius);
    // drawAsteroid(asteroid2.xCoord, asteroid2.yCoord, asteroid2.radius);
    drawRectangle(x, y, width, height);
    drawAllMissiles()
    moveAllMissiles()
    drawShip(spaceShip.xCoord, spaceShip.yCoord, spaceShip.rotation);
    checkRotation()
    missileCooldown -= 1
    checkMove()
    moveRect()
  }, 5)
}

var drawAllMissiles = function(){
  for(i = 0; i < missiles.length; i++){
    drawMissile(missiles[i])
  }
}

var moveAllMissiles = function(){
    for(i = 0; i < missiles.length; i++){
    moveMissile(missiles[i])
  }
}

var checkMove = function(){
  if(moveForward){
    spaceShip.xCoord += Math.cos(spaceShip.rotation * (Math.PI/180))
    spaceShip.yCoord += Math.sin(spaceShip.rotation * (Math.PI/180))
  }
}

var moveMissile = function(missile){
  missile.xCoord += (Math.cos(missile.rotation * (Math.PI/180)))*1.8
  missile.yCoord += (Math.sin(missile.rotation * (Math.PI/180)))*1.8
}

var checkRotation = function(){
  if (rotateLeft){
    spaceShip.rotation -= 2
  } else if (rotateRight) {
    spaceShip.rotation += 2
  }
}

function Asteroid (xCoord, yCoord, radius) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.radius = radius;
}

Asteroid.prototype = {
  constructor: Asteroid,
  splitAsteroid: function() {
    if(this.radius === 46) {
      asteroids.push(new Asteroid(this.xCoord + 100, this.yCoord, this.radius / 2), new Asteroid(this.xCoord -100, this.yCoord, this.radius / 2 ));
    }
  }
}
function Missile (xCoord, yCoord, rotation) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.rotation = rotation;
  this.frames = 0;
}

var missiles = []

var fireMissile = function(){
  if(missileCooldown <= 0){
  missiles.push(window["missile" + String(missiles.length + 1)] = new Missile(spaceShip.xCoord + 17, spaceShip.yCoord + 13, spaceShip.rotation))
  missileCooldown = 100
  }
}


$('document').ready(function(){
  asteroids.push(new Asteroid(200, 200, 46), new Asteroid(400, 400, 46));


  drawInterval()
  $('body').on("keydown", function(event) {
    console.log(event.which)
    if (event.which == 37) {
      rotateLeft = true
      rotateRight = false
    } else if (event.which == 39){
      rotateRight = true
      rotateLeft = false
    } else if (event.which == 38) {
      console.log("key up pressed")
      moveForward = true
    } else if (event.which == 32) {
      console.log("space key")
      fireMissile()
    }



  })
  $('body').on("keyup", function(event) {
    console.log(event.which)
    if (event.which == 37) {
      rotateLeft = false
    } else if (event.which == 39){
      rotateRight = false
    } else if (event.which == 38) {
      moveForward = false
    }
  })
})

// on keydown, start interval that increments or decrements rotation
// on keyup, clear interval that increments or decrements rotation


