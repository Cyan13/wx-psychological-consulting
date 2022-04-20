const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  assetsDir: './',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('tim', resolve('src/tim.js'))
    // 删除预加载
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
        chunks: 'all'
    })
  },
  devServer: {
    // port: port,
    // open: false,
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    // before: require('./mock/mock-server.js')
    proxy: 'http://101.35.223.56:8080'
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      stylus: {
        'resolve url': true,
        // 自定义主题场景
        import: [path.resolve(__dirname, './src/assets/css/base.styl')]
      }
    }
  }
}
