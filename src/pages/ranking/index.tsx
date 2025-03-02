import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Ranking() {
  useLoad(() => {
    console.log("Ranking page loaded.");
  });

  return (
    <View className="ranking">
      <View className="icon-wrapper">
        <Text className="icon iconfont icon-rank"></Text>
      </View>
      <Text>排名页面</Text>
    </View>
  );
}
