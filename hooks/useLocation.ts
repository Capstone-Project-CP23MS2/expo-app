import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import * as Location from 'expo-location';

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isAndroid = Platform.OS == 'android';

  const getCurrentLocation = async () => {
    setIsLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }
    console.log('♻ Getting location');

    const location = await Promise.race([
      Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest }) as Promise<Location.LocationObject>,
      new Promise<Location.LocationObject>((resolve, reject) => {
        setTimeout(() => reject(new Error('Timeout error')), 5000);
      }),
    ]);
    // const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
    // const location = await Location.getLastKnownPositionAsync();
    console.log(`✔ Got location: {lat: ${location?.coords.latitude}, lng: ${location?.coords.longitude}}`);

    return location;
  };

  useEffect(() => {
    getCurrentLocation().then(setLocation).catch((error) => {
      setError(error.message);
      return null;
    }).finally(() => setIsLoading(false));
  }, []);

  return { location, isLoading, error };
}