import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { COLORS, SIZES } from '@/constants'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { FontAwesome5 } from '@expo/vector-icons'

const MapActivities = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
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
