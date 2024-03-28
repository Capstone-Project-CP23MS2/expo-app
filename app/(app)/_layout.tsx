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
      <Stack.Screen name="activities/[id]" options={{ headerTitle: 'Activity Details' }} />
      <Stack.Screen name="activities/create-form" options={{ headerTitle: 'Create Activity' }} />
    </Stack>
  )
}

export default AppEntry
