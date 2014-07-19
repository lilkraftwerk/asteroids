var canvas = document.getElementById('tutorial')
var context = canvas.getContext('2d')
context.fillStyle = "#000000"
var x, y, width, height;

x = 0;
y = 0;
width = 100;
height = 100;

function draw(){
context.fillRect(x, y, width, height)
}


var moveRect = function(){
  if(x < 600){
  x += 1;
  y += 1;

  } else
  { x = -width;
    y = -height;}
}

function drawInterval(){
  setInterval(function(){
    context.clearRect ( 0 , 0 , 600 , 600 );
    draw()
    moveRect()
  }, 5)
}

