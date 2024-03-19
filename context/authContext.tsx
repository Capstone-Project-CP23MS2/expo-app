import { createContext, useContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import {
  GoogleSignin,
  statusCodes,
  User as GoogleUserInfo,
} from '@react-native-google-signin/google-signin'
import { UserResponse } from '@/api/type'
import { useRouter, useSegments } from 'expo-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import usersApi from '@/api/users'
import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { set } from 'zod'

const TOKEN_KEY = 'my-jwt'

interface AuthProps {
  user?: UserResponse | null
  session?: {
    idToken: string | null | undefined
    authenticated: boolean | null
  }
  onRegister?: (newUser: UserResponse) => void
  onLogin?: (args?: { redirectToRegister?: boolean }) => Promise<any>
  onLogout?: () => Promise<any>
  isLoading?: boolean
}

export const AuthContext = createContext<AuthProps>({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<{
    idToken: string | null | undefined
    authenticated: boolean | null
  }>({ idToken: null, authenticated: null })
  const [user, setUser] = useState<UserResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)

  const router = useRouter()
  const rootSegment = useSegments()[0]
  const queryClient = useQueryClient()

  useEffect(() => {
    const init = async () => {
      const isSignedInWithGoogle = await GoogleSignin.isSignedIn()
      if (!isSignedInWithGoogle) return setIsLoading(false)

      console.log(`😀 You are already logged in with Google.`)

      const { email, idToken } = await googleAuthentication()
      setSession({
        authenticated: true,
        idToken: idToken,
      })
      setIsLoading(true)
      await SecureStore.setItemAsync(TOKEN_KEY, idToken!)
      console.log('🔐 Authentication with Google success')
      loginMutation.mutate(undefined, {
        onSettled: async () => {
          setIsLoading(false)
        },
      })
    }
    configureGoogleSignIn()

    init()
  }, [])

  // useEffect(() => {
  //   if (!user && rootSegment !== '(auth)') return router.replace('/(auth)/login')
  //   if (user && rootSegment !== '(app)') return router.replace('/(app)/(tabs)')
  // }, [user, rootSegment])

  const register = async (newUser: UserResponse) => {
    setUser(newUser)
    router.push('/(app)/(tabs)')
  }

  const loginMutation = useMutation({
    mutationFn: usersApi.getMyUserInfo,
    onSuccess: async user => {
      await queryClient.invalidateQueries({ queryKey: ['user-info'] })
      setUser(user)
      router.replace('/(app)/(tabs)/')
    },
  })

  const login = async ({ redirectToRegister = true } = {}) => {
    const isSignedInWithGoogle = await GoogleSignin.isSignedIn()
    if (isSignedInWithGoogle) logout()

    const { email, idToken } = await googleAuthentication()
    setSession({
      authenticated: true,
      idToken: idToken,
    })

    setIsLoading(true)
    await SecureStore.setItemAsync(TOKEN_KEY, idToken!)
    console.log('🔐 Authentication with Google success')
    loginMutation.mutate(undefined, {
      onError: async (error: Error | AxiosError) => {
        if (!isAxiosError(error)) return
        if (error.response?.status === 404) {
          router.push({
            pathname: '/(auth)/register',
            params: { email },
          })
        }
      },
      onSettled: async () => {
        setIsLoading(false)
      },
    })
  }

  const logout = async () => {
    setIsLoading(true)
    console.log('🔓 Logout')

    setSession({
      idToken: null,
      authenticated: false,
    })
    setUser(null)
    GoogleSignin.revokeAccess()
    GoogleSignin.signOut()
    await SecureStore.deleteItemAsync(TOKEN_KEY)
    queryClient.removeQueries({ queryKey: ['user-info'] })

    setIsLoading(false)
  }

  const value = {
    user,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    session,
    isLoading: isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const configureGoogleSignIn = async () => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  })
}

const googleAuthentication = async () => {
  try {
    await GoogleSignin.hasPlayServices()

    const isSignedInWithGoogle = await GoogleSignin.isSignedIn()
    let signInFuction = isSignedInWithGoogle ? GoogleSignin.signInSilently : GoogleSignin.signIn

    const {
      idToken,
      user: { email },
    }: GoogleUserInfo = await signInFuction()

    await SecureStore.setItemAsync(TOKEN_KEY, idToken!)
    console.log('🔐 Authentication with Google success')

    return { email, idToken }
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
