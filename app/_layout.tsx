import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONT } from '@/constants';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import useAppLoading from '@/hooks/useAppLoading';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'utils/unistyles';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // minutes
      // refetchOnWindowFocus: false,
    },
  },
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const appLoaded = useAppLoading();
  if (!appLoaded) return null;
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
        <Stack.Screen name="activities/[id]" options={{ headerTitle: '' }} />

        <Stack.Screen
          name="(modals)/login"
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
          name="(modals)/booking"
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
                }}>
                <MaterialIcons name="close" size={22} />
              </Pressable>
            ),
          }}
        />
      </Stack>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  );
}
//     <Stack.Screen name="modal" options={{ presentation: "modal" }} />

// const [fontsLoaded, fontsError] = useFonts({
//   NunitoRegular: require('@/assets/fonts/Nunito-Regular.ttf'),
//   NunitoMedium: require('@/assets/fonts/Nunito-Medium.ttf'),
//   NunitoSemiBold: require('@/assets/fonts/Nunito-SemiBold.ttf'),
//   NunitoBold: require('@/assets/fonts/Nunito-Bold.ttf'),
//   DMBold: require('@/assets/fonts/DMSans-Bold.ttf'),
//   DMMedium: require('@/assets/fonts/DMSans-Medium.ttf'),
//   DMRegular: require('@/assets/fonts/DMSans-Regular.ttf'),
//   // ...FontAwesome.font,
// });

// // Expo Router uses Error Boundaries to catch errors in the navigation tree.
// useEffect(() => {
//   if (fontsError) throw fontsError;
// }, [fontsError]);

// useEffect(() => {
//   if (fontsLoaded) {
//     SplashScreen.hideAsync();
//   }
// }, [fontsLoaded]);

// if (!fontsLoaded) {
//   return null;
// }
