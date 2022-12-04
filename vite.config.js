import { resolve } from "path";

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

module.exports = {
  alias: {
    "/@/": pathResolve("src"),
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
