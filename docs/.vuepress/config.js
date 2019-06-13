module.exports = {

  title: '记录集',
  description: '记录生活，记录成长',
  base: '/',
  host: '0.0.0.0',
  //mac下port未生效
  port: 8081,

  themeConfig: {
    //gitc 仓库地址
    repo: 'xx/xx',
    //导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: '技术博客', link: '/technical/' },
      { text: '个人文章', link: '/article/' },
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
        'nippon',
      ]
    }
  }
}