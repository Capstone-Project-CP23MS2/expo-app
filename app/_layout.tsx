import { Slot, SplashScreen } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useAppLoading from '@/hooks/useAppLoading'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StatusBar } from 'expo-status-bar'
import { DesignSystem } from '@/utils/design-system'

import 'utils/unistyles'
import { AuthProvider } from '@/context/authContext'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { UserLocationContext } from '@/context/userLocationContext'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // minutes
      // refetchOnWindowFocus: false,
    },
  },
})

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(app)/(tabs)',
}

DesignSystem.setup()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const appLoaded = useAppLoading()
  if (!appLoaded) return null
  return (
    <QueryClientProvider client={queryClient}>
      {/* <StatusBQueryClientProviderar style="dark" /> */}
      <RootLayoutNav />
    </QueryClientProvider>
  )
}

function RootLayoutNav() {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location.coords)
      console.log(location)
    })()
  }, [])

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = JSON.stringify(location)
  }

  return (
    <AuthProvider>
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <BottomSheetModalProvider>
          <Slot />
        </BottomSheetModalProvider>
      </UserLocationContext.Provider>
    </AuthProvider>
  )
}
