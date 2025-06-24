let cesped = [];
let separacion = 14;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  crearCesped();
}

function draw() {
  fondoGradiente();

  for (let brizna of cesped) {
    brizna.actualizar();
    brizna.dibujar();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  crearCesped();
}

function crearCesped() {
  cesped = [];
  for (let x = 0; x < width; x += separacion) {
    for (let y = height * 0.5; y < height; y += separacion) {
      cesped.push(new Brizna(x, y));
    }
  }
}

function fondoGradiente() {
  noStroke();
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(210, 245, 210), color(170, 220, 170), y / height);
    stroke(c);
    line(0, y, width, y);
  }
}

class Brizna {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = random(20, 40);
    this.curva = random(0.5, 1.2);
    this.oscilacion = random(0.5, 1.2);
    this.fase = random(TWO_PI);
    this.tiempo = random(1000);

    let verde = random(100, 180);
    this.color = color(40, verde, 60, 180);
  }

  actualizar() {
    this.tiempo += 0.015; // Movimiento constante
  }

  dibujar() {
    let osc = sin(this.tiempo + this.fase) * this.curva;

    let x1 = this.x;
    let y1 = this.y;
    let x2 = x1 + osc * 0.5;
    let y2 = y1 - this.altura * 0.3;
    let x3 = x1 + osc * 1.1;
    let y3 = y1 - this.altura * 0.7;
    let x4 = x1 + osc * 1.6;
    let y4 = y1 - this.altura;

    stroke(this.color);
    strokeWeight(1);
    noFill();
    bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  }
}
