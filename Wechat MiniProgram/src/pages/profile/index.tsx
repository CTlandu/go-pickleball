import { View, Text, Button, Image } from '@tarojs/components'
import { useLoad, getUserProfile, getUserInfo, login, showToast } from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

export default function Profile() {
  const [userInfo, setUserInfo] = useState<any>({})
  const [hasUserInfo, setHasUserInfo] = useState(false)

  useLoad(() => {
    console.log('Profile page loaded.')
  })

  // 获取用户信息（新版本方式）
  const handleGetUserProfile = () => {
    getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        console.log('获取用户信息成功', res)
        setUserInfo(res.userInfo)
        setHasUserInfo(true)
        showToast({
          title: '获取成功',
          icon: 'success'
        })
      },
      fail: (err) => {
        console.log('获取用户信息失败', err)
        showToast({
          title: '获取失败',
          icon: 'error'
        })
      }
    })
  }

  // 获取手机号
  const getPhoneNumber = (e) => {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // 需要通过云函数解密获取手机号
      console.log('手机号加密数据', e.detail)
      showToast({
        title: '获取手机号成功，需后端解密',
        icon: 'success'
      })
    } else {
      showToast({
        title: '获取手机号失败',
        icon: 'error'
      })
    }
  }

  return (
    <View className='profile-page'>
      <View className='profile-header'>
        {hasUserInfo ? (
          <View className='user-info'>
            <Image className='avatar' src={userInfo.avatarUrl} />
            <Text className='nickname'>{userInfo.nickName}</Text>
            <Text className='location'>{userInfo.province} {userInfo.city}</Text>
          </View>
        ) : (
          <View className='login-section'>
            <Text className='login-title'>登录获取更多功能</Text>
            <Button className='login-btn' onClick={handleGetUserProfile}>
              获取用户信息
            </Button>
          </View>
        )}
      </View>

      <View className='profile-content'>
        {hasUserInfo && (
          <Button 
            className='phone-btn' 
            openType='getPhoneNumber' 
            onGetPhoneNumber={getPhoneNumber}
          >
            获取手机号
          </Button>
        )}

        <View className='menu-list'>
          <View className='menu-item'>
            <Text className='menu-text'>我的约球</Text>
          </View>
          <View className='menu-item'>
            <Text className='menu-text'>我的收藏</Text>
          </View>
          <View className='menu-item'>
            <Text className='menu-text'>设置</Text>
          </View>
        </View>
      </View>
    </View>
  )
}