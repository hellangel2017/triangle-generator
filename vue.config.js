module.exports = {
  devServer: {
    disableHostCheck: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    }
  },
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "三角生成器",
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  }
};
