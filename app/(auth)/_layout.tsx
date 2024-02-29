import React from 'react'
import { Stack } from 'expo-router'

type Props = {}

const StackLayout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: true, headerTitle: 'Register' }} />
    </Stack>
  )
}

export default StackLayout
