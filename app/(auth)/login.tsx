import { useEffect, useState } from 'react'
import { Redirect, useRouter, useFocusEffect } from 'expo-router'
import { useAuth } from '@/context/auth'
import { View, Button, Text } from 'react-native'

export default function login() {
  const { user, signIn } = useAuth()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="ลงชื่อเข้าใช้ด้วย Google" onPress={signIn} />
    </View>
  )
}
