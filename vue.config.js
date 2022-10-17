const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './', //配置打包路径  
  outputDir: 'dist', // 打包生成的文件
  assetsDir: 'static', // 放置静态文件相对于 outputDir 目录
  productionSourceMap: false, // 打包时不输出map，大量减少打包体积和打包时间
  devServer: {
    // 根据环境配置，是否开启代理
    // 代理 /api 也从.env中获取
    proxy: process.env.VUE_APP_OPEN_PROXY == false ? {} : {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: process.env.VUE_APP_OPEN_PROXY,
        pathRewrite: {
          [process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: false
})