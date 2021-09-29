<script setup lang="ts" >
import { ref, computed, reactive } from "vue";
import {Controller, Procent} from "./index";
import {useNotification} from "naive-ui";
type tip = {
  name: string;
  totalPrice?: number
}

// const overPrice = computed(new Controller('SO big',4))
const notification = useNotification()
const tips = computed<tip[]>(()=>{
  return [
      {
    name: 'Большие',
    percent: 15,
    totalPrice: Procent.countSumTrunc(price.value,15)
  },
    {
      name: 'Средние',
      percent: 9,
      totalPrice: Procent.countSumTrunc(price.value,9)
    },
    {
      name: 'Мелочь',
      percent: 3,
      totalPrice: Procent.countSumTrunc(price.value,3)
    },
  ]

})
const price = ref<null | number>(null);
const payBill = (billWithTip: number): void =>{
  notification.success({
    title: 'Успешно оплачено',
    content: `Оплачено: ${billWithTip.toLocaleString()} руб.
    `,
    duration: 4000,
  })
}
</script>

<template>
  <n-alert title="Задание № 1" type="info">
    Проблема. Получая чек в ресторане, Вы хотите дать "правильные" чаевые в
    зависимости от Вашего настроения - большие 15%, обычные 10-9% или "мелочь"
    3%
    <br />
    Требуется написать программу, которая в зависимости от введенной итоговой
    суммы чека вычисляет, сколько Вы должны заплатить с учетом чаевых. (Чаевые
    зависят от настроения)
  </n-alert>
  <br />
  <n-card class="card"  title="Сумма в чеке:">
    <n-input-number placeholder="Введите сумму" v-model:value="price" clearable />
  </n-card>
  <h4>
    Оплата
  </h4>
  <n-card v-for="tip in tips" hoverable class="card" :key="tip.name" :title="`Чаевые: (${tip.name})`" >

    <div class="card__content">
        <n-button class="card__button" :disabled="!price" @click="payBill(tip.totalPrice)" type="primary">Заплатить  </n-button>
        <p class="card__total-price">Расчет: {{tip.totalPrice.toLocaleString()}} руб.</p>
    </div>
  </n-card>
</template>

<style scoped lang="scss">
.card + .card{
  margin-top: 2em;
}
.card{
  &__content{
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
  &__button {
    //flex: 1 2 auto;
  }
}
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