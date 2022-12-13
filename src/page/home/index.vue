<template>
  <div class="home">
    <Top />
    <div class="content" @click="rmenuHid">
      <Source @join-img="joinImg" @join-tx="joinTx" />

      <div class="edit">
        <Operation
          :has-active-obj="hasActiveObj"
          :canvas="canvas"
          :default-style="defaultStyle"
          :history="history"
          :zoom="zoom"
          @set-zoom="setZoom"
          @join-text="joinText"
          @set-style="setStyle"
          @join-tx="joinTx"
          @set-pen="setPen"
          @set-history="setHistory"
        />

        <div class="box" ref="cavBox" @contextmenu.prevent="rmenuShow">
          <span ref="rmenu" class="rmenu" v-show="rmenuShowStatus">
            <div class="item" @click="cancel">
              <span>取消</span>
              <span>Esc</span>
            </div>
            <div class="item" @click="copy">
              <span>复制</span>
              <span>Ctrl + C</span>
            </div>
            <div class="item" @click="parse">
              <span>粘贴</span>
              <span>Ctrl + V</span>
            </div>
            <div class="item" v-show="canvas && canvas.getActiveObjects().length > 1" @click="merge">
              <span>合并</span>
              <span>Ctrl + E</span>
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
import util from "/@/utils/index";

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
const defaultStyle: object = {
  fontFamily: "Comic Sans",
  fontSize: 20,
  fill: "#222222",
  backgroundColor: "rgba(250,250,250,0)",
}; // 默认元素样式
const history: Ref = ref({ record: true, before: [], after: [] }); // 历史记录
const zoom: Ref = ref(100); // 缩放比

onMounted(() => {
  init();
  createCanvas();
});

// 初始化
const init = () => {
  // 界面变化
  window.onresize = () => {
    canvas.setWidth(cavBox.value.offsetWidth);
    canvas.setHeight(cavBox.value.offsetHeight);
  };

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
      if (key && event.code == "KeyE") {
        merge();
      }
      if (key && event.shiftKey && event.code == "KeyZ") {
        setHistory("after");
      }
      if (key && !event.shiftKey && event.code == "KeyZ") {
        setHistory("before");
      }
      if (event.code == "Backspace" || event.code == "Delete") {
        if (canvas.getActiveObject() && canvas.getActiveObject().isEditing) return;
        del();
      }
      if (event.code == "Escape") {
        cancel();
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
};

// 右键菜单显示
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
  rmenu.value.style.left = "-1000px";
  rmenu.value.style.top = "-1000px";
  nextTick(() => {
    let left = +evtToCavX + "px";
    let top = +evtToCavY + "px";
    if (evtToCavX + rmenu.value.offsetWidth > cav.value.offsetWidth) {
      left = evtToCavX - rmenu.value.offsetWidth + "px";
    }
    if (evtToCavY + rmenu.value.offsetHeight > cav.value.offsetHeight) {
      top = evtToCavY - rmenu.value.offsetHeight + "px";
    }
    rmenu.value.style.left = left;
    rmenu.value.style.top = top;
  });
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
        left: evtToCavX,
        top: evtToCavY,
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

  historySaveAction();
  canvas.on({
    "object:added": historySaveAction,
    "object:removed": historySaveAction,
    "object:modified": historySaveAction,
    "object:rotated": historySaveAction,
    "object:scaled": historySaveAction,
    "mouse:move": getCavMove,
  });
};

const getCavMove = (event) => {
  var pointer = canvas.getPointer(event);
  evtToCavX = pointer.x;
  evtToCavY = pointer.y;
};

// 保存历史记录
const historySaveAction = () => {
  if (!history.value.record) return;
  history.value.after = [];
  history.value.before.push(canvas.toDatalessJSON());
};

// 撤销/回退
const setHistory = (type) => {
  if (type == "before" && history.value.before.length == 1) return;
  if (type == "after" && history.value.after.length == 0) return;

  history.value.record = false;
  let data = null;
  if (type == "before") {
    history.value.after.push(history.value.before[history.value.before.length - 1]);
    data = history.value.before[history.value.before.length - 2];
    history.value.before.pop();
  } else {
    history.value.before.push(history.value.after[history.value.after.length - 1]);
    data = history.value.after[history.value.after.length - 1];
    history.value.after.pop();
  }

  canvas.loadFromJSON(data, () => {
    canvas.renderAll();
    history.value.record = true;
  });
};

// 插入图形
const joinTx = (data: any) => {
  const regin = getRegin();

  const setStyle = (obj, data) => {
    for (let key in data) {
      if (["tl", "tr", "br", "bl", "ml", "mt", "mr", "mb", "mtr"].includes(key)) {
        obj.setControlVisible(key, data[key]);
        continue;
      }
      obj.set(key, data[key]);
    }
  };

  const join = (item) => {
    const type: string = item[0];
    const params: string | object = item[1];
    const plug: object = item[2] || null;
    typeof params == "string" && !params.includes("rX") && util.copyPath(params);
    const joinObj = new fabric[type](
      typeof params == "string"
        ? pathSetRegin(params, regin)
        : {
            left: regin[0],
            top: regin[1],
          }
    );
    if (typeof params != "string") setStyle(joinObj, params);
    if (plug) {
      joinObj.set(plug);
      setStyle(joinObj, plug);
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
  const regin = getRegin();
  let imgDom = new Image();
  imgDom.src = imgBase64;
  imgDom.onload = () => {
    const needScale = imgDom.width > joinMaxWidth;
    let joinObj = new fabric.Image(imgDom, {
      left: regin[0],
      top: regin[1],
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

// 设置画笔
const setPen = (obj) => {
  for (let key in obj) {
    if (key == "status") {
      canvas.isDrawingMode = obj[key];
      return;
    }

    if (key != "shadow") {
      canvas.freeDrawingBrush[key] = obj[key];
      return;
    }

    for (let i in obj[key]) {
      if (i != "status") {
        canvas.freeDrawingBrush.shadow[i] = obj[key][i];
        continue;
      }

      if (obj[key][i]) {
        canvas.freeDrawingBrush.shadow = new fabric.Shadow({
          blur: 6, // 羽化程度
          offsetX: 10, // x轴偏移量
          offsetY: 10, // y轴偏移量
          color: "#30e3ca", // 投影颜色
        });
      } else {
        canvas.freeDrawingBrush.shadow = null;
      }
    }
  }
};

// 设置样式
const setStyle = (obj) => {
  canvas.getActiveObjects().forEach((item) => {
    for (let k in obj) {
      item.set(k, obj[k]);
    }
  });
  canvas.renderAll();
  historySaveAction();
};

// 插入立刻复制并选中
const joinCopy = (obj) => {
  canvas.setActiveObject(obj);
  hasActiveObj.value = true;
  copy();
};

// 画布缩放
const setZoom = (type, withEvt = false) => {
  if (zoom.value == 10 && type == "small") return;
  zoom.value = zoom.value + (type == "big" ? 10 : -10);
  let x = cavBox.value.offsetWidth / 2;
  let y = cavBox.value.offsetHeight / 2;
  var zoomPoint = new fabric.Point(x, y);
  canvas.zoomToPoint(zoomPoint, canvas.getZoom() + (type == "big" ? 0.1 : -0.1));
};

// 元素合并
const merge = () => {
  history.value.record = false;
  let arr = canvas.getActiveObjects();
  del();
  history.value.record = true;
  const group = new fabric.Group(arr, { canvas: canvas });
  canvas.add(group);
  joinCopy(group);
};

// 取消选择
const cancel = () => {
  canvas.discardActiveObject();
  canvas.requestRenderAll();
  hasActiveObj.value = false;
};
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .edit {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: auto;
      position: relative;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 5px solid #f6f9f9;
      background-image: url("/images/bg.jpg");
      background-size: 30px 30px;
      background-repeat: repeat;
      .box {
        position: relative;
        border: 1px solid #ddd;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
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
