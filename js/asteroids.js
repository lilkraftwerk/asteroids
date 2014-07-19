var canvas = document.getElementById('tutorial')
var context = canvas.getContext('2d')
// context.fillStyle = "#000000"

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

function drawShip() {
  context.beginPath()
  context.fillStyle = "#FF0000"
  context.moveTo(100,100)
  context.lineTo(100,126)
  context.lineTo(135,113)
  context.fill()
  context.closePath()
}

var moveRect = function(){
  if(x < canvas.width){
  x += 1;
  y += 1;

  } else
  { x = -width;
    y = -height;}
}

function drawInterval(){
  setInterval(function(){
    context.clearRect ( 0 , 0 , canvas.width , canvas.height );
    drawAsteroid(200, 200, 23);
    drawAsteroid(400, 400, 46);
    drawRectangle(x, y, width, height);
    drawMissile()
    drawShip();
    moveRect()
  }, 5)
}


window.onload = function(){
  drawInterval()

}

