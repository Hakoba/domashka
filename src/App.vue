<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {ruRU} from "naive-ui";
import TheFirst from "./Tasks/1/TheFirst.vue";
import AbstractSuperClass from "./Tasks/2/AbstractSuperClass.vue";


</script>

<template>

  <n-config-provider :locale="ruRU">
    <n-space vertical size="large">
      <n-layout>
        <n-layout-header
          >Современные технологии разработки программного
          обеспечения</n-layout-header
        >
        <n-layout-content content-style="padding: 24px;">
          <n-notification-provider>
            <abstract-super-class></abstract-super-class>
<!--            <TheFirst  />-->
          </n-notification-provider>
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
