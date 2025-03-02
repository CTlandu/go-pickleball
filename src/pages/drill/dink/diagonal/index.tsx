import { View, Text, Image, Video } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function DiagonalDink() {
  useLoad(() => {
    console.log("Diagonal Dink page loaded.");
  });

  return (
    <View className="diagonal-dink-page">
      <View className="drill-header">
        <Text className="drill-title">对角丁克</Text>
        <Text className="drill-subtitle">练习对角线方向的丁克球控制</Text>
      </View>

      <View className="drill-content">
        <Image
          className="drill-banner"
          src="https://via.placeholder.com/600x300"
          mode="aspectFill"
        />

        <View className="drill-section">
          <Text className="section-title">练习目的</Text>
          <Text className="section-text">
            提高对角线丁克球的精准度和控制力，增强非惯用手的控球能力。
          </Text>
        </View>

        <View className="drill-section">
          <Text className="section-title">练习方法</Text>
          <Text className="section-text">
            1. 两人站在对角位置，一人发球开始练习\n 2.
            保持球低于网高，轻柔控制击球\n 3.
            尝试保持对角线方向，不要击打直线球\n 4.
            逐渐增加练习时间和连续击球次数
          </Text>
        </View>

        <View className="drill-section">
          <Text className="section-title">视频教学</Text>
          <Video
            className="drill-video"
            src="cloud://cloud1-5g7y8nff5b124141.636c-cloud1-5g7y8nff5b124141-1346084149/bandicam 2025-02-15 09-12-28-126.mp4"
            controls={true}
            autoplay={false}
            poster="https://via.placeholder.com/600x300"
            initialTime={0}
            id="diagonal-dink-video"
            loop={false}
            muted={false}
          />
        </View>

        <View className="drill-section">
          <Text className="section-title">注意事项</Text>
          <Text className="section-text">
            - 保持正确的握拍姿势\n - 击球点应在身体前方\n -
            保持手腕稳定，主要使用前臂发力\n - 专注于控制而非力量
          </Text>
        </View>
      </View>
    </View>
  );
}
