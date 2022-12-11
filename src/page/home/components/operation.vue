<template>
  <div class="operation">
    <!-- 左侧工具 -->
    <div class="left">
      <div class="item" @click="emit('joinText')">
        <img src="/@/assets/imgs/text.png" />
      </div>
      <div :class="{ item: true, active: txVisible }">
        <el-popover placement="right" popper-class="xz" :visible="txVisible" :width="180" :hide-after="0">
          <template #reference>
            <div @click="txVisible = !txVisible">
              <img src="/@/assets/imgs/xz.png" style="width: 24px; height: 24px" />
            </div>
          </template>

          <div
            :class="{}"
            v-for="(item, index) in txList"
            :key="index"
            @click="emit('joinTx', txJoinData[item]), (txVisible = false)"
          >
            <img :src="'/@/assets/imgs/tx-' + item + '.png'" />
          </div>
        </el-popover>
      </div>
    </div>

    <!-- 顶部样式 -->
    <div class="top" v-show="hasActiveObj">
      <div>
        <el-select
          v-model="fontFamily"
          :style="{ width: '140px' }"
          placeholder="Select"
          @change="(val) => emit('setStyle', { fontFamily: val })"
        >
          <el-option v-for="(item, index) in fontFamilyList" :key="index" :label="item" :value="item" />
        </el-select>
      </div>
      <div>
        <el-select
          v-model="fontSize"
          :style="{ width: '60px' }"
          placeholder="Select"
          @change="(val) => emit('setStyle', { fontSize: val })"
        >
          <el-option v-for="(item, index) in fontSizeList" :key="index" :label="item" :value="item" />
        </el-select>
      </div>
      <div>
        <el-color-picker
          v-model="fill"
          :predefine="predefine"
          show-alpha
          @active-change="(val) => emit('setStyle', { fill: val })"
        />
      </div>
      <div>
        <el-color-picker
          :disabled="!fSetShow"
          show-alpha
          v-model="backgroundColor"
          :predefine="predefine"
          @active-change="(val) => emit('setStyle', { backgroundColor: val })"
        />
        <div class="bg"></div>
      </div>
      <div v-show="fSetShow">
        <div
          :class="{ f: true, active: fActive.b }"
          @click="emit('setStyle', { fontWeight: fActive.b ? 'normal' : 'bold' })"
        >
          <img src="/@/assets/imgs/f-b.png" />
        </div>
        <div
          :class="{ f: true, active: fActive.i }"
          @click="emit('setStyle', { fontStyle: fActive.i ? 'normal' : 'italic' })"
        >
          <img src="/@/assets/imgs/f-i.png" />
        </div>
        <div :class="{ f: true, active: fActive.d }" @click="emit('setStyle', { linethrough: !fActive.d })">
          <img src="/@/assets/imgs/f-d.png" />
        </div>
        <div :class="{ f: true, active: fActive.u }" @click="emit('setStyle', { underline: !fActive.u })">
          <img src="/@/assets/imgs/f-u.png" />
        </div>
        <div :class="{ f: true, active: textAlignVisible }">
          <el-popover placement="top-start" popper-class="textAlign" :visible="textAlignVisible" :hide-after="0">
            <template #reference>
              <div class="f" @click="textAlignVisible = !textAlignVisible">
                <img v-show="fActive.ta == 'left'" src="/@/assets/imgs/a-l.png" />
                <img v-show="fActive.ta == 'center'" src="/@/assets/imgs/a-c.png" />
                <img v-show="fActive.ta == 'right'" src="/@/assets/imgs/a-r.png" />
              </div>
            </template>

            <div
              :class="{ active: fActive.ta == 'left' }"
              @click="emit('setStyle', { textAlign: 'left' }), (textAlignVisible = false)"
            >
              <img src="/@/assets/imgs/a-l.png" /> 居左
            </div>
            <div
              :class="{ active: fActive.ta == 'center' }"
              @click="emit('setStyle', { textAlign: 'center' }), (textAlignVisible = false)"
            >
              <img src="/@/assets/imgs/a-c.png" />居中
            </div>
            <div
              :class="{ active: fActive.ta == 'right' }"
              @click="emit('setStyle', { textAlign: 'right' }), (textAlignVisible = false)"
            >
              <img src="/@/assets/imgs/a-r.png" />居右
            </div>
          </el-popover>
        </div>
      </div>
    </div>

    <!-- 底部缩放 -->
    <div class="footer">
      <span class="zoom" @click="(zoom -= 10), emit('cavZoom', 'samll')">-</span>
      <span class="size">{{ zoom }}%</span>
      <span class="zoom" @click="(zoom += 10), emit('cavZoom', 'big')">+</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, ref, watch } from "vue";

const props = defineProps({
  hasActiveObj: Boolean,
  canvas: Object,
  defaultStyle: Object,
});
const emit = defineEmits(["cavZoom", "joinText", "setStyle", "joinTx"]);

const zoom: Ref = ref(100); // 缩放比
const fontFamily: Ref = ref(props.defaultStyle.fontFamily); // 字体
const fontFamilyList: string[] = [
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
]; // 字体列表
const fontSize: Ref = ref(props.defaultStyle.fontSize); // 字体大小
const fontSizeList: number[] = [12, 14, 16, 18, 20, 24, 32, 48, 64]; // 字体大小列表
const fill: Ref = ref(props.defaultStyle.fill); // 填充色
const backgroundColor: Ref = ref(props.defaultStyle.backgroundColor); // 背景色
const predefine = [
  "#E6E6E6",
  "#FFFFFF",
  "#FFF1AA",
  "#F0C832",
  "#FA9646",
  "#C8F08C",
  "#C8D250",
  "#8CC86E",
  "#FF0000",
  "#64C8BE",
  "#FFC8D2",
  "#E68CB4",
  "#BE82B4",
  "#E66478",
  "#A0C8F0",
  "#64D2FA",
  "#7882FF",
  "#666666",
  "#000000",
  "rgba(250,250,250,0)",
]; // 自定义色彩
const fSetShow: Ref = ref(false);
const textType: string[] = ["textbox"]; // 文本类型列表
const fActive: Ref = ref({
  b: false,
  i: false,
  d: "normal",
  u: "normal",
  ta: "left",
}); // 文本样式
const textAlignVisible: Ref = ref(false); // 文本位置弹框
const txVisible: Ref = ref(false); // 图形弹框
const txList: string[] = ["0", "01", "1", "2", "21", "22", "23", "24", "3", "31", "4", "5", "6", "61"]; // 图形名称编号
const txJoinData = {
  "0": [
    "Circle",
    {
      radius: 40,
    },
  ],
  "01": [
    "Ellipse",
    {
      rx: 50,
      ry: 30,
    },
  ],
  "1": [
    "Triangle",
    {
      width: 80,
      height: 70,
    },
  ],
  "2": [
    "Rect",
    {
      width: 70,
      height: 70,
    },
  ],
  "21": [
    "Rect",
    {
      width: 80,
      height: 50,
    },
  ],
  "22": ["Path", "M rX rY L rX+25 rY+50 L rX rY+100 L rX-25 rY+50 Z"],
  "23": ["Path", "M rX rY L rX+70 rY L rX+50 rY+60 L rX-20 rY+60 Z"],
  "24": ["Path", "M rX rY L rX+50 rY L rX+70 rY+60 L rX-20 rY+60 Z"],
  "3": ["Path", "M rX rY L rX-17.16 rY-51.3 L rX+27.83 rY-81 L rX+72.83 rY-51.3 L rX+55.67 rY Z"],
  "31": [
    "Path",
    "M rX rY L rX+30.67 rY L rX+40.03 rY-27.89 L rX+49.38 rY L rX+80.05 rY L rX+55.61 rY+18.67 L rX+65.30 rY+48.16 L rX+40.03 rY+29.91 L rX+14.75 rY+48.16 L rX+24.44 rY+18.67 Z",
  ],
  "4": ["Path", "M rX rY L rX+41.55 rY L rX+61.55 rY+34.50 L rX+41.55 rY+69.00 L rX rY+69.00 L rX-20.00 rY+34.50 Z"],
  "5": [
    "Path",
    "M rX rY L rX+40.00 rY L rX+70.00 rY+30.00 L rX+70.00 rY+70.00 L rX+40.00 rY+100.00 L rX rY+100.00 L rX-30.00 rY+70.00 L rX-30.00 rY+30.00 Z",
  ],
  "6": [
    "Path",
    "M rX rY L rX+34.00 rY L rX+34.00 rY-34.00 L rX+64.00 rY-34.00 L rX+64.00 rY L rX+98.00 rY L rX+98.00 rY+30.00 L rX+64.00 rY+30.00 L rX+64.00 rY+64.00 L rX+34.00 rY+64.00 L rX+34.00 rY+30.00 L rX rY+30.00 Z",
  ],
  "61": [
    "Path",
    "M rX rY L rX+34.00 rY L rX+34.00 rY-34.00 L rX+64.00 rY-34.00 L rX+64.00 rY L rX+98.00 rY L rX+98.00 rY+30.00 L rX+64.00 rY+30.00 L rX+64.00 rY+64.00 L rX+34.00 rY+64.00 L rX+34.00 rY+30.00 L rX rY+30.00 Z",
    { angle: 45 },
  ],
}; // 图形绘制数据

const ss = {
  a: [
    [
      "Path",
      "M rX rY L rX+74.32 rY L rX+74.32 rY+37.06 L rX rY+37.06 Z M rX+74.30 rY+28.12 L rX+76.20 rY+18.66 L rX+80.06 rY+36.86 L rX+83.94 rY+18.66 L rX+87.80 rY+36.86 L rX+91.68 rY+18.66 L rX+95.54 rY+36.86 L rX+97.62 rY+27.62 M rX+18.44 rY+9.26 L rX+18.44 rY-0.08 M rX+23.44 rY+9.26 L rX+13.22 rY+9.26 M rX+18.44 rY+27.82 L rX+18.44 rY+36.96 M rX+13.38 rY+27.82 L rX+23.46 rY+27.82 M rX+37.22 rY+0.02 L rX+37.22 rY+37.08 M rX+55.64 rY+55.48 L rX+55.64 rY+37.06 M rX+55.64 rY+27.26 L rX+55.64 rY+9.74 M rX+55.64 rY-0.08 L rX+55.64 rY-19.12 M rX-18.86 rY+37.18 L rX-9.42 rY+18.30 M rX+0.02 rY+37.06 L rX-27.92 rY+37.06 L rX-27.92 rY+18.46 L rX rY+18.46",
    ],
    [
      "Path",
      "M rX+58.90 rY+27.32 L rX+52.38 rY+27.32 L rX+55.64 rY+36.62 Z M rX+58.90 rY+9.70 L rX+52.38 rY+9.70 L rX+55.64 rY+0.40 Z",
      {
        fill: "#000",
      },
    ],
  ],
  b: [
    "Path",
    "M rX rY L rX+13.80 rY+27.58 M rX rY+37.16 L rX+13.98 rY+9.58 M rX+18.58 rY-0.14 L rX+18.58 rY-18.90 M rX-46.32 rY+37.16 L rX-74.26 rY+37.16 L rX-74.26 rY+18.56 L rX-46.34 rY+18.56 M rX-65.20 rY+37.26 L rX-55.76 rY+18.40 M rX-37.18 rY+37.14 L rX-37.18 rY+10.86 M rX-18.56 rY+26.38 L rX-18.56 rY+0.16 M rX-9.12 rY+0.12 L rX-9.12 rY+37.16 M rX+0.04 rY-0.14 L rX+0.04 rY-18.90 M rX rY+55.58 L rX rY+37.16 M rX+18.56 rY+55.58 L rX+18.56 rY+37.16 M rX+27.96 rY+28.22 L rX+29.86 rY+18.76 L rX+33.72 rY+36.96 L rX+37.60 rY+18.76 L rX+41.46 rY+36.96 L rX+45.34 rY+18.76 L rX+49.20 rY+36.96 L rX+51.28 rY+27.72 M rX-46.34 rY+0.10 L rX+27.98 rY+0.10 L rX+27.98 rY+37.16 L rX-46.34 rY+37.16 Z",
  ],
};

watch(
  () => props.hasActiveObj,
  (val) => {
    if (val) getTopData();
  }
);

// 获取顶部菜单数据
const getTopData = () => {
  fSetShow.value = false;
  const activeObj = props.canvas.getActiveObjects();

  if (activeObj.length == 1 && textType.includes(activeObj[0].type)) {
    fActive.value.b = activeObj[0].fontWeight == "bold";
    fActive.value.i = activeObj[0].fontStyle == "italic";
    fActive.value.d = activeObj[0].linethrough;
    fActive.value.u = activeObj[0].underline;
    fActive.value.ta = activeObj[0].textAlign;
    fSetShow.value = true;
  }

  activeObj.forEach((item) => {
    fontFamily.value = item.fontFamily || props.defaultStyle.fontFamily;
    fontSize.value = item.fontSize || props.defaultStyle.fontSize;
    fill.value = item.fill || props.defaultStyle.fill;
    backgroundColor.value = item.backgroundColor || props.defaultStyle.backgroundColor;
  });
};
</script>

<style lang="less" scoped>
.operation {
  z-index: 1;
  .left {
    position: absolute;
    left: 40px;
    top: 30vh;
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
      margin: 4px 0;
      border-radius: 4px;
      cursor: pointer;
      &:active {
        opacity: 0.4;
      }
      img {
        width: 20px;
        height: 20px;
        margin: 6px;
      }
    }
  }

  .top {
    height: 40px;
    position: absolute;
    left: 40px;
    top: 40px;
    background-color: #fafbfc;
    border: 1px solid #e8e8e8;
    padding: 0px 0 0px 10px;
    display: flex;
    align-items: center;
    & > div {
      margin-right: 10px;
      position: relative;
      display: flex;
      align-items: center;
      .bg {
        position: absolute;
        left: 15%;
        bottom: 4px;
        display: inline-block;
        width: 70%;
        height: 6px;
        background: linear-gradient(
          90deg,
          rgba(255, 0, 0, 1) 0%,
          rgba(255, 154, 0, 1) 10%,
          rgba(208, 222, 33, 1) 20%,
          rgba(79, 220, 74, 1) 30%,
          rgba(63, 218, 216, 1) 40%,
          rgba(47, 201, 226, 1) 50%,
          rgba(28, 127, 238, 1) 60%,
          rgba(95, 21, 242, 1) 70%,
          rgba(186, 12, 248, 1) 80%,
          rgba(251, 7, 217, 1) 90%,
          rgba(255, 0, 0, 1) 100%
        );
        border-radius: 3px;
      }
      .f {
        width: 36px;
        height: 36px;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 1px;
        &:hover {
          background: #e2e6ea;
        }
        &:active {
          background: #d3d7dc;
        }
        img {
          width: 18px;
          height: 18px;
        }
      }
    }
  }

  .footer {
    position: fixed;
    right: 40px;
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

  .active {
    background: #d3d7dc;
  }
}
</style>
<style lang="less">
.textAlign {
  display: flex;
  flex-direction: column;
  & > div {
    padding: 4px 6px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    img {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
    &:hover {
      background: #d6dade;
    }
  }

  .active {
    background: #377bb8 !important;
    color: #fff !important;
  }
}

.xz {
  display: flex;
  flex-wrap: wrap;
  & > div {
    padding: 4px 6px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin: 4px;
    img {
      width: 30px;
      height: 30px;
    }
    &:hover {
      background: #d6dade;
    }
  }
}
</style>
