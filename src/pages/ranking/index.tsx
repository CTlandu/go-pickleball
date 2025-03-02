import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Ranking() {
  useLoad(() => {
    console.log("Ranking page loaded.");
  });

  return (
    <View className="ranking">
      <Text>排名页面</Text>
    </View>
  );
}
