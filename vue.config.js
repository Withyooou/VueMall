module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 配置别名
        // 内部已经默认配置了 '@': 'src'
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
        pluginunit: "@/pluginunit"
      }
    }
  },
  devServer: {
    host: 'localhost',  // 本机电脑 ip 地址
    port: 8888,  // 端口号
    proxy: {
      '/api': {
        target: '应coderwhy老师要求,接口地址不随意泄露,需要的朋友请找老师获取',  // 要跨域的域名
        changeOrigin: true,  // 是否开启跨域
      }
    }
  }
};
