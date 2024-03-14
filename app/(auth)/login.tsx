import { useEffect, useState } from 'react'
import { Redirect, useRouter, useFocusEffect } from 'expo-router'
import { useAuth } from '@/context/auth'
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
import Colors from '@/constants/Colors'

const soccer = require('../../assets/images/login-soccer.png')

export default function login() {
  const { user, signIn } = useAuth()
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 60 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>SPORT CONNECT</Text>
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
        <View style={{ gap: 10, paddingBottom: 20, alignItems: 'center' }}>
          <Text style={styles.title}>Let's get started</Text>
          <Text style={styles.subTitle}>Connect your lifestyle with SConnect</Text>
        </View>
        <Pressable style={styles.button} onPress={signIn}>
          <Text style={styles.text}>Sign in with Google</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: Colors.primary,
  },
})
