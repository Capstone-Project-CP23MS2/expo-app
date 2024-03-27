import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Tabs } from 'expo-router'
import { COLORS, FONT } from '@/constants'
import {
  FontAwesome5,
  MaterialIcons,
  Octicons,
  Fontisto,
  AntDesign,
  Ionicons,
  Entypo,
} from '@expo/vector-icons'

type Props = {}

const TabsLayout = (props: Props) => {
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
          tabBarIcon: ({ size, color }) => <Entypo name="notification" size={size} color={color} />,
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
