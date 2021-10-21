<script setup lang="ts">
import { useNotification } from "naive-ui";
import TheCanvas from "./TheCanvas.vue";
const notification = useNotification();

</script>

<template>

  <n-dialog-provider>
  <the-canvas></the-canvas>
  </n-dialog-provider>
  <br />

  <n-alert title="Задание № 2" type="info">
    <p style="text-transform: lowercase">
      ТРЕБУЕТСЯ НАПИСАТЬ ПРОГРАММУ, КОТОРАЯ РЕАЛИЗУЕТ СЛЕДУЮЩУЮ ИЕРАРХИЮ ДЛЯ
      ОТОБРАЖЕНИЯ ФИГУР И ПОЗВОЛЯЕТ ОТОБРАЗИТЬ УКАЗАННУЮ НА КНОПКЕ
      ПОЛЬЗОВАТЕЛЬСКОГО ИНТЕРФЕЙСА ФИГУРУ
    </p>
    Варианты фигур:
    <ul>
      <li>
        круг, эллипс, прямоугольник, скругленный прямоугольник, квадрат
        (графический редактор):
      </li>

      <li>стена, окно, крыльцо, крыша, забор ("рисуем домик");</li>

      <li>блок ввод, решение, цикл, вывод (редактор блок-схем алгоритмов);</li>

      <li>элементы И, ИЛИ, НЕ, ИЛИ-НЕ, И-НЕ (построитель цифровых схем).</li>
    </ul>
  </n-alert>
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
