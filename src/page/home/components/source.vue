<template>
  <div class="source">
    <div class="item">
      <div class="title" @click="flowShow = !flowShow">
        <span>
          <el-icon color="#999" v-show="!flowShow"><CaretRight /></el-icon>
          <el-icon color="#999" v-show="flowShow"><CaretBottom /></el-icon>
          流程图
        </span>
      </div>

      <div class="content" v-show="flowShow">
        <div
          class="item flow"
          v-for="(item, index) in flowJoinData"
          :key="index"
          @click="emit('joinTx', flowJoinData[index])"
        >
          <img :src="'/@/assets/imgs/img' + index + '.png'" />
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title" @click="imgsShow = !imgsShow">
        <span>
          <el-icon color="#999" v-show="!imgsShow"><CaretRight /></el-icon>
          <el-icon color="#999" v-show="imgsShow"><CaretBottom /></el-icon>
          素材库
        </span>
      </div>

      <div class="content" v-show="imgsShow">
        <el-upload :show-file-list="false" class="upload-demo" multiple :before-upload="beforeUpload">
          <div class="item">
            <img src="/@/assets/imgs/addImg.png" style="width: 20px; height: 20px" />
          </div>
        </el-upload>
        <div class="item" v-for="(item, index) in fileList" :key="index" @click="emit('joinImg', item)">
          <img :src="item" />
        </div>
        <div class="item" @click="emit('joinImg', '/@/assets/imgs/logo.jpg')">
          <img src="/@/assets/imgs/logo.jpg" />
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
      position: relative;
      border-bottom: 1px solid #e5e5e5;
      &:active {
        background: #dbf2fa !important;
      }
      &:hover {
        background: #eee;
      }
      & > span {
        display: inline-block;
        padding: 10px;
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
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        margin: 5px;
        width: 50px;
        height: 50px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          object-fit: cover;
        }
      }

      .flow {
        border: none;
        width: 36px;
        height: 36px;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
