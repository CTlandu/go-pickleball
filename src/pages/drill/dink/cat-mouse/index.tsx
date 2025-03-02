import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function CatMouseDink() {
  useLoad(() => {
    console.log('Cat Mouse Dink page loaded.')
  })

  return (
    <View className='cat-mouse-dink-page'>
      <View className='drill-header'>
        <Text className='drill-title'>猫和老鼠丁克</Text>
        <Text className='drill-subtitle'>一人进攻一人防守的丁克练习</Text>
      </View>
      
      <View className='drill-content'>
        <Image 
          className='drill-banner'
          src='https://via.placeholder.com/600x300'
          mode='aspectFill'
        />
        
        <View className='drill-section'>
          <Text className='section-title'>练习目的</Text>
          <Text className='section-text'>训练进攻和防守的转换能力，提高丁克球的控制精度。</Text>
        </View>
        
        <View className='drill-section'>
          <Text className='section-title'>练习方法</Text>
          <Text className='section-text'>
            1. 一人担任"猫"角色（进攻方），一人担任"老鼠"角色（防守方）\n
            2. "猫"尝试通过丁克球施压，"老鼠"专注于防守和控制\n
            3. 每回合结束后交换角色\n
            4. 每人在每个角色练习5-10分钟
          </Text>
        </View>
        
        <View className='drill-section'>
          <Text className='section-title'>视频教学</Text>
          <View className='video-placeholder'>
            <Text>视频教学即将上线</Text>
          </View>
        </View>
        
        <View className='drill-section'>
          <Text className='section-title'>注意事项</Text>
          <Text className='section-text'>
            - "猫"要注意控制进攻力度\n
            - "老鼠"要保持耐心，专注于回球质量\n
            - 双方都要保持正确的站位\n
            - 注意观察对方动作，预判球路
          </Text>
        </View>
      </View>
    </View>
  )
}