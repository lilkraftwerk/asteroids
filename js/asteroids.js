var canvas = document.getElementById('tutorial')
var context = canvas.getContext('2d')
var x, y, width, height;
var rotateLeft = false
var rotateRight = false
var moveForward = false
var level = 1
var score = 0
var missileCooldown = 0
var spaceShip = {
  xCoord: canvas.height/2,
  yCoord: canvas.width/2,
  transxOffset: 13,
  transyOffset: 13,
  radius: 25,
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

function drawAsteroidImage(xCoord, yCoord, radius) {
  var img = document.getElementById("asteroid")
  context.beginPath()
  context.fillStyle = "#00e500"
  context.drawImage(img, xCoord, yCoord)
  context.fill()
  context.closePath()
}


function drawSpaceshipImage(xCoord, yCoord, rotation) {   context.save()
  var img = document.getElementById("spaceship");
  var shipHeight = 26
  var shipWidth = 35
  var transx = xCoord + 13
  var transy = yCoord + 13
  context.translate(transx, transy)
  context.rotate((Math.PI / 180) * rotation)
  context.translate(-transx, -transy)
  context.beginPath()
  context.drawImage(img,xCoord, yCoord-10)
  context.closePath()
  context.restore()
}

function drawMissile(missile){
  context.beginPath()
  context.fillStyle = "#00e500"
  context.arc(missile.xCoord, missile.yCoord, 5, 0, Math.PI * 2)
  context.fill()
  context.closePath()
}

function drawAsteroid(asteroid) {
  context.beginPath()
  context.fillStyle = "#EEEEE0"
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
  if (distance < test1.radius + 5) {
    console.log('colliding')
    return true;
  }
}

function asteroidLoop() {
  checkAsteroids();
  for (var k = 0; k < asteroids.length; k++) {
    moveAsteroid(asteroids[k])
    drawAsteroid(asteroids[k]);
  }
}

function moveAsteroid(asteroid){
  if(asteroid.xCoord > canvas.width){
    asteroid.xCoord -= canvas.width
  } else if (asteroid.xCoord < 0){
    asteroid.xCoord += canvas.width
  } else if (asteroid.yCoord > canvas.height){
    asteroid.yCoord -= canvas.height
  } else if (asteroid.yCoord < 0) {
    asteroid.yCoord += canvas.height
  }
  asteroid.xCoord += (Math.cos(asteroid.rotation * (Math.PI/180)))*1.8
  asteroid.yCoord += (Math.sin(asteroid.rotation * (Math.PI/180)))*1.8
}

function checkShipCollission(){
  for (var i = 0; i < asteroids.length; i++) {
    if (collisionDetection(asteroids[i], spaceShip)) {
        gameOver()
    }
  }
}

function checkAsteroids() {
  for (var i = 0; i < asteroids.length; i++) {
    for(var j = 0; j < missiles.length; j++) {
      if (collisionDetection(asteroids[i], missiles[j])) {
        console.log('made it here');
        asteroids[i].splitAsteroid();
        asteroids.splice(i, 1);
        missiles.splice(j, 1)
        score += 1
      }
    }
  }
}


function drawInterval(){
    context.clearRect ( 0 , 0 , canvas.width , canvas.height );
    asteroidLoop();
    missileLoop()
    drawSpaceshipImage(spaceShip.xCoord, spaceShip.yCoord, spaceShip.rotation);
    checkRotation()
    checkShipCollission()
    missileCooldown -= 1
    checkMove()
    moveRect()
    updateScore()
    checkLevelEnd()
}

var updateScore = function(){
  $("#score").html(score + "000")
}



var checkLevelEnd = function(){
  if(asteroids.length == 0){
    level += 1
    startLevel(level)
  }
}

var missileLoop = function(){
  var validMissiles = []
   for(i = 0; i < missiles.length; i++){
    moveMissile(missiles[i])
    drawMissile(missiles[i])
    }
    for(i=0; i < missiles.length; i++){
      if(missiles[i].frames < 400){
        validMissiles.push(missiles[i])
      }
    }
    missiles = validMissiles
  }


var checkMove = function(){
  if(spaceShip.xCoord > canvas.width){
    spaceShip.xCoord -= canvas.width
  } else if (spaceShip.xCoord < 0){
    spaceShip.xCoord += canvas.width
  } else if (spaceShip.yCoord > canvas.height){
    spaceShip.yCoord -= canvas.height
  } else if (spaceShip.yCoord < 0) {
    spaceShip.yCoord += canvas.height
  }
  if(moveForward){
    spaceShip.xCoord += Math.cos(spaceShip.rotation * (Math.PI/180))
    spaceShip.yCoord += Math.sin(spaceShip.rotation * (Math.PI/180))
  }
}

var moveMissile = function(missile){
  if(missile.xCoord > canvas.width){
    missile.xCoord -= canvas.width
  } else if (missile.xCoord < 0){
    missile.xCoord += canvas.width
  } else if (missile.yCoord > canvas.height){
    missile.yCoord -= canvas.height
  } else if (missile.yCoord < 0) {
    missile.yCoord += canvas.height
  }
  missile.xCoord += (Math.cos(missile.rotation * (Math.PI/180)))*1.8
  missile.yCoord += (Math.sin(missile.rotation * (Math.PI/180)))*1.8
  missile.frames += 1
}


var checkRotation = function(){
  if (rotateLeft){
    spaceShip.rotation -= 2
  } else if (rotateRight) {
    spaceShip.rotation += 2
  }
}

function Asteroid (xCoord, yCoord, radius, rotation) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.radius = radius;
  this.rotation = Math.floor(Math.random() * 360);
}

Asteroid.prototype = {
  constructor: Asteroid,
  splitAsteroid: function() {
    if(this.radius === 46) {
      asteroids.push(new Asteroid(this.xCoord + (this.radius / 2), this.yCoord, this.radius / 2), new Asteroid(this.xCoord -(this.radius / 2), this.yCoord, this.radius / 2 ));
    }
  }
}
function Missile (xCoord, yCoord, rotation) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.rotation = rotation;
  this.frames = 0;
  this.radius = 5;
}

var missiles = []

var fireMissile = function(){
  if(missileCooldown <= 0){
  missiles.push(new Missile(spaceShip.xCoord + 17, spaceShip.yCoord + 13, spaceShip.rotation))

  missileCooldown = 50
  }
}

var startLevel = function(level){
  for(i = 0; i < level; i++){
    var randomXCoord = getRandomStartCoordinate()
    var randomYCoord = getRandomStartCoordinate()
    var randomRotation = Math.floor(Math.random() * 360)
    asteroids.push(new Asteroid(randomXCoord, randomYCoord, 46, randomRotation))
  }
}

var gameOver = function(){
  $("canvas").fadeOut(function() {
    $("#canvas-container").fadeIn(function() {
        $("#canvas-container").html("GAME OVER")
      });

    });

}

var getRandomStartCoordinate = function(){
  var randomCoord = Math.floor(Math.random() * 360)
  var flipACoin = Math.floor(Math.random() * 2)
  if(flipACoin == 1) {
    return -randomCoord
  } else{
    return randomCoord
  }
}
$('document').ready(function(){
var gameInterval = setInterval(function(){
  drawInterval()
}, 5)

startLevel(1)

  $('body').on("keydown", function(event) {
    if (event.which == 37) {
      rotateLeft = true
      rotateRight = false
    } else if (event.which == 39){
      rotateRight = true
      rotateLeft = false
    } else if (event.which == 38) {
      moveForward = true
    } else if (event.which == 32) {
      fireMissile()
    }



  })
  $('body').on("keyup", function(event) {
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


