import { Redirect, Slot, useRouter, Stack } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { useEffect, useState } from 'react'
import { View, Button, Text, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { COLORS, FONT } from '@/constants'
import { isLoading } from 'expo-font'
import { userStore } from '../login'

function AppLayout() {
  const isLoading = userStore.get.isLoading()
  const router = useRouter()

  if (isLoading) {
    return <ActivityIndicator animating={true} color={'black'} />
  }

  if (!isLoading) {
    return <Redirect href="/login" />
  }

  return (
    <Stack>
      <StatusBar style="dark" />
      <Stack.Screen name="(app)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)/listing/[id]" options={{ headerTitle: '' }} />
      <Stack.Screen name="(app)/activities/[id]" options={{ headerTitle: 'Activities' }} />
    </Stack>
  )
}

export default AppLayout
