import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
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
// import { DesignSystem } from '@/utils/design-system';

// import 'utils/unistyles';

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

// DesignSystem.setup()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const appLoaded = useAppLoading()
  if (!appLoaded) return null
  return <RootLayoutNav />
}

function RootLayoutNav() {
  const router = useRouter()
  const colorScheme = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
      <StatusBar style="dark" />

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: true }} />
        <Stack.Screen name="(app)/(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)/listing/[id]" options={{ headerTitle: '' }} />
        <Stack.Screen name="(app)/activities/[id]" options={{ headerTitle: 'Activities' }} />

        <Stack.Screen
          name="(app)/(modals)/login"
          options={{
            presentation: 'modal',
            title: 'Log in or sign up',
            headerTitleStyle: {
              fontFamily: FONT.regular,
            },
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <MaterialIcons name="close" size={28} color="black" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="(app)/(modals)/booking"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            headerTransparent: true,
            // headerTitle: (props) => <ModalHeaderText />,
            headerLeft: () => (
              <Pressable
                onPress={() => router.back()}
                style={{
                  backgroundColor: COLORS.lightWhite,
                  borderColor: COLORS.gray,
                  borderRadius: 20,
                  borderWidth: 1,
                  padding: 4,
                }}
              >
                <MaterialIcons name="close" size={22} />
              </Pressable>
            ),
          }}
        />
      </Stack>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  )
}
