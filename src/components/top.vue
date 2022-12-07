<template>
  <div class="top">
    <div class="content">
      <span class="logo">LOGO</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.top {
  height: 10vh;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .content {
    .logo {
      font-size: 40px;
      font-weight: bolder;
      border-right: 1px solid #ccc;
      padding: 0 20px;
    }
  }
}
</style>
