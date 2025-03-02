import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Drill() {
  useLoad(() => {
    console.log('Drill page loaded.')
  })

  return (
    <View className='drill'>
      <Text>练球页面</Text>
    </View>
  )
}
