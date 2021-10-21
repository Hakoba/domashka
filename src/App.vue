<script lang="ts">
import Factory from "./Tasks/3/Factory.vue";
import TheFirst from "./Tasks/1/TheFirst.vue";
import AbstractSuperClass from "./Tasks/2/AbstractSuperClass.vue";
import {defineComponent} from "vue";
export default defineComponent( {
  components: {
    Factory,
    TheFirst,
    AbstractSuperClass
  }
})
</script>
<script setup lang="ts">
import {ruRU} from "naive-ui";

import {ref} from "vue";
const labs = [
  'the-first','abstract-super-class','factory'
]
const currentLab = ref<string>('the-first')

</script>

<template>

  <n-config-provider :locale="ruRU">
    <n-space vertical size="large">
      <n-layout>

        <n-layout-header style="display: flex"
          ><span>Современные технологии разработки программного
          обеспечения</span>
          <n-radio-group v-model:value="currentLab" name="radiobuttongroup1">
            <n-radio-button
                v-for="lab in labs"
                :key="lab"
                :value="lab"
            >
              {{ lab }}
            </n-radio-button>
          </n-radio-group>
        </n-layout-header
        >

        <n-layout-content content-style="padding: 24px;">
          <n-notification-provider>
            <component :is="currentLab" />

          </n-notification-provider>
          <n-list bordered>
            <template #header> Лабы </template>
            <n-list-item>

              <n-thing >




              </n-thing>
            </n-list-item>
          </n-list>

        </n-layout-content>
      </n-layout>
    </n-space>
  </n-config-provider>
</template>

<style>
.n-layout-header,
.n-layout-footer {
  padding: 24px;
}

.n-layout-content {
}
</style>
