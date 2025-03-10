import { View, Text, Image } from '@tarojs/components'
import { useLoad, navigateTo } from '@tarojs/taro'
import './index.scss'

export default function Drill() {
  useLoad(() => {
    console.log('Drill page loaded.')
  })

  // 练球类型数据
  const drillTypes = [
    { id: 1, title: 'Dink', subtitle: '丁克球', description: '短距离控制性击球练习', path: '/pages/drill/dink/index' },
    { id: 2, title: 'Drop', subtitle: '长丁克', description: '从后场到前场的控制性击球', path: '/pages/drill/drop/index' },
    { id: 3, title: 'Volley', subtitle: '截击', description: '网前截击球技术练习', path: '/pages/drill/volley/index' },
    { id: 4, title: 'Wall Drill', subtitle: '单人对墙练习', description: '利用墙壁进行的单人练习', path: '/pages/drill/wall/index' }
  ]
  // 处理卡片点击
  const handleCardClick = (path) => {
    navigateTo({ url: path })
  }

  return (
    <View className='drill-page'>
      <View className='drill-container'>
        {drillTypes.map(drill => (
          <View 
            key={drill.id} 
            className='drill-card'
            onClick={() => handleCardClick(drill.path)}
          >
            <Image 
              className='drill-image' 
              src='https://via.placeholder.com/150' 
              mode='aspectFill'
            />
            <View className='drill-info'>
              <Text className='drill-title'>{drill.title}</Text>
              <Text className='drill-subtitle'>{drill.subtitle}</Text>
              <Text className='drill-description'>{drill.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
