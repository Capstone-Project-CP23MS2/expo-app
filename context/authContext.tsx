import { createContext, useContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import {
  GoogleSignin,
  statusCodes,
  User as GoogleUserInfo,
} from '@react-native-google-signin/google-signin'
import { UserResponse } from '@/api/type'
import { useRouter, useSegments } from 'expo-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import usersApi from '@/api/users'

interface AuthProps {
  currentUser?: UserResponse | null
  authState?: {
    token: string | null | undefined
    authenticated: boolean | null
    authorized?: boolean | null
    email?: string | any
  }
  onRegister?: (newUser: UserResponse) => Promise<any>
  onLogin?: () => Promise<any>
  onLogout?: () => Promise<any>
  isLoading?: boolean
}

const TOKEN_KEY = 'my-jwt'

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
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null | undefined
    authenticated: boolean | null
    authorized?: boolean | null
    email?: string | any
  }>({ token: null, authenticated: null })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const rootSegment = useSegments()[0]
  const queryClient = useQueryClient()
  const {
    data: currentUser,
    isLoading: isUserInfoLoading,
    error,
    refetch,
  } = useQuery<UserResponse>({
    queryKey: ['user-info'],
    queryFn: usersApi.getMyUserInfo,
    enabled: !!authState.token,
    retry: 0,
  })

  // useEffect(() => {
  //   if (error?.message === 'Request failed with status code 404') {
  //     return router.push('/(auth)/register')
  //   }
  // }, [error])

  useEffect(() => {
    async function init() {
      const isSignedInWithGoogle = await GoogleSignin.isSignedIn()
      console.log(`😀 You are already logged in with Google.`)
      if (!isSignedInWithGoogle) return
      await login()
    }
    configureGoogleSignIn()
    init()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!currentUser && rootSegment !== '(auth)') return router.replace('/(auth)/login')
    if (currentUser && rootSegment !== '(app)') return router.replace('/(app)/(tabs)')
  }, [currentUser, rootSegment])

  const googleAuthentication = async ({ mode = 'normal' }: { mode: 'normal' | 'silently' }) => {
    try {
      await GoogleSignin.hasPlayServices()
      let token, userEmail
      if (mode === 'normal') {
        const {
          idToken,
          user: { email },
        }: GoogleUserInfo = await GoogleSignin.signIn()
        token = idToken
        userEmail = email
      }

      const {
        idToken,
        user: { email },
      }: GoogleUserInfo = await GoogleSignin.signInSilently()
      token = idToken
      userEmail = email
      setAuthState({
        ...authState,
        authenticated: true,
        token: token,
        email: userEmail,
      })

      await SecureStore.setItemAsync(TOKEN_KEY, idToken!)
      console.log('🔐 Authentication with Google success')
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

  const register = async (newUser: UserResponse) => {
    // setUser(newUser)
    setAuthState({
      ...authState,
      authenticated: true,
    })
    router.push('/(app)/(tabs)/activities')
  }

  const login = async () => {
    try {
      setIsLoading(true)
      await googleAuthentication({ mode: 'normal' })
      const { error: loginError, isError: isLoginError } = await refetch()
      if (loginError && loginError.response.status === 502) throw new Error('User not found')
    } catch (e: Error | any) {
      if (e.message === 'User not found') {
        console.log('🚨 ~ login ~ user not found ')
        return router.push({ pathname: '/(auth)/register', params: { email: authState.email } })
      }
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    // Call your API
    setAuthState({
      token: null,
      authenticated: false,
    })
    GoogleSignin.revokeAccess()
    GoogleSignin.signOut()
    await SecureStore.deleteItemAsync(TOKEN_KEY)
    queryClient.removeQueries({ queryKey: ['user-info'] })
  }

  const value = {
    currentUser,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    isLoading: isLoading || isUserInfoLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
