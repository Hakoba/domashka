<script setup lang="ts">
import { Color, Ellipse, Huita, Rectangle, ShapeFactory, Triangle} from "../3";
import { onMounted, ref, reactive } from "vue";
import {useNotification} from "naive-ui";
const notification = useNotification();

// Dialog
const showModal = ref<boolean>(false);
const currentColor = ref("#777777bb");
const figureType = ref<number>(2);

//Canvas
const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D, BB, offsetX: number, offsetY: number, WIDTH : number, HEIGHT : number;
// drag related variables
let dragok: boolean = false;
let startX: number;
let startY: number;
const factory = new ShapeFactory();
const clear = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
};
const addFigure = (color: Color) => {
    clear()
    try {
      figures.push(factory.create(figureType.value));

    }
    catch (e){
        console.error(e.toString())
      notification.error({title: 'Ошибка',content: e.toString()})
    }
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
const myUp = (e: MouseEvent) => {
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

let figures = reactive<Rectangle[] |
Circle[] |
Ellipse[] |
Huita[] |
Triangle[]>([]);
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


    // figures.push(factory.create(0) );
    // figures.push(factory.create(1) );
    // figures.push(factory.create(2) );
    // figures.push(factory.create(3));
    // figures.push(factory.create(4));
    render()
  }
});
</script>
<template>
  <div style="display: flex;">
  <n-card title="CANVAS" style="display: flex">
    <canvas ref="canvas" id="canvasId" width="400" height="400"></canvas>

  </n-card>
  <n-card style="width: 50vw" title="Modal" :bordered="false" size="huge">
    <template #header-extra>
      <p @click="showModal = false">XX</p>
    </template>
    <n-color-picker v-model:value="currentColor"></n-color-picker>
    <n-input placeholder="x" type="number" v-model:value="figureType"></n-input>
    <template #footer>
      <n-space justify="end">
        <n-button @click="addFigure(currentColor, figureType)"
        >Создать</n-button
        >
      </n-space></template
    >
  </n-card>
  </div>
</template>

<style scoped lang="scss">
#canvasId {
  background-color: #42b983;
  border: 1px solid #304455;
}
</style>
