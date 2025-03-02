import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Hangout() {
  useLoad(() => {
    console.log("Hangout page loaded.");
  });

  return (
    <View className="hangout">
      <Text>球场</Text>
    </View>
  );
}
