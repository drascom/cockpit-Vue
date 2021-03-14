const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/app/' : '/',
  productionSourceMap: false,
  pluginOptions: { i18n: { enableInSFC: true } },
  devServer: {
    open: true,
    clientLogLevel: 'warning',
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://dist:81',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': path.resolve(__dirname, './src')
  //     },
  //     extensions: ['.js', '.vue', '.json']
  //   }
  // }
}