var canvasWidth = 600,
    canvasHeight = 400;

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var image = new Image();
image.src = 'D://The front-end/canvas/photo/img/iu.jpg';
var radius = 50,
    clipper = {x: 600, y: 400, r: radius};

image.onload = function(e) {
    initCanvas();
}

function initCanvas() {
    clipper = {x: Math.random()*(canvas.width-2*radius)+radius,
               y: Math.random()*(canvas.height-2*radius)+radius, r: radius}
    draw(image, clipper);
}

function setClipper(clipper) {
    context.beginPath();
    context.arc(clipper.x, clipper.y, clipper.r, 0, Math.PI*2, false);
    context.clip();
}

function draw(image,clipper) {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.save();
    setClipper(clipper);
    context.drawImage(image, 0, 0, 600, 400);
    context.restore();
}

function show() {
    var timer = setInterval(function() {
        clipper.r += 20;
        if(clipper.r > 2*Math.max(canvas.width,canvas.height)) {
          clearInterval(timer);
        }
        draw(image, clipper);
    }, 30);
}

function reset() {
    initCanvas();
}