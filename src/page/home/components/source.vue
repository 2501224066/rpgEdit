<template>
  <div class="source">
    <div class="title">
      <span>素材库</span>

      <el-upload
        :show-file-list="false"
        class="upload-demo"
        multiple
        :limit="3"
        :before-upload="beforeUpload"
      >
        <span class="add">
          <el-icon size="20"><Upload /></el-icon>
          <span>上传</span>
        </span>
      </el-upload>
    </div>

    <div class="content">
      <div class="item" v-for="(item, index) in fileList" :key="index">
        <img :src="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const fileList = ref<any[]>([]);

const beforeUpload = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const res = reader.result;
    fileList.value.unshift(res);
  };
  return false;
};
</script>

<style lang="less" scoped>
.source {
  width: 300px;
  height: 90vh;
  .title {
    background: rgb(5, 109, 232);
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .add {
      display: flex;
      align-items: center;
      background: #fff;
      padding: 2px 6px;
      font-size: 12px;
      color: #222;
      border-radius: 4px;
    }
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    overflow: auto;
    .item {
      width: 80px;
      height: 80px;
      background: #f6f6f6;
      border-radius: 6px;
      margin: 5px;
      overflow: hidden;
      img {
        width: 80px;
        height: 80px;
        object-fit: contain;
      }
    }
  }
}
</style>
