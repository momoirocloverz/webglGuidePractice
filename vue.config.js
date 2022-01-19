module.exports = {
  // 关闭eslint报错
  lintOnSave: false,
  productionSourceMap: false,
//   outputDir: 'build',
//   publicPath: './',
  devServer: {
    // https: true,
    open: true,
    overlay: {
      warnings: true,
      error: true,
    },
    // proxy: {
      
    // },
  },
}
