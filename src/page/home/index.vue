<template>
  <div class="home">
    <Top />

    <div class="content" @click="rmenuHid">
      <Source @join-img="joinImg" />

      <div class="edit" ref="cavBox" @contextmenu.prevent="rmenuShow">
        <span ref="rmenu" class="rmenu" v-show="rmenuShowStatus">
          <div class="item" @click="copy">
            <span>复制</span>
            <span>Ctrl + C</span>
          </div>
          <div class="item" @click="parse">
            <span>粘贴</span>
            <span>Ctrl + </span>
          </div>
          <div class="item" v-show="canvas && canvas.getActiveObject()" @click="del">
            <span>删除</span>
            <span>Delete</span>
          </div>
          <div class="item" @click="selectAll">
            <span>全选</span>
            <span>Ctrl + A</span>
          </div>
        </span>

        <Operation />

        <canvas ref="cav" id="cav"></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Top from "/@/components/top.vue";
import Source from "./components/source.vue";
import Operation from "./components/operation.vue";
import { fabric } from "fabric";
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

let cavWidth: number = 0; // 画布宽
let cavHeight: number = 0; // 画布高
let joinMaxWidth: number = 200; // 插入元素最大宽度
let canvas: any = null; // 画布
let rmenuShowStatus = ref(false);
let clipboard: any = null; // 画布
let evtToCavX: number = 0; // 鼠标相对画布位置
let evtToCavY: number = 0; // 鼠标相对画布位置

let rmenu = ref(null);
let cavBox = ref(null);
let cav = ref(null);

onMounted(() => {
  init();
  createCanvas();
});

// 初始化
const init = () => {
  document.onkeydown = function (event) {
    if (event.ctrlKey && event.keyCode == 67) {
      copy();
    }
    if (event.ctrlKey && event.keyCode == 86) {
      parse();
    }
    if (event.ctrlKey && event.keyCode == 65) {
      selectAll();
    }
    if (event.keyCode == 45) {
      del();
    }
  };
  document.onmousemove = function (e) {
    let evt = e || (window.event as any);
    evtToCavX = evt.pageX - cavBox.value.offsetLeft;
    evtToCavY = evt.pageY - cavBox.value.offsetParent.offsetTop;
  };
};

//  右键菜单显示
const rmenuShow = () => {
  rmenuShowStatus.value = true;
  rmenu.value.style.left = evtToCavX + "px";
  rmenu.value.style.top = evtToCavY + "px";
  if (evtToCavX + rmenu.value.offsetWidth > cav.value.offsetWidth) {
    rmenu.value.style.left = evtToCavX - rmenu.value.offsetWidth + "px";
  }
  if (evtToCavY + rmenu.value.offsetHeight > cav.value.offsetHeight) {
    rmenu.value.style.top = evtToCavX - rmenu.value.offsetHeight + "px";
  }
};

// 右键菜单隐藏
const rmenuHid = () => {
  rmenuShowStatus.value = false;
};

// 全选
const selectAll = () => {
  let g = new fabric.Group(canvas.getObjects());
  canvas.clear();
  canvas.add(g);
  canvas.setActiveObject(g);
  canvas.getActiveObject().toActiveSelection();
  canvas.renderAll();
};

// 粘贴
const parse = () => {
  if (!clipboard) {
    return;
  }
  canvas.setActiveObject(clipboard);
  canvas.getActiveObject().clone((cloned) => {
    clipboard.clone(function (clonedObj) {
      canvas.discardActiveObject();
      clonedObj.set({
        left: evtToCavX < 0 ? 0 : evtToCavX,
        top: evtToCavY < 0 ? 0 : evtToCavY,
        evented: true,
      });
      if (clonedObj.type === "activeSelection") {
        clonedObj.canvas = canvas;
        clonedObj.forEachObject(function (obj) {
          canvas.add(obj);
        });
        clonedObj.setCoords();
      } else {
        canvas.add(clonedObj);
      }
      canvas.setActiveObject(clonedObj);
      canvas.requestRenderAll();
    });
  });
};

// 复制
const copy = () => {
  if (!canvas.getActiveObject()) {
    ElMessage({
      message: "请选择元素",
      type: "error",
    });
    return;
  }
  canvas.getActiveObject().clone(function (cloned) {
    clipboard = cloned;
  });
};

// 删除
const del = () => {
  canvas.getActiveObjects().forEach((obj) => {
    canvas.remove(obj);
  });
};

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
  cavWidth = cavBox.value.offsetWidth;
  cavHeight = cavBox.value.offsetHeight;

  cav.value.width = cavBox.value.offsetWidth;
  cav.value.height = cavBox.value.offsetHeight;

  canvas = new fabric.Canvas("cav", {
    selectionBorderColor: "#bbdff4",
    selectionColor: "rgba(189, 224, 244, 0.7)",
    fireRightClick: true,
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
    position: relative;
    .edit {
      flex: 1;
      height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: auto;
      position: relative;
    }
    .rmenu {
      position: absolute;
      display: inline-block;
      left: 0;
      top: 0;
      width: 240px;
      background: #fff;
      border-radius: 4px;
      box-shadow: rgb(209 209 209) 0px 0px 3px 1px;
      z-index: 1;
      padding: 4px;
      .item {
        padding: 4px 10px 4px 20px;
        display: flex;
        justify-content: space-between;
        &:hover {
          background: #58b4ec;
          color: #fff;
          :nth-child(2) {
            color: #fff;
          }
        }
        :nth-child(2) {
          color: #ccc;
        }
      }
    }
  }
}
</style>
