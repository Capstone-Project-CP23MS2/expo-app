import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { COLORS, FONT } from '@/constants';
import { FontAwesome5, AntDesign, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';

import { UseGetNotificationById } from '@/hooks/useAPI';
import { useAuth } from '@/context/authContext';

type Props = {};

const TabsLayout = (props: Props) => {
  const { user } = useAuth();
  const { data } = UseGetNotificationById(user?.userId);
  const { content: notifications } = data || {};

  const unreadCount = notifications?.filter(notification => notification.unRead).length;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        headerStyle: styles.header,
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home-filled" size={size} color={color} />
          ),
          headerTitle: 'Home',
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="calendar" size={size - 3} color={color} />
          ),
          headerTitle: 'Calendar',
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => <Entypo name="list" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="wishLists"
        options={{
          tabBarIcon: ({ size, color }) => <AntDesign name="star" size={size} color={color} />,
          headerTitle: 'Review',
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ size, color }) => (
            <NotificationIcon size={size} color={color} unreadCount={unreadCount} />
          ),
          headerTitle: 'Notifications',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name="person" size={size} color={color} />,
          headerTitle: 'Profile',
        }}
      />
    </Tabs>
  );
};

const NotificationIcon = ({ size, color, unreadCount }: any) => (
  <View>
    <Ionicons name="notifications" size={size} color={color} />
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
);

export default TabsLayout;

const styles = StyleSheet.create({
  tabBar: {
    fontFamily: FONT.semiBold,
    height: 60,
    backgroundColor: '#FFF',
  },
  header: {
    shadowColor: '#000',
  },
});
