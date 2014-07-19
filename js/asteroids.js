var canvas = document.getElementById('tutorial')
var context = canvas.getContext('2d')
// context.fillStyle = "#000000"
var shipRotation = 0
var x, y, width, height;

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
    drawShip(canvas.width/2, canvas.height/2, 32);
    // Ship()

    moveRect()
  }, 5)
}

$('document').ready(function(){
  drawInterval()
  $('body').keydown(function(e) {
    console.log(e)
    if (e.keycode == 37) {
      console.log("left key")
      shipRotation -= 5
    }
  })
})

// function rotateShip() {


//   });
// }


