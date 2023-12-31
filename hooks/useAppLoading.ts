import { useFonts } from 'expo-font';
import { useState, useEffect, } from 'react';
import { SplashScreen } from 'expo-router';


export default function useAppLoading() {
    const [appLoaded, setAppLoaded] = useState(false);
    const [fontsLoaded, fontsError] = useFonts({
        NunitoRegular: require('@/assets/fonts/Nunito-Regular.ttf'),
        NunitoMedium: require('@/assets/fonts/Nunito-Medium.ttf'),
        NunitoSemiBold: require('@/assets/fonts/Nunito-SemiBold.ttf'),
        NunitoBold: require('@/assets/fonts/Nunito-Bold.ttf'),
        DMBold: require('@/assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('@/assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('@/assets/fonts/DMSans-Regular.ttf'),
        // ...FontAwesome.font,
    });


    useEffect(() => {
        if (fontsError) throw fontsError;
    }, [fontsError]);

    useEffect(() => {
        if (fontsLoaded && !appLoaded) {
            SplashScreen.hideAsync();
            setAppLoaded(true);
        }
    }, [fontsLoaded]);

    return appLoaded;
}