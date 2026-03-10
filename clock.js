/*
* Title: Project 2 – City Time Scene
* Author: Ruibin Cong
* Date: SP 2026
* Simple Description: 
* This project shows a small city scene that reacts to real time. 
* The building windows light up based on the current minute, and birds fly across 
* the sky at different speeds depending on the hour. New birds appear every few seconds 
* and fly in random directions across the screen.
* Instructions: 
* Just watch the scene. The animation changes automatically based on the current time.
*/
let bird1x = -100,
  bird1y = 120,
  bird1emoji = "🐦";
let bird2x = -100,
  bird2y = 120,
  bird2emoji = "🐦";
let bird3x = -100,
  bird3y = 120,
  bird3emoji = "🐦";
let bird4x = -100,
  bird4y = 120,
  bird4emoji = "🐦";
let bird5x = -100,
  bird5y = 120,
  bird5emoji = "🐦";
let bird1dir = 1;
let bird2dir = 1;
let bird3dir = 1;
let bird4dir = 1;
let bird5dir = 1;

let birdIndex = 0;
let lastSpawn = -1;

function setup() {
  createCanvas(600, 600);
  rectMode(CORNER);
}

function draw() {
  background(220);

  let h = hour();
  let m = minute();
  let s = second();

  // draw ground
  fill(0, 105, 0);
  ellipse(600 / 2, 720, 900, 500);

  // draw building
  drawBuilding(120, 180, 140, 350, m);
  drawBuilding(300, 150, 115, 390, m);
  drawBuilding(60, 250, 140, 350, m, 1);
  drawBuilding(235, 290, 115, 310, m, 1);
  drawBuilding(390, 230, 168, 370, m, 1);

  drawBird(h, s);
}

function drawBuilding(x, y, w, h, minuteVal, flag) {
  noStroke();
  fill(20, 20, 30, 255);
  rect(x, y, w, h, 10);

  let cols = floor(w / 28);
  let rows = floor(h / 28);

  let total = cols * rows;
  let lit = floor(map(minuteVal, 0, 59, 0, total));

  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let wx = x + 10 + c * 24;
      let wy = y + 10 + r * 24;

      if (idx < lit) {
        fill(255, 220, 120, 220);
      } else {
        fill(60, 70, 90, 140);
      }

      rect(wx, wy, 16, 18, 3);
      idx++;
    }
  }

  // draw door
  if (flag == 1) {
    stroke("white");
    fill(153, 76, 0);
    rect(x + w / 2 - 20, 570, 20, 30);
    rect(x + w / 2, 570, 20, 30);
  }
}

function drawBird(hourVal, secondVal) {
  let emojis = ["🐦", "🦅", "🦜", "🕊️", "🐥", "🐦‍⬛"];

  if (secondVal % 2 == 0 && secondVal != lastSpawn) {
    lastSpawn = secondVal;
    birdIndex = birdIndex + 1;

    let dir = random([1, -1]);

    if (birdIndex == 1) {
      bird1dir = dir;
      bird1y = random(30, 220);
      bird1emoji = random(emojis);

      if (dir == 1) {
        bird1x = -40;
      } else {
        bird1x = width + 40;
      }
    }

    if (birdIndex == 2) {
      bird2dir = dir;
      bird2y = random(30, 220);
      bird2emoji = random(emojis);

      if (dir == 1) {
        bird2x = -40;
      } else {
        bird2x = width + 40;
      }
    }

    if (birdIndex == 3) {
      bird3dir = dir;
      bird3y = random(30, 220);
      bird3emoji = random(emojis);

      if (dir == 1) {
        bird3x = -40;
      } else {
        bird3x = width + 40;
      }
    }

    if (birdIndex == 4) {
      bird4dir = dir;
      bird4y = random(30, 220);
      bird4emoji = random(emojis);

      if (dir == 1) {
        bird4x = -40;
      } else {
        bird4x = width + 40;
      }
    }

    if (birdIndex == 5) {
      bird5dir = dir;
      bird5y = random(30, 220);
      bird5emoji = random(emojis);

      if (dir == 1) {
        bird5x = -40;
      } else {
        bird5x = width + 40;
      }

      birdIndex = 0;
    }
  }

  let speed = map(hourVal, 0, 23, 1, 5);

  textAlign(CENTER, CENTER);
  textSize(36);

  bird1x = bird1x + speed * bird1dir;
  text(bird1emoji, bird1x, bird1y);

  bird2x = bird2x + speed * bird2dir;
  text(bird2emoji, bird2x, bird2y);

  bird3x = bird3x + speed * bird3dir;
  text(bird3emoji, bird3x, bird3y);

  bird4x = bird4x + speed * bird4dir;
  text(bird4emoji, bird4x, bird4y);

  bird5x = bird5x + speed * bird5dir;
  text(bird5emoji, bird5x, bird5y);
}
