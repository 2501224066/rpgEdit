<template>
  <Home />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Home from "/@/page/home/index.vue";

onMounted(() => {
  // 禁止选中文字
  window.addEventListener("selectstart", function (e) {
    e.preventDefault();
  });
});
</script>
