import { resolve } from "path";

module.exports = {
  base: "/",
  alias: {
    "/@/": resolve(__dirname, "src"),
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
      },
    },
  },
  publicDir: "public",
};
