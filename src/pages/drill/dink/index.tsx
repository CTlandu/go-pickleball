import { View, Text, Image } from '@tarojs/components'
import { useLoad, navigateTo } from '@tarojs/taro'
import './index.scss'

export default function Dink() {
  useLoad(() => {
    console.log('Dink page loaded.')
  })

  // 丁克球练习类型
  const dinkTypes = [
    { id: 1, title: '对角丁克', description: '练习对角线方向的丁克球控制', path: '/pages/drill/dink/diagonal/index' },
    { id: 2, title: '猫和老鼠丁克', description: '一人进攻一人防守的丁克练习', path: '/pages/drill/dink/cat-mouse/index' },
    { id: 3, title: '直线丁克', description: '练习直线方向的丁克球控制', path: '/pages/drill/dink/straight/index' },
    { id: 4, title: '交替丁克', description: '两人交替击打丁克球', path: '/pages/drill/dink/alternate/index' },
    { id: 5, title: '移动丁克', description: '移动中进行丁克球练习', path: '/pages/drill/dink/moving/index' },
    { id: 6, title: '高低丁克', description: '练习不同高度的丁克球', path: '/pages/drill/dink/high-low/index' },
    { id: 7, title: '三人丁克', description: '三人轮换的丁克球练习', path: '/pages/drill/dink/three-person/index' },
    { id: 8, title: '比赛式丁克', description: '模拟比赛中的丁克球情境', path: '/pages/drill/dink/game-style/index' }
  ]

  // 处理卡片点击
  const handleCardClick = (path) => {
    navigateTo({ url: path })
  }

  return (
    <View className='dink-page'>
      <View className='dink-header'>
        <Text className='dink-title'>丁克球练习</Text>
        <Text className='dink-subtitle'>选择一种练习方式</Text>
      </View>
      
      <View className='dink-container'>
        {dinkTypes.map(dink => (
          <View 
            key={dink.id} 
            className='dink-card'
            onClick={() => handleCardClick(dink.path)}
          >
            <Image 
              className='dink-image' 
              src='https://via.placeholder.com/100' 
              mode='aspectFill'
            />
            <View className='dink-info'>
              <Text className='dink-card-title'>{dink.title}</Text>
              <Text className='dink-card-description'>{dink.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}