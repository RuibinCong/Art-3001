/*
* Title: Homework 5
* Author: Ruibin Cong
* Date:  Feb 2026
* Simple Description: Generate random dots with different colors.
* Instructions: Clike to regenerate the dots.
*/

function setup() {
  createCanvas(600, 600);
  noStroke();
}

function draw() {
  background(30, 255, 255);
  for (let i = 0; i < 300; i++) {

    let x = random(width);
    let y = random(height);
    let size = random(5, 20);
    let r = random(255);
    let g = random(255);
    let b = random(255);

    fill(r, g, b, 180);
    circle(x, y, size);
  }
  noLoop();
}
function mousePressed() {
  loop();
}