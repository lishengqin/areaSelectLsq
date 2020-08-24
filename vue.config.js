const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {

  pages: {
    index: {
      entry: './example/main.js',
    }
  },
  devServer: {
    port: "9876",
    hot: false,
    // proxy: {
    // "^/rcce/*": {
    //   //匹配根路径
    //   target: "http://10.20.30.88:8088", //跨域要访问的地址及端口
    //   // target: "http://192.168.229.140:8088", //跨域要访问的地址及端口
    //   changeOrigin: true,
    //   secure: false,
    // },
    // },
  },
  lintOnSave: false,
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");

    config.resolve.alias
      .set("@", path.resolve(__dirname, "src/"))
      .set("@component", path.resolve(__dirname, "src/common/component"))
      .set("@utils", path.resolve(__dirname, "src/common/component"))
      .set("vue$", "vue/dist/vue.esm.js");
  },
  publicPath: "/areaSelectLsq/",
};
