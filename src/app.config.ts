export default defineAppConfig({
  pages: [
    "pages/drill/index",
    "pages/ranking/index",
    "pages/hangout/index",
    "pages/profile/index", // 添加个人中心页面
    "pages/index/index",
    "pages/drill/dink/index",
    "pages/drill/dink/diagonal/index",
    "pages/drill/dink/cat-mouse/index",
  ],
  tabBar: {
    color: "#999999",
    selectedColor: "#1AAD19",
    backgroundColor: "#ffffff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/drill/index",
        text: "练球",
      },
      {
        pagePath: "pages/ranking/index",
        text: "排名",
      },
      {
        pagePath: "pages/hangout/index",
        text: "约球",
      },
      {
        pagePath: "pages/profile/index", // 添加个人中心到底部导航
        text: "我的",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "Go Pickleball",
    navigationBarTextStyle: "black",
  },
  permission: {
    "scope.userLocation": {
      desc: "您的位置信息将用于查找附近的球友"
    }
  }
});
