import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { FONT, SIZES } from '@/constants'
import dayjs from 'dayjs'

export default function PlaceItem({ place }: any) {
  return (
    <View
      style={{
        marginBottom: 20,
        width: Dimensions.get('screen').width,
      }}
    >
      <View style={{ margin: 10, padding: 15, backgroundColor: 'white', borderRadius: 10 }}>
        <Text style={{ fontSize: SIZES.large }}>{place.title}</Text>
        <Text style={{ fontSize: SIZES.medium }}>{place.description}</Text>
        <Text style={{ fontSize: SIZES.medium }}>
          {dayjs(place.dateTime).format('ddd, MMMM D, YYYY h:mm')}
        </Text>
      </View>
    </View>
  )
}
