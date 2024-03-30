import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { COLORS, SIZES } from '@/constants'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { FontAwesome5 } from '@expo/vector-icons'

const MapActivities = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          padding: 10,
          backgroundColor: COLORS.white,
          borderRadius: 10,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <FontAwesome5 name="search" size={10} color={COLORS.black} />
          <Text style={{ fontSize: SIZES.small, fontWeight: 'bold' }}>View map</Text>
        </View>
      </View>
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
