<template>
  <div class="home">
    <Top @save-img="saveImg" />
    <div class="content" @click="rmenuHid">
      <Source @join-img="joinImg" @join-tx="joinTx" />

      <div class="edit">
        <Operation
          :text-type="textType"
          :has-active-obj="hasActiveObj"
          :canvas="canvas"
          :default-style="defaultStyle"
          :history="history"
          :zoom="zoom"
          :page-size="pageSize"
          :add-arrow-status="addArrowStatus"
          @set-zoom="setZoom"
          @join-text="joinText"
          @set-style="setStyle"
          @join-tx="joinTx"
          @set-pen="setPen"
          @set-history="setHistory"
          @add-arrow="addArrow"
          @set-page-size="setPageSize"
        />

        <div class="container" ref="container">
          <div class="box" @contextmenu.prevent="rmenuShow">
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
  </div>
</template>

<script lang="ts" setup>
import html2canvas from "html2canvas";
import Top from "/@/components/top.vue";
import Source from "./components/source.vue";
import Operation from "./components/operation.vue";
import { fabric } from "fabric";
import { nextTick, onMounted, Ref, ref } from "vue";
import { ElMessage } from "element-plus";
import util from "/@/utils/index";
import initAligningGuidelines from "/@/utils/initAligningGuidelines";

let cavWidth: number = 0; // 画布宽
let cavHeight: number = 0; // 画布高
let evtToCavX: number = 0; // 鼠标相对画布位置
let evtToCavY: number = 0; // 鼠标相对画布位置
let canvas: any = null; // 画布
let clipboard: any = null; // 复制内容

const textType: string[] = ["textbox"]; // 文本类型列表
const joinMaxWidth: number = 100; // 插入元素最大宽度
const rmenuShowStatus: Ref = ref(false); // 右键菜单是否显示
const hasActiveObj: Ref = ref(false); // 当前是否有选中
const rmenu: Ref = ref(null); // 右键菜单 Dom
const container: Ref = ref(null); // 容器 Dom
const cav: Ref = ref(null); // canvas Dom
const defaultStyle: object = {
  fontFamily: "Comic Sans",
  fontSize: 20,
  fill: "#222222",
  backgroundColor: "rgba(250,250,250,0)",
}; // 默认元素样式
const history: Ref = ref({ record: true, before: [], after: [] }); // 历史记录
const zoom: Ref = ref(100); // 缩放比
const addArrowStatus: Ref = ref(false); // 箭头绘制状态
const pageSize: Ref = ref({ width: 0, height: 0 });

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
        if (canvas.getActiveObject() && canvas.getActiveObject().isEditing) return;
        parse();
      }
      if (key && event.code == "KeyA") {
        if (canvas.getActiveObject() && canvas.getActiveObject().isEditing) return;
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
  if (!canvas.getObjects().length) return;
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
  cav.value.width = container.value.offsetWidth;
  cav.value.height = container.value.offsetHeight;

  initStyle();
  canvas = new fabric.Canvas("cav", {
    selectionBorderColor: "#bbdff4",
    selectionColor: "rgba(189, 224, 244, 0.7)",
    fireRightClick: true,
    backgroundVpt: false,
  });

  setPageSize([container.value.offsetWidth, container.value.offsetHeight]);
  initAligningGuidelines(canvas, fabric);
  setBgImg();
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

// 设置背景图
const setBgImg = (img = null) => {
  canvas.setBackgroundColor(
    {
      source: "/images/bg.jpg",
      repeat: "repeat",
    },
    canvas.renderAll.bind(canvas)
  );
};

// 导出
const saveImg = () => {
  const filename = "memo";
  const ext = "png";
  html2canvas(cav.value, {
    useCORS: true,
  }).then((canvas) => {
    const imageurl = canvas.toDataURL("image/png");
    const aLink = document.createElement("a");
    aLink.style.display = "none";
    aLink.href = imageurl;
    aLink.download = `${filename}.${ext}`;
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
  });
};

// 开关框选
const setSelectable = (status) => {
  canvas.discardActiveObject();
  canvas.renderAll();
  canvas.getObjects().forEach((object) => {
    object.selectable = status;
  });
};

// 添加箭头
const addArrow = (status) => {
  addArrowStatus.value = status;
  setSelectable(false);

  const reset = () => {
    canvas.off("mouse:down").off("mouse:move").off("mouse:up");
    setSelectable(true);
  };

  if (!status) {
    reset();
    return;
  }

  var fromx, fromy, tox, toy;
  canvas.on("mouse:down", (event) => {
    var pointer = canvas.getPointer(event.e);
    fromx = pointer.x;
    fromy = pointer.y;
  });
  canvas.on("mouse:up", (event) => {
    var pointer = canvas.getPointer(event.e);
    tox = pointer.x;
    toy = pointer.y;

    var angle = Math.atan2(toy - fromy, tox - fromx);

    var headlen = 10;
    tox = tox - headlen * Math.cos(angle);
    toy = toy - headlen * Math.sin(angle);

    var points = [
      {
        x: fromx, // start point
        y: fromy,
      },
      {
        x: fromx - (headlen / 4) * Math.cos(angle - Math.PI / 2),
        y: fromy - (headlen / 4) * Math.sin(angle - Math.PI / 2),
      },
      {
        x: tox - (headlen / 4) * Math.cos(angle - Math.PI / 2),
        y: toy - (headlen / 4) * Math.sin(angle - Math.PI / 2),
      },
      {
        x: tox - headlen * Math.cos(angle - Math.PI / 2),
        y: toy - headlen * Math.sin(angle - Math.PI / 2),
      },
      {
        x: tox + headlen * Math.cos(angle), // tip
        y: toy + headlen * Math.sin(angle),
      },
      {
        x: tox - headlen * Math.cos(angle + Math.PI / 2),
        y: toy - headlen * Math.sin(angle + Math.PI / 2),
      },
      {
        x: tox - (headlen / 4) * Math.cos(angle + Math.PI / 2),
        y: toy - (headlen / 4) * Math.sin(angle + Math.PI / 2),
      },
      {
        x: fromx - (headlen / 4) * Math.cos(angle + Math.PI / 2),
        y: fromy - (headlen / 4) * Math.sin(angle + Math.PI / 2),
      },
      {
        x: fromx,
        y: fromy,
      },
    ];

    var pline = new fabric.Polyline(points, {
      fill: "white",
      stroke: "black",
      opacity: 1,
      strokeWidth: 1,
      originX: "left",
      originY: "top",
      selectable: true,
      ml: false,
    });
    ["ml", "mt", "mr", "mb"].forEach((item) => {
      pline.setControlVisible(item, false);
    });

    canvas.add(pline);
    reset();
    addArrowStatus.value = false;
    canvas.renderAll();
  });
};

// 获取鼠标位置
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
    if (history.value.before.length == 1) {
      setBgImg();
    } else {
      canvas.renderAll();
    }
    history.value.record = true;
  });
};

// 插入图形
const joinTx = (data: any) => {
  if (!data) return;
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
    let groupPlug = {};
    data.forEach((item) => {
      if (!Array.isArray(item)) {
        groupPlug = item;
        return;
      }
      arr.push(join(item));
    });
    const group = new fabric.Group(arr, { canvas: canvas });
    setStyle(group, groupPlug);
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
        width: 100,
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
  let x = cavWidth / 2;
  let y = cavHeight / 2;
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

// 取消
const cancel = () => {
  canvas.discardActiveObject();
  canvas.requestRenderAll();
  hasActiveObj.value = false;
};

// 设置页面大小
const setPageSize = (arr) => {
  cavWidth = arr[0];
  cavHeight = arr[1];
  pageSize.value = {
    width: cavWidth,
    height: cavHeight,
  };
  canvas.setWidth(cavWidth);
  canvas.setHeight(cavHeight);
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
      position: relative;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background: #f6f9f9;

      .container {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
        .box {
          position: relative;
          box-shadow: 0 0 4px 3px #ddd;
        }
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
