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
        tabBarActiveTintColor: COLORS.black,
        // tabBarLabelStyle: {
        // fontFamily: FONT.semiBold,
        // },
        tabBarLabelStyle: styles.tabBar,
        // tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Activities',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="directions-run" size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="demo"
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="whishlists"
        options={{
          tabBarLabel: 'Wishlists',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="inventory" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="forward-to-inbox" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          // headerShown: false, // Hide the header
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dev"
        options={{
          tabBarLabel: 'Dev',
          // headerShown: false, // Hide the header
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
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
