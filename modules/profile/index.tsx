import { useAuth } from '@/context/authContext'
import { UseDeleteUser } from '@/hooks/useAPI'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, Modal, StyleSheet, View, Pressable } from 'react-native'
import { Button, ListItem, Text } from 'react-native-ui-lib'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { SIZES } from '@/constants'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {}

const Page = (props: Props) => {
  const { styles } = useStyles(stylesheet)
  const { user, onLogout } = useAuth()
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <MaterialIcons name="account-circle" size={100} color={'black'} />
          <Text style={{ fontWeight: 'bold', fontSize: SIZES.large }}>{user?.username}</Text>
          <Text md>{user?.email}</Text>
        </View>

        <View style={styles.settingList}>
          {settingList.map((item, index) => (
            <Pressable
              key={item.id}
              style={styles.settingItemWrapper}
              activeOpacity={0.5}
              onPress={item.onPress}
              android_ripple={{ color: 'gray' }}
            >
              <View style={styles.settingItem}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <MaterialIcons name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
          ))}
        </View>
        <Button label="Sign Out" onPress={onLogout} />
      </View>
    </SafeAreaView>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  settingList: {
    flexDirection: 'column',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacings.lg,
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
  },
  settingItemWrapper: {
    paddingHorizontal: theme.spacings.lg,
  },
  settingTitle: {
    ...theme.typography.md,
  },

  content: {
    // padding: 20,
    gap: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    width: '100%',
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 15,
  },
}))

export default Page
