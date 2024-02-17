import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { Redirect, useRouter, useFocusEffect } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Button, Text } from 'react-native'

export default function () {
  const [userInfo, setUserInfo] = useState(null as any)
  const router = useRouter()

  const configureGoogleSignIn = async () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '30535345538-08koucd1b3fl5fhaufbel0c5kke2aq9a.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    })
  }

  useEffect(() => {
    configureGoogleSignIn()
  })

  const isSignedIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      setUserInfo(userInfo.idToken)
      if (userInfo) {
        router.replace('/(tabs)/activities')
        console.log(userInfo.user.email)
      } else {
        console.log('User not found')
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  const signOut = async () => {
    setUserInfo(undefined)
    GoogleSignin.revokeAccess()
    GoogleSignin.signOut()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={isSignedIn}
      />
    </View>
  )
}
