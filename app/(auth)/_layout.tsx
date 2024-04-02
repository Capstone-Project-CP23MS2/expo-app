import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/context/authContext'
import { LoaderScreen } from 'react-native-ui-lib'

type Props = {}

const StackLayout = (props: Props) => {
  const { user, isLoading } = useAuth()
  // if (isLoading) {
  //   return <LoaderScreen />
  // }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false, headerTitle: 'New User' }} />
    </Stack>
  )
}

export default StackLayout
