<script setup lang="ts">
import { useNotification } from "naive-ui";
import TheCanvas from "./TheCanvas.vue";
const notification = useNotification();

</script>

<template>
  <n-alert title="Задание № 3" type="info">
    <p style="text-transform: lowercase">
      Требуется написать программу, которая  рисует фигуру по заданному пользователем числу сторон
    </p>
    (0-круг, 1-отрезок, 2-угол, 3-треугольник и т.д)
  </n-alert>
  <br />
  <n-dialog-provider>
  <the-canvas></the-canvas>
  </n-dialog-provider>
</template>

<style scoped lang="scss">

a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
