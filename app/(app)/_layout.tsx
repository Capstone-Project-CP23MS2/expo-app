import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

type Props = {}

const AppEntry = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(tabs)/activities" options={{ headerShown: false }} /> */}
      <Stack.Screen name="activities/[id]" options={{ headerTitle: 'Activities' }} />
      <Stack.Screen name="activities/create-form" options={{ headerTitle: 'Activities' }} />
      <Stack.Screen name="activities/edit-form" options={{ headerTitle: 'Activities' }} />
    </Stack>
  )
}

export default AppEntry
