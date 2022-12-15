<template>
  <div class="operation">
    <!-- 左侧工具 -->
    <div class="left">
      <div class="item" @click="emit('joinText')">
        <img src="/images/text.png" />
      </div>

      <div :class="{ item: true }">
        <el-popover placement="right" popper-class="xz" ref="txVisible" trigger="click" :width="180" :hide-after="0">
          <template #reference>
            <div>
              <img src="/images/xz.png" style="width: 24px; height: 24px" />
            </div>
          </template>

          <div v-for="(item, index) in txList" :key="index" @click="emit('joinTx', txJoinData[item]), txVisible.hide()">
            <img :src="'/images/tx-' + item + '.png'" />
          </div>
        </el-popover>
      </div>
      <div
        :class="{ item: true, active: pen.status }"
        @click="(pen.status = !pen.status), emit('setPen', { status: pen.status })"
      >
        <img src="/images/pen.png" style="width: 22px; height: 22px" />
      </div>
      <div :class="{ item: true, active: props.addArrowStatus }" @click="emit('addArrow', !props.addArrowStatus)">
        <img src="/images/arrow.png" />
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
          <img src="/images/f-b.png" />
        </div>
        <div
          :class="{ f: true, active: fActive.i }"
          @click="emit('setStyle', { fontStyle: fActive.i ? 'normal' : 'italic' })"
        >
          <img src="/images/f-i.png" />
        </div>
        <div :class="{ f: true, active: fActive.d }" @click="emit('setStyle', { linethrough: !fActive.d })">
          <img src="/images/f-d.png" />
        </div>
        <div :class="{ f: true, active: fActive.u }" @click="emit('setStyle', { underline: !fActive.u })">
          <img src="/images/f-u.png" />
        </div>
        <div :class="{ f: true }">
          <el-popover placement="top-start" popper-class="textAlign" :ref="textAlignVisible" :hide-after="0">
            <template #reference>
              <div class="f">
                <img v-show="fActive.ta == 'left'" src="/images/a-l.png" />
                <img v-show="fActive.ta == 'center'" src="/images/a-c.png" />
                <img v-show="fActive.ta == 'right'" src="/images/a-r.png" />
              </div>
            </template>

            <div
              :class="{ active: fActive.ta == 'left' }"
              @click="emit('setStyle', { textAlign: 'left' }), textAlignVisible.hide()"
            >
              <img src="/images/a-l.png" /> 居左
            </div>
            <div
              :class="{ active: fActive.ta == 'center' }"
              @click="emit('setStyle', { textAlign: 'center' }), textAlignVisible.hide()"
            >
              <img src="/images/a-c.png" />居中
            </div>
            <div
              :class="{ active: fActive.ta == 'right' }"
              @click="emit('setStyle', { textAlign: 'right' }), textAlignVisible.hide()"
            >
              <img src="/images/a-r.png" />居右
            </div>
          </el-popover>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div>
        <span
          :class="{ ic: true, disable: history.before.length == 1 }"
          @click="history.before.length == 1 ? null : emit('setHistory', 'before')"
        >
          <img src="/images/undo.png" />
        </span>
        <span
          :class="{ ic: true, disable: history.after.length == 0 }"
          @click="history.after.length == 0 ? null : emit('setHistory', 'after')"
        >
          <img src="/images/redo.png" />
        </span>
        <span :class="{ ic: true, disable: zoom == 10 }" @click="emit('setZoom', 'small')">
          <img src="/images/small.png" />
        </span>
        <span class="size">{{ props.zoom }}%</span>
        <span class="ic" @click="emit('setZoom', 'big')">
          <img src="/images/big.png" />
        </span>
        <el-popover
          :width="100"
          placement="top-start"
          trigger="click"
          popper-class="pageSize"
          :ref="pageVisible"
          :hide-after="0"
        >
          <template #reference>
            <span class="ic">
              <img src="/images/page.png" />
            </span>
          </template>

          <div class="content">
            <el-input-number
              :model-value="props.pageSize.width"
              :min="50"
              :max="3000"
              :controls="false"
              size="small"
              @change="
                (val) => {
                  emit('setPageSize', [val, props.pageSize.height]);
                }
              "
            />
            -
            <el-input-number
              :model-value="props.pageSize.height"
              :min="50"
              :max="1500"
              :controls="false"
              size="small"
              @change="
                (val) => {
                  emit('setPageSize', [props.pageSize.width, val]);
                }
              "
            />
          </div>
        </el-popover>
      </div>
    </div>

    <!-- 画笔 -->
    <div class="pen" v-show="pen.status">
      <span>画笔设置</span>
      <div>
        <div>粗细</div>
        <div>
          <el-slider
            v-model="pen.weight"
            :min="1"
            :max="20"
            :marks="{
              5: '',
              10: '',
              15: '',
            }"
            @change="
              (val) => {
                emit('setPen', { width: val });
              }
            "
          />
        </div>
      </div>
      <div>
        <div>色彩</div>
        <div>
          <el-color-picker
            show-alpha
            v-model="pen.color"
            :predefine="predefine"
            @active-change="
              (val) => {
                pen.color = val;
                emit('setPen', { color: val });
              }
            "
          />
        </div>
      </div>
      <div class="b"></div>
      <div>
        <div>虚线</div>
        <div>
          <el-switch
            v-model="pen.dash"
            @change="
              (val) => {
                emit('setPen', { strokeDashArray: val ? [pen.dash1, pen.dash2] : [] });
              }
            "
          />
        </div>
      </div>
      <div v-show="pen.dash">
        <div>虚线阶段</div>
        <div>
          <el-slider
            v-model="pen.dash1"
            :min="1"
            :max="20"
            :marks="{
              5: '',
              10: '',
              15: '',
            }"
            @change="
              (val) => {
                emit('setPen', { strokeDashArray: [pen.dash1, val] });
              }
            "
          />
        </div>
      </div>
      <div v-show="pen.dash">
        <div>虚线间距</div>
        <div>
          <el-slider
            v-model="pen.dash2"
            :min="1"
            :max="20"
            :marks="{
              5: '',
              10: '',
              15: '',
            }"
            @change="
              (val) => {
                emit('setPen', { strokeDashArray: [pen.dash1, val] });
              }
            "
          />
        </div>
      </div>
      <div class="b"></div>
      <div>
        <div>阴影</div>
        <div>
          <el-switch v-model="pen.shadow.status" @change="(val) => emit('setPen', { shadow: { status: val } })" />
        </div>
      </div>
      <div v-show="pen.shadow.status">
        <div>阴影色彩</div>
        <div>
          <el-color-picker
            show-alpha
            v-model="pen.shadow.color"
            :predefine="predefine"
            @active-change="
              (val) => {
                pen.shadow.color = val;
                emit('setPen', { shadow: { color: val } });
              }
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { txJoinData } from "/@/utils/txData";

const props = defineProps({
  hasActiveObj: Boolean,
  canvas: Object,
  defaultStyle: Object,
  history: Object,
  zoom: Number,
  textType: Array,
  addArrowStatus: Boolean,
  pageSize: Object,
});
const emit = defineEmits([
  "setZoom",
  "joinText",
  "setStyle",
  "joinTx",
  "joinPen",
  "setPen",
  "setHistory",
  "addArrow",
  "setPageSize",
]);

const fontFamily: Ref = ref(props.defaultStyle.fontFamily); // 字体
const fontFamilyList: string[] = [
  "ArialBlack",
  "ArialNarrow",
  "Bookman Old Style",
  "Courier",
  "Courier New",
  "Comic Sans",
  "Comic Sans MS",
  "Garamond",
  "Georgia",
  "Impact",
  "Lucida Sans Unicode",
  "Lucida Console",
  "MS Sans Serif",
  "Palatino Linotype",
  "Symbol",
  "Times New Roman",
  "Trebuchet MS",
  "Tahoma",
  "Verdana",
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
const fActive: Ref = ref({
  b: false,
  i: false,
  d: "normal",
  u: "normal",
  ta: "left",
}); // 文本样式
const textAlignVisible: Ref = ref(); // 文本位置弹框
const txVisible: Ref = ref(); // 图形弹框
const txList: string[] = ["0", "01", "1", "2", "21", "22", "23", "24", "3", "31", "4", "5", "6", "61"]; // 图形名称编号
const pen: Ref = ref({
  status: false,
  color: "#000000",
  weight: 1,
  dash: false,
  dash1: 5,
  dash2: 10,
  shadow: { status: false, color: "#30e3ca" },
});
const pageVisible: Ref = ref(); // 页面设置弹框

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

  if (activeObj.length == 1 && props.textType.includes(activeObj[0].type)) {
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
    left: 20px;
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
    top: 20px;
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
    right: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    box-shadow: rgb(209 209 209) 0px 0px 3px 1px;
    padding: 4px;
    img {
      width: 16px;
      height: 16px;
    }
    .ic {
      display: inline-block;
      padding: 6px 12px;
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

  .pen {
    position: absolute;
    width: 200px;
    top: 40px;
    right: 40px;
    background: #fff;
    border-radius: 4px;
    box-shadow: rgb(209 209 209) 0px 0px 3px 1px;
    padding: 10px;
    & > span {
      display: inline-block;
      margin-bottom: 10px;
    }
    .b {
      border-top: 1px solid #eee;
    }
    & > div {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      & > :nth-child(1) {
        width: 54px;
      }
      & > :nth-child(2) {
        flex: 1;
      }
    }
  }

  .active {
    background: #d3d7dc;
  }

  .disable {
    opacity: 0.2;
    cursor: not-allowed !important;
  }

  :deep(.el-color-picker__mask) {
    width: 32px;
    height: 32px;
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

.pageSize {
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-input__wrapper {
      padding: 0 !important;
    }
    .el-input-number {
      width: 46px;
    }
  }
}
</style>
