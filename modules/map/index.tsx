import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { COLORS, SIZES } from '@/constants'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { FontAwesome5 } from '@expo/vector-icons'
import { Stack } from 'expo-router'

const MapActivities = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>
    </View>
  )
}

export default MapActivities

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: 200,
  },
})
