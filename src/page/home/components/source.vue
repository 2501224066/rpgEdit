<template>
  <div class="source">
    <div class="item">
      <div class="title">
        <span @click="flowShow = !flowShow">
          <el-icon color="#999" v-show="!flowShow"><CaretRight /></el-icon>
          <el-icon color="#999" v-show="flowShow"><CaretBottom /></el-icon>
          流程图
        </span>

        <span></span>
      </div>

      <div class="content" v-show="flowShow">
        <div
          class="item"
          v-for="(item, index) in flowJoinData"
          :key="index"
          @click="emit('joinTx', flowJoinData[index])"
        >
          {{ index }}
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">
        <span @click="imgsShow = !imgsShow">
          <el-icon color="#999" v-show="!imgsShow"><CaretRight /></el-icon>
          <el-icon color="#999" v-show="imgsShow"><CaretBottom /></el-icon>
          素材库
        </span>

        <el-upload :show-file-list="false" class="upload-demo" multiple :before-upload="beforeUpload">
          <span class="add">
            <el-icon size="14"><Upload /></el-icon>
            <span style="margin-left: 4px">上传</span>
          </span>
        </el-upload>
      </div>

      <div class="content" v-show="imgsShow">
        <div class="item" @click="emit('joinImg', '/@/assets/imgs/logo.jpg')">
          <img src="/@/assets/imgs/logo.jpg" />
        </div>
        <div class="item" v-for="(item, index) in fileList" :key="index" @click="emit('joinImg', item)">
          <img :src="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue";
import { flowJoinData } from "../../../utils/txData";

const emit = defineEmits(["joinImg", "joinTx"]);

const fileList: Ref = ref([]);
const imgsShow: Ref = ref(true);

const flowShow: Ref = ref(true);

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
  background: #fdfdfd;
  border-right: 1px solid #e5e5e5;
  position: relative;
  width: 300px;
  height: 100%;
  .item {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #e5e5e5;
      &:active {
        background: #dbf2fa;
      }
      &:hover {
        background: #eee;
      }
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
      background: #f7f7f7;
      border-bottom: 1px solid #e5e5e5;
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
}
</style>
