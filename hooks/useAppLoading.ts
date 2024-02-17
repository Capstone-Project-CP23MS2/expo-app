import { useFonts } from 'expo-font'
import { useState, useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'

export default function useAppLoading() {
  const [appLoaded, setAppLoaded] = useState(false)
  const [fontsLoaded, fontsError] = useFonts({
    NunitoRegular: require('@/assets/fonts/NotoSansThai-Regular.ttf'),
    NunitoMedium: require('@/assets/fonts/NotoSansThai-Medium.ttf'),
    NunitoSemiBold: require('@/assets/fonts/NotoSansThai-SemiBold.ttf'),
    NunitoBold: require('@/assets/fonts/NotoSansThai-Bold.ttf'),
  })

  useEffect(() => {
    if (fontsError) throw fontsError
  }, [fontsError])

  useEffect(() => {
    if (fontsLoaded && !appLoaded) {
      SplashScreen.hideAsync()
      setAppLoaded(true)
    }
  }, [fontsLoaded])

  return appLoaded
}
