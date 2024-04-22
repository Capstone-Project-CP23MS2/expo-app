import { Platform, Text, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import * as Location from 'expo-location';
import { RNUIButton } from '@/components';
import { loadAsync } from 'expo-font';
import { useLocation } from '@/hooks/useLocation';
type Props = {};

const DevExpoLocation = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { location: locationHook, isLoading } = useLocation();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log('status', status);

      if (status !== 'granted') {
        console.log('is not granted');

        setErrorMsg('Permission to access location was denied');
        return;
      }
      console.log('is granted');

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      {isLoading ? <Text>Loading...</Text> : <Text>{JSON.stringify(locationHook)}</Text>}
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
}));

export default DevExpoLocation;
