import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Tabs } from 'expo-router'
import { COLORS, FONT } from '@/constants'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

type Props = {}

const TabsLayout = (props: Props) => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.black,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 60,
          backgroundColor: 'white',
          shadowOffset: { width: 5, height: 5 },
          shadowColor: 'gray',
          shadowRadius: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="view-list" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="dev"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="whishlists"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="inventory" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({
  tabBar: {
    fontFamily: FONT.semiBold,
  },
})
