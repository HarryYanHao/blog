module.exports = {
  title: "Harry's Blog",
  description: '生活，成长',
  base: '/',
  host: '0.0.0.0',
  //mac下port未生效
  port: 8081,
  plugins: ['@vuepress/back-to-top',
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }],

  themeConfig: {
    //gitc 仓库地址
    repo: '/HarryYanHao',
    //导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: '技术文档', link: '/technical/' },
      { text: '随笔', link: '/article/' },
      { text: '展示', link: 'http://www.harry5.xyz/index/' },
    ],
    
  
    //搜索
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated', // string | boolean



    //侧边栏
     sidebar: {
      // 侧边栏在 /article/ 上
      '/article/': [
        '',
      ],
      '/technical/':[
        '',
        'laravel',
        'vuepress',
        'mysql',
        'http',
        'algorithm',
        'design',
        'nginx',
        'redis'
      ],
      '/index/': [
        '',
      ],
    }
  }
}