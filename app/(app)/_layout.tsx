import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'

type Props = {}

const AppEntry = (props: Props) => {
  // if (isLoading) {
  //   return <Text>Loading...</Text>
  // }
  // if (!session) {
  //   // On web, static rendering will stop here as the user is not authenticated
  //   // in the headless Node process that the pages are rendered in.
  //   console.log('((app)_layout.tsx)Redirecting to login')

  //   return <Redirect href="/(auth)/login" />
  // }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(tabs)/activities" options={{ headerShown: false }} /> */}
      <Stack.Screen name="activities/[id]" options={{ headerTitle: 'Activities' }} />
      <Stack.Screen name="activities/create-form" options={{ headerTitle: 'Activities' }} />
    </Stack>
  )
}

export default AppEntry
