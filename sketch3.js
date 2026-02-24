/*
 * Title: Homework3 Digital Coin Flip
 * Author: Ruibin Cong
 * Date: Jan 2026
 * Simple Description: A digital coin flip. Click to randomly show HEADS or TAILS and show the counts.
 * Instructions: Click the canvas to flip the coin.
 */

var side;
var headCounts;
var tailCounts;
var R, G, B;
var i;
var ang;
var x;
var y;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  side = "HEADS";
  headCounts = 0;
  tailCounts = 0;
  R = 255;
  G = 255;
  B = 255;
}

function draw() {
  background(220);

  //The coin
  fill(255, 255, 0);
  ellipse(200, 200, 240, 240);
  fill(0);

  fill(R, G, B);
  ellipse(200, 200, 220, 220);
  fill(0);

  fill(180);
  noStroke();

  for (i = 0; i < 24; i = i + 1) {
    ang = (TWO_PI * i) / 24;
    x = 200 + cos(ang) * 115;
    y = 200 + sin(ang) * 115;
    ellipse(x, y, 6, 6);
  }
  fill(0);


  //The result
  textSize(32);
  text(side, 200, 200);

  //Prompt
  textSize(16);
  text("Click to flip 🪙", 200, 360);

  //Count
  textSize(16);
  text("heads: " + headCounts, 100, 50);
  text("tails: " + tailCounts, 300, 50);
}

function mousePressed() {
  var r = random(1);

  if (r < 0.5) {
    side = "HEAD🐵";
    headCounts = headCounts + 1;
    R = 255;
    G = 0;
    B = 0;
  } else {
    side = "TAIL🐒";
    tailCounts = tailCounts + 1;
    R = 0;
    G = 255;
    B = 0;
  }
}
