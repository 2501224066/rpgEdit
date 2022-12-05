import { resolve } from "path";

module.exports = {
  alias: {
    "/@/": resolve(__dirname, "src"),
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  },
};
