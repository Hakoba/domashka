export type Color = string;

export class ShapeFactory {
  create(numberOfSide: number): Figure {
    if (numberOfSide == 0) {
      return new Circle(15, "#11eeeebb", 90, 150);
    }
    if (numberOfSide == 1) {
      return new Segment(40, "#e324a188", 190, 190);
    }
    if (numberOfSide == 2) {
      return new Angle(40, 15, "#e324a188", 19, 190);
    }
    if (numberOfSide == 3) {
      return new Triangle(50, 90, "#e324a188", 250, 300);
    } else if (numberOfSide == 4) {
      return new Rectangle(50, 70, "#eeeeeebb", 20, 30);
    } else {
      throw new Error("Не правильное колличество сторон");
    }
  }
}

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

export class Ellipse extends Figure {
  public isDragging: boolean = false;
  constructor(
    public radiusX: number,
    public radiusY: number,
    color: Color = "#e3ea21",
    public x: number = 20,
    public y: number = 20
  ) {
    super(color);
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.x = x;
    this.y = y;
  }

  getArea(): number {
    let square = Math.PI * 222 ** 2;
    return square;
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}

export class Huita extends Figure {
  public isDragging: boolean = false;
  constructor(
    public width: number,
    public height: number,
    public borderRadius: number,
    color: Color = "#e3ea21",
    public x: number = 10,
    public y: number = 10
  ) {
    super(color);
    this.width = width;
    this.borderRadius = borderRadius;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  getArea(): number {
    let square = this.width * this.height;
    return square;
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.color;
    ctx.lineJoin = "round";
    ctx.lineWidth = this.borderRadius;
    ctx.stroke();
  }
}

export class Triangle extends Figure {
  public isDragging: boolean = false;
  constructor(
    public katet1: number,
    public katet2: number,
    color: Color = "#e3ea21",
    public x: number = 10,
    public y: number = 10
  ) {
    super(color);
    this.katet1 = katet1;
    this.katet2 = katet2;
    this.x = x;
    this.y = y;
  }

  getArea(): number {
    let square = (this.katet1 * this.katet2) / 2;
    return square;
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.katet1);
    ctx.lineTo(this.y + this.katet1, this.x + this.katet2);
    ctx.closePath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export class Segment extends Figure {
  public isDragging: boolean = false;
  constructor(
    public a: number,
    color: Color = "#e3ea21",
    public x: number = 10,
    public y: number = 10
  ) {
    super(color);
    this.a = a;
    this.x = x;
    this.y = y;
  }

  getArea(): number {
    let square = this.a;
    return square;
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.a);
    ctx.closePath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export class Angle extends Figure {
  public isDragging: boolean = false;
  constructor(
    public a: number,
    public b: number,
    color: Color = "#e3ea21",
    public x: number = 10,
    public y: number = 10
  ) {
    super(color);
    this.a = a;
    this.b = b;
    this.x = x;
    this.y = y;
  }

  getArea(): number {
    let square = this.a;
    return square;
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.a);
    ctx.lineTo(this.x + this.a, this.y + this.b);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}
