import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack, useRouter, Slot, SplashScreen } from 'expo-router'
// import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useCallback } from 'react'
import { Pressable, useColorScheme, View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, FONT } from '@/constants'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import useAppLoading from '@/hooks/useAppLoading'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StatusBar } from 'expo-status-bar'
import { DesignSystem } from '@/utils/design-system'

import 'utils/unistyles'
import { AuthProvider } from '@/context/authContext'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

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
  return (
    <AuthProvider>
      <BottomSheetModalProvider>
        <Slot />
      </BottomSheetModalProvider>
    </AuthProvider>
  )
}
