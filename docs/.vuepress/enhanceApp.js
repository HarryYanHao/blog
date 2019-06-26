/**
 * 扩展 VuePress 应用
 */


import Element from 'element-ui'
import Mint from 'mint-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'

//import './public/css/mintui.css' //组件css文件

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  
}) => {
  // ...做一些其他的应用级别的优化
  Vue.use(Mint)
  Vue.use(Element)


}

