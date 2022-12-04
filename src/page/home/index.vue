<template>
  <div class="home">
    <Top />
    <div class="content">
      <Operation />
      <Edit />
      <Level />
      <Source />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Top from "./components/top.vue";
import Edit from "./components/edit.vue";
import Level from "./components/level.vue";
import Operation from "./components/operation.vue";
import Source from "./components/source.vue";
</script>

<style lang="less" scoped>
.home {
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
