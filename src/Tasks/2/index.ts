type Color = string;

export abstract class Figure {
  get color(): Color {
    return this._color;
  }

  set color(value: Color) {
    this._color = value;
  }
  _color: Color;
  abstract isDragging: boolean;
  abstract x: number;
  abstract y: number;
  abstract getArea(): number;
  abstract drawFigure(ctx: CanvasRenderingContext2D): void;
  protected constructor(color: Color) {
    this._color = color;
  }
}
export class Rectangle extends Figure {
  public isDragging: boolean = false;
  constructor(
    public width: number,
    public height: number,
    color: Color = "#e3ea21",
    public x: number = 10,
    public y: number = 10
  ) {
    super(color);
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  getArea(): number {
    let square = this.width * this.height;
    return square;
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.closePath();
    ctx.fill();
  }
}

export class Circle extends Figure {
  public isDragging: boolean = false;
  constructor(
    public radius: number,
    color: Color = "#e3ea21",
    public x: number = 20,
    public y: number = 20
  ) {
    super(color);
    this.radius = radius;
    this.x = x;
    this.y = y;
  }

  getArea(): number {
    let square = Math.PI * this.radius ** 2;
    return square;
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}
