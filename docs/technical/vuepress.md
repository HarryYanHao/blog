---
sidebar: 'auto'
sidebarDepth: 2
pageClass: common
---
# VuePress使用
[[toc]]
## 初步了解
[官方文档]("https://v1.vuepress.vuejs.org/zh/guide/#%E4%BB%8B%E7%BB%8D")  
VuePress是一个由Vue VueRouter和webpack驱动的单页应用，所以支持Vue的语法及其特性,页面主要是由Vue渲染的静态页面。文档的书写主要用markdown的语法,配置是由全局配置项.vuepress/config.js和页面配置Front Matter组成。
## 安装
[官方文档]("https://v1.vuepress.vuejs.org/zh/guide/getting-started.html#%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85")
::: tip
将VuePress作为文档记录和blog使用
:::
::: warning
注意nodejs版本 >= 8
包管理工具可以使用yarn和npm 本次安装均使用npm.  
VuePress版本是1.0+
:::
``` sh
#执行如下命令
npm install -g vuepress #全局安装VuePress

mkdir blog
cd blog

npm init -y
```
1.在根目录下创建`docs`文件夹.  
2.在`docs`文件夹下创建`.vuepress`文件夹.  
3.在`.vuepress`中创建`public`文件夹和`config.js`文件  
`public`文件下可存放静态资源。`config.js`是VuePress的全局配置文件 具体配置信息可查看 [全局配置]("https://v1.vuepress.vuejs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE")
``` js
//config.js
module.exports = {
  title: '哈里小屋',
  description: '记录生活，记录成长',
  base: '/',
  host: '0.0.0.0',
  port: 8081,
  plugins: [],
  themeConfig: {
  }
}
```
4.添加脚本配置
``` sh
 	"docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
```
5.创建初始化页面
``` sh {3}
cd docs

echo "# Blog" >> README.md
```
6.运行开发环境
``` sh
npm run docs:dev
```
访问localhost:8081，大功告成！
## 使用默认主题与路由配置
修改我们上面创建的`README.md`,作为首页我们希望使用默认主题，使用Front Matter配置开启默认主题
```
---
home: true
heroImage: /hero.png
actionText: 开启 →
actionLink: /technical/
features:
- title: 简洁至上
  details: 基于Vuepress搭建Blog 以 Markdown 为中心的项目结构，以最少的配置专注于写作。
- title: 技术文档
  details: 记录学习过程中遇到的问题，不断进取，用于挑战。成为更好的自己。
- title: 个人随笔
  details: 用善于发现的眼睛，捕捉生活的美好。
footer: MIT Licensed | Copyright © 2019-present Harry Yan
---
```
### 默认主题-简单的CSS覆盖
在0.x版本中是新建`.vuepress/override.styl`文件覆盖主题样式  
但是在1.x版本中是新建 `.vuepress/styles/palette.styl`文件覆盖主题样式  
当时使用时没有注意文档的版本纠结了好久
``` stylus
// 显示默认值
$accentColor = #ff3333
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
```
### 自定义页面css覆盖
[官方文档]("https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%A1%B5%E9%9D%A2%E7%B1%BB")  
有时候你可能需要为特定页面添加一个 CSS 类名，以方便针对该页面添加一些专门的 CSS。首先要在特定页面添加Front matter中申明一个class
``` yaml
pageClass: common
```
在`styles/palette.styl`中写特定的css
``` stylus
.theme-container.common .token.string{
	color:#fd0000
}
.theme-container.common .token.variable{
	color:#fd0000
}
.theme-container.common .token.operator{
	color:#d72323
}
```
### 侧边栏与路由
侧边栏需配置在config.js文件中，[默认路由]("https://v1.vuepress.vuejs.org/zh/guide/directory-structure.html#%E9%BB%98%E8%AE%A4%E7%9A%84%E9%A1%B5%E9%9D%A2%E8%B7%AF%E7%94%B1")地址为README,其余文档需要显示指定。[示例]("https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F")
## 使用官方插件
以back-to-top为例：
``` sh
npm install -D @vuepress/plugin-back-to-top@next
```
修改config.js 增加plugins
``` js
plugins: ['@vuepress/back-to-top'] 
```
::: warning
特别说明，在安装插件时需注意版本兼容，可以修改@next后的版本号 比如 npm install -D @vuepress/plugin-back-to-top@1.0.0-alpha.0
:::
## 动手写组件
### 什么是组件
先来看一下vue对组件的定义：组件是一个可复用的Vue实例，且带有一个名字，比如我们定义一个名为like的组件，在我们注册这个组件之后可以用标签`<like />`来使用组件  
### 自动注册
所有在 `.vuepress/components` 中找到的 `*.vue` 文件将会自动地被注册为全局的异步组件，组件名称和文件名称一致
### 写组件
``` js
//.vuepress/components/like.vue
<template>
  <vi-icon viIconName="favorite"></vi-icon>
</template>

<script>
//组件内使用另外的组件
import './js/iconfont.js'
import Icon from '../../../src/icon.vue'
export default{
  components:{
    'vi-icon':Icon
  }
}
</script>
```
``` js
// /src/icon.vue
<template>
    <svg class="iconfront">
        <use :xlink:href="`#icon-${viIconName}`"></use>
    </svg> 
</template>
<script>
export default {
    name:'ViIcon',
    props:{
        viIconName:{
            type: String
        }
    }
}
</script>  
```
本文最后的点赞就是使用的就是示例的自定义组件。
## 在markdown中使用Vue
[官方文档]("https://v1.vuepress.vuejs.org/zh/guide/using-vue.html")
## 文件树
```
.

├── .vuepress
│   └── dist
│       ├── assets
│       └── docs
├── docs
│   ├── .vuepress
│   │   ├── components
│   │   ├── dist
│   │   ├── public
│   │   └── styles
│   ├── article
│   └── technical
├── node_modules
│   ├── .cache
│   │   └── terser-webpack-plugin
│   ├── @vuepress
│   │   └── plugin-back-to-top
│   └── lodash.debounce
└── src
```
## 上线前准备
``` sh
 npm run docs:build
```
执行后会将所需用到的图片，静态资源，css，js打包到`docs/.vuepress/dist`目录下面，可利用nginx反代到该文件目录下。
webpack的原理也大致如此。
## 源码
Harry's Blog [github](https://github.com/HarryYanHao/blog)
## 继续学习ing
在这里会调试我的VuePress代码，可以不用关注

<carousel />
<like/>