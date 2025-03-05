import { View, Text, Image, Picker } from "@tarojs/components";
import { useLoad, showToast, getLocation } from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";

export default function Courts() {
  const [region, setRegion] = useState({
    province: "",
    city: "",
    district: "",
  });

  useLoad(() => {
    // 获取用户当前位置
    getLocation({
      type: "gcj02",
      isHighAccuracy: true,
      success: function (res) {
        console.log("获取位置成功", res);
        // 添加日志查看省市区信息
        console.log("位置解析结果 - 省份:", res.province, "城市:", res.city, "区县:", res.district);
        
        if (res.city) {
          setRegion({
            province: res.province || "",
            city: res.city || "",
            district: res.district || "",
          });
        }
      },
      fail: function () {
        console.log("获取位置失败");
        showToast({
          title: "请手动选择地区",
          icon: "none",
        });
      },
    });
  });

  // 示例球场数据
  const courts = [
    {
      id: 1,
      name: "深云文体公园",
      address: "深圳市南山区深云路123号",
      price: "￥50/小时",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      name: "深圳湾短式网球场",
      address: "深圳市南山区滨海大道3008号",
      price: "￥80/小时",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "PickleCoffee",
      address: "深圳市福田区车公庙创投大厦1楼",
      price: "￥100/小时",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  const handleRegionChange = (e) => {
    const values = e.detail.value;
    setRegion({
      province: values[0],
      city: values[1],
      district: values[2],
    });
    showToast({
      title: "已选择: " + values.join("-"),
      icon: "none",
    });
  };

  // 根据选择的地区筛选球场
  const filteredCourts = courts.filter((court) => {
    if (!region.district) {
      return court.address.includes(region.city);
    }
    return court.address.includes(region.district);
  });

  return (
    <View className="courts-page">
      <View className="location-picker">
        <Picker
          mode="region"
          onChange={handleRegionChange}
          value={[region.province, region.city, region.district]}
        >
          <View className="picker-wrapper">
            <View className="picker-icon">📍</View>
            <View className="picker-text">
              {region.city
                ? `${region.city}${
                    region.district ? ` - ${region.district}` : ""
                  }`
                : "选择地区"}
            </View>
            <View className="picker-arrow">▼</View>
          </View>
        </Picker>
      </View>

      <View className="courts-container">
        {filteredCourts.map((court) => (
          <View key={court.id} className="court-card">
            <Image
              className="court-image"
              src={court.image}
              mode="aspectFill"
            />
            <View className="court-info">
              <Text className="court-name">{court.name}</Text>
              <Text className="court-address">{court.address}</Text>
              <Text className="court-price">{court.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
