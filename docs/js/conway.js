// create stage
//var step = acgraph.create('header');
var stage = acgraph.create('container');

// get bounds of stage
var bounds = stage.getBounds();

// parameters
var XDIMENSION = 50;
var YDIMENSION = 50;
var START_DENSITY = 0.2;
var CELL_WIDTH = bounds.width / XDIMENSION;
var CELL_HEIGHT = bounds.height / YDIMENSION;
var MAX_HZ = 60;

var grid;
var running = false;

var fpstext;
var framedelay = 0;

function main(){
  generateGrid();
  draw();
}

function generateGrid(){
  stage.suspend();
  acgraph.events.listen(stage, "click", function(){ running = !running;});
  grid = new Array(XDIMENSION);
  for(var i = 0; i < XDIMENSION; i++){
    grid[i] = new Array(YDIMENSION);
    for(var j = 0; j < YDIMENSION; j++){
      v = Math.random() < START_DENSITY ? true : false;
      grid[i][j] = new Cell(j, i, v);
    }
  }
  stage.resume();
}

function oneStep(){
  var time = (new Date()).getTime();
  stage.suspend();
  for(var i = 0; i < XDIMENSION; i++){
    for(var j = 0; j < YDIMENSION; j++){
      grid[i][j].getNextValue();
    }
  }

  for(var i = 0; i < XDIMENSION; i++){
    for(var j = 0; j < YDIMENSION; j++){
      if(grid[i][j].val != grid[i][j].nextVal){
        grid[i][j].update();
      }
    }
  }
  stage.resume();
  var finishtime = (new Date()).getTime();
  framedelay = (finishtime - time);
  fpstext.innerHTML = "Frame time: " + framedelay + "ms + " + Math.max(Math.round(1000 / MAX_HZ - framedelay), 0) + "ms";
}

function Cell(x, y, val){
  this.x = x;
  this.y = y;
  this.val = val;
  this.nextVal = false;
  if(val){
    this.rect = stage.rect(x*CELL_WIDTH, y*CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT).stroke('black').fill('white');
  } else{
    this.rect = stage.rect(x*CELL_WIDTH, y*CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT).stroke('black').fill('black');
  }
}

function DestroyGrid(){
  stage.dispose();
  stage = acgraph.create('container');
}

Cell.prototype.setVal = function(val){
  this.val = val;
}

Cell.prototype.getVal = function(){
  return this.val;
}

Cell.prototype.getNextValue = function(){
  var count = 0;
  var amin = Math.max(0, 1 - this.y);
  var amax = Math.min(3, XDIMENSION - this.y + 1);
  var bmin = Math.max(0, 1 - this.x);
  var bmax = Math.min(3, YDIMENSION - this.x + 1);
  for(var a = amin; a < amax; a++){
    for(var b = bmin; b < bmax; b++){
      if(a == 1 && b == 1) continue;
      if(grid[this.y + a - 1][this.x + b - 1].getVal()){
        count++;
      }
    }
  }
  if(count == 3){
    this.nextVal = true
  } else if(count != 2){
    this.nextVal = false;
  } else{
    this.nextVal = this.val;
  }
}

Cell.prototype.update = function(){
  this.val = this.nextVal;
  if(this.val){
    this.rect.fill('white');
  } else {
    this.rect.fill('black');
  }
}

window.requestAnimationFrame = function (callback) {
            setTimeout(callback, Math.max(1000 / MAX_HZ - framedelay, 0));
        };

function draw(){
  window.requestAnimationFrame(draw);
  if(running){
    oneStep();
  }
}

main();

/*-------------------------------------------------------*/

var createform = document.getElementById("controls");

var heading = document.createElement('h2');
heading.innerHTML = "Settings ";
createform.appendChild(heading);

var line = document.createElement('hr');
createform.appendChild(line);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

var sizelabel = document.createElement('label');
sizelabel.innerHTML = "Grid size (NxN): "; 
createform.appendChild(sizelabel);

var sizeelement = document.createElement('input'); 
sizeelement.setAttribute("type", "number");
sizeelement.setAttribute("value", XDIMENSION);
sizeelement.setAttribute("name", "dsize");
createform.appendChild(sizeelement);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

var densitylabel = document.createElement('label');
densitylabel.innerHTML = "Starting Density: ";
createform.appendChild(densitylabel);

var densityelement = document.createElement('input');
densityelement.setAttribute("type", "number");
densityelement.setAttribute("value", START_DENSITY);
densityelement.setAttribute("name", "ddensity");
createform.appendChild(densityelement);

var densitybreak = document.createElement('br');
createform.appendChild(densitybreak);

var timelabel = document.createElement('label');
timelabel.innerHTML = "Max refresh rate (hz): ";
createform.appendChild(timelabel);

var timeelement = document.createElement('input');
timeelement.setAttribute("type", "number");
timeelement.setAttribute("value", MAX_HZ);
timeelement.setAttribute("name","dtime");
createform.appendChild(timeelement);

var timebreak = document.createElement('br');
createform.appendChild(timebreak);

var submitelement = document.createElement('input');
submitelement.setAttribute("type", "button");
submitelement.setAttribute("name", "dsubmit");
submitelement.setAttribute("value", "Redraw grid");
submitelement.addEventListener("click", function(){
    XDIMENSION = sizeelement.value;
    YDIMENSION = sizeelement.value;
    START_DENSITY = densityelement.value;
    running = false;
    CELL_WIDTH = bounds.width / XDIMENSION;
    CELL_HEIGHT = bounds.height / YDIMENSION;
    MAX_HZ = timeelement.value;
    DestroyGrid();
    generateGrid();
});
createform.appendChild(submitelement);

var xbreak = document.createElement('br');
var xxbreak = document.createElement('br');
createform.appendChild(xbreak);
createform.appendChild(xxbreak);

fpstext = document.createElement('label');
fpstext.innerHTML = "Frame delay: N/a";
createform.appendChild(fpstext);
