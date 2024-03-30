import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { COLORS, SIZES } from '@/constants'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { FontAwesome5 } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { UserLocationContext } from '@/context/userLocationContext'
import PlaceListView from './placeListView'
import { UseGetActivities } from '@/hooks/useAPI'
import { SelectMarkerContext } from '@/context/selectMarkerContext'

const MapActivities = () => {
  const { location, setLocation }: any = useContext(UserLocationContext)
  const { data } = UseGetActivities({})
  const { content: activities }: any = data || {}
  const [selectedMarker, setSelectedMarker] = useState([])

  return (
    <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      {location?.latitude && (
        <View style={{ flex: 1 }}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            initialRegion={{
              latitude: location?.latitude,
              longitude: location?.longitude,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0421,
            }}
          >
            {activities.map((item, index) => (
              <Marker
                coordinate={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                }}
                index={index}
                key={index}
                onPress={() => setSelectedMarker(index)}
              />
            ))}
          </MapView>
          <View style={styles.placelist}>
            <PlaceListView activities={activities} />
          </View>
        </View>
      )}
    </SelectMarkerContext.Provider>
  )
}

export default MapActivities

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: 200,
  },
  placelist: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
})
