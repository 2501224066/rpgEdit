<template>
  <div class="operation">
    <div class="item active">
      <img src="/@/assets/hand.png" />
    </div>

    <div class="footer">
      <span class="zoom" @click="(zoom -= 10), emit('cavZoom', 'samll')">-</span>
      <span class="size">{{ zoom }}%</span>
      <span class="zoom" @click="(zoom += 10), emit('cavZoom', 'big')">+</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["cavZoom"]);
let zoom = ref(100);
</script>

<style lang="less" scoped>
.operation {
  position: absolute;
  left: 20px;
  top: 20vh;
  width: 50px;
  height: 50vh;
  background: #fff;
  border-radius: 4px;
  box-shadow: rgb(209 209 209) 0px 0px 3px 1px;
  padding: 10px 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  .item {
    padding: 4px 10px;
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .active {
    background: #d6dade;
    border-radius: 4px;
  }

  .footer {
    position: fixed;
    right: 20px;
    bottom: 40px;
    background: #fff;
    border-radius: 4px;
    box-shadow: rgb(209 209 209) 0px 0px 3px 1px;
    padding: 4px;
    .zoom {
      display: inline-block;
      padding: 4px 16px;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background: #d6dade;
      }
    }
    .size {
      display: inline-block;
      width: 50px;
      text-align: center;
    }
  }
}
</style>
