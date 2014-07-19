var canvas = document.getElementById('tutorial')
var context = canvas.getContext('2d')
// context.fillStyle = "#000000"
var shipRotation = 180
var x, y, width, height;
var shipXCoord = canvas.height / 2
var shipYCoord = canvas.width / 2

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

function drawMissile(){
  context.beginPath()
  context.fillStyle = "#00FF00"
  context.arc(175, 111, 5, 0, Math.PI * 2)
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
  context.fillStyle = "#000000"
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
    drawMissile()
    drawShip(shipXCoord, shipYCoord, shipRotation);
    checkRotation()
    checkMove()
    moveRect()
  }, 5)
}

var checkMove = function(){
  if(moveForward){
    shipXCoord += Math.cos(shipRotation*(Math.PI/180))
    shipYCoord += Math.sin(shipRotation*(Math.PI/180))
  }
}

var checkRotation = function(){
  if (rotateLeft){
    shipRotation -= 2
  } else if (rotateRight) {
    shipRotation += 2
  }
}

var rotateLeft = false
var rotateRight = false
var moveForward = false

$('document').ready(function(){
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


