import { useEffect, useState, createContext, useContext, PropsWithChildren } from 'react'
import { useRouter, useSegments } from 'expo-router'

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { set } from 'zod'
type UserType = {
  userName: string | any
  email: string
  idToken: string | any
  photo: string | any
}
type AuthContextType = {
  user: UserType | undefined
  signIn: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: PropsWithChildren) {
  const rootSegment = useSegments()[0]
  const router = useRouter()
  // const [userInfo, setUserInfo] = useState(null as any)
  const [user, setUser] = useState<UserType | any>(undefined)
  // const [idToken, setIdToken] = useState<any>('')

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
  useEffect(() => {
    if (user === null) return

    if (!user && rootSegment !== '(auth)') {
      router.replace('/(auth)/login')
    } else if (user && rootSegment !== '(app)') {
      router.replace('/(app)/(tabs)/activities')
    }
  }, [user, rootSegment])

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      setUser({
        userName: userInfo.user.name,
        email: userInfo.user.email,
        idToken: userInfo.idToken,
        photo: userInfo.user.photo,
      })

      console.log('login success')
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
    setUser(null)
    GoogleSignin.revokeAccess()
    GoogleSignin.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
