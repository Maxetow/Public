export class Turtle {
  constructor(drawId = "drawCanvas") {
    this.drawCtx = document.getElementById(drawId).getContext("2d");

    // Create a unique canvas for this turtle's head
    this.headCanvas = document.createElement("canvas");
    this.headCanvas.width = this.drawCtx.canvas.width;
    this.headCanvas.height = this.drawCtx.canvas.height;
    this.headCanvas.style.position = "absolute";
    this.headCanvas.style.top = "0";
    this.headCanvas.style.left = "0";
    document.getElementById("wrap").appendChild(this.headCanvas);

    this.headCtx = this.headCanvas.getContext("2d");

    this.w = this.drawCtx.canvas.width;
    this.h = this.drawCtx.canvas.height;

    this.x = 0;
    this.y = 0;
    this.angle = 0;          
    this.isPenDown = true;
    this.penColorVal = "black";
    this.penWidthVal = 2;
    this.speedVal = 5;

    this.drawCtx.lineCap = "round";
    this.drawCtx.lineJoin = "round";

    this._renderHead();
  }

  async forward(dist) {
    const steps = Math.max(1, this.speedVal === 0 ? 1 : Math.floor(Math.abs(dist) / this.speedVal));
    const dx = -Math.cos(this.angle * Math.PI / 180) * (dist / steps);
    const dy = -Math.sin(this.angle * Math.PI / 180) * (dist / steps);

    for (let i = 0; i < steps; i++) {
      const nx = this.x + dx, ny = this.y + dy;
      if (this.isPenDown) this._drawLine(this.x, this.y, nx, ny);
      this.x = nx; 
      this.y = ny;
      this._renderHead();
      if (this.speedVal > 0) await this._sleep(16);
    }
  }

  drawtext(text, x, y) {
    this.drawCtx.fillStyle = this.penColorVal;
    this.drawCtx.textAlign = "center";
    this.drawCtx.fillText(text, this._cx(x), this._cy(y));
  }

  backward(dist) { return this.forward(-dist); }
  right(deg) { this.angle += deg; this._renderHead(); }
  left(deg) { this.angle -= deg; this._renderHead(); }
  penUp() { this.isPenDown = false; }
  penDown() { this.isPenDown = true; }
  penColor(c) { this.penColorVal = c; }
  penWidth(w) { this.penWidthVal = w; }
  speed(s) { this.speedVal = Math.max(0, Math.min(10, s)); }
  goto(x, y) { if (this.isPenDown) this._drawLine(this.x, this.y, x, y); this.x = x; this.y = y; this._renderHead(); }

  _drawLine(x1, y1, x2, y2) {
    const ctx = this.drawCtx;
    ctx.beginPath();
    ctx.moveTo(this._cx(x1), this._cy(y1));
    ctx.lineTo(this._cx(x2), this._cy(y2));
    ctx.strokeStyle = this.penColorVal;
    ctx.lineWidth = this.penWidthVal;
    ctx.stroke();
  }

  _renderHead() {
    const ctx = this.headCtx;
    ctx.clearRect(0, 0, this.w, this.h); // Only clears this turtle's own canvas
    ctx.save();
    ctx.translate(this._cx(this.x), this._cy(this.y));
    ctx.rotate((this.angle - 90) * Math.PI / 180);

    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(6, -8);
    ctx.lineTo(-6, -8);
    ctx.closePath();

    ctx.fillStyle = this.penColorVal;
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  _cx(x) { return this.w / 2 + x; }
  _cy(y) { return this.h / 2 - y; }
  _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
}
