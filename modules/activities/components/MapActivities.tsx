import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { COLORS, SIZES } from '@/constants'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { FontAwesome5 } from '@expo/vector-icons'
import * as Location from 'expo-location'
import { useRouter } from 'expo-router'
import MapViewStyle from '@/assets/data/map-view-style.json'

const INITIAL_REGION = {
  latitude: 13.75633,
  longitude: 100.501765,
  latitudeDelta: 0.0422,
  longitudeDelta: 0.0421,
}

const MapActivities = () => {
  const router = useRouter()
  const mapRef = useRef<any>(null)

  useEffect(() => {
    onLocateMe()
  }, [])

  const onLocateMe = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    console.log(location)

    const region = {
      latitude: location.coords.latitude ?? 13.75633,
      longitude: location.coords.longitude ?? 100.501765,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    }

    mapRef.current?.animateToRegion(region)
  }

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={{ borderRadius: SIZES.small, overflow: 'hidden', elevation: 4 }}
        onPress={() => router.push('/(app)/map/')}
      >
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          customMapStyle={MapViewStyle}
          showsUserLocation={true}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            padding: 10,
            backgroundColor: COLORS.white,
            borderRadius: 10,
            elevation: 4,
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <FontAwesome5 name="search" size={10} color={COLORS.black} />
            <Text style={{ fontSize: SIZES.small, fontWeight: 'bold' }}>View map</Text>
          </View>
        </View>
      </Pressable>
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
