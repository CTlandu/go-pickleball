export default defineAppConfig({
  pages: [
    "pages/drill/index",
    "pages/ranking/index",
    "pages/hangout/index",
    "pages/index/index",
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
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "Go Pickleball",
    navigationBarTextStyle: "black",
  },
});
