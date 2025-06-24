let columnas = 80;
let filas = 40;
let cesped = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();
  inicializarCesped();
}

function draw() {
  background(190, 225, 190); // fondo nostálgico suave
  dibujarCesped();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  inicializarCesped(); // recalcular pasto al cambiar tamaño
}

function inicializarCesped() {
  cesped = [];
  for (let i = 0; i < columnas; i++) {
    cesped[i] = [];
    for (let j = 0; j < filas; j++) {
      let x = i * (width / columnas);
      let y = j * (height / filas);
      cesped[i][j] = new Brizna(x, y);
    }
  }
}

function dibujarCesped() {
  for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {
      cesped[i][j].mover(mouseX, mouseY);
      cesped[i][j].dibujar();
    }
  }
}

class Brizna {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = random(20, 40);
    this.inclinacion = 0;
    this.anguloViento = random(TWO_PI);
    let tonoVerde = random(80, 130);
    this.tono = color(40, tonoVerde, 60, 180);
  }

  mover(mx, my) {
    this.anguloViento += 0.02;
    let viento = sin(this.anguloViento) * 2;

    let d = dist(this.x, this.y, mx, my);
    let efectoMouse = d < 120 ? map(d, 0, 120, 6, 0) : 0;

    this.inclinacion = viento + efectoMouse;
  }

  dibujar() {
    stroke(this.tono);
    strokeWeight(1.2);
    noFill();

    let x1 = this.x;
    let y1 = this.y;
    let x2 = x1 + this.inclinacion * 0.5;
    let y2 = y1 - this.altura * 0.3;
    let x3 = x1 + this.inclinacion;
    let y3 = y1 - this.altura * 0.7;
    let x4 = x1 + this.inclinacion;
    let y4 = y1 - this.altura;

    bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  }
}
