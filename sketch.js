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
