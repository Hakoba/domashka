<script setup lang="ts">
import {Circle, Color, Ellipse, Figure, Huita, Rectangle} from "../2";
import { onMounted, ref, reactive } from "vue";
// Dialog
const showModal = ref<boolean>(false);
const currentColor = ref("#777777bb");
const figureType = ref<string>('Rectangle');

//Canvas
const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D, BB, offsetX: number, offsetY: number, WIDTH : number, HEIGHT : number;
// drag related variables
let dragok = false;
let startX: number;
let startY: number;

const clear = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
};
const  getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const addFigure = (figure) => {
  clear();
  let shape;
  switch (figure) {
    case 'rect': {
      shape = new Rectangle(getRandomInt(10,60), getRandomInt(20,59), "#eeeeeebb", getRandomInt(20,280), getRandomInt(20,280) );
      break;
    }
    case 'circle': {
      shape = new Circle(getRandomInt(10,60), "#11eeeebb", getRandomInt(20,280), getRandomInt(20,280), );
      break;
    }
    case 'ellipse': {
      shape = new Ellipse(getRandomInt(10,60),getRandomInt(10,60), "#e324a188", getRandomInt(20,280), getRandomInt(20,280), );
      break;
    }
    case 'square': {
      shape = new Huita(getRandomInt(10,60),getRandomInt(10,60),20, "#e324a1", getRandomInt(20,280), getRandomInt(20,280), );
      break;
    }
    default:{
      shape = new Rectangle(getRandomInt(10,60), getRandomInt(10,60), "#eeeeeebb", getRandomInt(20,280), getRandomInt(20,280), );

    }
  }
  figures.push(shape);
  render()
};
// handle mousedown events
const myDown =(e:MouseEvent) => {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();
  // get the current mouse position
  const mx = (e.clientX - offsetX);
  const my = (e.clientY - offsetY);

  // test each rect to see if mouse is inside
  dragok = false;
  for (let i = 0; i < figures.length; i++) {
    const figure = figures[i];
    if(figure.width && figure.height){
      if ( mx > figure.x && mx < figure.x + figure.width && my > figure.y && my < figure.y + figure.height) {
        // if yes, set that figures isDragging=true
        dragok = true;
        figure.isDragging = true;
      }
    }else if(figure.radius ){
      if ( Math.abs (mx - figure.x) < figure.radius  && Math.abs (my - figure.y) < figure.radius) {
        // if yes, set that figures isDragging=true
        dragok = true;
        figure.isDragging = true;
      }
    }
    else if(figure.radiusX ){
      if ( Math.abs (mx - figure.x) < figure.radiusX  && Math.abs (my - figure.y) < figure.radiusY) {
        // if yes, set that figures isDragging=true
        dragok = true;
        figure.isDragging = true;
      }
    }

  }
  // save the current mouse position
  startX = mx;
  startY = my;
}

// handle mouseup events
const myUp = (e) => {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // clear all the dragging flags
  dragok = false;
  for (let i = 0; i < figures.length; i++) {
    figures[i].isDragging = false;
  }
}

// handle mouse moves
const myMove = (e: MouseEvent) => {
  // if we're dragging anything...
  if (dragok) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    const mx = (e.clientX - offsetX);
    const my = (e.clientY - offsetY);

    // calculate the distance the mouse has moved
    // since the last mousemove
    const dx = mx - startX;
    const dy = my - startY;

    // move each rect that isDragging
    // by the distance the mouse has moved
    // since the last mousemove
    for (let i = 0; i < figures.length; i++) {
      const figure = figures[i];
      if (figure.isDragging) {
        figure.x += dx;
        figure.y += dy;
      }
    }

    // redraw the scene with the new rect positions
    render();

    // reset the starting mouse position for the next mousemove
    startX = mx;
    startY = my;
  }
}
const render = () => {
  clear()
  for (let i = 0; i < figures.length; i++) {
    const figure = figures[i];
    figure.drawFigure(ctx);
  }
};

let figures = reactive<Figure[]>([]);
onMounted(() => {
  // the DOM element will be assigned to the ref after initial render
  if (canvas.value && canvas.value.getContext) {
    //@ts-ignore
    ctx = canvas.value.getContext("2d");
    BB = canvas.value.getBoundingClientRect();
    offsetX = BB.left;
    offsetY = BB.top;
    WIDTH = canvas.value.width;
    HEIGHT = canvas.value.height;

    // listen for mouse events
    canvas.value .onmousedown = myDown;
    canvas.value .onmouseup = myUp;
    canvas.value .onmousemove = myMove;

    let rect: Figure = new Rectangle(50, 70, "#eeeeeebb", 20, 30, );
    let circle: Figure = new Circle(15, "#11eeeebb", 90, 150, );
    let ellipse: Figure = new Ellipse(40,25, "#e324a188", 200, 190, );
    let hii: Figure = new Huita(90,45,20, "#e324a1", 120, 290, );
    figures.push(rect);
    figures.push(circle);
    figures.push(ellipse);
    figures.push(hii);
    render()
  }
});
</script>
<template>
  <div style="display: flex">

    <n-card title="CANVAS">
      <canvas ref="canvas" id="canvasId" width="400" height="400"></canvas>

    </n-card>
      <n-card style="width: 600px" title="Modal" :bordered="false" size="huge">
        выберите фигуру
        <n-button-group>
        <n-button @click="addFigure('rect')">'rect'</n-button>
        <n-button @click="addFigure('circle')">'circle'</n-button>
        <n-button @click="addFigure('ellipse')">'ellipse'</n-button>
        <n-button @click="addFigure('square')">'square'</n-button>
        </n-button-group>

      </n-card>
  </div>

</template>

<style scoped lang="scss">
#canvasId {
  background-color: #42b983;
  border: 1px solid #304455;
}
</style>
