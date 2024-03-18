import { useEffect, useState } from 'react'
import { Redirect, useRouter, useFocusEffect, Link } from 'expo-router'
import { View, Button, Text } from 'react-native'
import { useAuth } from '@/context/authContext'
import AppButton from '@/modules/shared/AppButton'
import { UseDeleteUser } from '@/hooks/useAPI'
import { LoaderScreen } from 'react-native-ui-lib'
import {
  GoogleSignin,
  User as GoogleUserInfo,
  statusCodes,
} from '@react-native-google-signin/google-signin'

export default function login() {
  const router = useRouter()

  const { user, session, onLogin, onRegister, onLogout, isLoading } = useAuth()

  useEffect(() => {
    console.log('🍟 login')

    const configureGoogleSignIn = async () => {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
      })
      console.log('📐 ~ configureGoogleSignIn')
    }
    configureGoogleSignIn()
  }, [])

  const deleteMutation = UseDeleteUser()
  const onTestDetele = async () => {
    deleteMutation.mutate('6', {
      onSuccess() {
        onLogout!()
        console.log('🚮 Delete Test User Success')
      },
    })
  }
  const onGoogleSignIn = async () => {
    await onLogin()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppButton variant="primary" label="ลงชื่อเข้าใช้ด้วย Google" onPress={onGoogleSignIn} />
    </View>
  )
}
