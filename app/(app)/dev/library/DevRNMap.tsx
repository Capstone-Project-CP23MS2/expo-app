import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const INITIAL_REGION = {
  latitude: 13.75633,
  longitude: 100.501765,
  latitudeDelta: 0.0422,
  longitudeDelta: 0.0421,
};

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={INITIAL_REGION} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
