import { useEffect, useState } from 'react'
import { Redirect, useRouter, useFocusEffect, Link } from 'expo-router'
import {
  View,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  StatusBar,
  Platform,
} from 'react-native'
import { useAuth } from '@/context/authContext'
import AppButton from '@/modules/shared/AppButton'
import { UseDeleteUser } from '@/hooks/useAPI'
import { LoaderScreen } from 'react-native-ui-lib'
import {
  GoogleSignin,
  User as GoogleUserInfo,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { TouchableOpacity } from 'react-native'

import Colors from '@/constants/Colors'
import { RNUIButton } from '@/components'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'

const soccer = require('../../assets/images/login-soccer.png')

export default function login() {
  const router = useRouter()

  const { user, session, onLogin, onRegister, onLogout, isLoading } = useAuth()

  useEffect(() => {
    console.log('🍟 login')

    const configureGoogleSignIn = async () => {
      GoogleSignin.configure({
        scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
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
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingTop: 80, alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <FontAwesome5 name="walking" size={40} color="white" />
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>SCONNECT</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 50,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <Image source={soccer} style={styles.image}></Image>
        <View style={{ gap: 5, paddingBottom: 20, alignItems: 'center' }}>
          <Text style={styles.title}>Let's get started</Text>
          <Text style={styles.subTitle}>Connect your lifestyle with Sport Connect</Text>
        </View>
        <View>
          <RNUIButton color="primary" label="Sign in with Google" onPress={onGoogleSignIn} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  image: {
    height: 350,
    width: 350,
    position: 'absolute',
    top: -250,
    left: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: Colors.primary,
  },
  subTitle: {
    color: Colors.grey,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
})
