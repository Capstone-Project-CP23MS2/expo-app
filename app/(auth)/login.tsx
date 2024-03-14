import { useEffect, useState } from 'react'
import { Redirect, useRouter, useFocusEffect, Link } from 'expo-router'
import { View, Button, Text } from 'react-native'
import { useAuth } from '@/context/authContext'
import AppButton from '@/modules/shared/AppButton'
import { UseDeleteUser } from '@/hooks/useAPI'
import { LoaderScreen } from 'react-native-ui-lib'

export default function login() {
  const router = useRouter()

  const { currentUser, authState, onLogin, onRegister, onLogout, test, isLoading } = useAuth()

  const onGoogleSignIn = async () => {
    const result = await onLogin!()

    // if (result.error && result.error.status === 404) {
    //   console.log('🌟', result.error.status)

    //   router.push({ pathname: '/(auth)/register', params: { email: result.email } })
    // }
  }
  const deleteMutation = UseDeleteUser()
  const onTestDetele = async () => {
    deleteMutation.mutate('6', {
      onSuccess() {
        onLogout!()
        console.log('🚮 Delete Test User Success')
      },
    })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Button title="ลงชื่อเข้าใช้ด้วย Google" onPress={signIn} /> */}
      <Text>authenticated: {authState?.authenticated ? 'true' : 'false'}</Text>
      <Text>authorized: {authState?.authorized ? 'true' : 'false'}</Text>
      <AppButton variant="primary" label="ลงชื่อเข้าใช้ด้วย Google" onPress={onGoogleSignIn} />
      <AppButton variant="secondary" label="Test" onPress={onGoogleSignIn} />
      <AppButton variant="secondary" label="Logout" onPress={onLogout} />
      <AppButton variant="secondary" label="Delete" onPress={onTestDetele} />
      <AppButton variant="secondary" label="test" onPress={test} />

      {authState?.authenticated && (
        <View>
          <Text>Current User</Text>
          <Text>username: {currentUser?.username}</Text>
          <Text>email: {currentUser?.email}</Text>
          <Text>dateOfBirth: {currentUser?.dateOfBirth}</Text>
          <Text>Auth State</Text>
          <Text>token: {String(authState?.token).substring(0, 3)}</Text>
          <Text>authenticated: {authState?.authenticated ? 'true' : 'false'}</Text>
        </View>
      )}
    </View>
  )
}
