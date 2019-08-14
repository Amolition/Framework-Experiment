function setup() {
  var canvas = createCanvas(400, 400);
  background(255);
  noSmooth();

  canvas.parent('separatinglines');

}

var resetTime = 0;
var time = 0;
 
function draw(){
  if (time > 8000) {
    clear();
    time = 0;
  }
  let blue = [[6,6],[3,6],[5,3],[8,7],[5,2],[9,6],[2,5],[-5,6],[-4,9],[-2,4],[-1,8]]
  let orange = [[-6,-5],[-3,-5],[-4,-4],[-6,-7.5],[-7,-2],[-2,-6],[-1,-5],[4,-6],[8,-9],[3,-4],[0,-8]]

  let x =  width / 40;
  let y = height / 40;

  stroke(0, 0, 255)
  strokeWeight(1)
  fill(0, 0, 255)
  blue.forEach(el => {ellipse(el[0] * x + width / 1.5, el[1] * y, 10, 10)});
  stroke(255, 165, 0)
  fill(255, 165, 0)
  orange.forEach(el => {ellipse(el[0] * x + width / 4, el[1] * y + height, 10, 10)});
  stroke(100, 100, 100)
  line(width / 2, 0, width / 2, height)
  line(0, height / 2, width, height / 2)

  if(millis() > resetTime + 1000){
    let x1 = random(-150, 0);
    let y1 = random(-200, 0);
    let x2 = random(400, 550);
    let y2 = random(400, 550);
    let colour1 = random(90,255);
    let colour2 = random(90,255);
    let colour3 = random(90,255);
    stroke(colour1,colour2,colour3);
    strokeWeight(7)
    line(x1,y1, x2, y2);

    resetTime = millis();
  }
  time += 10;
}

