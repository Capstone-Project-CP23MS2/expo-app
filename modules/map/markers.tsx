import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import { SelectMarkerContext } from '@/context/selectMarkerContext'

export default function Markers({ place, index }: any) {
  const { selectedMarker, setSelectedMarker }: any = useContext(SelectMarkerContext)
  return (
    place && (
      <Marker
        coordinate={{
          latitude: place.location.latitude,
          longitude: place.location.longitude,
        }}
        onPress={() => setSelectedMarker(index)}
      />
    )
  )
}
