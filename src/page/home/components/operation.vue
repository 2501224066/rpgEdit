<template>
  <div class="operation">
    <div class="item active">
      <img src="/@/assets/hand.png" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
    img {
      width: 20px;
      height: 20px;
    }
  }
  .active {
    background: #d6dade;
    border-radius: 4px;
  }
}
</style>
