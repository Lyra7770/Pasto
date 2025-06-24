let cesped = [];
let separacion = 12;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  initCesped();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initCesped();
}

function draw() {
  dibujarFondo();
  for (let b of cesped) {
    b.mover(mouseX, mouseY);
    b.dibujar();
  }
}

function initCesped() {
  cesped = [];
  for (let x = 0; x < width; x += separacion) {
    for (let y = height * 0.5; y < height; y += separacion) {
      cesped.push(new Brizna(x, y));
    }
  }
}

function dibujarFondo() {
  noFill();
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(210,245,210), color(170,220,170), y/height);
    stroke(c);
    line(0, y, width, y);
  }
}

class Brizna {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.altura = random(20, 40);
    this.fase = random(TWO_PI);
    this.vel = random(0.008, 0.02);
    this.curva = random(0.8, 1.4);
    this.t = random(1000);
    let v = random(100,180);
    this.color = color(40, v, 70, 200);
  }

  mover(mx, my) {
    this.t += this.vel;
    this.osc = sin(this.t + this.fase) * this.curva;
    if (dist(this.x, this.y, mx, my) < 100) {
      this.osc += map(dist(this.x, this.y, mx, my), 0, 100, 2, 0);
    }
  }

  dibujar() {
    stroke(this.color);
    strokeWeight(1);
    noFill();

    let x1=this.x, y1=this.y;
    let x2=x1 + this.osc*0.5, y2=y1 - this.altura*0.3;
    let x3=x1 + this.osc*0.8, y3=y1 - this.altura*0.7;
    let x4=x1 + this.osc, y4=y1 - this.altura;
    bezier(x1,y1,x2,y2,x3,y3,x4,y4);
  }
}
