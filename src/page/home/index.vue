<template>
  <div class="home">
    <Top />
    <div class="content">
      <Source @join-img="joinImg" />

      <div class="edit" id="cavBox">
        <Operation />

        <canvas id="cav"></canvas>
      </div>

      <Level />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Top from "/@/components/top.vue";
import Level from "./components/level.vue";
import Source from "./components/source.vue";

import Operation from "./components/operation.vue";
import { fabric } from "fabric";
import { CanvasHTMLAttributes, onMounted } from "vue";

let cavWidth = 0; // 画布宽
let cavHeight = 0; // 画布高
const joinMaxWidth = 200; // 插入元素最大宽度
let canvas = null; // 画布

onMounted(() => {
  createCanvas();
});

// 选中操作框样式
const addOpStyle = (obj: Object) => {
  return Object.assign(obj, {
    cornerColor: "#fff",
    cornerStrokeColor: "#ceecff",
    borderColor: "#5ecedb",
    cornerSize: 16,
    padding: 2,
    cornerStyle: "circle",
    selectionBackgroundColor: "rgba(170, 200, 230, 0.1)",
  });
};

// 创建画布
const createCanvas = () => {
  const cavBox = document.querySelector("#cavBox") as HTMLDivElement;
  cavWidth = cavBox.offsetWidth;
  cavHeight = cavBox.offsetHeight;

  const cav = document.querySelector("#cav") as CanvasHTMLAttributes;
  cav.width = cavWidth;
  cav.height = cavHeight;

  canvas = new fabric.Canvas("cav", {
    selectionBorderColor: "#bbdff4",
    selectionColor: "rgba(189, 224, 244, 0.7)",
    backgroundColor: "#fff",
  });
};

// 插入图片
const joinImg = (imgBase64: string) => {
  var imgDom = new Image();
  imgDom.src = imgBase64;
  imgDom.onload = () => {
    const needScale = imgDom.width > joinMaxWidth;
    var imgInstance = new fabric.Image(
      imgDom,
      addOpStyle({
        left: (cavWidth - (needScale ? joinMaxWidth : imgDom.width)) / 2,
        top: (cavHeight - (needScale ? imgDom.height * (joinMaxWidth / imgDom.width) : imgDom.height)) / 2,
        scaleX: needScale ? joinMaxWidth / imgDom.width : 1,
        scaleY: needScale ? joinMaxWidth / imgDom.width : 1,
        transparentCorners: false,
      })
    );
    canvas.add(imgInstance);
  };
};
</script>

<style lang="less" scoped>
.home {
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .edit {
      flex: 1;
      height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: auto;
      background: #f6f9f9;
      position: relative;
    }
  }
}
</style>
