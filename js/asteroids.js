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

function drawRectangle(xCoord, yCoord, width, height){
  context.beginPath()
  context.fillStyle = "#0000FF"
  context.fillRect(xCoord, yCoord, width, height)
  context.closePath()
}

function drawSpaceshipImage(xCoord, yCoord, rotation) {
  context.save()
  var img = document.getElementById("spaceship");
  var shipHeight = 26
  var shipWidth = 35
  var transx = xCoord + 13
  var transy = yCoord + 13
  context.translate(transx, transy)

  context.rotate((Math.PI / 180) * rotation)
  context.translate(-transx, -transy)
  context.beginPath()
  // context.fillStyle = "#FF0000"
  // context.moveTo(xCoord, yCoord)
  // context.lineTo(xCoord, yCoord + shipHeight)
  // context.lineTo(xCoord + shipWidth, yCoord + (shipHeight / 2))
  // context.fill()
  context.drawImage(img,xCoord, yCoord-10)

  context.closePath()
  context.restore()
}

function drawMissile(missile){
  context.beginPath()
  context.fillStyle = "#00FF00"
  context.arc(missile.xCoord, missile.yCoord, 5, 0, Math.PI * 2)
  context.fill()
  context.closePath()
}

function drawAsteroidOld() {
  context.beginPath()
  context.fillStyle = "#000000"
  context.arc(200, 200, 23, 0, Math.PI * 2)
  context.fill()
  context.closePath()
}

function drawAsteroid(xCoord, yCoord, radius) {
  context.beginPath()
  context.fillStyle = "#FF00FF"
  context.arc(xCoord, yCoord, radius, 0, Math.PI * 2)
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
var degree = 0

function drawInterval(){
  setInterval(function(){
    context.clearRect ( 0 , 0 , canvas.width , canvas.height );
    drawAsteroid(200, 200, 23);
    drawAsteroid(400, 400, 46);
    drawRectangle(x, y, width, height);
    missileLoop()
    drawSpaceshipImage(spaceShip.xCoord, spaceShip.yCoord, spaceShip.rotation);
    checkRotation()
    missileCooldown -= 1
    checkMove()
    moveRect()
  }, 5)
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

function Asteroid (xCoord, yCoord, radius) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.radius = radius;
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
  missiles.push(new Missile(spaceShip.xCoord + 17, spaceShip.yCoord + 13, spaceShip.rotation))

  missileCooldown = 50
  }
}


$('document').ready(function(){
  drawInterval()
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


