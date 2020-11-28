module.exports = {
  configureWebpack: {
      resolve: {
          alias: {
              // 配置别名
              // 内部已经默认配置了 '@': 'src'
              'assets': '@/assets',
              'common': '@/common',
              'components': '@/components',
              'network': '@/network',
              'views': '@/views',
              'pluginunit':'@/pluginunit'
          }
      }
  },
  // devServer: {
  //   host: '192.168.1.6',  //本机电脑 ip 地址
  //   port: 8080,  //端口号
  // }
}