import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, Stack, useRouter } from 'expo-router'
import { UseGetMyUserInfo } from '@/hooks/useAPI'
import { useAuth } from '@/context/authContext'
import { LoaderScreen } from 'react-native-ui-lib'

type Props = {}

const AppEntry = (props: Props) => {
  const router = useRouter()
  const { data: userInfo, isLoading: isUserInfoLoading } = UseGetMyUserInfo()
  const { authState, isLoading } = useAuth()

  if (isLoading || isUserInfoLoading) {
    return <LoaderScreen />
  }
  // useEffect(() => {
  //   console.log('🚀 ~ authState:', authState)
  // }, [authState, isLoading, router])
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
