<template>
  <div class="source">
    <div class="title">
      <span>素材库</span>

      <el-upload :show-file-list="false" class="upload-demo" multiple :before-upload="beforeUpload">
        <span class="add">
          <el-icon size="14"><Upload /></el-icon>
          <span style="margin-left: 4px">上传</span>
        </span>
      </el-upload>
    </div>

    <div class="content">
      <div class="item" @click="emit('joinImg', '/@/assets/logo.png')">
        <img src="/@/assets/logo.png" />
      </div>
      <div class="item" v-for="(item, index) in fileList" :key="index" @click="emit('joinImg', item)">
        <img :src="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(["joinImg"]);

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
  background: #f7f7f7;
  border-right: 1px solid #e5e5e5;
  .title {
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .add {
      display: flex;
      align-items: center;
      background: #fff;
      border: 1px solid #e5e5e5;
      padding: 2px 6px;
      font-size: 12px;
      color: #666;
      border-radius: 4px;
    }
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    overflow: auto;
    .item {
      width: 50px;
      height: 50px;
      border: 1px solid #e5e5e5;
      background: #fff;
      margin: 5px;
      overflow: hidden;
      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
    }
  }
}
</style>
