import { Stack, useRouter } from 'expo-router'
import { Pressable, useColorScheme, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, FONT } from '@/constants'
import { StatusBar } from 'expo-status-bar'

function Home() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    
    <View style={{}}>
        {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
        <StatusBar style="dark" />

        <Stack>
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
    </View>
}

export default Home
