import { Slot, SplashScreen } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useAppLoading from '@/hooks/useAppLoading'
import { DesignSystem } from '@/utils/design-system'

import 'utils/unistyles'
import { AuthProvider } from '@/context/authContext'

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
      {/* <StatusBar style="dark" /> */}
      <RootLayoutNav />
    </QueryClientProvider>
  )
}

function RootLayoutNav() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}
