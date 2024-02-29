import { useEffect, useState, createContext, useContext, PropsWithChildren } from 'react'
import { useRouter, useSegments } from 'expo-router'

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { set } from 'zod'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useStorageState } from './useStorageState'

import { supabase } from '@/utils/supabase'
import { getItemStorage } from '@/utils/storageHelper'

type UserIdentity = {
  userId?: string | any
  userName: string | any
  email: string
  idToken: string | any
  photo: string | any
}
type AuthContextType = {
  currentUser: UserIdentity | null
  isLoading: boolean
  signIn: () => void
  register: () => void
  signOut: () => void
  session: any
}

const TOKEN_KEY = 'my-jwt'

const AuthContext = createContext<AuthContextType | null | any>(null)
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: PropsWithChildren) {
  const rootSegment = useSegments()[0]
  const router = useRouter()
  // const [userInfo, setUserInfo] = useState(null as any)
  const [user, setUser] = useState<UserIdentity | any>(null)
  // const [idToken, setIdToken] = useState<any>('')
  const [email, setEmail] = useState<string | any>(null)
  const test = getItemStorage('@myData')

  const [[isLoading, session], setSession] = useStorageState('session')

  const configureGoogleSignIn = async () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    })
  }

  const checkLogin = async () => {
    try {
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    } finally {
    }
    /*
    const { data, error } = await supabase.auth.api.getUserByCookie()
    if (data) {
      console.log('data', data)
      setEmail(data.email)
      setUser({
        idToken: data.idToken,
        userName: data.userName,
        email: data.email,
        photo: data.photo,
      })
    } */
  }
  useEffect(() => {
    configureGoogleSignIn()
    checkLogin()
  }, [])
  // useEffect(() => {
  //   // if (1) return router.replace('/(auth)/createUser')
  //   if (email === undefined) return

  //   if (!email && rootSegment !== '(auth)') return router.replace('/(auth)/login')
  //   if (email && rootSegment !== '(app)') {
  //     console.log('auth', email)

  //     return router.replace(`/(auth)/createUser/${email}`)
  //     // return router.replace('/(app)/(tabs)/activities')
  //   }
  // }, [email, rootSegment])

  const signInWithSupabase = async (idToken: string) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    })
  }
  const signIn = async ({ returnTo }: { returnTo: string }) => {
    // isUserExists()
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      const { idToken, user } = userInfo
      // console.log("🚀 ~ signIn ~ test:", test)

      setEmail(user.email)
      setUser({
        idToken: idToken,
        userName: user.name,
        email: user.email,
        photo: user.photo,
      })
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log('some other error happened')
      }
    }
  }

  const signOut = async () => {
    // setUser(null)
    setEmail(null)
    GoogleSignin.revokeAccess()
    GoogleSignin.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        setUser,
        signIn,
        signOut,
        email,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
