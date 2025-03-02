export default defineAppConfig({
  pages: [
    'pages/drill/index',  // 将 drill 页面设为首页
    'pages/ranking/index',
    'pages/hangout/index',
    'pages/index/index'   // 将 index 页面放到最后
  ],
  tabBar: {
    color: '#999999',
    selectedColor: '#1AAD19',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/drill/index',
        text: '练球'
      },
      {
        pagePath: 'pages/ranking/index',
        text: '排名'
      },
      {
        pagePath: 'pages/hangout/index',
        text: '约球'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Go Pickleball',
    navigationBarTextStyle: 'black'
  }
})
