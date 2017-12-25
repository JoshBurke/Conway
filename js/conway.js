// create stage
//var step = acgraph.create('header');
var stage = acgraph.create('container');

// get bounds of stage
var bounds = stage.getBounds();

// calculate chip width/height
var XDIMENSION = 100;
var YDIMENSION = 100;
var START_DENSITY = 0.07;
var CELL_WIDTH = bounds.width / XDIMENSION;
var CELL_HEIGHT = bounds.height / YDIMENSION;

var grid;
var running = false;

function main(){
  stage.suspend();
  generateGrid();
  stage.resume();
  draw();
}

function run(){
    oneStep();

}

function generateGrid(){
  grid = new Array(XDIMENSION);
  for(i = 0; i < XDIMENSION; i++){
    grid[i] = new Array(YDIMENSION);
    for(j = 0; j < YDIMENSION; j++){
      v = Math.random() < START_DENSITY ? true : false;
      grid[i][j] = new Cell(j, i, v);
      console.log("Created cell " + j + ", " + i);
    }
  }
}

function oneStep(){
  stage.suspend();
  for(i = 0; i < XDIMENSION; i++){
    for(j = 0; j < YDIMENSION; j++){
      console.log("Stepping for cell " + j + ", " + i);
      grid[i][j].getNextValue();
    }
  }

  for(i = 0; i < XDIMENSION; i++){
    for(j = 0; j < YDIMENSION; j++){
      grid[i][j].update();
    }
  }
  stage.resume();
}

acgraph.events.listen(stage, "click", function(){ running = !running;});
//var button = step.rect(step.getBounds.width/2, step.getBounds.height/2, 40, 5).fill('red');

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

Cell.prototype.setVal = function(val){
  this.val = val;
}

Cell.prototype.getVal = function(){
  return this.val;
}

Cell.prototype.getNextValue = function(){
  var count = 0;
  for(a = Math.max(0, 1 - this.y); a < Math.min(3, XDIMENSION - this.y); a++){
    for(b = Math.max(0, 1 - this.x); b < Math.min(3, YDIMENSION - this.x); b++){
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

window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            setTimeout(callback, 1000 / 60);
        };

function draw(){
  window.requestAnimationFrame(draw);
  if(running)
    oneStep();
}

main();
