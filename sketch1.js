/*
 * Title: Project 1
 * Author: Ruibin Cong
 * Date: Feb 2026
 * Simple Description:
 * Day/Night form generator. Day mode shows gradient sky + moving clouds + sun.
 * Night mode shows gradient dark sky + moon + stars that slowly appear as the mouse moves farther away.
 * Instructions:
 * Move mouse from center to far away.
 */

let stars = [];
let cloudOffset = 0;

function setup() {
  createCanvas(600, 600);

  // stars
  for (let i = 0; i < 90; i++) {
    stars.push({
      x: random(width),
      y: random(height * 0.65),
      s: random(1.5, 4),
    });
  }
}

function draw() {
  let cx = width / 2;
  let cy = height / 2;

  // distance from mouse to center
  let d = dist(mouseX, mouseY, cx, cy);

  // 0 = day, 1 = night
  let nightT = map(d, 120, 320, 0, 1, true);

  let rayLength = map(d, 0, width / 2, 140, 60, true);
  let rayCount = int(map(d, 0, width / 2, 40, 12, true));

  // gradient background
  drawSkyGradient(nightT);

  // stars appear slowly as mouse goes farther
  drawStars(nightT);

  // clouds move away as it becomes night
  cloudOffset += (1 - nightT) * 0.6;
  drawCloudsMoving(cloudOffset, 1 - nightT);

  // ground
  drawGround(nightT);

  // change sun and moon
  if (nightT < 0.5) {
    drawSun(cx, cy, rayLength, rayCount, 1 - nightT * 2);
  } else {
    drawMoon(cx, cy, rayLength, (nightT - 0.5) * 2);
  }
}

// Background
function drawSkyGradient(nightT) {
  // day colors
  let dayTop = color(170, 210, 255);
  let dayBottom = color(230, 245, 255);

  // night colors
  let nightTop = color(5, 10, 25);
  let nightBottom = color(20, 25, 55);

  // blend based on nightT
  let topC = lerpColor(dayTop, nightTop, nightT);
  let bottomC = lerpColor(dayBottom, nightBottom, nightT);

  noFill();
  for (let y = 0; y < height; y++) {
    let t = y / (height - 1);
    let c = lerpColor(topC, bottomC, t);
    stroke(c);
    line(0, y, width, y);
  }
}

// Sun
function drawSun(x, y, rayLength, rayCount, alpha01) {
  // alpha01: 0..1
  let a = 255 * constrain(alpha01, 0, 1);

  // color becomes more red when rays are larger
  let r = map(rayLength, 60, 140, 230, 255);
  let g = map(rayLength, 60, 140, 180, 60);
  let b = 0;

  // rays
  stroke(255, 200, 0, a);
  strokeWeight(4);

  for (let i = 0; i < rayCount; i++) {
    let angle = (TWO_PI * i) / rayCount;

    let x1 = x + cos(angle) * 80;
    let y1 = y + sin(angle) * 80;

    let x2 = x + cos(angle) * (80 + rayLength);
    let y2 = y + sin(angle) * (80 + rayLength);

    line(x1, y1, x2, y2);
  }

  // sun body
  noStroke();
  fill(r, g, b, a);
  ellipse(x, y, 160, 160);
}

// Moon
function drawMoon(x, y, rayLength, alpha01) {
  let a = 255 * constrain(alpha01, 0, 1);

  let moonSize = map(rayLength, 60, 140, 120, 170);

  noStroke();
  fill(235, 235, 245, a);
  ellipse(x, y, moonSize, moonSize);

  //Make a cut
  fill(10, 15, 35, a);
  ellipse(
    x + moonSize * 0.18,
    y - moonSize * 0.1,
    moonSize * 0.95,
    moonSize * 0.95
  );
}

// Stars
function drawStars(nightT) {
  let a = 255 * pow(nightT, 1.2);

  noStroke();
  fill(255, 255, 255, a);

  for (let i = 0; i < stars.length; i++) {
    ellipse(stars[i].x, stars[i].y, stars[i].s, stars[i].s);
  }
}

function drawCloudsMoving(offset, dayAmount) {
  let a = 200 * constrain(dayAmount, 0, 1);

  noStroke();
  fill(255, 255, 255, a);

  let off = offset % (width + 200);

  drawCloudShape(120 - off, 120);
  drawCloudShape(420 - off * 0.7, 160);
}

function drawCloudShape(x, y) {
  ellipse(x, y, 80, 50);
  ellipse(x + 40, y - 10, 90, 60);
  ellipse(x + 80, y, 80, 50);
}

function drawGround(nightT) {
  // day ground to night ground
  let dayG = color(80, 180, 90);
  let nightG = color(20, 70, 45);
  let g = lerpColor(dayG, nightG, nightT);

  noStroke();
  fill(g);
  ellipse(width / 2, 720, 900, 500);
}
