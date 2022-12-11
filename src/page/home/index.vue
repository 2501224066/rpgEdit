<template>
  <div class="home">
    <Top />
    <div class="content" @click="rmenuHid">
      <Source @join-img="joinImg" />

      <div class="edit">
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

        <Operation
          :has-active-obj="hasActiveObj"
          :canvas="canvas"
          :default-style="defaultStyle"
          @cav-zoom="cavZoom"
          @join-text="joinText"
          @set-style="setStyle"
          @join-tx="joinTx"
        />

        <div class="box" ref="cavBox" @contextmenu.prevent="rmenuShow">
          <canvas ref="cav" id="cav"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Top from "/@/components/top.vue";
import Source from "./components/source.vue";
import Operation from "./components/operation.vue";
import { fabric } from "fabric";
import { nextTick, onMounted, Ref, ref } from "vue";
import { ElMessage } from "element-plus";
import { copyPath } from "/@/utils/index";

let cavWidth: number = 0; // 画布宽
let cavHeight: number = 0; // 画布高
let evtToCavX: number = 0; // 鼠标相对画布位置
let evtToCavY: number = 0; // 鼠标相对画布位置
let canvas: any = null; // 画布
let clipboard: any = null; // 复制内容

const joinMaxWidth: number = 100; // 插入元素最大宽度
const rmenuShowStatus: Ref = ref(false); // 右键菜单是否显示
const hasActiveObj: Ref = ref(false); // 当前是否有选中
const rmenu: Ref = ref(null); // 右键菜单 Dom
const cavBox: Ref = ref(null); // canvas容器 Dom
const cav: Ref = ref(null); // canvas Dom
const defaultStyle: Object = {
  fontFamily: "Comic Sans",
  fontSize: 20,
  fill: "#222222",
  backgroundColor: "rgba(250,250,250,0)",
}; // 默认元素样式

onMounted(() => {
  init();
  createCanvas();
});

// 初始化
const init = () => {
  // 键盘敲击
  window.addEventListener(
    "keydown",
    (event) => {
      let key = event.ctrlKey;
      if (navigator.userAgent.indexOf("Mac OS X") !== -1) {
        key = event.metaKey;
      }
      if (key && event.code == "KeyC") {
        copy();
      }
      if (key && event.code == "KeyV") {
        parse();
      }
      if (key && event.code == "KeyA") {
        selectAll();
      }
      if (event.code == "Backspace") {
        if (canvas.getActiveObject() && canvas.getActiveObject().isEditing) return;
        del();
      }
    },
    true
  );

  // 鼠标点击
  window.addEventListener("click", () => {
    hasActiveObj.value = false;
    nextTick(() => {
      if (canvas.getActiveObject()) hasActiveObj.value = true;
    });
  });

  // 鼠标移动位置
  document.onmousemove = function (e) {
    let evt = e || (window.event as any);
    const r = cav.value.getBoundingClientRect();
    evtToCavX = evt.pageX - r.left;
    evtToCavY = evt.pageY - r.top;
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
  canvas.discardActiveObject();
  let sel = new fabric.ActiveSelection(canvas.getObjects(), { canvas: canvas });
  canvas.setActiveObject(sel);
  canvas.requestRenderAll();
  hasActiveObj.value = true;
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
        left: evtToCavX, //< 10 ? 10 : evtToCavX - 10,
        top: evtToCavY, //< 10 ? 10 : evtToCavY - 10,
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
    canvas.remove(obj);
  });
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

// 初始化 fabric.Object
const initStyle = () => {
  fabric.Object.prototype.cornerColor = "#fff";
  fabric.Object.prototype.cornerStrokeColor = "#ceecff";
  fabric.Object.prototype.borderColor = "#5ecedb";
  fabric.Object.prototype.cornerSize = 12;
  fabric.Object.prototype.padding = 2;
  fabric.Object.prototype.cornerStyle = "circle";
  fabric.Object.prototype.selectionBackgroundColor = "rgba(170, 200, 230, 0.1)";
  fabric.Object.prototype.fill = "#fff";
  fabric.Object.prototype.stroke = "#000";
};

// 创建画布
const createCanvas = () => {
  cavWidth = cavBox.value.offsetWidth;
  cavHeight = cavBox.value.offsetHeight;

  cav.value.width = cavBox.value.offsetWidth;
  cav.value.height = cavBox.value.offsetHeight;
  initStyle();
  canvas = new fabric.Canvas("cav", {
    selectionBorderColor: "#bbdff4",
    selectionColor: "rgba(189, 224, 244, 0.7)",
    fireRightClick: true,
    backgroundVpt: false,
  });

  addBackImg();
};

// 添加背景图
const addBackImg = () => {
  canvas.setBackgroundColor(
    {
      source: "/@/assets/imgs/bg.jpg",
      repeat: "repeat",
    },
    canvas.renderAll.bind(canvas)
  );
};

// 插入图形
const joinTx = (data: any) => {
  const regin = getRegin();

  const join = (item) => {
    const type = item[0];
    const params = item[1];
    const region = getRegin();
    const joinObj = new fabric[type](
      typeof params == "string"
        ? pathSetRegin(params, regin)
        : Object.assign(params, {
            left: region[0],
            top: region[1],
          })
    );
    if (item[2]) {
      joinObj.set(item[2]);
    }
    return joinObj;
  };

  if (typeof data[0] != "string") {
    const arr = [];
    data.forEach((item) => {
      arr.push(join(item));
    });
    const group = new fabric.Group(arr, { canvas: canvas });
    canvas.add(group);
    joinCopy(group);
  } else {
    typeof data[1] == "string" && copyPath(data[1]);
    const res = join(data);
    canvas.add(res);
    joinCopy(res);
  }
};

// 随机绘图区域计算
const getRegin = (): number[] => {
  return [
    cavWidth / 4 + +Math.random().toFixed(2) * (cavWidth / 2),
    cavHeight / 4 + +Math.random().toFixed(2) * (cavHeight / 2),
  ];
};

// path 路径改写
const pathSetRegin = (str: string, regin: number[] = null): string => {
  const arr = str.split(" ");
  if (!regin) regin = getRegin();
  const res = arr
    .reduce((init, val) => {
      if (val.includes("rX")) val = eval(val.replace("rX", regin[0].toString())).toFixed(2);
      if (val.includes("rY")) val = eval(val.replace("rY", regin[1].toString())).toFixed(2);
      init.push(val);
      return init;
    }, [])
    .join(" ");
  return res;
};

// 插入图片
const joinImg = (imgBase64: string) => {
  let imgDom = new Image();
  imgDom.src = imgBase64;
  imgDom.onload = () => {
    const needScale = imgDom.width > joinMaxWidth;
    let joinObj = new fabric.Image(imgDom, {
      left: (cavWidth - (needScale ? joinMaxWidth : imgDom.width)) / 2,
      top: (cavHeight - (needScale ? imgDom.height * (joinMaxWidth / imgDom.width) : imgDom.height)) / 2,
      scaleX: needScale ? joinMaxWidth / imgDom.width : 1,
      scaleY: needScale ? joinMaxWidth / imgDom.width : 1,
    });
    canvas.add(joinObj);
    joinCopy(joinObj);
  };
};

// 插入文字
const joinText = () => {
  let joinObj = new fabric.Textbox(
    "Welcome",
    Object.assign(
      {
        left: cavWidth / 2 - 45,
        top: cavHeight / 2,
        width: 90,
        splitByGrapheme: true,
      },
      defaultStyle
    )
  );
  joinObj.setControlVisible("mt", false);
  joinObj.setControlVisible("mb", false);
  joinObj.setControlVisible("bl", false);
  joinObj.setControlVisible("br", false);
  joinObj.setControlVisible("tl", false);
  joinObj.setControlVisible("tr", false);
  canvas.add(joinObj);
  joinCopy(joinObj);
};

// 设置样式
const setStyle = (obj) => {
  canvas.getActiveObjects().forEach((item) => {
    for (let k in obj) {
      item.set(k, obj[k]);
    }
  });
  canvas.renderAll();
};

// 插入立刻复制并选中
const joinCopy = (obj) => {
  canvas.setActiveObject(obj);
  hasActiveObj.value = true;
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
      padding: 10px;
      box-sizing: border-box;
      background: #efefef;
      .box {
        width: 100%;
        height: 100%;
        border: 1px solid #ddd;
      }
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
