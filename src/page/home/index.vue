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
          <div class="br" v-show="canvas && canvas.getActiveObject()"></div>
          <div class="item" v-show="canvas && canvas.getActiveObject()" @click="del">
            <span>删除</span>
            <span>Delete</span>
          </div>
          <div class="br"></div>
          <div class="item" @click="selectAll">
            <span>全选</span>
            <span>Ctrl + A</span>
          </div>
        </span>

        <Operation @cav-zoom="cavZoom" />

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
let joinMaxWidth: number = 100; // 插入元素最大宽度
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
  window.addEventListener(
    "keydown",
    (event) => {
      if (event.ctrlKey && event.code == "KeyC") {
        copy();
      }
      if (event.ctrlKey && event.code == "KeyV") {
        parse();
      }
      if (event.ctrlKey && event.code == "KeyA") {
        selectAll();
      }
      if (event.code == "Backspace") {
        del();
      }
    },
    true
  );

  document.onmousemove = function (e) {
    let evt = e || (window.event as any);
    evtToCavX = evt.pageX - cavBox.value.offsetLeft;
    evtToCavY = evt.pageY - cavBox.value.offsetParent.offsetTop;
  };
};

//  右键菜单显示
const rmenuShow = () => {
  if (!canvas.getActiveObject()) {
    var obj = canvas.getObjects();
    obj.forEach((item) => {
      if (item.containsPoint(new fabric.Point(evtToCavX, evtToCavY))) {
        canvas.setActiveObject(item);
      }
    });
    canvas.renderAll();
  }

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
        left: evtToCavX < 10 ? 10 : evtToCavX - 10,
        top: evtToCavY < 10 ? 10 : evtToCavY - 10,
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
  let activeObj = canvas.getActiveObjects();
  activeObj.forEach((obj) => {
    obj.group.set("cornerColor", "#fff");
    obj.group.set("cornerStrokeColor", "#fff");
    obj.group.set("borderColor", "#fff");
    obj.group.set("selectionBackgroundColor", "#fff");
    canvas.remove(obj);
  });
  canvas.renderAll();
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
    joinCopy(imgInstance);
  };
};

// 插入立刻复制
const joinCopy = (obj) => {
  canvas.setActiveObject(obj);
  copy();
};

// 画布缩放
const cavZoom = (type, withEvt = false) => {
  let x = cavBox.value.offsetWidth / 2;
  let y = cavBox.value.offsetHeight / 2;
  if (withEvt) {
    x = evtToCavX;
    y = evtToCavY;
  }
  var zoomPoint = new fabric.Point(x, y);
  canvas.zoomToPoint(zoomPoint, canvas.getZoom() + (type == "big" ? 0.1 : -0.1));
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
      .br {
        height: 2px;
        background: #ededed;
        margin: 4px 0;
      }
    }
  }
}
</style>
