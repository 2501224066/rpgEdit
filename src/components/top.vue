<template>
  <div class="top">
    <div class="logo">
      <div>
        <img src="/@/assets/imgs/logo.jpg" />
        MEMO
      </div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.top {
  height: 60px;
  border-bottom: 1px solid #e5e5e5;
  justify-content: center;
  display: flex;
  align-items: center;
  .logo {
    width: 200px;
    height: 100%;
    font-size: 34px;
    font-weight: bolder;
    border-right: 1px solid #ccc;
    padding: 0 20px;
    background: #efefef;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      img {
        width: 36px;
        margin-right: 10px;
      }
    }
  }
  .content {
    flex: 1;
  }
}
</style>
