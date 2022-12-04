<template>
  <div class="edit">
    <canvas class="cvs"></canvas>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.edit {
  flex: 1;
  height: 90vh;
  background: #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;

  .cvs {
    width: 200px;
    height: 400px;
    background: #fff;
  }
}
</style>
