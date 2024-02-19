import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function useAppLoading() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [fontsLoaded, fontsError] = useFonts({
    NunitoRegular: require('@/assets/fonts/Nunito-Regular.ttf'),
    NunitoMedium: require('@/assets/fonts/Nunito-Medium.ttf'),
    NunitoSemiBold: require('@/assets/fonts/Nunito-SemiBold.ttf'),
    NunitoBold: require('@/assets/fonts/Nunito-Bold.ttf'),
    NotoSansThaiRegular: require('@/assets/fonts/NotoSansThai-Regular.ttf'),
    NotoSansThaiMedium: require('@/assets/fonts/NotoSansThai-Medium.ttf'),
    NotoSansThaiSemiBold: require('@/assets/fonts/NotoSansThai-SemiBold.ttf'),
    NotoSansThaiBold: require('@/assets/fonts/NotoSansThai-Bold.ttf'),
    DMBold: require('@/assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('@/assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('@/assets/fonts/DMSans-Regular.ttf'),
    // ...FontAwesome.font,
  });

  useEffect(() => {
    console.log('fontsError');

    if (fontsError) throw fontsError;
  }, [fontsError]);

  useEffect(() => {
    console.log('fontsLoaded');

    if (fontsLoaded && !appLoaded) {
      setAppLoaded(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return appLoaded;
}
