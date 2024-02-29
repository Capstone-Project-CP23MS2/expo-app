import apiClient from '@/api/apiClient'
import { UseGetActivities, UseGetUser, UseGetUserByEmail } from '@/hooks/useAPI'
import { createContext, useContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { set } from 'zod'
import {
  GoogleSignin,
  statusCodes,
  User as GoogleUserInfo,
} from '@react-native-google-signin/google-signin'
import { UserResponse } from '@/api/type'
import { useRouter, useSegments } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getUserByEmail } from '@/api/users'

interface AuthProps {
  currentUser?: UserResponse | null
  authState?: { token: string | null | undefined; authenticated: boolean | null }
  onRegister?: (newUser: UserResponse) => Promise<any>
  onLogin?: () => Promise<any>
  onLogout?: () => Promise<any>
}

const TOKEN_KEY = 'my-jwt'
const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!

export const AuthContext = createContext<AuthProps>({})

export const useAuth = () => useContext(AuthContext)

const configureGoogleSignIn = async () => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  })
  console.log('📐 ~ configureGoogleSignIn')
}

const googleSignIn = async () => {
  try {
    console.log('🔍 signIn')

    await GoogleSignin.hasPlayServices()
    const userInfo: GoogleUserInfo = await GoogleSignin.signIn()
    const { idToken, user } = userInfo
    return userInfo
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log('🚨 ~ googleSignIn ~ user cancelled the login flow')
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('🚨 ~ googleSignIn ~ operation (e.g. sign in) is in progress already')
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log('🚨 ~ googleSignIn ~ play services not available or outdated')
    } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      console.log(
        '🚨 ~ googleSignIn ~ Useful for use with signInSilently() - no user has signed in yet',
      )
    } else {
      // some other error happened
      console.log('🚨 ~ googleSignIn ~ some other error happened')
    }
  }
}

const googleSignInSilently = async () => {
  try {
    console.log('🔍 signInSilently')

    const userInfo: GoogleUserInfo = await GoogleSignin.signInSilently()
    return userInfo
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // user has not signed in yet
      console.log('🚨 ~ googleSignInSilently ~ user has not signed in yet')
    } else {
      console.log('🚨 ~ googleSignInSilently ~ some other error')
    }
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null | undefined
    authenticated: boolean | null
  }>({ token: null, authenticated: null })
  const [user, setUser] = useState<UserResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const rootSegment = useSegments()[0]

  useEffect(() => {
    configureGoogleSignIn()
    const loadToken = async () => {
      // const token = await SecureStore.getItemAsync(TOKEN_KEY)
      // console.log('stored token:', !!token)
      // if (!token) return
      // ยิง api ด้วย token ดูว่ามีอยู่จริงหรือไม่
      // if (res.error)
      //   if (token) {
      //     apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
      //     setAuthState({
      //       token,
      //       authenticated: true,
      //     })
      //   } else {
      //     // go to login
      //   }
    }
    // loadToken()
    async function init() {
      const isSignedInWithGoogle = await GoogleSignin.isSignedIn()
      console.log('isSignedInWithGoogle', isSignedInWithGoogle)
      if (!isSignedInWithGoogle) return
      const result = await login(isSignedInWithGoogle)

      // try {
      //   const { idToken }: GoogleUserInfo = await GoogleSignin.signInSilently()
      //   setAuthState({
      //     token: idToken,
      //     authenticated: true,
      //   })
      //   console.log('📝 silently signIn success')
      // } catch (error: any) {
      //   if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      //     console.log('❗ user has not signed in yet')
      //   } else {
      //     console.log('❗ some other error')
      //   }
      // }
    }
    init()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    console.log('authState changed')

    // if (1) return router.replace('/(auth)/createUser')
    if (!authState.authenticated && rootSegment !== '(auth)') {
      // return router.replace('/(auth)/register')
      return router.replace('/(auth)/login')
    }

    if (authState.authenticated && rootSegment !== '(app)')
      return router.replace('/(app)/(tabs)/activities')
    // if (rootSegment !== '(app)') return
    // if (!email && rootSegment !== '(auth)') return router.replace('/(auth)/login')
    // if (email && rootSegment !== '(app)') {
    //   console.log('auth', email)

    //   return router.replace(`/(auth)/createUser/${email}`)
    //   // return router.replace('/(app)/(tabs)/activities')
    // }
  }, [authState, rootSegment])

  const register = async (newUser: UserResponse) => {
    setUser(newUser)
    setAuthState({
      ...authState,
      authenticated: true,
    })
    router.push('/(app)/(tabs)/activities')
    // try {
    //   const { data } = await apiClient.post<UserResponse>(`${API_URL}/users`, newUser, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   setUser({
    //     ...data,
    //   })
    //   setAuthState({
    //     ...authState,
    //     authenticated: true,
    //   })
    // } catch (e) {
    //   return { error: true, msg: (e as any).response.data.msg }
    // }
  }

  const login = async isSignedIn => {
    let email
    try {
      const { idToken, user: u } = isSignedIn ? await googleSignInSilently() : await googleSignIn()
      email = u.email
      setAuthState({
        ...authState,
        token: idToken,
      })
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${idToken}`

      const result = await apiClient.post<UserResponse>(`${API_URL}/auth/login`)
      console.log('tests', u.email)

      setUser({
        ...result.data,
      })
      setAuthState({
        ...authState,
        authenticated: true,
      })
      console.log('📝 set user & auth state')

      await SecureStore.setItemAsync(TOKEN_KEY, idToken!)
      console.log('📦 keep token in secure store')

      // router.push('/(app)/(tabs)/activities')
      console.log('🚀 ~ login sucess')

      return result
    } catch (e) {
      if ((e as any).response && (e as any).response.status === 404) {
        console.log('🚨 ~ login ~ user not found ')
        //   return router.push('/(auth)/register')
      }
      return {
        email,
        isError: true,
        error: {
          message: (e as any).response.data.message,
          status: (e as any).response.status,
        },
      }
    }
  }

  const logout = async () => {
    // Call your API
    setUser(null)
    setAuthState({
      token: null,
      authenticated: false,
    })
    GoogleSignin.revokeAccess()
    GoogleSignin.signOut()
  }

  const value = {
    currentUser: user,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
