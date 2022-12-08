<template>
  <div class="operation">
    <div class="left">
      <div class="item">
        <img src="/@/assets/hand.png" />
      </div>
      <div class="item" @click="emit('joinText')">
        <img src="/@/assets/text.png" />
      </div>
    </div>

    <div class="top" v-show="topShow">
      <el-select
        v-model="fontFamily"
        style="width: 160px"
        placeholder="Select"
        @change="(val) => emit('setStyle', { fontFamily: val })"
      >
        <el-option v-for="(item, index) in fontFamilyList" :key="index" :label="item" :value="item" />
      </el-select>
      <el-select
        v-model="fontSize"
        style="width: 60px; margin-left: 20px"
        placeholder="Select"
        @change="(val) => emit('setStyle', { fontSize: val })"
      >
        <el-option v-for="(item, index) in fontSizeList" :key="index" :label="item" :value="item" />
      </el-select>
    </div>

    <div class="footer">
      <span class="zoom" @click="(zoom -= 10), emit('cavZoom', 'samll')">-</span>
      <span class="size">{{ zoom }}%</span>
      <span class="zoom" @click="(zoom += 10), emit('cavZoom', 'big')">+</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, watch } from "vue";
const props = defineProps({
  topShow: Boolean,
  canvas: Object,
});
const emit = defineEmits(["cavZoom", "joinText", "setStyle"]);
const zoom = ref(100);
const fontFamily = ref("Comic Sans");
const fontFamilyList = [
  "Arial",
  "Comic Sans",
  "fangsong",
  "Georgia",
  "Helvetica",
  "Hiragino Sans GB",
  "Microsoft YaHei",
  "PingFang SC",
  "San Francisco",
  "Segoe UI	",
  "Tahoma",
  "WenQuanYi Micro Hei",
  "宋体",
];
const fontSize = ref(20);
const fontSizeList = [12, 14, 16, 18, 20, 24, 32, 48, 64];

watch(
  () => props.topShow,
  (val, oldVal) => {
    if (val) getTopData();
  }
);

// 获取顶部菜单数据
const getTopData = () => {
  props.canvas.getActiveObjects().forEach((item) => {
    fontFamily.value = item.fontFamily || "Comic Sans";
    fontSize.value = item.fontSize || 20;
  });
};
</script>

<style lang="less" scoped>
.operation {
  z-index: 1;
  .left {
    position: absolute;
    left: 20px;
    top: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    background: #fff;
    border-radius: 4px;
    box-shadow: rgb(209 209 209) 0px 0px 3px 1px;
    padding: 10px 4px;
    .item {
      padding: 4px 10px;
      margin: 4px 0;
      border-radius: 4px;
      cursor: pointer;
      &:active {
        opacity: 0.4;
      }
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

  .top {
    position: absolute;
    left: 20px;
    top: 20px;
    background-color: #fafbfc;
    border: 1px solid #e8e8e8;
    padding: 8px;
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
      &:active {
        color: #999;
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
