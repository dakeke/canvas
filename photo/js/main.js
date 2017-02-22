var canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight;

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var image = new Image();
image.src = 'D://The front-end/canvas/photo/img/iu.jpg';
var radius = 50,
    clipper = {x: 600, y: 400, r: radius};
    leftMargin = 0, topMargin = 0;
image.onload = function(e) {
    var dom = document;
    var wrap = dom.getElementsByClassName('wrap')[0],
        img = dom.getElementsByTagName('img')[0];
    wrap.style.width = canvasWidth + 'px';
    wrap.style.height = canvasHeight + 'px';
    img.style.width = image.width + 'px';
    img.style.height = image.height + 'px';

    leftMargin = (image.width - canvas.width)/2;
    topMargin = (image.height - canvas.height)/2;
    img.style.top = String(-topMargin) + 'px';
    img.style.left = String(-leftMargin) + 'px';

    initCanvas();
}

function initCanvas() {
    var theTop = topMargin < 0 ? -topMargin:0,
        theLeft = leftMargin < 0 ? -leftMargin:0;
    clipper = {x: Math.random()*(canvas.width-2*radius-2*theLeft)+radius+theLeft,
               y: Math.random()*(canvas.height-2*radius-2*theTop)+radius+theTop, r: radius}
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
    context.drawImage(image, Math.max(leftMargin, 0), Math.max(topMargin, 0),
                      Math.min(canvas.width, image.width), Math.min(canvas.height, image.height),
                      leftMargin < 0 ? -leftMargin:0, topMargin < 0 ? -topMargin:0,
                      Math.min(canvas.width, image.width), Math.min(canvas.height, image.height));
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
