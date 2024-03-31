import { useAuth } from '@/context/authContext'
import { UseDeleteUser, UseGetMyUserInfo } from '@/hooks/useAPI'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, Modal, StyleSheet, View, Pressable } from 'react-native'
import { Button, ListItem, Text } from 'react-native-ui-lib'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { SIZES } from '@/constants'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RNUIButton } from '@/components'
import ProfileSettingListItem from './components/ProfileSettingListItem'

type Props = {}

const Page = (props: Props) => {
  const { styles } = useStyles(stylesheet)
  const { onLogout } = useAuth()
  const { data: user } = UseGetMyUserInfo()
  const router = useRouter()
  const deleteMutation = UseDeleteUser()

  const settingList = [
    {
      id: 'user-edit',
      title: 'แก้ไขข้อมูล',
      icon: 'edit',
      onPress: () => {
        console.log('👤 Edit Profile')

        router.push('/profile/edit')
      },
    },
    {
      id: 'user-interest',
      title: 'สิ่งที่สนใจ',
      icon: 'heart',
      onPress: () => {
        console.log('👤 Edit Interest')
      },
    },
    {
      id: 'user-manage-account',
      title: 'จัดการบัญชี',
      icon: 'account',
      onPress: () => {
        console.log('👤 ManageAccount')
        router.push('/profile/manage-account')
      },
    },
  ]
  const handleSignOutPress = () => {
    console.log('Sign Out')
    onLogout?.()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <MaterialIcons name="account-circle" size={100} color={'black'} />
          <Text style={{ fontWeight: 'bold', fontSize: SIZES.large }}>{user?.username}</Text>
          <Text md>{user?.email}</Text>
        </View>

        <View style={styles.settingListContainer}>
          {settingList.map((item, index) => (
            <ProfileSettingListItem key={index} title={item.title} onPress={item.onPress} />
          ))}
        </View>
        <View style={styles.signOutContainer}></View>
        <ProfileSettingListItem title="ออกจากระบบ" onPress={handleSignOutPress} />
      </View>
    </SafeAreaView>
  )
}

const stylesheet = createStyleSheet(({ colors, spacings }) => ({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingTop: 20,
  },
  settingListContainer: {
    flexDirection: 'column',
  },
  signOutContainer: {
    // marginTop: spacings.lg,
  },
}))

export default Page
