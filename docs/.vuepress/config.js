module.exports = {
  title: "Harry's Blog",
  head: [
    /*************** start 添加谷歌统计 ***********/
    [
      "script",
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-WDPVE7624H",
        async: true
      }
    ],
    [
      "script",
      {},
      `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-WDPVE7624H');
      `
    ],
    /*************** end 添加谷歌统计 ***********/
  ],
  description: 'My Life',
  base: '/',
  host: '0.0.0.0',
  //mac下port未生效
  port: 8081,
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'G-WDPVE7624H' // UA-00000000-0
      }
    ],
    '@vuepress/back-to-top',
    {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }
  ],

  themeConfig: {
    //gitc 仓库地址
    repo: '/HarryYanHao',
    //导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: '技术文档', link: '/technical/' },
      { text: '随笔', link: '/article/' },
      { text: '展示', link: 'http://stage.harrystar.top' },
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
        'redis',
        'docker',
        'ai',
        'vpn',
      ],
      '/index/': [
        '',
      ],
    }
  }
}