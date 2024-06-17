import getRandomNumber from "./getRandomNumber";

class Particle {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  deg: number;
  colorLine: string;
  ctx: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = getRandomNumber(0, canvas.width);
    this.y = getRandomNumber(0, canvas.height);
    this.size = getRandomNumber(1, 3);
    this.speedX = getRandomNumber(-1, 1);
    this.speedY = getRandomNumber(-1, 1);
    this.deg = getRandomNumber(0, 360);
    this.colorLine = `hsl(${this.deg}, 50%, 50%)`;
  }
  update() {
    this.deg++;
    this.x += this.speedX;
    this.y = this.y + this.speedY;
    if (this.x >= this.canvas.width || this.x <= 0) {
      this.speedX = -this.speedX;
    }
    if (this.y >= this.canvas.width || this.y <= 0) {
      this.speedY = -this.speedY;
    }
  }
  draw() {
    this.ctx.fillStyle = `hsl(${this.deg}, 50%, 50%)`; //hsl-формат цвета
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.strokeStyle = this.colorLine;
    this.ctx.fill();
  }
}

export default Particle;
