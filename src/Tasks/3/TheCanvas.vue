<script setup lang="ts">
import {Circle, Ellipse, Figure, Huita, Rectangle} from "../2";
import { onMounted, ref, reactive } from "vue";
// Dialog
const showModal = ref<boolean>(false);
const currentColor = ref("#777777bb");
const figureType = ref<string>('Rectangle');

//Canvas
const canvas = ref(null);
let ctx, BB, offsetX, offsetY, WIDTH, HEIGHT;
// drag related variables
let dragok = false;
let startX;
let startY;

const clear = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
};
const addFigure = (color: Color,type) => {
  clear();
  figures.push(new Rectangle(40, 50, currentColor.value));
  render()
};
// handle mousedown events
const myDown =(e) => {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // get the current mouse position
  const mx = parseInt(e.clientX - offsetX);
  const my = parseInt(e.clientY - offsetY);

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
const myMove = (e) => {
  // if we're dragging anything...
  if (dragok) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    const mx = parseInt(e.clientX - offsetX);
    const my = parseInt(e.clientY - offsetY);

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

let figures = reactive([]);
onMounted(() => {
  // the DOM element will be assigned to the ref after initial render
  if (canvas.value.getContext) {
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
  <n-card title="CANVAS">
    <canvas ref="canvas" id="canvasId" width="400" height="400"></canvas>
    <n-button @click="showModal = true"> SHowModal </n-button>
    <n-modal v-model:show="showModal">
      <n-card style="width: 600px" title="Modal" :bordered="false" size="huge">
        <template #header-extra>
          <p @click="showModal = false">XX</p>
        </template>
        <n-color-picker v-model:value="currentColor"></n-color-picker>
        <n-input placeholder="x" v-model:value="figureType"></n-input>
        <template #footer>
          <n-space justify="end">
            <n-button @click="addFigure(currentColor, figureType)"
              >Создать</n-button
            >
          </n-space></template
        >
      </n-card>
    </n-modal>
  </n-card>
</template>

<style scoped lang="scss">
#canvasId {
  background-color: #42b983;
  border: 1px solid #304455;
}
</style>
