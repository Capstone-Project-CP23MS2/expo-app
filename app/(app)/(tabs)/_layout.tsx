import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Tabs } from 'expo-router'
import { COLORS, FONT } from '@/constants'
import { FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons'
import { useNotificationStore } from '@/stores/notificationStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {}

const TabsLayout = (props: Props) => {
  const unreadCount = useNotificationStore.get.unreadCount()

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        headerStyle: styles.header,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => <AntDesign name="profile" size={size} color={color} />,
          headerTitle: 'Activities',
          headerTitleAlign: 'center',
        }}
      />

      <Tabs.Screen
        name="dev"
        options={{
          tabBarIcon: ({ size, color }) => <FontAwesome5 name="dev" size={size} color={color} />,
          headerTitle: 'Development',
          headerTitleAlign: 'center',
          headerShadowVisible: true,
        }}
      />

      <Tabs.Screen
        name="whishlists"
        options={{
          tabBarIcon: ({ size, color }) => <AntDesign name="star" size={size} color={color} />,
          headerTitleAlign: 'center',
          headerTitle: 'Review',
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ size, color }) => (
            <NotificationIcon size={size} color={color} unreadCount={unreadCount} />
          ),
          headerTitleAlign: 'center',
          headerTitle: 'Notifications',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
          headerTitleAlign: 'center',
          headerTitle: 'Profile',
        }}
      />
    </Tabs>
  )
}

const NotificationIcon = ({ size, color, unreadCount }: any) => (
  <View>
    <Entypo name="notification" size={size} color={color} />
    {unreadCount > 0 && (
      <View
        style={{
          position: 'absolute',
          top: -6,
          right: -6,
          backgroundColor: 'red',
          borderRadius: 20,
          height: 20,
          width: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{unreadCount}</Text>
      </View>
    )}
  </View>
)

export default TabsLayout

const styles = StyleSheet.create({
  tabBar: {
    fontFamily: FONT.semiBold,
    height: 60,
    backgroundColor: '#FFF',
  },
  header: {
    shadowColor: '#000',
  },
})
