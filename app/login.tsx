import { StyleSheet, Text, View, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import Auth from '@/modules/auth/Auth'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { createStore } from 'zustand-x'

export const userStore = createStore('user')({
  isLoading: false,
  user: null as any,
})

const login = () => {
  const [userInfo, setUserInfo] = useState(null as any)
  const router = useRouter()

  const configureGoogleSignIn = async () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      //TODO: change webClientId
      // webClientId: '575114259668-gkn5f4bn32q5ae4ss6ehuml4ij515kog.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      webClientId: '30535345538-08koucd1b3fl5fhaufbel0c5kke2aq9a.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      iosClientId: '30535345538-757nuip8mi810r02g6noq4kfi5j7pjg0.apps.googleusercontent.com',
    })
  }

  useEffect(() => {
    configureGoogleSignIn()
  })

  const isSignedIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      if (userInfo) {
        setUserInfo(userInfo)
        userStore.set.isLoading(true)
        userStore.set.user(userInfo)
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

export default login
