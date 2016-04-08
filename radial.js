$(function() {

var canvas = document.getElementsByTagName('canvas');
console.log(canvas.length)

for (var i = 0; i < canvas.length; i++) {
  progressBar(canvas[i].id);
}

// load the canvas
function progressBar(canvasId) {
  var degreesCall;

  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext('2d');

  // declare some variables
  var cWidth = canvas.width;
  var cHeight = canvas.height;
  var progressColor = 'black';
  var percentColor = 'white';
  var circleColor = '#fff';
  var paceColor = '#fff'
  var rawPerc = canvas.getAttribute('data-perc');
  var rawPacePerc = canvas.getAttribute('data-pacePerc');
  var perfFont = canvas.getAttribute('perf-font');
  var perfPerc = canvas.getAttribute('perf-perc');
  var definition = canvas.getAttribute('data-text');
  var perc = parseInt(rawPerc);
  var pacePerc = parseInt(rawPacePerc);
  var degrees = 0;
  var endDegrees = (360 * perc) / 100;
  var paceDegrees = (360 * pacePerc) / 100;

  var lineWidth = 15; // The 'brush' size

  console.log(canvasId + ' ' + perc);

  function getDegrees() {
    if (degrees < endDegrees) {
      degrees++;
    } else {
      clearInterval(degreesCall);
    }

    drawProgressBar();
  }

  function PointOnCircleY() {
    // Convert from degrees to radians via multiplication by PI/180  
    y = cHeight / 2 - ((cHeight / 2 - lineWidth / 2) * Math.cos(paceDegrees * Math.PI / 180));
    return y;
  }

  function PointOnCircleX() {
    // Convert from degrees to radians via multiplication by PI/180
    x = cWidth / 2 + ((cWidth / 2 - lineWidth / 2) * Math.sin(paceDegrees * Math.PI / 180));
    return x;
  }

  function drawProgressBar() {
    //clear the canvas after every instance
    ctx.clearRect(0, 0, cWidth, cHeight);

    var radians = 0; // We need to convert the degrees to radians

    radians = degrees * Math.PI / 180;

    // let's draw the background circle
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.strokeStyle = circleColor;
    ctx.lineWidth = lineWidth - 1;
    ctx.arc(cHeight / 2, cWidth / 2, (cWidth / 2 - lineWidth / 2), 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, true);
    ctx.stroke();
	ctx.restore();

    // let's draw the actual progressBar
	ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.strokeStyle = progressColor;
    ctx.lineWidth = lineWidth;
    ctx.arc(cHeight / 2, cWidth / 2, (cWidth / 2 - lineWidth / 2), 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
    ctx.stroke();
    ctx.restore();

    // let's get the text
    ctx.fillStyle = percentColor;
    ctx.font = '50px "'+perfFont+'"';
    var outputTextPerc = perfPerc + '%';
    var outputTextPercWidth = ctx.measureText(outputTextPerc).width;
    ctx.fillText(outputTextPerc, cWidth / 2 - outputTextPercWidth / 2, cHeight / 2 + 15);
    ctx.font = '18px "Century Gothic"';
    var outputTextDefinitionWidth = ctx.measureText(definition).width;
    ctx.fillText(definition, cWidth / 2 - outputTextDefinitionWidth / 2, cHeight / 2 + 40);


    // the infamous pace dot
    ctx.beginPath();
    ctx.arc(PointOnCircleX(), PointOnCircleY(), lineWidth / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();


  }



  degreesCall = setInterval(getDegrees, 10 / (degrees - endDegrees));
}

});