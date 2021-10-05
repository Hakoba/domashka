type Color = string;


abstract class ShapeFactory{
  create(numberOfSide: number): Figure {

    if (numberOfSide == 1) {
      return new Circle();
    }
    if (numberOfSide == 3) {
      return new Triangle();

    } else if (numberOfSide == 4) {
      return new Rectangle();

    } else if (numberOfSide == 5) {
      return new Pentagon();
    }
    else {
      throw new Error('Не правильное колличество сторон')
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
