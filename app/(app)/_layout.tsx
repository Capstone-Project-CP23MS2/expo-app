import React, { useEffect } from 'react'
import { Redirect, Stack, useRouter } from 'expo-router'
import { useAuth } from '@/context/authContext'
import { LoaderScreen } from 'react-native-ui-lib'

type Props = {}

const AppEntry = (props: Props) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoaderScreen />
  }
  if (!user) {
    return <Redirect href="/(auth)/login" />
  }
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(tabs)/activities" options={{ headerShown: false }} /> */}
      <Stack.Screen name="activities/[id]" options={{ headerTitle: 'Activity Details' }} />
      <Stack.Screen name="activities/create-form" options={{ headerTitle: 'Create Activity' }} />
      <Stack.Screen name="map/index" options={{ headerTitle: 'Map' }} />
      <Stack.Screen
        name="activities/edit"
        options={{
          headerTitle: 'Edit Activity',
          animation: 'slide_from_right',
          animationDuration: 200,
        }}
      />
      <Stack.Screen
        name="activities/search"
        options={{
          headerTitle: 'Search Activity',
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="profile/edit"
        options={{
          headerTitle: 'Edit Profile',
          animation: 'slide_from_right',
          animationDuration: 200,
        }}
      />
    </Stack>
  )
}

export default AppEntry
